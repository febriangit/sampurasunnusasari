/**
 * PROMO.JS - VERSI FINAL DENGAN LINK PREVIEW GAMBAR (FIXED)
 * Warung Sambal Bakar Sampurasun
 */

// ========== KONFIGURASI BASE URL ==========
// GANTI INI DENGAN DOMAIN ASLI WEBSITE KAMU!
const BASE_URL = window.location.origin;  // Otomatis ambil domain sekarang
// Contoh: https://warungsambalbakar.com atau http://localhost:3000

// ========== DATA CABANG ==========
const BRANCH_DATA = {
    'Sumedang': {
        name: '🏬 Cabang Sumedang',
        phone: '6282115673887',
        display: '+62 821-1567-3887',
        address: 'Jl. Raya Sumedang No. 123'
    },
    'Subang': {
        name: '🏬 Cabang Subang',
        phone: '6282115673887',
        display: '+62 821-1567-3887',
        address: 'Jl. Subang Raya No. 45'
    },
    'Pasteur': {
        name: '🏬 Cabang Pasteur',
        phone: '6282115673887',
        display: '+62 821-1567-3887',
        address: 'Jl. Pasteur No. 67, Bandung'
    },
    'Lembang': {
        name: '🏬 Cabang Lembang',
        phone: '6282115673887',
        display: '+62 821-1567-3887',
        address: 'Jl. Raya Lembang No. 89'
    },
    'Soreang': {
        name: '🏬 Cabang Soreang',
        phone: '6282115673887',
        display: '+62 821-1567-3887',
        address: 'Jl. Soreang No. 12'
    },
    'Soreang 2': {
        name: '🏬 Cabang Soreang 2',
        phone: '6282115673887',
        display: '+62 821-1567-3887',
        address: 'Jl. Soreang Raya No. 34'
    }
};

// ========== DATA PROMO LENGKAP DENGAN GAMBAR ==========
function getPromoDetails(promoId, promoGambar) {
    const promos = {
        '1': {
            name: '🎁 PAKET BAHAGIA',
            original: 'Rp 180.000',
            discount: 'Rp 59.000',
            periode: '19 - 21 Desember 2025',
            kuota: 'Sisa 12 paket',
            deskripsi: 'Nasi + Ayam Bakar + Sambal + Es Teh',
            gambar: 'promo%202.jpeg'  // URL encode spasi jadi %20
        },
        '2': {
            name: '🥤 ES CENDOL DOUBLE',
            original: 'Rp 30.000',
            discount: 'Rp 15.000',
            periode: '1 - 31 Januari 2026',
            kuota: 'Sisa 45 cup',
            deskripsi: '2x lebih banyak topping! Cendol + Gula Aren Asli',
            gambar: 'promo%202.jpeg'
        },
        '3': {
            name: '🏖️ WEEKEND SPECIAL 40%',
            original: '',
            discount: 'DISKON 40%',
            periode: 'Setiap Sabtu-Minggu',
            kuota: 'Min. Rp 100.000',
            deskripsi: 'Potongan 40% untuk semua menu!',
            gambar: 'promo%202.jpeg'
        },
        '4': {
            name: '🌅 SARAPAN HEMAT 50%',
            original: '',
            discount: 'DISKON 50%',
            periode: '07.00 - 10.00 WIB',
            kuota: 'Setiap hari',
            deskripsi: 'Sarapan hemat dengan diskon 50%',
            gambar: 'promo%202.jpeg'
        },
        '5': {
            name: '📚 STUDENT DISCOUNT 35%',
            original: '',
            discount: 'DISKON 35%',
            periode: 'Selama Januari 2026',
            kuota: 'Min. Rp 50.000',
            deskripsi: 'Khusus pelajar/mahasiswa (tunjukkan KTP/KTM)',
            gambar: 'promo%202.jpeg'
        },
        '6': {
            name: '💸 CASHBACK 25%',
            original: '',
            discount: 'CASHBACK 25%',
            periode: '20 - 25 Des 2025',
            kuota: 'Min. Rp 150.000',
            deskripsi: 'Dapatkan cashback 25% untuk pembelian minimal Rp 150.000',
            gambar: 'promo%202.jpeg'
        }
    };
    
    const promo = promos[promoId] || { 
        name: 'Promo Spesial', 
        deskripsi: '',
        gambar: 'promo%202.jpeg'
    };
    
    // PRIORITAS: 
    // 1. Pakai promoGambar dari data-gambar kalau ada
    // 2. Kalau tidak ada, bangun dari BASE_URL
    if (promoGambar) {
        // Cek apakah sudah URL lengkap
        if (promoGambar.startsWith('http')) {
            promo.imageUrl = promoGambar;
        } else {
            // Kalau cuma path, tambah BASE_URL
            promo.imageUrl = `${BASE_URL}/${promoGambar.replace(/^\//, '')}`;
        }
    } else {
        // Bangun URL dari BASE_URL + path gambar default
        promo.imageUrl = `${BASE_URL}/asset/${promo.gambar}`;
    }
    
    return promo;
}

