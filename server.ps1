$port = 8080
$ip = [System.Net.IPAddress]::Loopback

try {
    $listener = New-Object System.Net.Sockets.TcpListener($ip, $port)
    $listener.Start()
} catch {
    $port = 8081
    $listener = New-Object System.Net.Sockets.TcpListener($ip, $port)
    $listener.Start()
}

Write-Host "PORTFOLIO_SERVER_RUNNING: http://localhost:$port"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".json" = "application/json"
    ".ico"  = "image/x-icon"
}

$buf = New-Object byte[] 8192

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $stream.ReadTimeout = 2000
        $stream.WriteTimeout = 2000
        $readCount = $stream.Read($buf, 0, $buf.Length)
        
        if ($readCount -gt 0) {
            $reqText = [System.Text.Encoding]::ASCII.GetString($buf, 0, $readCount)
            $firstLine = $reqText.Split("`n")[0].Trim()
            $parts = $firstLine.Split(' ')
            if ($parts.Length -ge 2) {
                $rawPath = $parts[1].Split('?')[0]
                if ($rawPath -eq "/" -or [string]::IsNullOrWhiteSpace($rawPath)) {
                    $rawPath = "/index.html"
                }
                $relativePath = $rawPath.TrimStart('/').Replace('/', '\')
                $fullPath = Join-Path $PSScriptRoot $relativePath

                if (Test-Path $fullPath -PathType Leaf) {
                    $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
                    $mime = "application/octet-stream"
                    if ($mimeTypes.ContainsKey($ext)) {
                        $mime = $mimeTypes[$ext]
                    }
                    $bytes = [System.IO.File]::ReadAllBytes($fullPath)
                    $header = "HTTP/1.1 200 OK`r`nContent-Type: $mime`r`nContent-Length: $($bytes.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($bytes, 0, $bytes.Length)
                } else {
                    $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                    $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
                    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                    $stream.Write($body, 0, $body.Length)
                }
            }
        }
        $stream.Flush()
        $client.Close()
    } catch {
        # ignore disconnects
    }
}
