// =====================================================
// WALTEIR JUNIOR — PORTFOLIO JS
// =====================================================

// --- NAV SCROLL EFFECT ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// --- MOBILE MENU ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(8,11,18,0.97)';
    navLinks.style.padding = '20px';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
    navLinks.style.backdropFilter = 'blur(20px)';
    if (!isOpen) {
        navLinks.style.display = 'flex';
    }
});

// Fecha menu ao clicar em link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navLinks.style.display = 'none';
        }
    });
});

// --- ACADEMIC TABS ---
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const panel = document.getElementById(`tab-${target}`);
        if (panel) panel.classList.add('active');
    });
});

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll(
    '.project-card, .skill-category, .info-card, .discipline, .hero-stats, .contato-link, .cta-box, .section-title, .sobre-text, .sobre-cards'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, (i % 6) * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));

// --- SMOOTH ACTIVE NAV LINKS ---
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.style.color = a.getAttribute('href') === `#${id}`
                    ? 'var(--text)'
                    : '';
            });
        }
    });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));

// --- CURSOR GLOW EFFECT (subtle) ---
const hero = document.querySelector('.hero');
hero?.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const orb = document.querySelector('.orb-1');
    if (orb) {
        const x = (clientX / window.innerWidth) * 20 - 10;
        const y = (clientY / window.innerHeight) * 20 - 10;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// --- TYPING EFFECT FOR HERO SUBTITLE ---
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
    const text = 'Estudante de IA · Ciência de Dados · Machine Learning';
    roleEl.innerHTML = `<span class="mono">&lt;</span> <span id="typed"></span> <span class="mono">/&gt;</span>`;
    const typed = document.getElementById('typed');
    let i = 0;
    const type = () => {
        if (i < text.length) {
            typed.textContent += text[i++];
            setTimeout(type, 40);
        }
    };
    setTimeout(type, 800);
}
