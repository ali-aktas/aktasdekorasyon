document.addEventListener('DOMContentLoaded', function() {
    // Sticky Navbar
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.nav-links');
    
    // Mobile Menu Toggle
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
    
    // Scroll Event for Sticky Navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
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
    
    // Project Filtering
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
                    
                    // Adding animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
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
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Normally, you would send this data to a server via AJAX
            // For now, we'll just log it to console and show a success message
            console.log({
                name,
                email,
                phone,
                service,
                message
            });
            
            // Show success message
            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Animation on Scroll
    const animateElements = document.querySelectorAll('.service-card, .project-item, .testimonial-item, .about-content, .contact-content');
    
    function checkView() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('show');
            }
        });
    }
    
    // Initial check
    checkView();
    
    // Check on scroll
    window.addEventListener('scroll', checkView);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .project-item, .testimonial-item, .about-content, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.show, .project-item.show, .testimonial-item.show, .about-content.show, .contact-content.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
