// DOM Elements
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-links');
const burgerLines = document.querySelectorAll('.burger div');

// Scroll Effects
window.addEventListener('scroll', () => {
    // Navigation background change on scroll
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
        burgerLines.forEach(line => line.style.backgroundColor = '#fff');
    } else {
        nav.classList.remove('scrolled');
        burgerLines.forEach(line => line.style.backgroundColor = '#333');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        navMenu.classList.remove('nav-active');
        burger.classList.remove('toggle');
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = nav.offsetHeight;

        window.scrollTo({
            top: targetSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
burger.addEventListener('click', () => {
    navMenu.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navMenu.classList.contains('nav-active')) {
        navMenu.classList.remove('nav-active');
        burger.classList.remove('toggle');
    }
});

// Resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('nav-active');
        burger.classList.remove('toggle');
    }
}); 