// ========== INISIALISASI ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 PROMO JS - VERSI DENGAN LINK PREVIEW');
    console.log('🌐 BASE_URL:', BASE_URL);
    initPromoButtons();
    initModal();
});

// ========== TOMBOL PROMO ==========
function initPromoButtons() {
    const buttons = document.querySelectorAll('.promo-btn-ambil');
    console.log(`📢 Menemukan ${buttons.length} tombol promo`);
    
    buttons.forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });
    
    document.querySelectorAll('.promo-btn-ambil').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const promoId = this.dataset.promoId;
            const promoNama = this.dataset.promoNama;
            const promoGambar = this.dataset.promoGambar;
            
            try {
                const cabangArray = JSON.parse(this.dataset.cabang);
                
                // Ambil info dari card
                const card = this.closest('.promo-card');
                const hargaCoret = card?.querySelector('.harga-coret')?.textContent || '';
                const hargaDiskon = card?.querySelector('.harga-diskon')?.textContent || '';
                const periode = card?.querySelector('.promo-periode span')?.textContent || '';
                const kuota = card?.querySelector('.promo-kuota')?.textContent?.trim() || '';
                
                // Dapatkan detail promo termasuk gambar
                const promoDetail = getPromoDetails(promoId, promoGambar);
                
                // Simpan semua data
                sessionStorage.setItem('active_promo', JSON.stringify({
                    id: promoId,
                    name: promoNama,
                    gambar: promoDetail.imageUrl,
                    original: hargaCoret,
                    discount: hargaDiskon,
                    periode: periode,
                    kuota: kuota,
                    deskripsi: promoDetail.deskripsi
                }));
                
                showModal(cabangArray, promoNama);
                
            } catch (error) {
                console.error('❌ Error:', error);
                alert('Terjadi kesalahan. Silakan refresh halaman.');
            }
        });
    });
}

// ========== MODAL ==========
function showModal(cabangArray, promoNama) {
    const modal = document.getElementById('whatsappModal');
    const backdrop = document.getElementById('modalBackdrop');
    const container = document.getElementById('modalCabangList');
    
    if (!modal || !backdrop || !container) return;
    
    const header = modal.querySelector('.whatsapp-modal-header h5');
    if (header) {
        header.innerHTML = `<i class="fab fa-whatsapp me-2"></i> Pilih Cabang - ${promoNama}`;
    }
    
    let html = '';
    cabangArray.forEach(cabang => {
        const branch = BRANCH_DATA[cabang];
        if (branch) {
            html += `
                <div class="whatsapp-branch-item" style="cursor:pointer; margin:10px 0; padding:15px; background:rgba(255,255,255,0.1); border-radius:10px; border:1px solid #D2691E; transition:all 0.3s;"
                     onclick="sendWhatsApp('${cabang}', '${branch.phone}', '${promoNama}')"
                     onmouseover="this.style.background='rgba(37,211,102,0.2)'; this.style.borderColor='#25D366';"
                     onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.borderColor='#D2691E';">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <div style="font-weight:bold; color:#FFB74D;">${branch.name}</div>
                            <div style="color:#25D366;"><i class="fab fa-whatsapp"></i> ${branch.display}</div>
                            <div style="color:rgba(255,255,255,0.6); font-size:0.9rem;">${branch.address}</div>
                        </div>
                        <div style="color:#FFB74D;">➡️</div>
                    </div>
                </div>
            `;
        }
    });
    
    container.innerHTML = html;
    
    modal.style.display = 'flex';
    backdrop.style.display = 'block';
    
    setTimeout(() => {
        modal.classList.add('modal-active');
        backdrop.classList.add('backdrop-active');
    }, 10);
}

