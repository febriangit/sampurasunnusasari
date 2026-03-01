// ===== VENUE CAROUSEL - ULTRA SIMPLE WORKING VERSION =====
// TEMPATKAN DI AKHIR FILE JS ATAU SEBELUM </body>

// Tunggu halaman sepenuhnya load
window.addEventListener('load', function() {
    console.log('=== VENUE CAROUSEL LOADING ===');
    
    // Ambil elemen dengan cara yang pasti
    const carouselSlides = document.getElementById('carouselSlides');
    const prevBtn = document.getElementById('venuePrev');
    const nextBtn = document.getElementById('venueNext');
    const dotBtns = document.querySelectorAll('.carousel-dot');
    
    // Validasi
    if (!carouselSlides) {
        console.error('ERROR: carouselSlides not found');
        return;
    }
    
    // Hitung slide
    const slides = carouselSlides.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    console.log(`Found ${totalSlides} slides`);
    console.log(`Prev button: ${prevBtn ? 'YES' : 'NO'}`);
    console.log(`Next button: ${nextBtn ? 'YES' : 'NO'}`);
    console.log(`Dots: ${dotBtns.length}`);
    
    if (totalSlides === 0) return;
    
    // State
    let currentSlide = 0;
    
    // Fungsi utama
    function moveCarousel() {
        console.log(`Moving to slide ${currentSlide + 1} of ${totalSlides}`);
        
        // Pindahkan carousel
        carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dotBtns.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // ===== CARA PALING SEDERHANA: Langsung attach onclick =====
    
    // Tombol PREV - cara paling sederhana
    if (prevBtn) {
        prevBtn.onclick = function() {
            console.log('PREV button clicked');
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            moveCarousel();
            return false; // Prevent default
        };
        
        // Backup: tambahkan juga event listener
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    }
    
    // Tombol NEXT - cara paling sederhana
    if (nextBtn) {
        nextBtn.onclick = function() {
            console.log('NEXT button clicked');
            currentSlide = (currentSlide + 1) % totalSlides;
            moveCarousel();
            return false; // Prevent default
        };
        
        // Backup: tambahkan juga event listener
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    }
    
    // Dots - cara paling sederhana
    dotBtns.forEach(dot => {
        dot.onclick = function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            console.log(`DOT ${slideIndex} clicked`);
            currentSlide = slideIndex;
            moveCarousel();
            return false; // Prevent default
        };
    });
    
    // Inisialisasi
    moveCarousel();
    
    console.log('✅ Venue Carousel READY!');
    console.log('💡 Test: Click the buttons or type in console:');
    console.log('   - window.venueMoveTo(1) for slide 2');
    console.log('   - window.venueNext() for next slide');
    
    // Ekspos untuk testing
    window.venueMoveTo = function(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            moveCarousel();
        }
    };
    
    window.venueNext = function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        moveCarousel();
    };
    
    window.venuePrev = function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        moveCarousel();
    };
}); 


