// ========================================
// MAIN JAVASCRIPT - DIOPORTFOLIO
// ========================================

// --- Load Header & Footer from partials ---
async function loadPartials() {
  try {
    // Load header
    const headerResponse = await fetch('/partials/header.html');
    const headerHTML = await headerResponse.text();
    document.getElementById('header-container').innerHTML = headerHTML;
    
    // Load footer
    const footerResponse = await fetch('/partials/footer.html');
    const footerHTML = await footerResponse.text();
    document.getElementById('footer-container').innerHTML = footerHTML;
    
    // Initialize after partials loaded
    initApp();
  } catch (error) {
    console.error('Error loading partials:', error);
  }
}

// --- Initialize App ---
function initApp() {
  const html = document.documentElement;
  
  // Load saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    html.classList.add('dark');
  }
  
  // --- Dark Mode Toggle ---
  function toggleDark() {
    // Toggle dark class
    html.classList.toggle('dark');
    
    // Update icons
    updateDarkIcons();
    
    // Save preference
    if (html.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
  
  // --- Update Dark Mode Icons ---
  function updateDarkIcons() {
    const isDark = html.classList.contains('dark');
    
    // Update all moon/sun icons
    const darkIcons = document.querySelectorAll('#dark-icon-desktop, #dark-icon-mobile');
    darkIcons.forEach(icon => {
      if (isDark) {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    });
  }
  
  // --- Mobile menu toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('max-h-0');
      if (isOpen) {
        mobileMenu.classList.remove('max-h-0');
        mobileMenu.classList.add('max-h-96', 'py-2');
        const icon = this.querySelector('i');
        icon.className = 'fas fa-times text-2xl text-cartoon-blue-dark dark:text-dark-text';
      } else {
        mobileMenu.classList.remove('max-h-96', 'py-2');
        mobileMenu.classList.add('max-h-0');
        const icon = this.querySelector('i');
        icon.className = 'fas fa-bars text-2xl text-cartoon-blue-dark dark:text-dark-text';
      }
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('max-h-96', 'py-2');
        mobileMenu.classList.add('max-h-0');
        const icon = menuBtn.querySelector('i');
        icon.className = 'fas fa-bars text-2xl text-cartoon-blue-dark dark:text-dark-text';
      });
    });
    
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        mobileMenu.classList.remove('max-h-96', 'py-2');
        mobileMenu.classList.add('max-h-0');
        const icon = menuBtn.querySelector('i');
        icon.className = 'fas fa-bars text-2xl text-cartoon-blue-dark dark:text-dark-text';
      }
    });
  }
  
  // --- Dark mode toggles ---
  const darkToggle = document.getElementById('dark-toggle');
  const darkToggleMobile = document.getElementById('dark-toggle-mobile');
  
  if (darkToggle) {
    darkToggle.addEventListener('click', toggleDark);
  }
  if (darkToggleMobile) {
    darkToggleMobile.addEventListener('click', toggleDark);
  }
  
  // --- Initial icon update ---
  updateDarkIcons();
  
  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('nav')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// --- Start App ---
loadPartials();