// ============================================
// WARUNG SAMBAL BAKAR - OPTIMIZED SCRIPT.JS
// ============================================

(function() {
    'use strict';
    
    // ========== GLOBAL VARIABLES ==========
    let currentQuota = 10; // Default quota
    let happyCarouselInterval = null;
    
    // ========== MAIN INITIALIZATION ==========
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Website Warung Sambal Bakar Loaded');
        
        // Initialize semua komponen
        initAllComponents();
        
        // Setup global event listeners
        setupGlobalListeners();
    });
    
    // ========== INIT ALL COMPONENTS ==========
    function initAllComponents() {
        // AOS Animations
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                mirror: false,
                offset: 50
            });
        }
        
        // Swiper Carousels
        initSwiperCarousels();
        
        // Custom Carousels
        initHappySectionCarousel();
        
        // Video Controls
        initVideoControls();
        
        // Countdown Timer
        initCountdownTimer();
        
        // Navbar Scroll Effect
        initNavbarScroll();
        
        // Lazy Loading Images
        initLazyLoading();
        
        // Stats Counter
        initStatsCounter();
        
        // Enhanced Generator
        initEnhancedGenerator();
        
        // Form Validation
        initFormValidation();
    }
    
    // ========== SWIPER CAROUSELS ==========
    function initSwiperCarousels() {
        const swiperConfigs = {
            '.menuSwiper': {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: { delay: 3000 },
                pagination: { clickable: true },
                navigation: true,
                breakpoints: {
                    576: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    992: { slidesPerView: 4 },
                    1200: { slidesPerView: 5 }
                }
            },
            '.testimonialCarousel': {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: { delay: 5000 },
                pagination: { clickable: true },
                navigation: true,
                breakpoints: {
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 }
                }
            },
            '.galleryCarousel': {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: { delay: 4000 },
                pagination: { clickable: true },
                navigation: true,
                breakpoints: {
                    576: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    992: { slidesPerView: 4 }
                }
            },
            '.videoDocCarousel': {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: { delay: 4500 },
                pagination: { clickable: true },
                navigation: true,
                breakpoints: {
                    576: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 }
                }
            },
            '.locationCarousel': {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: { delay: 3500 },
                pagination: { clickable: true },
                navigation: true,
                breakpoints: {
                    576: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 }
                }
            }
        };
        
        // Initialize each Swiper instance
        Object.keys(swiperConfigs).forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                const config = swiperConfigs[selector];
                
                // Map navigation selectors
                if (config.navigation) {
                    config.navigation = {
                        nextEl: selector.replace('.', '.') + '-next',
                        prevEl: selector.replace('.', '.') + '-prev'
                    };
                }
                
                // Map pagination selectors
                if (config.pagination) {
                    const paginationClass = selector.replace('.', '') + '-pagination';
                    config.pagination = {
                        el: '.' + paginationClass,
                        clickable: true
                    };
                }
                
                new Swiper(selector, config);
            }
        });
    }
    
    // ========== HAPPY SECTION CAROUSEL ==========
    function initHappySectionCarousel() {
        const track = document.getElementById('happySlideTrack');
        const dotsContainer = document.getElementById('happyCarouselDots');
        const prevBtn = document.querySelector('.happy-carousel-nav.prev');
        const nextBtn = document.querySelector('.happy-carousel-nav.next');
        
        if (!track || !dotsContainer) return;
        
        const cards = track.querySelectorAll('.happy-card');
        const cardWidth = 260;
        const gap = 20;
        const cardsPerView = Math.floor(track.clientWidth / (cardWidth + gap));
        const totalCards = cards.length;
        
        // Create dots
        dotsContainer.innerHTML = '';
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'happy-dot';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.happy-dot');
        let currentIndex = 0;
        
        function updateCarousel() {
            const translateX = -currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(${translateX}px)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                const isActive = index === currentIndex;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
            
            // Update button states
            prevBtn.style.opacity = currentIndex <= 0 ? '0.5' : '1';
            prevBtn.disabled = currentIndex <= 0;
            nextBtn.style.opacity = currentIndex >= totalCards - cardsPerView ? '0.5' : '1';
            nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
        }
        
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, totalCards - cardsPerView));
            updateCarousel();
        }
        
        function nextSlide() {
            if (currentIndex < totalCards - cardsPerView) {
                currentIndex++;
                updateCarousel();
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
        
        // Event Listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('#happyCarouselDots') || e.target.closest('.happy-carousel-nav')) {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            }
        });
        
        // Touch Swipe
        let startX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
                isDragging = false;
            }
        }, { passive: true });
        
        track.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        // Auto slide
        if (happyCarouselInterval) clearInterval(happyCarouselInterval);
        happyCarouselInterval = setInterval(() => {
            if (currentIndex < totalCards - cardsPerView) {
                nextSlide();
            } else {
                goToSlide(0);
            }
        }, 5000);
        
        // Initialize
        updateCarousel();
        
        // Cleanup on page hide
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(happyCarouselInterval);
            }
        });
    }
    
    // ========== VIDEO CONTROLS ==========
    function initVideoControls() {
        // Testimonial video
        const playPauseBtn = document.getElementById('playPauseBtn');
        const muteBtn = document.getElementById('muteBtn');
        const testimonialVideo = document.querySelector('.video-background');
        
        if (playPauseBtn && testimonialVideo) {
            playPauseBtn.addEventListener('click', () => {
                if (testimonialVideo.paused) {
                    testimonialVideo.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    testimonialVideo.pause();
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }
        
        if (muteBtn && testimonialVideo) {
            muteBtn.addEventListener('click', () => {
                testimonialVideo.muted = !testimonialVideo.muted;
                muteBtn.innerHTML = testimonialVideo.muted 
                    ? '<i class="fas fa-volume-mute"></i>'
                    : '<i class="fas fa-volume-up"></i>';
            });
        }
        
        // Happy section video
        const happyVideo = document.getElementById('happyVideo');
        const videoLoading = document.querySelector('.video-loading');
        
        if (happyVideo && videoLoading) {
            happyVideo.addEventListener('loadeddata', () => {
                videoLoading.style.display = 'none';
            });
            
            happyVideo.addEventListener('error', () => {
                videoLoading.innerHTML = '<span>Video tidak dapat dimuat</span>';
            });
        }
        
        // Video documentation modal
        const videoPlayBtns = document.querySelectorAll('.video-play-btn');
        const videoModal = document.querySelector('.video-modal');
        const modalClose = document.querySelector('.video-modal-close');
        const modalVideo = document.getElementById('modalVideo');
        
        if (videoPlayBtns.length > 0) {
            videoPlayBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const videoCard = this.closest('.video-doc-card');
                    const videoElement = videoCard.querySelector('.video-doc-element');
                    const title = videoCard.querySelector('.video-title').textContent;
                    const desc = videoCard.querySelector('.video-desc').textContent;
                    
                    modalVideo.src = videoElement.querySelector('source').src;
                    modalVideo.setAttribute('data-title', title);
                    modalVideo.setAttribute('data-desc', desc);
                    
                    videoModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
                });
            });
        }
        
        if (modalClose && videoModal) {
            modalClose.addEventListener('click', closeVideoModal);
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) closeVideoModal();
            });
        }
        
        function closeVideoModal() {
            if (modalVideo) modalVideo.pause();
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // ========== COUNTDOWN TIMER ==========
    function initCountdownTimer() {
        const hoursElement = document.getElementById('creator-hours');
        const minutesElement = document.getElementById('creator-minutes');
        const secondsElement = document.getElementById('creator-seconds');
        
        if (!hoursElement || !minutesElement || !secondsElement) return;
        
        let totalSeconds = 24 * 60 * 60; // 24 jam
        
        function updateCountdown() {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            if (totalSeconds > 0) {
                totalSeconds--;
            } else {
                totalSeconds = 24 * 60 * 60; // Reset
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // ========== NAVBAR SCROLL ==========
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 100);
        });
    }
    
    // ========== LAZY LOADING ==========
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '50px 0px' });
            
            lazyImages.forEach(img => observer.observe(img));
        } else {
            // Fallback untuk browser lama
            lazyImages.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        }
    }
    
    // ========== STATS COUNTER ==========
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('[data-count]');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            
            let current = 0;
            
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target.toLocaleString();
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(stat);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }
    
    // ========== ENHANCED GENERATOR ==========
    function initEnhancedGenerator() {
        const inputField = document.getElementById('creatorUsername');
        const generateBtn = document.getElementById('generateBtn');
        const inputGroup = document.querySelector('.username-input') || 
                          document.querySelector('.input-group-generator');
        
        if (!inputField || !generateBtn) return;
        
        // Auto-focus
        setTimeout(() => inputField.focus(), 800);
        
        // Load saved username
        const savedUsername = localStorage.getItem('lastGeneratedUsername');
        if (savedUsername) {
            inputField.value = savedUsername;
            validateInput();
        }
        
        // Event listeners
        inputField.addEventListener('focus', () => {
            if (inputGroup) inputGroup.classList.add('focused');
        });
        
        inputField.addEventListener('blur', () => {
            if (inputGroup) inputGroup.classList.remove('focused');
            autoFormatUsername();
        });
        
        inputField.addEventListener('input', validateInput);
        
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !generateBtn.disabled) {
                e.preventDefault();
                generateCreatorCode();
            }
        });
        
        generateBtn.addEventListener('click', () => {
            if (!generateBtn.disabled) {
                generateCreatorCode();
            }
        });
        
        function validateInput() {
            const value = inputField.value.trim();
            const length = value.length;
            
            let isValid = false;
            
            if (length === 0) {
                // Empty
                updateInputState('empty', 'Masukkan username terlebih dahulu');
            } else if (length > 30) {
                // Too long
                updateInputState('invalid', 'Maksimal 30 karakter');
            } else if (value.includes(' ')) {
                // Contains spaces
                updateInputState('invalid', 'Tidak boleh mengandung spasi');
            } else {
                // Valid
                updateInputState('valid', `Generate kode untuk ${value}`);
                isValid = true;
            }
            
            // Update button state
            generateBtn.disabled = !isValid;
            generateBtn.style.opacity = isValid ? '1' : '0.7';
            generateBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
            
            return isValid;
        }
        
        function updateInputState(state, ariaLabel) {
            if (!inputGroup) return;
            
            inputGroup.classList.remove('valid', 'invalid');
            if (state !== 'empty') {
                inputGroup.classList.add(state);
            }
            generateBtn.setAttribute('aria-label', ariaLabel);
        }
        
        function autoFormatUsername() {
            const value = inputField.value.trim();
            if (value && !value.startsWith('@') && !value.includes(' ')) {
                inputField.value = '@' + value;
            }
        }
    }
    
    // ========== GENERATE CREATOR CODE ==========
    function generateCreatorCode() {
        const usernameInput = document.getElementById('creatorUsername');
        const codeResult = document.getElementById('codeResult');
        const codeValue = document.getElementById('generatedCodeValue');
        const codeUsername = document.getElementById('codeUsername');
        const codeExpiry = document.getElementById('codeExpiry');
        const generateBtn = document.getElementById('generateBtn');
        
        if (!usernameInput || !codeResult) {
            showToast('Error: Element tidak ditemukan!', 'error');
            return;
        }
        
        const username = usernameInput.value.trim();
        
        // Validation
        if (!username || username === '@namamu_tiktok') {
            usernameInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => usernameInput.style.animation = '', 500);
            
            usernameInput.focus();
            usernameInput.select();
            
            showToast('Masukkan username yang valid!', 'warning');
            return;
        }
        
        // Disable button and show loading
        generateBtn.disabled = true;
        generateBtn.classList.add('loading');
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Generating...';
        
        // Simulate processing
        setTimeout(() => {
            // Generate promo code
            const timestamp = Date.now().toString().slice(-4);
            const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
            const promoCode = `WSB${randomCode}${timestamp}`;
            
            // Update DOM
            if (codeValue) codeValue.textContent = promoCode;
            if (codeUsername) codeUsername.textContent = username;
            
            // Set expiry 48 hours
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 48);
            const formattedDate = expiryDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            if (codeExpiry) codeExpiry.textContent = formattedDate;
            
            // Show result with animation
            codeResult.style.display = 'block';
            codeResult.style.opacity = '0';
            codeResult.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                codeResult.style.transition = 'all 0.5s ease';
                codeResult.style.opacity = '1';
                codeResult.style.transform = 'translateY(0)';
            }, 50);
            
            // Scroll to result
            codeResult.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Decrease quota
            decreaseQuota();
            
            // Save to localStorage
            localStorage.setItem('lastGeneratedCode', promoCode);
            localStorage.setItem('lastGeneratedUsername', username);
            localStorage.setItem('lastGeneratedTime', new Date().toISOString());
            
            // Reset button
            generateBtn.disabled = false;
            generateBtn.classList.remove('loading');
            generateBtn.innerHTML = originalText;
            
            // Show success toast
            showToast('🎉 Promo code berhasil digenerate!', 'success');
            
        }, 800); // Simulated delay
    }
    
    // ========== COPY CODE FUNCTION ==========
    window.copyCreatorCode = function() {
        const codeValue = document.getElementById('generatedCodeValue');
        if (!codeValue) return;
        
        const code = codeValue.textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            const copyBtn = document.querySelector('.btn-copy-code');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="bi bi-check2 me-2"></i> Copied!';
                copyBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            }
            showToast('Kode berhasil disalin!', 'success');
        }).catch(err => {
            console.error('Failed to copy:', err);
            showToast('Gagal menyalin kode', 'error');
        });
    };
    
    // ========== DECREASE QUOTA ==========
    function decreaseQuota() {
        const quotaElement = document.getElementById('remaining-quota');
        if (!quotaElement) return;
        
        let currentQuota = parseInt(quotaElement.textContent) || 10;
        if (currentQuota > 0) {
            currentQuota--;
            quotaElement.textContent = currentQuota;
            
            // Visual warning if low quota
            if (currentQuota <= 5) {
                quotaElement.style.color = '#FF6B6B';
                quotaElement.style.fontWeight = '900';
            }
            
            localStorage.setItem('dailyQuota', currentQuota);
        }
    }
    
    // ========== FORM VALIDATION ==========
    function initFormValidation() {
        const forms = document.querySelectorAll('form[novalidate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!this.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Find invalid fields
                    const invalidFields = this.querySelectorAll(':invalid');
                    invalidFields.forEach(field => {
                        field.style.borderColor = '#F44336';
                        
                        // Add error message
                        let errorMsg = field.nextElementSibling;
                        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                            errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message text-danger small mt-1';
                            errorMsg.textContent = field.validationMessage || 'Field ini wajib diisi';
                            field.parentNode.appendChild(errorMsg);
                        }
                    });
                    
                    // Scroll to first invalid field
                    if (invalidFields.length > 0) {
                        invalidFields[0].scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                    
                    showToast('Harap isi semua field yang wajib diisi!', 'warning');
                }
                
                this.classList.add('was-validated');
            });
            
            // Clear validation on input
            form.querySelectorAll('input, textarea').forEach(field => {
                field.addEventListener('input', function() {
                    this.style.borderColor = '';
                    
                    const errorMsg = this.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                });
            });
        });
    }
    
    // ========== TOAST NOTIFICATION ==========
    function showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        const icons = {
            success: 'bi-check-circle',
            warning: 'bi-exclamation-triangle',
            error: 'bi-x-circle',
            info: 'bi-info-circle'
        };
        
        toast.innerHTML = `
            <div class="toast-content">
                <i class="bi ${icons[type] || icons.info}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" aria-label="Close">
                <i class="bi bi-x"></i>
            </button>
        `;
        
        document.body.appendChild(toast);
        
        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => dismissToast(toast));
        
        // Auto dismiss
        const autoDismiss = setTimeout(() => dismissToast(toast), 3000);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 10);
        
        function dismissToast(toastElement) {
            clearTimeout(autoDismiss);
            toastElement.classList.remove('show');
            setTimeout(() => {
                if (toastElement.parentNode) {
                    toastElement.parentNode.removeChild(toastElement);
                }
            }, 300);
        }
    }
    
    // ========== SCROLL TO GALLERY ==========
    window.scrollToCreatorGallery = function() {
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            gallerySection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // ========== SETUP GLOBAL LISTENERS ==========
    function setupGlobalListeners() {
        // Music player accessibility
        const musicBtn = document.getElementById('musicPlayerBtn');
        if (musicBtn) {
            musicBtn.addEventListener('keydown', (e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    musicBtn.click();
                }
            });
        }
        
        // Page loading optimization
        window.addEventListener('load', function() {
            // Hide preloader
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
            
            document.body.classList.add('loaded');
        });
        
        // Error handling
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
            // Send to analytics if needed
        });
        
        // Service Worker registration
        if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js').then(
                    registration => {
                        console.log('ServiceWorker registered:', registration.scope);
                    },
                    err => {
                        console.log('ServiceWorker registration failed:', err);
                    }
                );
            });
        }
    }
    
    // ========== RESPONSIVE UTILITIES ==========
    function handleResize() {
        // Reinitialize carousels on resize
        if (window.innerWidth < 768) {
            // Mobile-specific adjustments
        }
    }
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
})(); // End IIFE

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav.navbar');
    if (window.scrollY > 30) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Perfect hover effect dengan delay
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function(e) {
        this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    link.addEventListener('mouseleave', function(e) {
        this.style.transition = 'all 0.3s ease';
    });
});