// JavaScript untuk Event Portfolio Section
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== IMAGE MODAL HANDLER ==========
    function setupImageModal() {
        const imageModal = document.getElementById('imageModal');
        
        if (imageModal) {
            // Event listener untuk modal show
            imageModal.addEventListener('show.bs.modal', function(event) {
                const button = event.relatedTarget;
                
                if (button) {
                    const title = button.getAttribute('data-title') || '';
                    const description = button.getAttribute('data-description') || '';
                    const date = button.getAttribute('data-date') || '';
                    const guests = button.getAttribute('data-guests') || '';
                    const image = button.getAttribute('data-image') || '';
                    
                    // Update modal content
                    const titleElement = document.getElementById('imageModalTitle');
                    const descElement = document.getElementById('modalDescription');
                    const dateElement = document.getElementById('modalDate');
                    const guestsElement = document.getElementById('modalGuests');
                    const imgElement = document.getElementById('modalImage');
                    
                    if (titleElement) titleElement.textContent = title;
                    if (descElement) descElement.textContent = description;
                    if (dateElement) dateElement.textContent = date;
                    if (guestsElement) guestsElement.textContent = guests ? guests + ' orang' : '';
                    if (imgElement) {
                        imgElement.src = image;
                        imgElement.alt = title;
                    }
                }
            });
            
            // Reset modal ketika ditutup
            imageModal.addEventListener('hidden.bs.modal', function() {
                const imgElement = document.getElementById('modalImage');
                if (imgElement) {
                    imgElement.src = '';
                }
            });
        }
    }
    
    // ========== VIDEO MODAL HANDLER ==========
    function setupVideoModal() {
        const videoModal = document.getElementById('videoModal');
        
        if (videoModal) {
            videoModal.addEventListener('show.bs.modal', function(event) {
                const button = event.relatedTarget;
                
                if (button) {
                    const videoSrc = button.getAttribute('data-video') || '';
                    const videoElement = document.getElementById('modalVideo');
                    
                    if (videoElement && videoSrc) {
                        videoElement.src = videoSrc;
                        videoElement.load();
                    }
                }
            });
            
            videoModal.addEventListener('hidden.bs.modal', function() {
                const videoElement = document.getElementById('modalVideo');
                if (videoElement) {
                    videoElement.pause();
                    videoElement.src = '';
                }
            });
        }
    }
    
    // ========== MANUAL CLICK HANDLER UNTUK CARDS ==========
    function setupCardClickHandlers() {
        // Untuk image cards
        document.querySelectorAll('.image-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Cegah event bubbling jika ada element lain yang diklik dalam card
                if (e.target.closest('.image-card') === this) {
                    addRippleEffect(e, this);
                }
            });
        });
        
        // Untuk video cards
        document.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Cegah event bubbling jika ada element lain yang diklik dalam card
                if (e.target.closest('.video-card') === this) {
                    addRippleEffect(e, this);
                }
            });
        });
    }
    
    // ========== RIPPLE EFFECT FUNCTION ==========
    function addRippleEffect(event, element) {
        // Cek jika sudah ada ripple animation yang sedang berjalan
        if (element.querySelector('.ripple-effect')) return;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(210, 105, 30, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Pastikan element punya position relative
        if (window.getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
        }
        
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode === element) {
                ripple.remove();
            }
        }, 600);
    }
    
    // ========== ADD RIPPLE ANIMATION CSS ==========
    function addRippleCSS() {
        // Cek jika style sudah ada
        if (document.getElementById('ripple-animation-style')) return;
        
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .ripple-effect {
                animation: ripple-animation 0.6s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========== INITIALIZE EVERYTHING ==========
    function initializePortfolioSection() {
        console.log('Initializing Portfolio Section...');
        
        // Setup modals
        setupImageModal();
        setupVideoModal();
        
        // Setup card click handlers
        setupCardClickHandlers();
        
        // Add ripple animation CSS
        addRippleCSS();
        
        // Initialize Bootstrap carousels jika perlu
        initializeCarousels();
    }
    
    // ========== CAROUSEL INITIALIZATION ==========
    function initializeCarousels() {
        // Bootstrap 5 carousels sudah auto-initialize
        // Kita hanya perlu pastikan mereka bekerja dengan baik
        const carousels = document.querySelectorAll('.carousel');
        
        carousels.forEach(carousel => {
            // Pastikan carousel punya properti yang diperlukan
            if (!carousel.hasAttribute('data-bs-ride')) {
                carousel.setAttribute('data-bs-ride', 'false');
            }
        });
    }
    
    // ========== TAB CHANGE HANDLER ==========
    function setupTabHandlers() {
        const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');
        
        tabButtons.forEach(button => {
            button.addEventListener('shown.bs.tab', function(event) {
                // Re-initialize carousel untuk tab yang aktif
                const activeTabId = event.target.getAttribute('data-bs-target');
                const activeTab = document.querySelector(activeTabId);
                
                if (activeTab) {
                    const carousel = activeTab.querySelector('.carousel');
                    if (carousel) {
                        // Bootstrap akan handle carousel initialization
                        // Kita hanya trigger resize untuk memastikan layout benar
                        setTimeout(() => {
                            window.dispatchEvent(new Event('resize'));
                        }, 100);
                    }
                }
            });
        });
    }
    
    // ========== DEBOUNCE FUNCTION FOR RESIZE ==========
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
    
    // ========== RESIZE HANDLER ==========
    function handleResize() {
        // Pastikan carousel indicators tetap di posisi yang benar
        const indicators = document.querySelectorAll('.carousel-indicators');
        indicators.forEach(indicator => {
            if (indicator.classList.contains('position-relative')) {
                // Indicators sudah position relative, tidak perlu adjustment
            }
        });
    }
    
    // ========== MAIN INITIALIZATION ==========
    // Initialize portfolio section
    initializePortfolioSection();
    
    // Setup tab handlers
    setupTabHandlers();
    
    // Setup resize handler dengan debounce
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Initial resize check
    setTimeout(handleResize, 500);
    
    // Debug logging
    console.log('Portfolio Section JavaScript loaded successfully');
    
    // Export fungsi jika diperlukan
    window.portfolioSection = {
        refresh: function() {
            initializePortfolioSection();
        },
        showTab: function(tabId) {
            const tab = document.querySelector(tabId);
            if (tab) {
                const tabButton = document.querySelector(`[data-bs-target="${tabId}"]`);
                if (tabButton) {
                    const tabInstance = new bootstrap.Tab(tabButton);
                    tabInstance.show();
                }
            }
        }
    };
});

// Fallback untuk Bootstrap modal events jika Bootstrap belum load
if (typeof bootstrap === 'undefined') {
    console.warn('Bootstrap not loaded, using fallback for modals');
    
    // Fallback untuk modal image
    document.addEventListener('click', function(e) {
        const imageCard = e.target.closest('.image-card');
        if (imageCard) {
            e.preventDefault();
            
            // Ambil data dari card
            const title = imageCard.getAttribute('data-title');
            const description = imageCard.getAttribute('data-description');
            const date = imageCard.getAttribute('data-date');
            const guests = imageCard.getAttribute('data-guests');
            const image = imageCard.getAttribute('data-image');
            
            // Tampilkan alert sebagai fallback
            alert(`Event: ${title}\n\n${description}\n\nTanggal: ${date}\nJumlah Tamu: ${guests}`);
        }
        
        const videoCard = e.target.closest('.video-card');
        if (videoCard) {
            e.preventDefault();
            const videoSrc = videoCard.getAttribute('data-video');
            if (videoSrc) {
                window.open(videoSrc, '_blank');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper only on mobile devices
    if (window.innerWidth < 992) {
        new Swiper('.whyChooseCarousel', {
            slidesPerView: 1,
            spaceBetween: 15,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            // REMOVE navigation arrows
            navigation: false,
            // Enable touch/swipe
            touchRatio: 1,
            grabCursor: true,
        });
    }
});