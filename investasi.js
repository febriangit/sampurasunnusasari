// ===========================================
// PELUANG INVESTASI JAVASCRIPT
// Fitur Utama: FAQ Accordion + Smooth Scroll + Animations
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📈 Peluang Investasi JavaScript Loaded');
    
    // ========== INITIALIZE COMPONENTS ==========
    initFAQAccordion();
    initSmoothScroll();
    initVideoBackgrounds();
    initHoverEffects();
    initPackageSelection();
    initFormNavigation();
    initWhatsAppIntegration();
    initCountUpAnimations();
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
});

// ========== FAQ ACCORDION FUNCTIONALITY ==========
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        console.log('❌ No FAQ questions found');
        return;
    }
    
    console.log(`✅ Found ${faqQuestions.length} FAQ questions`);
    
    // Close all FAQ answers except the first one
    function closeAllFAQ() {
        faqQuestions.forEach(question => {
            question.setAttribute('aria-expanded', 'false');
            const answer = question.nextElementSibling;
            if (answer && answer.classList.contains('faq-answer')) {
                answer.style.maxHeight = '0';
            }
            
            // Reset toggle icon
            const toggleIcon = question.querySelector('.faq-toggle i');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-plus';
            }
        });
    }
    
    // Open specific FAQ
    function openFAQ(question) {
        question.setAttribute('aria-expanded', 'true');
        const answer = question.nextElementSibling;
        if (answer && answer.classList.contains('faq-answer')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        
        // Change toggle icon
        const toggleIcon = question.querySelector('.faq-toggle i');
        if (toggleIcon) {
            toggleIcon.className = 'fas fa-minus';
        }
    }
    
    // Toggle FAQ answer
    function toggleFAQ(question) {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        // Close all FAQs
        closeAllFAQ();
        
        // If this FAQ wasn't expanded, open it
        if (!isExpanded) {
            openFAQ(question);
        }
    }
    
    // Add click event to each FAQ question
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFAQ(this);
        });
        
        // Add keyboard support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(this);
            }
        });
    });
    
    // Open first FAQ by default
    if (faqQuestions.length > 0) {
        setTimeout(() => {
            openFAQ(faqQuestions[0]);
        }, 500);
    }
}

