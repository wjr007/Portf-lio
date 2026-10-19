// =====================================================
// WALTEIR JUNIOR — PORTFOLIO JAVASCRIPT
// High-Tech HUD & Dynamic Interactions
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        }
    }, { passive: true });

    // --- 2. MOBILE MENU CONTROLS ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            navMenu.classList.toggle('open', !isOpen);
            menuToggle.classList.toggle('open', !isOpen);
            menuToggle.setAttribute('aria-expanded', String(!isOpen));
        });

        // Close menu when clicking on any navigation link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- 3. ACADEMIC TABS CONTROLLER ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabViews = document.querySelectorAll('.tab-view');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabViews.forEach(v => v.classList.remove('active'));

            btn.classList.add('active');
            const targetView = document.getElementById(`view-${targetTab}`);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });

    // --- 4. PROJECT CATEGORY FILTER ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-hud-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 5. INTERACTIVE TYPING EFFECT ---
    const typedEl = document.getElementById('typed');
    if (typedEl) {
        const roles = [
            'Estudante de IA & Ciência de Dados (Uniube)',
            'Deep Learning com PyTorch & ResNet',
            'Machine Learning & Visão Computacional',
            'Agentes Autônomos de Inteligência Artificial',
            'Pipelines de Dados & Lakehouse com Databricks'
        ];

        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let delay = 90;

        function typeLoop() {
            const currentRole = roles[roleIdx];

            if (isDeleting) {
                typedEl.textContent = currentRole.substring(0, charIdx - 1);
                charIdx--;
                delay = 35;
            } else {
                typedEl.textContent = currentRole.substring(0, charIdx + 1);
                charIdx++;
                delay = 75;
            }

            if (!isDeleting && charIdx === currentRole.length) {
                isDeleting = true;
                delay = 1800; // Pause at end of text
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                delay = 400; // Pause before typing new text
            }

            setTimeout(typeLoop, delay);
        }

        setTimeout(typeLoop, 600);
    }

    // --- 6. SMOOTH ACTIVE NAV OBSERVER ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if ('IntersectionObserver' in window && sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${currentId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.25,
            rootMargin: '-70px 0px -40% 0px'
        });

        sections.forEach(s => observer.observe(s));
    }

    // --- 7. SUBTLE CYBER ORB MOUSE INTERACTION ---
    const heroVisual = document.querySelector('.hero');
    const orb1 = document.querySelector('.orb-primary');

    if (heroVisual && orb1 && window.innerWidth > 992) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            orb1.style.transform = `translate(${x}px, ${y}px)`;
        }, { passive: true });
    }

});
