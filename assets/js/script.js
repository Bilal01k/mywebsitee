class BsHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar" id="navbar">
        <div class="nav-container">
          <div class="nav-logo">
  <a href="index.html">
    <h2>
      <i ></i>
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

      <div id="loader" class="loader">
        <div class="spinner"></div>
        <p>BS Tours & Travels</p>
      </div>

      <div class="quick-actions hidden">
        <a href="tel:+918050465875" class="quick-btn call-btn">
            <i class="fas fa-phone"></i>
        </a>
        <a href="https://wa.me/918618429796" class="quick-btn whatsapp-btn" target="_blank">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>


     

    `;

    // Wait until the element is fully rendered
    setTimeout(() => {
      const mobileMenu = this.querySelector('#mobile-menu');
      const navMenu = this.querySelector('#nav-menu');
      const navbar = this.querySelector('#navbar');

      if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function () {
          navMenu.classList.toggle('active');
          mobileMenu.classList.toggle('active');
        });
      }

      if (navbar) {
        window.addEventListener('scroll', function () {
          if (window.scrollY > 100) {
            navbar.classList.add('sticky');
          } else {
            navbar.classList.remove('sticky');
          }
        });
      }
    }, 0);
  }
}

customElements.define('bs-header', BsHeader);






// other js 



// Global Scripts (outside the component but still related)
document.addEventListener('DOMContentLoaded', function () {
  // Active Navigation Link Highlight
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

  // Scroll to Top Button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Contact Form Submission to WhatsApp
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message');

      const whatsappMessage = `Hi  BS tours and travels! I'd like to book a cab.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}\n\nPlease contact me for booking details.`;
      const whatsappUrl = `https://wa.me/918050465875?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      alert('Thank you! You will be redirected to WhatsApp to complete your booking.');
      this.reset();
    });
  }

  // Hero Scroll Button
  const heroScroll = document.querySelector('.hero-scroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', function () {
      document.getElementById('about')?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  // Show quick actions only after scrolling past hero section
const quickActions = document.querySelector('.quick-actions');
const heroSection = document.querySelector('.hero');

if (quickActions && heroSection) {
  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY > heroBottom) {
      quickActions.classList.remove('hidden');
    } else {
      quickActions.classList.add('hidden');
    }
  });
}



    // Loading Animation
        window.addEventListener('load', function() {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        });







    // Smooth Scroll for Anchor Links + Close Mobile Menu
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if it's open
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenu = document.querySelector('#mobile-menu');
        navMenu?.classList.remove('active');
        mobileMenu?.classList.remove('active');
      }
    });
  });



  // Testimonials Auto Scroll
  let testimonialIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');

  function rotateTestimonials() {
    testimonials.forEach((testimonial, index) => {
      if (index === testimonialIndex) {
        testimonial.style.opacity = '1';
        testimonial.style.transform = 'scale(1.05)';
      } else {
        testimonial.style.opacity = '0.7';
        testimonial.style.transform = 'scale(1)';
      }
    });
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  }

  if (testimonials.length > 0) {
    setInterval(rotateTestimonials, 4000);
  }
});




















// footer

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
                        <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="https://wa.me/918618429796" class="social-link"><i class="fab fa-whatsapp"></i></a>
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
                        <li><a href="index.html#home">Airport Transfers</a></li>
                        <li><a href="index.html#home">Outstation Trips</a></li>
                        <li><a href="index.html#home">City Rides</a></li>
                        <li><a href="index.html#home">Corporate Bookings</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <div class="footer-contact">
                        <p><i class="fas fa-phone"></i> +91 8050465875</p>
                        <p><i class="fas fa-phone"></i> +91 8618429796</p>
                        <p><i class="fas fa-envelope"></i> bstoursandtravels28@gmail.com</p>
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
  // Define it for use
customElements.define('special-footer', SpecialFooter);




