// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll event listeners
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', revealSections);
    
    // Section reveal animation
    function revealSections() {
        const sections = document.querySelectorAll('.section-reveal');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('revealed');
            }
        });
    }
    
    // Initial check for sections in view
    revealSections();
    
    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.85 && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }
    
    // Add skill bar animation to scroll event
    window.addEventListener('scroll', animateSkillBars);
    
    // Initial check for skill bars
    animateSkillBars();
    
    // // Contact form handling
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Get form data
    //         const formData = new FormData(contactForm);
    //         const name = formData.get('name');
    //         const email = formData.get('email');
    //         const subject = formData.get('subject');
    //         const message = formData.get('message');
            
    //         // Basic validation
    //         if (!name || !email || !subject || !message) {
    //             showNotification('Please fill in all fields', 'error');
    //             return;
    //         }
            
    //         if (!isValidEmail(email)) {
    //             showNotification('Please enter a valid email address', 'error');
    //             return;
    //         }
            
    //         // Simulate form submission (replace with actual form handling)
    //         showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    //         contactForm.reset();
            
    //         // In a real implementation, you would send the form data to your server
    //         // Example:
    //         // fetch('/api/contact', {
    //         //     method: 'POST',
    //         //     headers: {
    //         //         'Content-Type': 'application/json',
    //         //     },
    //         //     body: JSON.stringify({ name, email, subject, message })
    //         // })
    //         // .then(response => response.json())
    //         // .then(data => {
    //         //     showNotification('Message sent successfully!', 'success');
    //         //     contactForm.reset();
    //         // })
    //         // .catch(error => {
    //         //     showNotification('Failed to send message. Please try again.', 'error');
    //         // });
    //     });
    // }
    
    // // Email validation function
    // function isValidEmail(email) {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // }
// ==============================
// Contact Form + Formspree
// ==============================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        try {
            const response = await fetch("https://formspree.io/f/mnjbrwjl", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                showNotification('Message sent successfully ✅', 'success');
                contactForm.reset();
            } else {
                showNotification('Something went wrong ❌', 'error');
            }

        } catch (error) {
            showNotification('Network error ❌', 'error');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <p class="mr-4">${message}</p>
                <button class="notification-close text-white hover:text-gray-200">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Manual close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });
    }
    
    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Parallax effect for hero background
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg');
        
        if (heroBackground) {
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
    }
    
    // Add parallax to scroll event (limited for performance)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                parallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Add loading animation for project cards
    function addProjectCardAnimations() {
        const projectCards = document.querySelectorAll('.card-hover');
        
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Initialize project card animations when projects section is visible
    function checkProjectsVisibility() {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            const rect = projectsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.7 && !projectsSection.classList.contains('animated')) {
                projectsSection.classList.add('animated');
                setTimeout(addProjectCardAnimations, 500);
            }
        }
    }
    
    window.addEventListener('scroll', checkProjectsVisibility);
    
    // Initialize everything on page load
    updateActiveNav();
    
    // Add smooth hover effects for buttons
    const buttons = document.querySelectorAll('.btn-primary, button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click ripple effect
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Add ripple effect to buttons
    const rippleButtons = document.querySelectorAll('.btn-primary, button');
    rippleButtons.forEach(addRippleEffect);
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll-heavy functions
    const debouncedReveal = debounce(revealSections, 100);
    const debouncedSkills = debounce(animateSkillBars, 100);
    
    // Replace direct scroll listeners with debounced versions
    window.removeEventListener('scroll', revealSections);
    window.removeEventListener('scroll', animateSkillBars);
    window.addEventListener('scroll', debouncedReveal);
    window.addEventListener('scroll', debouncedSkills);
    
    console.log('Portfolio website initialized successfully! 🚀');
});