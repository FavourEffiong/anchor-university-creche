// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', toggleMenu);
  menuIcon.addEventListener('click', toggleMenu);
  
  function toggleMenu() {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
    
    // If menu is shown, add these styles
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
    } else {
      // Reset styles when menu is hidden
      setTimeout(() => {
        if (!navLinks.classList.contains('show')) {
          navLinks.style.display = '';
        }
      }, 300);
    }
  }
});
