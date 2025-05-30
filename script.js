// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;
  
  hamburger.addEventListener('click', toggleMenu);
  menuIcon.addEventListener('click', toggleMenu);
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);
    
    if (navLinks.classList.contains('show') && 
        !isClickInsideMenu && 
        !isClickOnHamburger && 
        !isClickOnMenuIcon) {
      toggleMenu();
    }
  });
  
  // Close menu when window is resized to desktop size
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      hamburger.classList.remove('active');
      resetMenuStyles();
      body.style.overflow = '';
    }
  });
  
  // Close menu when clicking on a link
  const menuLinks = navLinks.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navLinks.classList.contains('show')) {
        toggleMenu();
      }
    });
  });
  
  function toggleMenu() {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
    
    // If menu is shown, add these styles and prevent body scrolling
    if (navLinks.classList.contains('show')) {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.backgroundColor = 'white';
      navLinks.style.padding = '20px';
      navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
      navLinks.style.zIndex = '1000';
      body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      // Reset styles when menu is hidden
      resetMenuStyles();
      body.style.overflow = ''; // Re-enable scrolling
    }
  }
  
  function resetMenuStyles() {
    setTimeout(() => {
      if (!navLinks.classList.contains('show')) {
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.width = '';
        navLinks.style.backgroundColor = '';
        navLinks.style.padding = '';
        navLinks.style.boxShadow = '';
        navLinks.style.zIndex = '';
      }
    }, 300);
  }
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

