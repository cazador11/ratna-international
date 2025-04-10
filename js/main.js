/**
 * Ratna International Tours and Travels
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown menus
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => {
        return new bootstrap.Dropdown(dropdownToggleEl);
    });
    
    // Auto-close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    const menuToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation class to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
                
                // Add specific animation class
                if (element.dataset.animation) {
                    element.classList.add(element.dataset.animation);
                }
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });

    // WhatsApp button functionality
    const whatsappButtons = document.querySelectorAll('a[href^="https://wa.me/"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // You can add custom tracking here if needed
            console.log('WhatsApp button clicked');
        });
    });

    // Phone call tracking
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    
    phoneButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // You can add custom tracking here if needed
            console.log('Phone button clicked');
        });
    });

    // Sticky header effect
    const header = document.querySelector('header');
    let scrollPos = window.scrollY;

    const addClassOnScroll = () => {
        const newScrollPos = window.scrollY;
        
        if (newScrollPos > 100) {
            header.classList.add('navbar-scrolled');
        } else {
            header.classList.remove('navbar-scrolled');
        }
        
        scrollPos = newScrollPos;
    };

    window.addEventListener('scroll', addClassOnScroll);
    
    // Run once on page load
    addClassOnScroll();
    
    // Handle orientation changes for responsive layouts
    window.addEventListener('orientationchange', function() {
        // Small delay to allow browser to complete orientation change
        setTimeout(() => {
            animateOnScroll();
            addClassOnScroll();
            
            // Recalculate any position-dependent elements
            const containers = document.querySelectorAll('.container');
            containers.forEach(container => {
                container.style.height = 'auto';
            });
        }, 200);
    });
    
    // Improve touch interactions on mobile
    const touchInteractiveElements = document.querySelectorAll('.btn, .nav-link, .card, .service-card, .feature-box');
    
    touchInteractiveElements.forEach(element => {
        // Add active state visual feedback for touch devices
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, {passive: true});
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        }, {passive: true});
    });
    
    // Optimize image loading for better performance
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});
