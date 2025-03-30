document.addEventListener('DOMContentLoaded', function() {
    // Sticky Navbar
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.nav-links');
    
    // Sayfa yüklendikten sonra preloader'ı kaldır
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('preloader-finish');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 500);
    
    // Mobile Menu Toggle with enhanced animation
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        if (menuBtn.classList.contains('active')) {
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Enhanced Scroll Event for Sticky Navbar with background blur
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.classList.remove('scrolled');
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
        
        // Active nav link based on scroll position
        let current = '';
        
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Project Filtering with enhanced animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    
                    // Adding enhanced animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Contact Form Submission with validation and effects
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add input focus effects
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        
        formInputs.forEach(input => {
            // Add focus class on input focus
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Remove focus class on input blur
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Şu anda form gönderimini devre dışı bırakıyoruz
            const notification = document.createElement('div');
            notification.className = 'notification success-notification';
            notification.innerHTML = '<i class="fas fa-info-circle"></i> Form gönderimi şu anda aktif değil. Lütfen bizi telefon numaramızdan arayın.';
            document.body.appendChild(notification);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.classList.add('hide');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 5000);
        });
        
        // Helper functions for form validation
        function showError(inputId, message) {
            const input = document.getElementById(inputId);
            const errorDiv = input.parentElement.querySelector('.error-message') || document.createElement('div');
            
            if (!errorDiv.classList.contains('error-message')) {
                errorDiv.className = 'error-message';
                input.parentElement.appendChild(errorDiv);
            }
            
            errorDiv.textContent = message;
            input.classList.add('error');
        }
        
        function removeError(inputId) {
            const input = document.getElementById(inputId);
            const errorDiv = input.parentElement.querySelector('.error-message');
            
            if (errorDiv) {
                input.parentElement.removeChild(errorDiv);
            }
            
            input.classList.remove('error');
        }
        
        function isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
    
    // Improved Animation on Scroll with IntersectionObserver
    const animateElements = document.querySelectorAll('.section-header, .service-card, .project-item, .testimonial-item, .about-content, .about-image, .about-text, .stat-item, .contact-info, .contact-form, .map');
    
    // Using Intersection Observer API for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add parallax effect to hero section with better performance
    const hero = document.querySelector('.hero');
    let ticking = false;
    
    if (hero) {
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollPosition = window.scrollY;
                    if (scrollPosition < window.innerHeight) {
                        hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Enhanced Smooth scrolling for anchor links with offset adjustment
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                // Get header height dynamically for accurate offset
                const headerHeight = document.getElementById('header').offsetHeight;
                
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20, // 20px extra padding
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add button hover effect with improved ripple
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800); // Longer duration for more visible effect
        });
    });
    
    // Init animation check on load
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 500);
});
