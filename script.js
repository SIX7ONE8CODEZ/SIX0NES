// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add smooth scrolling to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Membership Modal Functions
function openMembershipModal() {
    document.getElementById('membershipModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeMembershipModal() {
    document.getElementById('membershipModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('membershipModal');
    if (event.target === modal) {
        closeMembershipModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMembershipModal();
    }
});

// Select Plan Function
function selectPlan(planType) {
    const planSelect = document.getElementById('planSelect');
    const planOptions = {
        'basic': 'basic',
        'professional': 'professional', 
        'enterprise': 'enterprise'
    };
    
    if (planOptions[planType]) {
        planSelect.value = planOptions[planType];
    }
    
    openMembershipModal();
}

// Form Handling
document.getElementById('membershipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const membershipData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        plan: formData.get('plan'),
        eventTypes: formData.get('eventTypes')
    };
    
    // Simulate form submission
    showSuccessMessage('Membership application submitted successfully! We will contact you within 24 hours.');
    
    // Reset form and close modal
    this.reset();
    closeMembershipModal();
    
    // In a real application, you would send this data to your server
    console.log('Membership Data:', membershipData);
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    showSuccessMessage('Message sent successfully! We will get back to you soon.');
    
    // Reset form
    this.reset();
    
    // In a real application, you would send this data to your server
    console.log('Contact Data:', contactData);
});

// Success Message Function
function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.5s ease;
        max-width: 400px;
    `;
    
    // Add CSS animation
    if (!document.querySelector('#success-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'success-animation-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .success-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .success-content i {
                font-size: 1.2rem;
            }
            .success-content p {
                margin: 0;
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideInRight 0.5s ease reverse';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 500);
    }, 5000);
}

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(255, 219, 88, 0.95), rgba(204, 85, 0, 0.95))';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #FFDB58, #CC5500)';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to sections on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add initial styles for animation
    const animatedElements = document.querySelectorAll('.space-card, .plan-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Stagger animation for cards
    setTimeout(() => {
        document.querySelectorAll('.space-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
    
    setTimeout(() => {
        document.querySelectorAll('.plan-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 1000);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.backgroundPositionY = speed + 'px';
    }
});

// Form Validation Enhancement
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Enhanced form validation
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#dc3545';
            showValidationError(this, 'Please enter a valid email address');
        } else {
            this.style.borderColor = '#28a745';
            hideValidationError(this);
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#dc3545';
            showValidationError(this, 'Please enter a valid phone number');
        } else {
            this.style.borderColor = '#28a745';
            hideValidationError(this);
        }
    });
});

function showValidationError(input, message) {
    hideValidationError(input); // Remove any existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.9rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    input.parentNode.appendChild(errorDiv);
}

function hideValidationError(input) {
    const existingError = input.parentNode.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
}

// Loading animation for buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Add loading state to form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            addLoadingState(submitBtn);
        }
    });
});

// Price calculation for custom plans (future feature)
function calculateCustomPrice(hours, plan) {
    const basePrices = {
        basic: 99,
        professional: 199,
        enterprise: 399
    };
    
    const hourlyRates = {
        basic: 25,
        professional: 20,
        enterprise: 15
    };
    
    const basePrice = basePrices[plan] || 0;
    const additionalCost = Math.max(0, hours - getIncludedHours(plan)) * hourlyRates[plan];
    
    return basePrice + additionalCost;
}

function getIncludedHours(plan) {
    const includedHours = {
        basic: 4,
        professional: 12,
        enterprise: 999 // Unlimited
    };
    
    return includedHours[plan] || 0;
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('SIX0NES website loaded successfully!');
    
    // Add any initialization code here
    initializeCounters();
    setupLazyLoading();
});

// Counter animation for stats (if you want to add statistics)
function initializeCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        observer.observe(counter);
        counter.addEventListener('animationstart', updateCounter);
    });
}

// Lazy loading for images (when you add real images)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
