document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.creator-stat-number');

    const startCounter = (el) => {
        // Ambil data-count dan paksa jadi Float (Desimal)
        const target = parseFloat(el.getAttribute('data-count'));
        let count = 0;
        
        // Tentukan kecepatan (makin besar pembagi, makin lambat)
        const duration = 2000; // 2 detik
        const increment = target / (duration / 16); // 16ms adalah rata-rata refresh rate browser

        const update = () => {
            count += increment;

            if (count < target) {
                // Jika mengandung class 'rating-number', paksa 1 desimal (4.1, 4.2...)
                if (el.classList.contains('rating-number')) {
                    el.innerText = count.toFixed(1);
                } else {
                    el.innerText = Math.floor(count);
                }
                requestAnimationFrame(update);
            } else {
                // HASIL AKHIR MUTLAK
                if (el.classList.contains('rating-number')) {
                    el.innerText = target.toFixed(1); // Mengunci di 4.8
                } else {
                    el.innerText = target;
                }
            }
        };

        update();
    };

    // Observer agar animasi jalan saat di-scroll (mencegah bug saat refresh di posisi bawah)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Beri sedikit delay 200ms agar transisi CSS tidak bentrok
                setTimeout(() => startCounter(entry.target), 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
});