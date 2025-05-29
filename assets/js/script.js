// BS Header Web Component
class BsHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar" id="navbar">
        <div class="nav-container">
          <div class="nav-logo">
            <a href="index.html">
              <h2>
                <i></i>
                <span class="logo-full">BS Tours & Travels</span>
                <span class="logo-short">BS Tours and Travels</span>
              </h2>
            </a>
          </div>
          <ul class="nav-menu" id="nav-menu">
            <li class="nav-item"><a href="index.html" class="nav-link active">Home</a></li>
            <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
            <li class="nav-item"><a href="service.html" class="nav-link">Services</a></li>
            <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
          </ul>
          <div class="nav-toggle" id="mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </div>
      </nav>

      

      <div class="quick-actions hidden">
        <a href="tel:+918050465875" class="quick-btn call-btn" aria-label="Call us">
          <i class="fas fa-phone"></i>
        </a>
        <a href="https://wa.me/918618429796" class="quick-btn whatsapp-btn" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp">
          <i class="fab fa-whatsapp"></i>
        </a>
      </div>

      <button id="scrollTop" class="scroll-top" aria-label="Scroll to top">
        <i class="fas fa-chevron-up" aria-hidden="true"></i>
      </button>
    `;

    // Initialize component functionality
    this.initializeComponent();
  }

  initializeComponent() {
    // Use requestAnimationFrame for better performance than setTimeout
    requestAnimationFrame(() => {
      this.setupMobileMenu();
      this.setupStickyNavbar();
    });
  }

  setupMobileMenu() {
    const mobileMenu = this.querySelector('#mobile-menu');
    const navMenu = this.querySelector('#nav-menu');

    if (mobileMenu && navMenu) {
      mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          mobileMenu.classList.remove('active');
        }
      });
    }
  }

  setupStickyNavbar() {
    const navbar = this.querySelector('#navbar');
    if (!navbar) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 100) {
            navbar.classList.add('sticky');
          } else {
            navbar.classList.remove('sticky');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}

// Register the custom element
customElements.define('bs-header', BsHeader);

// Special Footer Web Component
class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>BS Tours & Travels</h3>
              <p>Your trusted travel partner in Bangalore. We provide safe, reliable, and comfortable cab services 24/7.</p>
              <div class="social-links">
                <a href="#" class="social-link" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                <a href="#" class="social-link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://wa.me/918618429796" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
              </div>
            </div>
            <div class="footer-section">
              <h4>Quick Links</h4>
              <ul class="footer-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="service.html">Services</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Services</h4>
              <ul class="footer-links">
                <li><a href="service.html#services">Airport Transfers</a></li>
                <li><a href="service.html#services">Outstation Trips</a></li>
                <li><a href="service.html#services">City Rides</a></li>
                <li><a href="service.html#services">Corporate Bookings</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Contact Info</h4>
              <div class="footer-contact">
                <p><i class="fas fa-phone"></i> <a href="tel:+918050465875">+91 8050465875</a></p>
                <p><i class="fas fa-phone"></i> <a href="tel:+918618429796">+91 8618429796</a></p>
                <p><i class="fas fa-envelope"></i> <a href="mailto:bstoursandtravels28@gmail.com">bstoursandtravels28@gmail.com</a></p>
                <p><i class="fas fa-map-marker-alt"></i> Bangalore, Karnataka</p>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 BS Tours & Travels. All rights reserved. | Designed with ❤️ for better travel experience</p>
          </div>
        </div>
      </footer>
    `;
  }
}

// Register the custom element
customElements.define('special-footer', SpecialFooter);