// ========== KIRIM WHATSAPP DENGAN LINK PREVIEW ==========
window.sendWhatsApp = function(cabang, phone, promoNama) {
    console.log('📤 Mengirim ke:', cabang);
    
    const promo = JSON.parse(sessionStorage.getItem('active_promo') || '{}');
    
    // Format tanggal
    const now = new Date();
    const tanggal = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const jam = now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    // ========== FORMAT PESAN DENGAN LINK PREVIEW ==========
    let message = `🌟 *HALO KAK, ADA PROMO MENARIK!* 🌟\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🎁 *${promo.name || promoNama}*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // LINK PREVIEW GAMBAR - PASTI JADI URL LENGKAP!
    if (promo.gambar) {
        message += `📸 *LIHAT GAMBAR PROMONYA DI SINI:*\n`;
        message += `${promo.gambar}\n\n`;  // <-- INI SUDAH URL LENGKAP!
        console.log('🖼️ Gambar URL:', promo.gambar); // Cek di console
    }
    
    if (promo.deskripsi) {
        message += `📝 *Deskripsi:*\n${promo.deskripsi}\n\n`;
    }
    
    message += `💰 *Harga Spesial:*\n`;
    if (promo.original && !promo.original.includes('DISKON') && !promo.original.includes('CASHBACK')) {
        message += `~~${promo.original}~~  →  *${promo.discount}*\n`;
    } else {
        message += `✨ *${promo.discount}*\n`;
    }
    
    message += `\n📅 *Periode:* ${promo.periode || 'Sekarang'}\n`;
    message += `📍 *Cabang:* ${cabang}\n`;
    message += `⏰ *Waktu Order:* ${tanggal} ${jam} WIB\n\n`;
    
    if (promo.kuota) {
        message += `📊 *Ketersediaan:* ${promo.kuota}\n\n`;
    }
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `✅ *CARA REDEEM:*\n`;
    message += `1️⃣ Tunjukkan pesan ini ke staff\n`;
    message += `2️⃣ Sebutkan ingin ambil promo ${promo.name || promoNama}\n`;
    message += `3️⃣ Happy eating! 🍽️\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `_Pesan ini dikirim otomatis dari_\n`;
    message += `_Website Promo Warung Sambal Bakar Sampurasun_ 🙏`;
    
    // Encode untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // URL WhatsApp
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
    
    console.log('🔗 URL siap dikirim');
    
    // Buka di tab baru
    window.open(url, '_blank');
    
    // Tutup modal
    closeModal();
};

// ========== TUTUP MODAL ==========
window.closeModal = function() {
    const modal = document.getElementById('whatsappModal');
    const backdrop = document.getElementById('modalBackdrop');
    
    if (modal && backdrop) {
        modal.classList.remove('modal-active');
        backdrop.classList.remove('backdrop-active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            backdrop.style.display = 'none';
        }, 300);
    }
};

// ========== INIT MODAL ==========
function initModal() {
    const closeBtn = document.getElementById('closeWhatsappModal');
    const backdrop = document.getElementById('modalBackdrop');
    
    if (closeBtn) closeBtn.onclick = closeModal;
    if (backdrop) backdrop.onclick = closeModal;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// ========== TEST FUNCTION ==========
window.testWA = function() {
    const url = 'https://api.whatsapp.com/send?phone=6282115673887&text=Test%20dari%20web';
    window.open(url, '_blank');
};

// ========== TEST LINK GAMBAR ==========
window.testImageUrl = function() {
    const promo = JSON.parse(sessionStorage.getItem('active_promo') || '{}');
    console.log('🖼️ Test Gambar URL:', promo.gambar);
    if (promo.gambar) {
        window.open(promo.gambar, '_blank');
    } else {
        console.log('❌ Tidak ada gambar di session');
    }
};

console.log('✅ READY! testWA() untuk coba kirim WA');
console.log('✅ testImageUrl() untuk test link gambar');

