/* ---------------------------
   Mobile Menu Toggle
   --------------------------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-links li a');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation menu' : 'Open navigation menu'
        );
    });

    // Close mobile menu when a link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
            hamburger.focus();
        }
    });
}

/* ---------------------------
   Scroll container reference
   Observers must use the scroll container as
   their root, since that element owns the
   scroll position (not window/document).
   --------------------------- */
const scrollContainer = document.querySelector('.scroll-container');

/* ---------------------------
   Cinematic Reveal on Scroll
   --------------------------- */
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        },
        {
            root: scrollContainer,      // watch inside the scroll container
            rootMargin: '0px 0px -15% 0px',
            threshold: 0.4,
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));
}

/* ---------------------------
   Active Nav Link on Scroll
   --------------------------- */
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

if (sections.length > 0 && navItems.length > 0) {
    const navObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navItems.forEach(item => {
                        const isActive = item.getAttribute('href') === `#${currentId}`;
                        item.classList.toggle('active', isActive);
                        item.setAttribute('aria-current', isActive ? 'true' : 'false');
                    });
                }
            });
        },
        {
            root: scrollContainer,      // watch inside the scroll container
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        }
    );

    sections.forEach(section => navObserver.observe(section));
}

/* ---------------------------
   Nav anchor links — custom scroll inside container
   --------------------------- */
if (scrollContainer) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target && scrollContainer.contains(target)) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'instant' });
            }
        });
    });
}