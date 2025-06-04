document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    function toggleMenu() {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
    
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks && navLinks.contains(event.target);
        const isClickOnMenuBtn = menuBtn && menuBtn.contains(event.target);
        
        if (navLinks && navLinks.classList.contains('active') && !isClickInsideMenu && !isClickOnMenuBtn) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking on a link
    if (navLinks) {
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // FAQ accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all accordion items
                accordionItems.forEach(accItem => {
                    accItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Contact Form Functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add focus effects to inputs
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // Add focus class to parent when input is focused
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Remove focus class when input loses focus
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check initial state (in case of autofill)
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }
});
