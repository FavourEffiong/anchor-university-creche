// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
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
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      if (navLinks && navLinks.classList.contains('active')) {
        toggleMenu();
      }
    }
  });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for fixed header
        behavior: 'smooth'
      });
    }
  });
});

// Add animation on scroll
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.class-card, .service-card, .news-card, .mission-image, .about-image');
  
  function checkIfInView() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }
  
  // Add initial visible class for elements already in view
  window.addEventListener('load', checkIfInView);
  
  // Check for new elements coming into view on scroll
  window.addEventListener('scroll', checkIfInView);
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const radioOptions = contactForm.querySelectorAll('.radio-option');
    const form = contactForm.querySelector('form') || contactForm;

    // Handle radio button styling
    radioOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Find the radio input within this option
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Remove active state from all options
                radioOptions.forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // Add active state to clicked option
                this.classList.add('active');
            }
        });
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const firstName = form.querySelector('#firstName').value;
        const lastName = form.querySelector('#lastName').value;
        const email = form.querySelector('#email').value;
        const phone = form.querySelector('#phone').value;
        const subject = form.querySelector('input[name="subject"]:checked')?.value;
        const message = form.querySelector('#message').value;

        // Basic validation
        if (!firstName || !lastName || !email || !phone || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (basic international format)
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }

        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();

        // Reset radio button styling
        radioOptions.forEach(opt => opt.classList.remove('active'));
    });

    // Add floating label effect
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Check initial state (in case of autofill)
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Gallery Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 0);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