// Main Application Controller
class BSToursApp {
  constructor() {
    this.testimonialIndex = 0;
    this.testimonials = [];
    this.testimonialInterval = null;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    this.setupActiveNavigation();
    this.setupScrollAnimationsFixed(); // FIXED VERSION
    this.setupScrollToTop();
    this.setupContactForm();
    this.setupHeroScroll();
    this.setupQuickActions();
    // REMOVED setupLoader() - This was causing the issue
    this.setupSmoothScrolling();
    this.setupTestimonials();
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          let current = '';
          sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
              current = section.getAttribute('id');
            }
          });

          navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || (current === '' && href === 'index.html')) {
              link.classList.add('active');
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // FIXED: Modified scroll animations to prevent initial fade
  setupScrollAnimationsFixed() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');
    animatedElements.forEach(el => {
      // Check if element is already in viewport on page load
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        // If in viewport on load, show immediately without animation
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      } else {
        // If not in viewport, set up for animation
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
      }
    });
  }

  setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
          } else {
            scrollTopBtn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name')?.trim();
      const phone = formData.get('phone')?.trim();
      const service = formData.get('service')?.trim();
      const message = formData.get('message')?.trim();

      // Basic validation
      if (!name || !phone || !service) {
        alert('Please fill in all required fields.');
        return;
      }

      // Phone number validation (basic Indian mobile number format)
      const phoneRegex = /^[6-9]\d{9}$/;
      const cleanPhone = phone.replace(/\D/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      const whatsappMessage = `Hi BS Tours and Travels! I'd like to book a cab.

Name: ${name}
Phone: ${phone}
Service: ${service}
Message: ${message || 'No additional message'}

Please contact me for booking details.`;

      const whatsappUrl = `https://wa.me/918050465875?text=${encodeURIComponent(whatsappMessage)}`;
      
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        alert('Thank you! You will be redirected to WhatsApp to complete your booking.');
        contactForm.reset();
      } catch (error) {
        console.error('Error opening WhatsApp:', error);
        alert('Unable to open WhatsApp. Please call us directly at +91 8050465875');
      }
    });
  }

  setupHeroScroll() {
    const heroScroll = document.querySelector('.hero-scroll');
    if (!heroScroll) return;

    heroScroll.addEventListener('click', (e) => {
      e.preventDefault();
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  setupQuickActions() {
  const quickActions = document.querySelector('.quick-actions');
  
  if (!quickActions) return;

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 300) { // Show after scrolling 300px on any page
          quickActions.classList.remove('hidden');
        } else {
          quickActions.classList.add('hidden');
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

  // REMOVED setupLoader() function entirely

  setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Close mobile menu if it's open
          const navMenu = document.querySelector('.nav-menu');
          const mobileMenu = document.querySelector('#mobile-menu');
          if (navMenu && mobileMenu) {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
          }
        }
      });
    });
  }

  setupTestimonials() {
    this.testimonials = document.querySelectorAll('.testimonial-card');
    
    if (this.testimonials.length === 0) return;

    // Initial setup
    this.testimonials.forEach((testimonial, index) => {
      testimonial.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      if (index === 0) {
        testimonial.style.opacity = '1';
        testimonial.style.transform = 'scale(1.05)';
      } else {
        testimonial.style.opacity = '0.7';
        testimonial.style.transform = 'scale(1)';
      }
    });

    this.startTestimonialRotation();
  }

  startTestimonialRotation() {
    if (this.testimonials.length <= 1) return;

    this.testimonialInterval = setInterval(() => {
      this.testimonials.forEach((testimonial, index) => {
        if (index === this.testimonialIndex) {
          testimonial.style.opacity = '1';
          testimonial.style.transform = 'scale(1.05)';
        } else {
          testimonial.style.opacity = '0.7';
          testimonial.style.transform = 'scale(1)';
        }
      });
      
      this.testimonialIndex = (this.testimonialIndex + 1) % this.testimonials.length;
    }, 4000);
  }

  // Cleanup method for SPA scenarios
  destroy() {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }
}

// Initialize the application
const bsToursApp = new BSToursApp();

// Make app available globally for debugging/cleanup
window.BSToursApp = bsToursApp;