# Portfólio

## Estrutura

- `index.html`: conteúdo, links e cards dos projetos.
- `style.css`: apresentação visual responsiva.
- `script.js`: interações da página.
- `foto.png`: foto de perfil.

## Atualização de projetos

Os cards em destaque representam somente repositórios públicos da conta `wjr007`. Para atualizar o portfólio, altere os títulos, descrições, tecnologias e URLs na seção `#projetos` de `index.html`.

Não inclua dados de repositórios privados, chaves, certificados ou arquivos `.pem` na página ou no repositório público.

## Formação acadêmica

A seção `#academico` mostra apenas disciplinas concluídas e em andamento. Disciplinas futuras não são exibidas. O indicador de conclusão da graduação está em `index.html`, no atributo `aria-valuenow` e na largura de `.academic-progress-value`; mantenha ambos com o mesmo percentual ao atualizar o progresso.

## Certificações

A seção `#certificados` lista formações complementares verificadas nos certificados fornecidos. Ela exibe título, área, emissor, carga horária e data somente quando esses dados constam no documento. Os PDFs originais e QR codes não são publicados no site; atualize os cards diretamente em `index.html` quando houver novos certificados.

Cada card exibe uma prévia em PNG do respectivo certificado, com nomes iniciados por `certificado-`. Essas imagens são prova visual; substitua cada uma pela prévia correspondente ao renovar a certificação.

O logotipo da Uniube está em `uniube-logo.png` e é exibido na seção acadêmica. Substitua-o apenas por uma imagem com uso autorizado.

## Contato

O WhatsApp é centralizado nos links `https://wa.me/553496583020` de `index.html`. Atualize todas as ocorrências juntas caso o número mude.

## Prévia local

Abra `index.html` em um servidor local. A prévia criada para esta tarefa usa `127.0.0.1` e exclui `web.pem` por segurança.

## Fundo visual

`background-ia.png` é a imagem de fundo global, aplicada em `style.css` com uma camada escura para manter o contraste do texto.

## Segurança de credenciais

A chave privada exposta foi removida do projeto e do histórico Git. Identifique e substitua qualquer credencial ou certificado associado antes de reutilizar o serviço. Este site estático não depende de chave privada local. Segredos devem permanecer no servidor ou no gerenciador de segredos do provedor; nunca no JavaScript público. Certificados públicos legítimos .crt e .cer são permitidos. Após a reescrita, colaboradores devem fazer um clone novo para evitar reintroduzir o histórico antigo.

