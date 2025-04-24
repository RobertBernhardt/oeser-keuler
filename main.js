/**
 * Oeser & Keuler Rechtsanwälte
 * Modern Website Redesign
 * main.js
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer and modals
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Set current year in modals if they exist
    const modalYearElements = document.querySelectorAll('#modal-year, #modal-year-2');
    modalYearElements.forEach(element => {
        if (element) {
            element.textContent = currentYear;
        }
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close navigation when clicking on a link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Sticky navigation on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Testimonial carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonialDots.length > 0 && testimonialSlides.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Remove active class from all slides and dots
                testimonialSlides.forEach(slide => {
                    slide.classList.remove('active');
                });
                testimonialDots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Add active class to current slide and dot
                testimonialSlides[index].classList.add('active');
                this.classList.add('active');
            });
        });
        
        // Auto rotate testimonials every 5 seconds
        let currentTestimonialIndex = 0;
        
        function rotateTestimonials() {
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            testimonialDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
            
            testimonialSlides[currentTestimonialIndex].classList.add('active');
            testimonialDots[currentTestimonialIndex].classList.add('active');
        }
        
        // Start the auto rotation
        const testimonialInterval = setInterval(rotateTestimonials, 5000);
        
        // Pause auto rotation when user interacts with testimonials
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                clearInterval(testimonialInterval);
                
                // Get the index of the current dot
                const dotIndex = Array.from(testimonialDots).indexOf(this);
                currentTestimonialIndex = dotIndex;
            });
        });
    }
    
    // Modal functionality
    const impressumLink = document.getElementById('impressum-link');
    const datenschutzLink = document.getElementById('datenschutz-link');
    const privacyLink = document.getElementById('privacy-link');
    const impressumModal = document.getElementById('impressum-modal');
    const datenschutzModal = document.getElementById('datenschutz-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Function to open modal
    function openModal(modal) {
        if (modal) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            modal.classList.add('show');
        }
    }
    
    // Function to close modal
    function closeModal(modal) {
        if (modal) {
            document.body.style.overflow = '';
            modal.classList.remove('show');
        }
    }
    
    // Event listeners for opening modals
    if (impressumLink && impressumModal) {
        impressumLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(impressumModal);
        });
    }
    
    if (datenschutzLink && datenschutzModal) {
        datenschutzLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(datenschutzModal);
        });
    }
    
    if (privacyLink && datenschutzModal) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(datenschutzModal);
        });
    }
    
    // Event listeners for closing modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Close modal with Escape key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal.show');
            openModals.forEach(modal => {
                closeModal(modal);
            });
        }
    });
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const privacy = document.getElementById('privacy');
            
            let isValid = true;
            
            if (!name.value.trim()) {
                highlightError(name);
                isValid = false;
            } else {
                removeHighlight(name);
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                highlightError(email);
                isValid = false;
            } else {
                removeHighlight(email);
            }
            
            if (!subject.value.trim()) {
                highlightError(subject);
                isValid = false;
            } else {
                removeHighlight(subject);
            }
            
            if (!message.value.trim()) {
                highlightError(message);
                isValid = false;
            } else {
                removeHighlight(message);
            }
            
            if (!privacy.checked) {
                highlightError(privacy.parentElement);
                isValid = false;
            } else {
                removeHighlight(privacy.parentElement);
            }
            
            if (isValid) {
                // In a real implementation, this would send the form data to a server
                // For now, just show a success message
                contactForm.innerHTML = `
                    <div class="form-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3>Nachricht gesendet!</h3>
                        <p>Vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich bei Ihnen melden.</p>
                    </div>
                `;
                
                // Add success styles
                const formSuccess = document.querySelector('.form-success');
                formSuccess.style.textAlign = 'center';
                formSuccess.style.padding = '2rem';
                
                const successIcon = document.querySelector('.success-icon');
                successIcon.style.fontSize = '4rem';
                successIcon.style.color = 'var(--primary-color)';
                successIcon.style.marginBottom = '1rem';
            }
        });
    }
    
    // Helper functions for form validation
    function highlightError(element) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.style.borderColor = 'red';
        } else {
            element.style.color = 'red';
        }
    }
    
    function removeHighlight(element) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.style.borderColor = '';
        } else {
            element.style.color = '';
        }
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a modal link
            if (href === '#' || href === '#privacy-link' || 
                href === '#impressum-link' || href === '#datenschutz-link') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.stat-box, .attorney-card, .practice-area-card, .contact-card');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
});