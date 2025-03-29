document.addEventListener('DOMContentLoaded', function() {
     Sticky Navbar
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.nav-links');
    
     Mobile Menu Toggle with enhanced animation
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        if (menuBtn.classList.contains('active')) {
            menuBtn.innerHTML = 'i class=fas fa-timesi';
        } else {
            menuBtn.innerHTML = 'i class=fas fa-barsi';
        }
    });
    
     Close mobile menu when clicking on a nav link
    navLinks.forEach(link = {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            menuBtn.innerHTML = 'i class=fas fa-barsi';
        });
    });
    
     Enhanced Scroll Event for Sticky Navbar with background blur
    window.addEventListener('scroll', function() {
        if (window.scrollY  50) {
            header.classList.add('scrolled');
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.classList.remove('scrolled');
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
        
         Active nav link based on scroll position
        let current = '';
        
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section = {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY = (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link = {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
     Project Filtering with enhanced animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn = {
        btn.addEventListener('click', function() {
             Remove active class from all buttons
            filterBtns.forEach(btn = btn.classList.remove('active'));
            
             Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach(item = {
                if (filter === 'all'  item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    
                     Adding enhanced animation
                    setTimeout(() = {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) translateY(20px)';
                    
                    setTimeout(() = {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
     Contact Form Submission with validation and effects
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
         Add input focus effects
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        
        formInputs.forEach(input = {
             Add focus class on input focus
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
             Remove focus class on input blur
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
             Check if input has value on load
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
             Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
             Basic validation
            let isValid = true;
            
            if (name.trim() === '') {
                showError('name', 'Lütfen adınızı giriniz');
                isValid = false;
            } else {
                removeError('name');
            }
            
            if (email.trim() === '') {
                showError('email', 'Lütfen e-posta adresinizi giriniz');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Lütfen geçerli bir e-posta adresi giriniz');
                isValid = false;
            } else {
                removeError('email');
            }
            
            if (phone.trim() === '') {
                showError('phone', 'Lütfen telefon numaranızı giriniz');
                isValid = false;
            } else {
                removeError('phone');
            }
            
            if (message.trim() === '') {
                showError('message', 'Lütfen bir mesaj giriniz');
                isValid = false;
            } else {
                removeError('message');
            }
            
            if (isValid) {
                 Normally, you would send this data to a server via AJAX
                 For now, we'll just log it to console and show a success message
                console.log({
                    name,
                    email,
                    phone,
                    service,
                    message
                });
                
                 Show success notification
                const notification = document.createElement('div');
                notification.className = 'notification success-notification';
                notification.innerHTML = 'i class=fas fa-check-circlei Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
                document.body.appendChild(notification);
                
                 Remove notification after 5 seconds
                setTimeout(() = {
                    notification.classList.add('hide');
                    setTimeout(() = {
                        document.body.removeChild(notification);
                    }, 500);
                }, 5000);
                
                 Reset the form
                contactForm.reset();
                
                 Remove all focused classes
                formInputs.forEach(input = {
                    input.parentElement.classList.remove('focused');
                });
            }
        });
        
         Helper functions for form validation
        function showError(inputId, message) {
            const input = document.getElementById(inputId);
            const errorDiv = input.parentElement.querySelector('.error-message')  document.createElement('div');
            
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
            const re = ^(([^()[].,;s@]+(.[^()[].,;s@]+))(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$;
            return re.test(String(email).toLowerCase());
        }
    }
    
     Improved Animation on Scroll with staggered reveal
    const animateElements = document.querySelectorAll('.service-card, .project-item, .testimonial-item, .about-content, .contact-content, .section-header');
    
    function checkView() {
        const triggerBottom = window.innerHeight  0.85;
        
        animateElements.forEach((element, index) = {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop  triggerBottom) {
                 Add staggered delay for elements
                setTimeout(() = {
                    element.classList.add('show');
                }, 100  (index % 5));  Stagger within groups of 5
            }
        });
    }
    
     Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPosition = `center ${scrollPosition  0.4}px`;
        });
    }
    
     Initial check
    checkView();
    
     Check on scroll
    window.addEventListener('scroll', checkView);
    
     Enhanced Smooth scrolling for anchor links
    document.querySelectorAll('a[href^=#]').forEach(anchor = {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top target.offsetTop - 80,  Offset for fixed header
                    behavior 'smooth'
                });
            }
        });
    });
    
     Add CSS for enhanced animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .project-item, .testimonial-item, .about-content, .contact-content, .section-header {
            opacity 0;
            transform translateY(30px);
            transition opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .service-card.show, .project-item.show, .testimonial-item.show, .about-content.show, .contact-content.show, .section-header.show {
            opacity 1;
            transform translateY(0);
        }
        
        .error-message {
            color #FF3D00;
            font-size 12px;
            margin-top 5px;
            display block;
        }
        
        input.error, select.error, textarea.error {
            border-color #FF3D00 !important;
            box-shadow 0 0 0 2px rgba(255, 61, 0, 0.2) !important;
        }
        
        .notification {
            position fixed;
            bottom 30px;
            right 30px;
            padding 15px 25px;
            background rgba(0, 200, 83, 0.9);
            color white;
            border-radius 8px;
            display flex;
            align-items center;
            box-shadow 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index 9999;
            transform translateY(0);
            opacity 1;
            transition all 0.3s ease;
        }
        
        .notification i {
            margin-right 10px;
            font-size 20px;
        }
        
        .notification.hide {
            transform translateY(20px);
            opacity 0;
        }
        
        .header.scrolled {
            backdrop-filter blur(10px);
            -webkit-backdrop-filter blur(10px);
        }
    `;
    document.head.appendChild(style);
    
     Add button hover effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button = {
        button.addEventListener('mouseenter', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() = {
                ripple.remove();
            }, 600);
        });
    });
    
     Add ripple effect style
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position relative;
            overflow hidden;
        }
        
        .ripple {
            position absolute;
            background rgba(255, 255, 255, 0.3);
            border-radius 50%;
            transform scale(0);
            animation ripple 0.6s linear;
            pointer-events none;
        }
        
        @keyframes ripple {
            to {
                transform scale(4);
                opacity 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});