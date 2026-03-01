// Mobile menu toggle logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

// ==========================================
// Intersection Observer for Cinematic Reveal
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    root: null,
    rootMargin: '0px 0px -200px 0px', // Triggers slightly before element comes into full view
    threshold: 0.05
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Remove the class when scrolled past to allow reverse animation
            entry.target.classList.remove('active');
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ==========================================
// Intersection Observer for Active Nav Links
// ==========================================
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

const navOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px', // Accurately detect which section is in the middle of the screen
    threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let currentId = entry.target.getAttribute('id');
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, navOptions);

sections.forEach(section => {
    navObserver.observe(section);
});