// ========== SMOOTH SCROLL FUNCTIONALITY ==========
function initSmoothScroll() {
    // Select all anchor links with hash
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#') return;
            
            // Find target element
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, href);
                
                // Add visual feedback for clicked link
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            }
        });
    });
    
    // Handle package selection scroll
    const packageButtons = document.querySelectorAll('.btn-paket');
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get package type from button class
            const packageType = this.classList.contains('bronze') ? 'bronze' : 
                               this.classList.contains('silver') ? 'silver' : 'gold';
            
            // Scroll to form section
            const formSection = document.getElementById('form-investasi');
            if (formSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = formSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Pre-select package in form (if exists)
                preSelectPackage(packageType);
            } else {
                // If form section doesn't exist, scroll to FAQ
                const faqSection = document.getElementById('faq-investasi');
                if (faqSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = faqSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ========== VIDEO BACKGROUNDS ==========
function initVideoBackgrounds() {
    const heroVideo = document.querySelector('.investasi-hero-section .hero-video');
    const faqVideo = document.querySelector('.section-faq .faq-video-bg');
    
    // Ensure videos play properly
    function ensureVideoPlayback(video) {
        if (!video) return;
        
        video.muted = true; // Required for autoplay
        video.playsInline = true;
        
        // Attempt to play video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log(`✅ Video playing: ${video.src}`);
                })
                .catch(error => {
                    console.log(`❌ Video autoplay failed: ${error}`);
                    // Fallback: show play button
                    showVideoFallback(video);
                });
        }
    }
    
    // Show fallback play button if video fails
    function showVideoFallback(video) {
        const parent = video.parentElement;
        const playButton = document.createElement('button');
        playButton.className = 'video-play-fallback';
        playButton.innerHTML = '<i class="fas fa-play"></i> Play Video';
        playButton.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(210, 105, 30, 0.8);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1.1rem;
            z-index: 10;
        `;
        
        playButton.addEventListener('click', function() {
            video.play();
            this.style.display = 'none';
        });
        
        parent.appendChild(playButton);
    }
    
    // Initialize videos
    ensureVideoPlayback(heroVideo);
    ensureVideoPlayback(faqVideo);
    
    // Handle video loading states
    const videos = [heroVideo, faqVideo].filter(v => v);
    videos.forEach(video => {
        video.addEventListener('loadeddata', function() {
            console.log(`✅ Video loaded: ${this.src}`);
        });
        
        video.addEventListener('error', function() {
            console.log(`❌ Video error: ${this.src}`);
            // Show fallback image
            this.style.display = 'none';
            const fallback = this.parentElement.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'block';
            }
        });
    });
}

// ========== HOVER EFFECTS ENHANCEMENT ==========
function initHoverEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-alur, .btn-paket, .btn-whatsapp');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // Add parallax effect to cards on mouse move
    const cards = document.querySelectorAll('.why-card, .paket-card, .alur-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
        });
    });
}

// ========== PACKAGE SELECTION ==========
function initPackageSelection() {
    const packageCards = document.querySelectorAll('.paket-card');
    
    packageCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the button
            if (e.target.closest('.btn-paket')) return;
            
            // Toggle selection
            packageCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Get package type
            let packageType = 'bronze';
            if (this.classList.contains('silver')) packageType = 'silver';
            if (this.classList.contains('gold')) packageType = 'gold';
            
            // Update selection display
            updatePackageSelection(packageType);
        });
    });
    
    // Add keyboard navigation
    packageCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % packageCards.length;
                packageCards[nextIndex].focus();
            }
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + packageCards.length) % packageCards.length;
                packageCards[prevIndex].focus();
            }
        });
    });
}

function updatePackageSelection(packageType) {
    console.log(`Package selected: ${packageType}`);
    
    // Update visual feedback
    const packageNames = {
        'bronze': 'Paket Bronze',
        'silver': 'Paket Silver',
        'gold': 'Paket Gold'
    };
    
    // Show selection message (you can customize this)
    const message = document.getElementById('package-selection-message');
    if (!message) {
        // Create message element if it doesn't exist
        const selectionMessage = document.createElement('div');
        selectionMessage.id = 'package-selection-message';
        selectionMessage.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--secondary-color);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(selectionMessage);
    }
    
    const selectionMessage = document.getElementById('package-selection-message');
    selectionMessage.innerHTML = `
        <strong>${packageNames[packageType]} Dipilih!</strong><br>
        <small>Klik tombol "Pilih Paket Ini" untuk melanjutkan</small>
    `;
    
    // Hide message after 3 seconds
    setTimeout(() => {
        selectionMessage.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            selectionMessage.remove();
        }, 300);
    }, 3000);
}

function preSelectPackage(packageType) {
    console.log(`Pre-selecting package: ${packageType}`);
    
    // This function would be used to pre-select package in a form
    // For now, just log and update selection
    updatePackageSelection(packageType);
}

// ========== FORM NAVIGATION ==========
function initFormNavigation() {
    const formButtons = document.querySelectorAll('.btn-alur[href="form-investasi.html"]');
    
    formButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // If we're already on the form page, don't navigate
            if (window.location.pathname.includes('form-investasi.html')) {
                e.preventDefault();
                // Instead, show a modal or scroll to form
                const formSection = document.getElementById('investasi-form');
                if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Otherwise, let the link work normally
        });
    });
    
    // Add form validation if we're on the form page
    if (window.location.pathname.includes('form-investasi.html')) {
        initFormValidation();
    }
}

function initFormValidation() {
    const form = document.getElementById('investasi-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const phone = form.querySelector('input[name="phone"]');
        const packageSelect = form.querySelector('select[name="package"]');
        
        let isValid = true;
        
        // Reset errors
        resetFormErrors();
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Nama lengkap wajib diisi');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Email wajib diisi');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Format email tidak valid');
            isValid = false;
        }
        
        // Validate phone
        if (!phone.value.trim()) {
            showError(phone, 'Nomor WhatsApp wajib diisi');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Format nomor telepon tidak valid');
            isValid = false;
        }
        
        // Validate package selection
        if (!packageSelect.value) {
            showError(packageSelect, 'Pilih paket investasi');
            isValid = false;
        }
        
        if (isValid) {
            submitForm(form);
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showError(field, 'Field ini wajib diisi');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(value)) {
        showError(field, 'Format email tidak valid');
        return false;
    }
    
    if (field.name === 'phone' && !isValidPhone(value)) {
        showError(field, 'Format nomor telepon tidak valid');
        return false;
    }
    
    clearError(field);
    return true;
}

function showError(field, message) {
    clearError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 5px;
        animation: fadeIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
    field.classList.add('error');
}

function clearError(field) {
    const errorDiv = field.parentElement.querySelector('.form-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.classList.remove('error');
}

function resetFormErrors() {
    const errors = document.querySelectorAll('.form-error');
    errors.forEach(error => error.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[0-9+\-\s()]{10,}$/;
    return re.test(phone);
}

function submitForm(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // In a real app, you would send data to a server here
        console.log('Form submitted:', {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            phone: form.querySelector('input[name="phone"]').value,
            package: form.querySelector('select[name="package"]').value,
            amount: form.querySelector('input[name="amount"]').value
        });
        
        // Show success message
        showSuccessMessage(form);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        background: rgba(39, 174, 96, 0.1);
        border: 1px solid #27ae60;
        color: #27ae60;
        padding: 15px;
        border-radius: 8px;
        margin-top: 20px;
        animation: fadeIn 0.5s ease;
    `;
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <strong> Form berhasil dikirim!</strong><br>
        <small>Tim investasi kami akan menghubungi Anda dalam 1x24 jam.</small>
    `;
    
    form.appendChild(successDiv);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'fadeIn 0.5s ease reverse';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 5000);
}

// ========== WHATSAPP INTEGRATION ==========
function initWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get selected package for pre-filled message
            const selectedPackage = getSelectedPackage();
            
            // Enhance WhatsApp message with selected package info
            if (selectedPackage && !this.href.includes('text=')) {
                const baseHref = this.href.split('?')[0];
                const packageText = encodeURIComponent(`\n\nSaya tertarik dengan ${selectedPackage.name} (Rp ${selectedPackage.amount} juta)`);
                this.href = baseHref + `?text=Halo,%20saya%20tertarik%20dengan%20investasi%20Warung%20Sambal%20Bakar${packageText}`;
            }
            
            // Track WhatsApp click
            trackEvent('whatsapp_click', {
                package: selectedPackage ? selectedPackage.type : 'none',
                source: 'peluang-investasi'
            });
        });
    });
}

function getSelectedPackage() {
    const selectedCard = document.querySelector('.paket-card.selected');
    if (!selectedCard) return null;
    
    const packageType = selectedCard.classList.contains('bronze') ? 'bronze' :
                       selectedCard.classList.contains('silver') ? 'silver' : 'gold';
    
    const packageName = selectedCard.querySelector('.paket-title').textContent;
    const amount = selectedCard.querySelector('.paket-price .amount').textContent;
    
    return {
        type: packageType,
        name: packageName,
        amount: amount
    };
}

// ========== COUNT UP ANIMATIONS ==========
function initCountUpAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Animate counting
    function animateCountUp(element) {
        const target = parseInt(element.textContent);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
            }
        }, 16);
        
        // Mark as animated
        element.dataset.animated = 'true';
    }
    
    // Check on scroll
    function checkStats() {
        stats.forEach(stat => {
            if (!stat.dataset.animated && isInViewport(stat)) {
                animateCountUp(stat);
            }
        });
    }
    
    // Initial check
    checkStats();
    
    // Check on scroll
    window.addEventListener('scroll', checkStats);
}

// ========== UTILITY FUNCTIONS ==========
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function trackEvent(eventName, eventData) {
    // Google Analytics or custom tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Custom tracking
    console.log(`Event: ${eventName}`, eventData);
}

// ========== ADD STYLES FOR DYNAMIC ELEMENTS ==========
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Ripple animation */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Form error styles */
        .form-error {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 5px;
            animation: fadeIn 0.3s ease;
        }
        
        input.error,
        select.error {
            border-color: #e74c3c !important;
        }
        
        /* Fade in animation */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Package selection */
        .paket-card.selected {
            border-color: var(--secondary-color) !important;
            box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.2) !important;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .paket-card {
                margin-bottom: 20px;
            }
            
            .alur-card {
                margin-bottom: 20px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// ========== EXPORT FOR MODULAR USE ==========
// If using modules, you can export these functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFAQAccordion,
        initSmoothScroll,
        initVideoBackgrounds,
        initPackageSelection,
        initFormValidation
    };
}

// FAQ Toggle - Simple Version
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    console.log('FAQ items found:', faqQuestions.length);
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('FAQ clicked');
            
            // Find the answer
            const faqItem = this.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('.fa-toggle i');
            
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Toggle open class on answer
            answer.classList.toggle('open');
            
            // Change icon
            if (icon) {
                if (this.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            }
            
            // Log for debugging
            console.log('Question active:', this.classList.contains('active'));
            console.log('Answer open:', answer.classList.contains('open'));
        });
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}