// Fix dropdown position
document.querySelectorAll('.dropdown-toggle').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            e.preventDefault();
            const menu = this.nextElementSibling;
            menu.classList.toggle('show');
        }
    });
});


// Simple Swiper Initialization
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper not loaded');
        return;
    }
    
    const swiper = new Swiper('.locationCarousel', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 500,
        navigation: {
            nextEl: '.location-next',
            prevEl: '.location-prev',
        },
        pagination: {
            el: '.location-pagination',
            clickable: true,
        },
        breakpoints: {
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        }
    });
    
    console.log('Location carousel initialized');
});

// FIX NAVBAR DROPDOWN MOBILE
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Initializing mobile navbar dropdown fix...");
    
    // ========== 1. NAVBAR TOGGLE ==========
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    
    if (navbarToggler && navbarCollapse) {
        console.log("✅ Navbar elements found");
        
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("🎯 Navbar toggler clicked");
            
            // Toggle collapse
            navbarCollapse.classList.toggle('show');
            
            // Update aria-expanded
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Close all dropdowns when closing navbar
            if (!navbarCollapse.classList.contains('show')) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });
    }
    
    // ========== 2. DROPDOWN "MORE" TOGGLE ==========
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    if (dropdownToggle) {
        console.log("✅ Dropdown toggle found:", dropdownToggle);
        
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("🎯 Dropdown 'More' clicked");
            
            const dropdownMenu = this.nextElementSibling;
            
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                // Toggle current dropdown
                dropdownMenu.classList.toggle('show');
                
                // Update aria-expanded
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                
                console.log("📂 Dropdown toggled, show:", dropdownMenu.classList.contains('show'));
            }
        });
    }
    
    // ========== 3. CLOSE DROPDOWN WHEN CLICKING OUTSIDE ==========
    document.addEventListener('click', function(e) {
        // Close navbar if clicking outside
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
                if (navbarToggler) {
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        }
        
        // Close dropdown if clicking outside
        const dropdownMenus = document.querySelectorAll('.dropdown-menu.show');
        dropdownMenus.forEach(menu => {
            const toggle = menu.previousElementSibling;
            if (!menu.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
                menu.classList.remove('show');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // ========== 4. CLOSE DROPDOWN WHEN CLICKING INSIDE (optional) ==========
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            // Close parent dropdown
            const dropdownMenu = this.closest('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.classList.remove('show');
            }
            
            // Close dropdown toggle aria
            const dropdownToggle = dropdownMenu ? dropdownMenu.previousElementSibling : null;
            if (dropdownToggle) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
            
            // On mobile, also close navbar after clicking
            if (window.innerWidth < 992) {
                if (navbarCollapse) {
                    navbarCollapse.classList.remove('show');
                }
                if (navbarToggler) {
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // ========== 5. KEYBOARD NAVIGATION ==========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
            
            // Close navbar on mobile
            if (window.innerWidth < 992 && navbarCollapse) {
                navbarCollapse.classList.remove('show');
                if (navbarToggler) {
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
    
    console.log("✅ Mobile navbar dropdown fix initialized");
});


