// Animate sections on scroll
function animateOnScroll() {
    const animatedSections = document.querySelectorAll('[data-animate]');
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.15 });
    animatedSections.forEach(section => observer.observe(section));
}

// Highlight active nav link
function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function setTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme + '-theme');
    localStorage.setItem('theme', theme);
    const icon = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Animate progress bars on load
window.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    highlightNav();
    document.querySelectorAll('.fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
    // Theme toggle logic
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
        const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
});
