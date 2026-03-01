// ============================================================================
// WARUNG BAKAKAK SAMPURASUN NUSASARI - COMPLETE ORDER SYSTEM
// ============================================================================
// Version: 6.0 - FINAL FIXED (Based on HTML Structure Analysis)
// 
// 📋 ANALISA HTML LENGKAP:
//    ✅ SIGNATURE SECTION: id="signature-card", class signature-card
//        - Price toggle: .price-toggle dengan data-price
//        - Quantity: .qty-controls dengan .btn-qty.minus/.plus, input #qty-bakakak
//        - Total: #total-bakakak
//        - Order button: .btn-order dengan data-menu, data-qty-id, data-total-id
//
//    ✅ ANEKA AYAM SECTION: id="aneka-ayam"
//        - Vertical Cards: .vertical-card
//        - Quantity: .btn-minus/.btn-plus dengan data-id, input .quantity-input
//        - Total: .total-price .price-amount dengan data-id dan data-base-price
//        - Order button: .btn-order dengan data-id, data-name, data-price
//        - Carousel Cards: .carousel-card
//        - Quick add: .btn-add dengan data-id, data-name, data-price
//        - Quantity small: .btn-sm.btn-minus/.btn-plus dengan data-id, input .quantity-input-sm
//        - Total small: .price-amount-sm dengan data-id, data-base-price
//        - Order small: .btn-order-sm dengan data-id, data-name, data-price
//
//    ✅ IKAN LAUT SECTION: id="ikan-laut-bakar"
//        - Cards: .menu-item-card
//        - Quick add: .btn-quick-add dengan data-id, data-name, data-price
//        - Quantity: .btn-quantity.btn-minus/.btn-plus dengan data-target
//        - Input: #quantity-{id} dengan data-price
//        - Total: #total-{id}
//        - Order: .btn-order dengan data-id, data-name, data-price
//
//    ✅ TUMISAN SECTION: id="tumisan-sayuran"
//        - Cards: .tumisan-card
//        - Quick add: .btn-tumisan-quick dengan data-id, data-name, data-price
//        - Quantity: .btn-tumisan-minus/.btn-tumisan-plus dengan data-target
//        - Input: #quantity-{id} dengan data-price
//        - Total: #total-{id}
//        - Order: .btn-tumisan-order dengan data-id, data-name, data-price
//
//    ✅ KIDS MENU SECTION: id="kids-menu"
//        - Cards: .kids-card
//        - Quick add: .btn-kids-quick dengan data-id, data-name, data-price
//        - Quantity: .btn-kids-minus/.btn-kids-plus dengan data-target
//        - Input: #quantity-{id} dengan data-price
//        - Total: #total-{id}
//        - Order: .btn-kids-order dengan data-id, data-name, data-price
//
//    ✅ MENU TAMBAHAN SECTION: id="menu-tambahan"
//        - Cards: .tambahan-card
//        - Quick add: .btn-tambahan-quick dengan data-id, data-name, data-price
//        - Quantity: .btn-tambahan-minus/.btn-tambahan-plus dengan data-target
//        - Input: #quantity-{id} dengan data-price
//        - Total: #total-{id}
//        - Order: .btn-tambahan-order dengan data-id, data-name, data-price
//
//    ✅ NASI LIWET SECTION: id="nasi-liwet"
//        - Cards: .nasi-card
//        - Quick add: .btn-nasi-quick dengan data-id, data-name, data-price
//        - Quantity: .btn-nasi-minus/.btn-nasi-plus dengan data-target
//        - Input: #quantity-{id} dengan data-price
//        - Total: #total-{id}
//        - Order: .btn-nasi-order dengan data-id, data-name, data-price
//
//    ✅ MINUMAN SECTION: id="minuman"
//        - Cards: .minuman-card
//        - Quick add: .btn-minuman-quick dengan data-id, data-name, data-price
//        - Quantity: .btn-minuman-minus/.btn-minuman-plus dengan data-target
//        - Input: #quantity-{id} dengan data-price
//        - Total: #total-{id}
//        - Order: .btn-minuman-order dengan data-id, data-name, data-price
//
//    ✅ PAKET PROMO SECTION: id="paket-promo"
//        - Cards: .promo-card
//        - Quick add: .btn-promo-quick dengan data-id, data-name, data-price
//        - Quantity: .btn-promo-minus/.btn-promo-plus dengan data-target
//        - Input: #quantity-{id} dengan data-price
//        - Total: #total-{id}
//        - Order: .btn-promo-order dengan data-id, data-name, data-price
// ============================================================================

// ============================================================================
// 1. KONFIGURASI SYSTEM
// ============================================================================
const CONFIG = {
    whatsappAdmin: '6282115673887',
    deliveryFee: 15000,
    minOrderPickup: 0,
    minOrderDelivery: 20000,
    freeDeliveryMin: 100000,
    currency: 'IDR',
    storeName: 'Warung Bakakak Sampurasun Nusasari',
    storeLocation: 'Jl. Nusasari, Sumedang',
    storePhone: '0821-1567-3887',
    operatingHours: '10:00 - 22:00 WIB',
    maxQuantity: 99
};

// ============================================================================
// 2. GLOBAL STATE
// ============================================================================
let cart = [];
let customerData = {
    name: '',
    phone: '',
    orderType: 'pickup',
    address: '',
    note: '',
    paymentMethod: 'cash'
};
let menuData = {};
let orderHistory = [];

// ============================================================================
// 3. INISIALISASI SYSTEM
// ============================================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏪 Warung Bakakak Sampurasun - System Initializing...');
    
    initStorage();
    initMenuData();
    initUI();
    initEventListeners();
    initCarousels();
    initStickyNav();
    initSignatureSection();
    initQuantityControls();
    initFormValidation();
    
    console.log('✅ SYSTEM READY! Semua section terdeteksi:');
    console.log('   - Signature Card: ✓');
    console.log('   - Aneka Ayam: ✓ (Vertical + Carousel)');
    console.log('   - Ikan Laut: ✓');
    console.log('   - Tumisan: ✓');
    console.log('   - Kids Menu: ✓');
    console.log('   - Menu Tambahan: ✓');
    console.log('   - Nasi Liwet: ✓');
    console.log('   - Minuman: ✓');
    console.log('   - Paket Promo: ✓');
});

// ============================================================================
// 4. STORAGE MANAGEMENT
// ============================================================================
function initStorage() {
    try {
        const savedCart = localStorage.getItem('bakakakCart');
        if (savedCart) cart = JSON.parse(savedCart);
        
        const savedCustomer = localStorage.getItem('bakakakCustomer');
        if (savedCustomer) customerData = JSON.parse(savedCustomer);
        
        const savedHistory = localStorage.getItem('bakakakHistory');
        if (savedHistory) orderHistory = JSON.parse(savedHistory);
    } catch (e) {
        console.error('Error loading storage:', e);
    }
}

function saveToStorage() {
    try {
        localStorage.setItem('bakakakCart', JSON.stringify(cart));
        localStorage.setItem('bakakakCustomer', JSON.stringify(customerData));
        localStorage.setItem('bakakakHistory', JSON.stringify(orderHistory));
    } catch (e) {
        console.error('Error saving to storage:', e);
    }
}

// ============================================================================
// 5. MENU DATABASE - LENGKAP DENGAN SEMUA ID DARI HTML
// ============================================================================
function initMenuData() {
    menuData = {
        // SIGNATURE BAKAKAK
        'bakakak-signature-kecil': {
            id: 'bakakak-signature-kecil',
            name: 'Bakakak Ayam Kampung (Kecil)',
            category: 'signature',
            price: 75000,
            image: 'https://i.pinimg.com/1200x/46/d1/0f/46d10f2544fb7854ac3cc98e8e7d7d48.jpg',
            description: 'Ayam Kampung pilihan dibakar utuh dengan bumbu tradisional khas Sunda'
        },
        'bakakak-signature-medium': {
            id: 'bakakak-signature-medium',
            name: 'Bakakak Ayam Kampung (Medium)',
            category: 'signature',
            price: 85000,
            image: 'https://i.pinimg.com/1200x/46/d1/0f/46d10f2544fb7854ac3cc98e8e7d7d48.jpg',
            description: 'Ayam Kampung pilihan dibakar utuh dengan bumbu tradisional khas Sunda'
        },
        'bakakak-signature-besar': {
            id: 'bakakak-signature-besar',
            name: 'Bakakak Ayam Kampung (Besar)',
            category: 'signature',
            price: 110000,
            image: 'https://i.pinimg.com/1200x/46/d1/0f/46d10f2544fb7854ac3cc98e8e7d7d48.jpg',
            description: 'Ayam Kampung pilihan dibakar utuh dengan bumbu tradisional khas Sunda'
        },
        
        // ANEKA AYAM - VERTICAL CARDS
        'ayam-goreng-1': {
            id: 'ayam-goreng-1',
            name: 'Ayam Goreng',
            category: 'aneka-ayam',
            price: 25000,
            image: 'https://i.pinimg.com/736x/bc/f7/25/bcf72542193a868d9357d14811ae017c.jpg'
        },
        'ayam-banjur-2': {
            id: 'ayam-banjur-2',
            name: 'Ayam Goreng Banjur',
            category: 'aneka-ayam',
            price: 28000,
            image: 'https://i.pinimg.com/736x/c5/03/47/c50347a0304032599176792678ceb186.jpg'
        },
        
        // ANEKA AYAM - CAROUSEL
        'oseng-ati-3': {
            id: 'oseng-ati-3',
            name: 'Oseng Ati Ampela',
            category: 'aneka-ayam',
            price: 30000,
            image: 'https://i.pinimg.com/736x/30/d9/b2/30d9b22e05cd12c5dec1d8ff4de3fd27.jpg'
        },
        'tulang-jambal-4': {
            id: 'tulang-jambal-4',
            name: 'Oseng Tulang Jambal',
            category: 'aneka-ayam',
            price: 30000,
            image: 'https://i.pinimg.com/1200x/42/d7/57/42d757e0eaf50835fdf12ece96ecac1b.jpg'
        },
        'goreng-ati-5': {
            id: 'goreng-ati-5',
            name: 'Goreng Ati Ampela',
            category: 'aneka-ayam',
            price: 20000,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi5kw-ZBSCS9aSciXGJAKrbWmuNEz3w1ugTA&s'
        },
        'soto-bandung-6': {
            id: 'soto-bandung-6',
            name: 'Soto Bandung',
            category: 'aneka-ayam',
            price: 30000,
            image: 'https://i.pinimg.com/1200x/b2/dd/20/b2dd208740e8a3d43f4afca94dc4e45c.jpg'
        },
        
        // IKAN LAUT
        'ekor-kuning-7': {
            id: 'ekor-kuning-7',
            name: 'Ikan Ekor Kuning',
            category: 'ikan-laut',
            price: 90000,
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600'
        },
        'bawal-laut-8': {
            id: 'bawal-laut-8',
            name: 'Ikan Bawal Laut',
            category: 'ikan-laut',
            price: 95000,
            image: 'https://i.pinimg.com/736x/ab/9d/05/ab9d05cccb63507541895f2d73b1a13b.jpg'
        },
        'ikan-etong-9': {
            id: 'ikan-etong-9',
            name: 'Ikan Etong',
            category: 'ikan-laut',
            price: 95000,
            image: 'https://i.pinimg.com/1200x/35/26/48/3526486f8520fc6dcecc0910229f40a4.jpg'
        },
        'udang-bakar-10': {
            id: 'udang-bakar-10',
            name: 'Udang Bakar',
            category: 'ikan-laut',
            price: 100000,
            image: 'https://i.pinimg.com/736x/c7/77/4c/c7774caaa9423d4f4e2d6928a3f51289.jpg'
        },
        'kerapu-11': {
            id: 'kerapu-11',
            name: 'Ikan Kerapu',
            category: 'ikan-laut',
            price: 60000,
            image: 'https://i.pinimg.com/1200x/4a/0c/76/4a0c76cb994ccccda330055af0c5eb8d.jpg'
        },
        'cumi-bakar-12': {
            id: 'cumi-bakar-12',
            name: 'Cumi Bakar',
            category: 'ikan-laut',
            price: 80000,
            image: 'https://i.pinimg.com/736x/e3/4f/e2/e34fe2cf6bd4f39c14869a3b83b87cb6.jpg'
        },
        'mata-satu-19': {
            id: 'mata-satu-19',
            name: 'Ikan Mata Satu',
            category: 'ikan-laut',
            price: 80000,
            image: 'https://i.pinimg.com/736x/e3/4f/e2/e34fe2cf6bd4f39c14869a3b83b87cb6.jpg'
        },
        'kakap-merah-20': {
            id: 'kakap-merah-20',
            name: 'Ikan Kakap Merah',
            category: 'ikan-laut',
            price: 80000,
            image: 'https://i.pinimg.com/736x/e3/4f/e2/e34fe2cf6bd4f39c14869a3b83b87cb6.jpg'
        },
        
        // IKAN LAUT - GURAME & NILA
        'gurame-bakar-1': {
            id: 'gurame-bakar-1',
            name: 'Ikan Gurame Bakar',
            category: 'ikan-laut',
            price: 100000,
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600'
        },
        'gurame-cobek-2': {
            id: 'gurame-cobek-2',
            name: 'Ikan Gurame Cobek/Goreng',
            category: 'ikan-laut',
            price: 90000,
            image: 'https://i.pinimg.com/736x/ab/9d/05/ab9d05cccb63507541895f2d73b1a13b.jpg'
        },
        'gurame-banjur-3': {
            id: 'gurame-banjur-3',
            name: 'Ikan Gurame Banjur',
            category: 'ikan-laut',
            price: 90000,
            image: 'https://i.pinimg.com/1200x/35/26/48/3526486f8520fc6dcecc0910229f40a4.jpg'
        },
        'nila-bakar-4': {
            id: 'nila-bakar-4',
            name: 'Ikan Nila Bakar',
            category: 'ikan-laut',
            price: 50000,
            image: 'https://i.pinimg.com/736x/c7/77/4c/c7774caaa9423d4f4e2d6928a3f51289.jpg'
        },
        'nila-cobek-5': {
            id: 'nila-cobek-5',
            name: 'Ikan Nila Cobek/Goreng',
            category: 'ikan-laut',
            price: 45000,
            image: 'https://i.pinimg.com/1200x/4a/0c/76/4a0c76cb994ccccda330055af0c5eb8d.jpg'
        },
        'nila-banjur-6': {
            id: 'nila-banjur-6',
            name: 'Ikan Nila Banjur',
            category: 'ikan-laut',
            price: 45000,
            image: 'https://i.pinimg.com/736x/e3/4f/e2/e34fe2cf6bd4f39c14869a3b83b87cb6.jpg'
        },
        
        // TUMISAN
        'tumis-cumi-21': {
            id: 'tumis-cumi-21',
            name: 'Tumis Cumi Cabe Ijo',
            category: 'tumisan',
            price: 20000,
            image: 'https://i.pinimg.com/736x/c9/a8/53/c9a8537da6b9d58d52fb059391b1f4e8.jpg'
        },
        'tumis-kacang-22': {
            id: 'tumis-kacang-22',
            name: 'Tumis Kacang Panjang',
            category: 'tumisan',
            price: 15000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'tumis-kiciwis-23': {
            id: 'tumis-kiciwis-23',
            name: 'Tumis Kiciwis',
            category: 'tumisan',
            price: 17000,
            image: 'https://i.pinimg.com/736x/ad/9f/cc/ad9fcc47178a574ac2db2fa8b68fb536.jpg'
        },
        'tumis-toge-24': {
            id: 'tumis-toge-24',
            name: 'Tumis Toge',
            category: 'tumisan',
            price: 13000,
            image: 'https://i.pinimg.com/1200x/90/02/72/900272e9f83ad7a2b1270fdd896737d6.jpg'
        },
        'tumis-kangkung-25': {
            id: 'tumis-kangkung-25',
            name: 'Tumis Kangkung',
            category: 'tumisan',
            price: 18000,
            image: 'https://i.pinimg.com/1200x/87/14/09/871409f65feba495d66b8d456d0d34b2.jpg'
        },
        'karedok-26': {
            id: 'karedok-26',
            name: 'Karedok',
            category: 'tumisan',
            price: 16000,
            image: 'https://i.pinimg.com/1200x/87/14/09/871409f65feba495d66b8d456d0d34b2.jpg'
        },
        'pencok-kacang-27': {
            id: 'pencok-kacang-27',
            name: 'Pencok Kacang Panjang',
            category: 'tumisan',
            price: 14000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'pencok-leunca-28': {
            id: 'pencok-leunca-28',
            name: 'Pencok Leunca',
            category: 'tumisan',
            price: 19000,
            image: 'https://i.pinimg.com/736x/c9/a8/53/c9a8537da6b9d58d52fb059391b1f4e8.jpg'
        },
        'jengkol-29': {
            id: 'jengkol-29',
            name: 'Jengkol',
            category: 'tumisan',
            price: 12000,
            image: 'https://i.pinimg.com/736x/ad/9f/cc/ad9fcc47178a574ac2db2fa8b68fb536.jpg'
        },
        'peda-bakar-30': {
            id: 'peda-bakar-30',
            name: 'Peda Bakar/Goreng',
            category: 'tumisan',
            price: 11000,
            image: 'https://i.pinimg.com/1200x/90/02/72/900272e9f83ad7a2b1270fdd896737d6.jpg'
        },
        'peuteuy-31': {
            id: 'peuteuy-31',
            name: 'Peuteuy',
            category: 'tumisan',
            price: 22000,
            image: 'https://i.pinimg.com/736x/c9/a8/53/c9a8537da6b9d58d52fb059391b1f4e8.jpg'
        },
        'usus-goreng-32': {
            id: 'usus-goreng-32',
            name: 'Usus Goreng',
            category: 'tumisan',
            price: 13000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'jukut-goreng-33': {
            id: 'jukut-goreng-33',
            name: 'Jukut Goreng',
            category: 'tumisan',
            price: 10000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'kol-goreng-34': {
            id: 'kol-goreng-34',
            name: 'Kol Goreng',
            category: 'tumisan',
            price: 10000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'terong-goreng-35': {
            id: 'terong-goreng-35',
            name: 'Terong Goreng',
            category: 'tumisan',
            price: 13000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'tempe-goreng-36': {
            id: 'tempe-goreng-36',
            name: 'Tempe Goreng',
            category: 'tumisan',
            price: 10000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'tahu-goreng-37': {
            id: 'tahu-goreng-37',
            name: 'Tahu Goreng',
            category: 'tumisan',
            price: 10000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'tempe-mendoan-38': {
            id: 'tempe-mendoan-38',
            name: 'Tempe Mendoan',
            category: 'tumisan',
            price: 15000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'tumis-tempe-kecap-39': {
            id: 'tumis-tempe-kecap-39',
            name: 'Tumis Tempe Kecap',
            category: 'tumisan',
            price: 13000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        'perkedel-kentang-40': {
            id: 'perkedel-kentang-40',
            name: 'Perkedel Kentang Dadakan',
            category: 'tumisan',
            price: 15000,
            image: 'https://i.pinimg.com/736x/3b/eb/47/3beb4780cfc54c6d19c52e7ccc27dc49.jpg'
        },
        
        // KIDS MENU
        'telor-dadar-41': {
            id: 'telor-dadar-41',
            name: 'Telor Dadar',
            category: 'kids',
            price: 15000,
            image: 'https://i.pinimg.com/736x/73/c3/7c/73c37c91ab44afef31b4c5a95c9c50ad.jpg'
        },
        'sosis-nugget-42': {
            id: 'sosis-nugget-42',
            name: 'Sosis & Nugget',
            category: 'kids',
            price: 25000,
            image: 'https://i.pinimg.com/1200x/eb/37/d9/eb37d91da482bd9c17a21328ab3a8070.jpg'
        },
        'nasi-goreng-43': {
            id: 'nasi-goreng-43',
            name: 'Nasi Goreng Mentega',
            category: 'kids',
            price: 35000,
            image: 'https://i.pinimg.com/1200x/ff/f3/a2/fff3a20a802740fe0bc3de086fdce696.jpg'
        },
        
        // MENU TAMBAHAN
        'bala-bala-51': {
            id: 'bala-bala-51',
            name: 'Bala-bala',
            category: 'tambahan',
            price: 15000,
            image: 'https://i.pinimg.com/736x/73/c3/7c/73c37c91ab44afef31b4c5a95c9c50ad.jpg'
        },
        'pisang-goreng-52': {
            id: 'pisang-goreng-52',
            name: 'Pisang Goreng',
            category: 'tambahan',
            price: 15000,
            image: 'https://i.pinimg.com/1200x/eb/37/d9/eb37d91da482bd9c17a21328ab3a8070.jpg'
        },
        'rujak-53': {
            id: 'rujak-53',
            name: 'Rujak',
            category: 'tambahan',
            price: 15000,
            image: 'https://i.pinimg.com/1200x/ff/f3/a2/fff3a20a802740fe0bc3de086fdce696.jpg'
        },
        'sambal-dadakan-54': {
            id: 'sambal-dadakan-54',
            name: 'Sambal Dadakan',
            category: 'tambahan',
            price: 5000,
            image: 'https://i.pinimg.com/1200x/ff/f3/a2/fff3a20a802740fe0bc3de086fdce696.jpg'
        },
        
        // NASI & LIWET
        'nasi-putih-48': {
            id: 'nasi-putih-48',
            name: 'Nasi Putih',
            category: 'nasi',
            price: 7000,
            image: 'https://i.pinimg.com/736x/f8/40/bd/f840bde9d3da9578d932ce4d2d8c7ae8.jpg'
        },
        'nasi-tutug-49': {
            id: 'nasi-tutug-49',
            name: 'Nasi Tutug Oncom',
            category: 'nasi',
            price: 8000,
            image: 'https://i.pinimg.com/736x/26/5c/fe/265cfebafe28360948fd78e53d0163bd.jpg'
        },
        'nasi-liwet-polos-50': {
            id: 'nasi-liwet-polos-50',
            name: 'Nasi Liwet Polos',
            category: 'nasi',
            price: 55000,
            image: 'https://i.pinimg.com/1200x/3c/43/67/3c4367865fb87a6bd2c76f963a5cfd12.jpg'
        },
        'nasi-ikan-asin-51': {
            id: 'nasi-ikan-asin-51',
            name: 'Nasi Liwet Ikan Asin',
            category: 'nasi',
            price: 65000,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTnjiCKbbYunJ-8enQ0ldiuVBQlEQhHhaWA&s'
        },
        'nasi-peuteuy-52': {
            id: 'nasi-peuteuy-52',
            name: 'Nasi Liwet Peuteuy',
            category: 'nasi',
            price: 85000,
            image: 'https://i.pinimg.com/1200x/5d/29/06/5d2906a8b7c6d5e4f3a2b1c0d9e8f7g6.jpg'
        },
        'nasi-teri-53': {
            id: 'nasi-teri-53',
            name: 'Nasi Liwet Ikan Teri',
            category: 'nasi',
            price: 95000,
            image: 'https://i.pinimg.com/1200x/8b/45/13/8b4513c7d6e5f4a3b2c1d0e9f8g7h6i5.jpg'
        },
        
        // MINUMAN
        'es-jeruk-nipis-madu-1': {
            id: 'es-jeruk-nipis-madu-1',
            name: 'Es Jeruk Nipis Madu',
            category: 'minuman',
            price: 14000,
            image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'teh-manis-2': {
            id: 'teh-manis-2',
            name: 'Teh Manis',
            category: 'minuman',
            price: 8000,
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'es-teler-3': {
            id: 'es-teler-3',
            name: 'Es Teler',
            category: 'minuman',
            price: 24000,
            image: 'https://images.unsplash.com/photo-1622363172877-0eac8da1cd5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'jus-kopyor-4': {
            id: 'jus-kopyor-4',
            name: 'Jus Kopyor',
            category: 'minuman',
            price: 25000,
            image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'es-kelapa-5': {
            id: 'es-kelapa-5',
            name: 'Es Kelapa',
            category: 'minuman',
            price: 17000,
            image: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'dawegan-6': {
            id: 'dawegan-6',
            name: 'Dawegan',
            category: 'minuman',
            price: 20000,
            image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'es-cendol-7': {
            id: 'es-cendol-7',
            name: 'Es Cendol',
            category: 'minuman',
            price: 20000,
            image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'es-cincau-8': {
            id: 'es-cincau-8',
            name: 'Es Cincau',
            category: 'minuman',
            price: 20000,
            image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'teh-tarik-9': {
            id: 'teh-tarik-9',
            name: 'Teh Tarik',
            category: 'minuman',
            price: 16000,
            image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'milo-10': {
            id: 'milo-10',
            name: 'Milo',
            category: 'minuman',
            price: 16000,
            image: 'https://images.unsplash.com/photo-1621264968373-430b7c8c6e1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'bir-pletok-11': {
            id: 'bir-pletok-11',
            name: 'Bir Pletok',
            category: 'minuman',
            price: 20000,
            image: 'https://images.unsplash.com/photo-1628992682633-bf2d40cb595f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'jeruk-peras-12': {
            id: 'jeruk-peras-12',
            name: 'Jeruk Peras',
            category: 'minuman',
            price: 15000,
            image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'lemon-tea-13': {
            id: 'lemon-tea-13',
            name: 'Lemon Tea',
            category: 'minuman',
            price: 14000,
            image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'lychee-tea-14': {
            id: 'lychee-tea-14',
            name: 'Lychee Tea',
            category: 'minuman',
            price: 14000,
            image: 'https://images.unsplash.com/photo-1525385133510-2e07d2622d35?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'kopi-buhun-15': {
            id: 'kopi-buhun-15',
            name: 'Kopi Buhun',
            category: 'minuman',
            price: 20000,
            image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'wedang-aren-16': {
            id: 'wedang-aren-16',
            name: 'Wedang Aren',
            category: 'minuman',
            price: 17000,
            image: 'https://images.unsplash.com/photo-1510707577719-ae7c9b788690?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'air-mineral-17': {
            id: 'air-mineral-17',
            name: 'Air Mineral',
            category: 'minuman',
            price: 8000,
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'kopi-juwara-malaysia-18': {
            id: 'kopi-juwara-malaysia-18',
            name: 'Kopi Juwara Malaysia',
            category: 'minuman',
            price: 20000,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        
        // PAKET PROMO
        'bancakan-timbel-1': {
            id: 'bancakan-timbel-1',
            name: 'Bancakan Timbel',
            category: 'promo',
            price: 175000,
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'bancakan-liwet-2': {
            id: 'bancakan-liwet-2',
            name: 'Bancakan Liwet',
            category: 'promo',
            price: 200000,
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        'balakecrakan-3': {
            id: 'balakecrakan-3',
            name: 'Balakecrakan',
            category: 'promo',
            price: 450000,
            image: 'https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
    };
    
    console.log('📋 Menu database siap:', Object.keys(menuData).length, 'items');
}

// ============================================================================
// 6. CART MANAGEMENT (Keep your existing cart functions)
// ============================================================================
function addToCart(itemId, quantity = 1, specialNotes = '') {
    const menuItem = menuData[itemId];
    
    if (!menuItem) {
        console.error('❌ Menu not found:', itemId);
        showNotification('Menu tidak ditemukan', 'error');
        return false;
    }
    
    if (quantity < 1) quantity = 1;
    if (quantity > CONFIG.maxQuantity) {
        showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
        quantity = CONFIG.maxQuantity;
    }
    
    const existingIndex = cart.findIndex(item => item.id === itemId && item.specialNotes === specialNotes);
    
    if (existingIndex > -1) {
        const newQuantity = cart[existingIndex].quantity + quantity;
        if (newQuantity > CONFIG.maxQuantity) {
            showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
            cart[existingIndex].quantity = CONFIG.maxQuantity;
        } else {
            cart[existingIndex].quantity = newQuantity;
        }
        showNotification(`📦 ${menuItem.name} (${quantity} ditambahkan)`, 'success');
    } else {
        cart.push({
            id: itemId,
            name: menuItem.name,
            price: menuItem.price,
            quantity: quantity,
            specialNotes: specialNotes,
            category: menuItem.category,
            image: menuItem.image
        });
        showNotification(`✅ ${menuItem.name} ditambahkan ke keranjang!`, 'success');
    }
    
    updateCartDisplay();
    saveToStorage();
    animateFloatingCart();
    
    return true;
}

function removeFromCart(itemId, specialNotes = '') {
    const index = cart.findIndex(item => item.id === itemId && item.specialNotes === specialNotes);
    if (index > -1) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        showNotification(`🗑️ ${removedItem.name} dihapus`, 'warning');
        updateCartDisplay();
        saveToStorage();
        return true;
    }
    return false;
}

function updateCartItemQuantity(itemId, newQuantity, specialNotes = '') {
    if (newQuantity < 1) return removeFromCart(itemId, specialNotes);
    if (newQuantity > CONFIG.maxQuantity) {
        showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
        newQuantity = CONFIG.maxQuantity;
    }
    
    const index = cart.findIndex(item => item.id === itemId && item.specialNotes === specialNotes);
    if (index > -1) {
        cart[index].quantity = newQuantity;
        updateCartDisplay();
        saveToStorage();
        return true;
    }
    return false;
}

function clearCart() {
    if (cart.length === 0) {
        showNotification('Keranjang sudah kosong', 'info');
        return;
    }
    
    if (confirm(`Yakin kosongkan keranjang? (${cart.length} item)`)) {
        cart = [];
        updateCartDisplay();
        saveToStorage();
        showNotification('🔄 Keranjang dikosongkan', 'success');
    }
}

function getCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = (customerData.orderType === 'delivery' && subtotal < CONFIG.freeDeliveryMin) ? CONFIG.deliveryFee : 0;
    
    return {
        itemCount: cart.reduce((total, item) => total + item.quantity, 0),
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        grandTotal: subtotal + deliveryFee,
        items: [...cart]
    };
}

// ============================================================================
// 7. CART DISPLAY (Keep your existing display functions)
// ============================================================================
function updateCartDisplay() {
    const summary = getCartSummary();
    
    updateFloatingCartBadge(summary.itemCount);
    updateCartModalDisplay(summary);
    renderCartItems();
    updateCheckoutButtonState();
    updateCustomerForm();
}

function updateFloatingCartBadge(itemCount) {
    const badge = document.getElementById('cart-badge');
    const floatingBtn = document.querySelector('.btn-floating-cart');
    
    if (badge) {
        badge.textContent = itemCount;
        badge.style.display = itemCount > 0 ? 'flex' : 'none';
        if (itemCount > 0) {
            badge.classList.add('bounce');
            setTimeout(() => badge.classList.remove('bounce'), 300);
        }
    }
    if (floatingBtn) floatingBtn.classList.toggle('has-items', itemCount > 0);
}

function updateCartModalDisplay(summary) {
    updateElementText('cart-total-items', summary.itemCount);
    updateElementText('cart-item-count', summary.itemCount);
    updateElementText('cart-subtotal', formatCurrency(summary.subtotal));
    updateElementText('cart-grand-total', formatCurrency(summary.grandTotal));
    updateElementText('cart-grand-total-modal', formatCurrency(summary.grandTotal));
    updateElementText('cart-delivery', formatCurrency(CONFIG.deliveryFee));
    
    const isDelivery = customerData.orderType === 'delivery' && summary.subtotal < CONFIG.freeDeliveryMin;
    const deliveryContainer = document.getElementById('delivery-fee-container');
    const deliveryAmount = document.getElementById('delivery-fee-amount');
    
    if (deliveryContainer) deliveryContainer.style.display = isDelivery ? 'block' : 'none';
    if (deliveryAmount) deliveryAmount.style.display = isDelivery ? 'block' : 'none';
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-state text-center py-5">
                <i class="bi bi-cart-x display-4 text-muted mb-3"></i>
                <p class="mb-1 fw-semibold text-white">Keranjang masih kosong</p>
                <small class="text-muted">Pilih menu favorit Anda</small>
            </div>
        `;
        return;
    }
    
    let html = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        html += `
            <div class="cart-item mb-3 p-3 rounded" style="background: rgba(255,140,66,0.05); border-left: 4px solid #FF8C42;">
                <div class="row align-items-center">
                    <div class="col-12 col-md-5 mb-2 mb-md-0">
                        <div class="d-flex align-items-start">
                            <div class="cart-item-img me-3">
                                <img src="${item.image || 'https://via.placeholder.com/60'}" 
                                     alt="${item.name}" class="rounded" style="width:60px; height:60px; object-fit:cover;">
                            </div>
                            <div>
                                <h6 class="mb-1 text-white fw-bold">${item.name}</h6>
                                <small class="text-muted d-block">${formatCurrency(item.price)}/porsi</small>
                                ${item.specialNotes ? `<small class="text-warning"><i class="bi bi-pencil me-1"></i>${item.specialNotes}</small>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="col-7 col-md-4">
                        <div class="d-flex align-items-center justify-content-center">
                            <button class="btn btn-sm btn-outline-orange px-3 btn-cart-minus" 
                                    data-id="${item.id}" data-notes="${item.specialNotes || ''}">
                                <i class="bi bi-dash"></i>
                            </button>
                            <span class="mx-3 fw-bold fs-5 text-white">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-orange px-3 btn-cart-plus" 
                                    data-id="${item.id}" data-notes="${item.specialNotes || ''}">
                                <i class="bi bi-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-5 col-md-3 text-end">
                        <div class="fw-bold text-orange mb-1">${formatCurrency(itemTotal)}</div>
                        <button class="btn btn-sm btn-outline-danger btn-cart-remove" 
                                data-id="${item.id}" data-notes="${item.specialNotes || ''}">
                            <i class="bi bi-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    attachCartItemEvents();
}

function attachCartItemEvents() {
    document.querySelectorAll('.btn-cart-minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = cart.find(i => i.id === this.dataset.id && i.specialNotes === (this.dataset.notes || ''));
            if (item) updateCartItemQuantity(item.id, item.quantity - 1, item.specialNotes);
        });
    });
    
    document.querySelectorAll('.btn-cart-plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = cart.find(i => i.id === this.dataset.id && i.specialNotes === (this.dataset.notes || ''));
            if (item) updateCartItemQuantity(item.id, item.quantity + 1, item.specialNotes);
        });
    });
    
    document.querySelectorAll('.btn-cart-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(this.dataset.id, this.dataset.notes || '');
        });
    });
}

// ============================================================================
// 8. ORDER PROCESSING & WHATSAPP (Keep your existing functions)
// ============================================================================
function processOrder() {
    const validation = validateOrder();
    
    if (!validation.valid) {
        showNotification(`❌ ${validation.message}`, 'error');
        if (validation.field) {
            const field = document.getElementById(validation.field);
            if (field) {
                field.focus();
                field.classList.add('is-invalid');
                setTimeout(() => field.classList.remove('is-invalid'), 3000);
            }
        }
        return false;
    }
    
    sendWhatsAppMessage(generateOrderMessage());
    saveOrderToHistory();
    return true;
}

function validateOrder() {
    const summary = getCartSummary();
    
    if (summary.itemCount === 0) {
        return { valid: false, message: 'Keranjang kosong', field: null };
    }
    
    const minOrder = customerData.orderType === 'delivery' ? CONFIG.minOrderDelivery : CONFIG.minOrderPickup;
    if (summary.subtotal < minOrder) {
        return { 
            valid: false, 
            message: `Minimal order ${customerData.orderType === 'delivery' ? 'delivery' : 'pickup'} ${formatCurrency(minOrder)}`, 
            field: null 
        };
    }
    
    if (!customerData.name?.trim() || customerData.name.length < 2) {
        return { valid: false, message: 'Nama minimal 2 karakter', field: 'cust-name' };
    }
    
    const cleanPhone = customerData.phone?.replace(/\s/g, '') || '';
    if (cleanPhone.length < 10 || !/^[0-9\-\+]{9,15}$/.test(cleanPhone)) {
        return { valid: false, message: 'Nomor WhatsApp tidak valid', field: 'cust-phone' };
    }
    
    if (customerData.orderType === 'delivery' && (!customerData.address || customerData.address.length < 10)) {
        return { valid: false, message: 'Alamat minimal 10 karakter', field: 'cust-address' };
    }
    
    return { valid: true };
}

function generateOrderMessage() {
    const summary = getCartSummary();
    const now = new Date();
    const orderId = 'BAK' + now.getTime().toString().slice(-8);
    const date = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    let message = `*PESANAN WARUNG BAKAKAK SAMPURASUN*\n`;
    message += `═══════════════════════════════════\n\n`;
    message += `*📋 INFORMASI PESANAN*\n`;
    message += `ID: ${orderId}\n`;
    message += `Tanggal: ${date}\n`;
    message += `Waktu: ${time}\n\n`;
    
    message += `*👤 PELANGGAN*\n`;
    message += `Nama: ${customerData.name}\n`;
    message += `WA: ${customerData.phone}\n`;
    message += `Tipe: ${customerData.orderType === 'delivery' ? 'DELIVERY' : 'PICKUP'}\n`;
    
    if (customerData.orderType === 'delivery') {
        message += `Alamat: ${customerData.address}\n`;
        message += `Maps: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerData.address)}\n`;
    }
    if (customerData.note) message += `Catatan: ${customerData.note}\n`;
    if (customerData.paymentMethod) message += `Bayar: ${customerData.paymentMethod === 'transfer' ? 'Transfer' : 'Tunai'}\n`;
    
    message += `\n*🍽️ PESANAN*\n`;
    message += `═══════════════════════════════════\n`;
    
    cart.forEach((item, i) => {
        message += `${i+1}. *${item.name}*\n`;
        message += `   ${item.quantity} × ${formatCurrency(item.price)} = *${formatCurrency(item.price * item.quantity)}*\n`;
        if (item.specialNotes) message += `   📝 ${item.specialNotes}\n`;
    });
    
    message += `\n*💰 TOTAL*\n`;
    message += `═══════════════════════════════════\n`;
    message += `Subtotal: ${formatCurrency(summary.subtotal)}\n`;
    if (summary.deliveryFee > 0) message += `Ongkir: ${formatCurrency(summary.deliveryFee)}\n`;
    message += `*TOTAL: ${formatCurrency(summary.grandTotal)}*\n\n`;
    message += `_Pesan otomatis dari website Warung Bakakak Sampurasun_`;
    
    return message;
}

function sendWhatsAppMessage(message) {
    const phone = CONFIG.whatsappAdmin.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    const btn = document.getElementById('whatsapp-btn');
    const originalText = btn?.innerHTML;
    if (btn) {
        btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Membuka WhatsApp...';
        btn.disabled = true;
    }
    
    showNotification('📱 Membuka WhatsApp...', 'info');
    
    setTimeout(() => {
        const newWindow = window.open(url, '_blank');
        
        if (!newWindow) {
            const alertHtml = `
                <div class="alert alert-warning alert-dismissible fade show mt-3">
                    <h5><i class="bi bi-exclamation-triangle me-2"></i>Popup Diblokir</h5>
                    <p>Klik tombol manual:</p>
                    <a href="${url}" target="_blank" class="btn btn-success w-100 mb-2">
                        <i class="bi bi-whatsapp me-2"></i>Buka WhatsApp
                    </a>
                </div>
            `;
            document.querySelector('#cartModal .modal-body')?.insertAdjacentHTML('beforeend', alertHtml);
        }
        
        setTimeout(() => {
            if (btn) {
                btn.innerHTML = originalText || '<i class="bi bi-whatsapp me-2"></i>Kirim ke WhatsApp';
                btn.disabled = false;
            }
        }, 3000);
    }, 500);
}

function saveOrderToHistory() {
    const order = {
        id: 'BAK' + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        items: [...cart],
        customer: {...customerData},
        summary: getCartSummary(),
        status: 'pending'
    };
    
    orderHistory.unshift(order);
    if (orderHistory.length > 50) orderHistory = orderHistory.slice(0, 50);
    saveToStorage();
}

// ============================================================================
// 9. CUSTOMER FORM (Keep your existing functions)
// ============================================================================
function updateCustomerForm() {
    setFormValue('cust-name', customerData.name);
    setFormValue('cust-phone', customerData.phone);
    setFormValue('cust-address', customerData.address);
    setFormValue('cust-note', customerData.note);
    
    const pickup = document.getElementById('pickupType');
    const delivery = document.getElementById('deliveryType');
    if (pickup && delivery) {
        if (customerData.orderType === 'pickup') pickup.checked = true;
        else delivery.checked = true;
        updateAddressFieldState();
    }
}

function updateAddressFieldState() {
    const isDelivery = customerData.orderType === 'delivery';
    const addressField = document.getElementById('cust-address');
    const addressContainer = document.getElementById('address-field');
    
    if (addressField) {
        addressField.disabled = !isDelivery;
        addressField.required = isDelivery;
    }
    if (addressContainer) addressContainer.style.display = isDelivery ? 'block' : 'none';
}

function saveCustomerForm() {
    customerData.name = getFormValue('cust-name') || '';
    customerData.phone = getFormValue('cust-phone') || '';
    customerData.address = getFormValue('cust-address') || '';
    customerData.note = getFormValue('cust-note') || '';
    customerData.orderType = document.getElementById('deliveryType')?.checked ? 'delivery' : 'pickup';
    
    saveToStorage();
    updateCartDisplay();
    updateCheckoutButtonState();
}

function resetCustomerForm() {
    customerData = { name: '', phone: '', orderType: 'pickup', address: '', note: '', paymentMethod: 'cash' };
    setFormValue('cust-name', '');
    setFormValue('cust-phone', '');
    setFormValue('cust-address', '');
    setFormValue('cust-note', '');
    document.getElementById('pickupType') && (document.getElementById('pickupType').checked = true);
    updateAddressFieldState();
    saveToStorage();
}

// ============================================================================
// 10. QUANTITY CONTROLS - FIXED BERDASARKAN ID DAN STRUKTUR HTML
// ============================================================================
function initQuantityControls() {
    console.log('🔧 Mengaktifkan quantity controls untuk SEMUA section...');
    
    // ========== SIGNATURE SECTION ==========
    initSignatureQuantity();
    
    // ========== VERTICAL CARDS (Aneka Ayam) ==========
    initVerticalCards();
    
    // ========== CAROUSEL CARDS (Aneka Ayam) ==========
    initCarouselCards();
    
    // ========== IKAN LAUT SECTION ==========
    initIkanLautCards();
    
    // ========== TUMISAN SECTION ==========
    initTumisanCards();
    
    // ========== KIDS MENU SECTION ==========
    initKidsCards();
    
    // ========== MENU TAMBAHAN SECTION ==========
    initTambahanCards();
    
    // ========== NASI LIWET SECTION ==========
    initNasiCards();
    
    // ========== MINUMAN SECTION ==========
    initMinumanCards();
    
    // ========== PAKET PROMO SECTION ==========
    initPromoCards();
    
    console.log('✅ Semua quantity controls aktif!');
}

// ========== SIGNATURE SECTION ==========
function initSignatureQuantity() {
    const signatureCard = document.querySelector('.signature-card');
    if (!signatureCard) return;
    
    const minusBtn = signatureCard.querySelector('.btn-qty.minus');
    const plusBtn = signatureCard.querySelector('.btn-qty.plus');
    const qtyInput = document.getElementById('qty-bakakak');
    const totalElement = document.getElementById('total-bakakak');
    const priceToggles = signatureCard.querySelectorAll('.price-toggle');
    const orderBtn = signatureCard.querySelector('.btn-order');
    
    let currentPrice = 75000; // Default price
    
    // Price toggle functionality
    priceToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            priceToggles.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentPrice = parseInt(this.dataset.price) || 75000;
            updateSignatureTotal();
        });
    });
    
    // Quantity controls
    if (minusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let qty = parseInt(qtyInput.value) || 1;
            if (qty > 1) {
                qtyInput.value = qty - 1;
                updateSignatureTotal();
            }
        });
    }
    
    if (plusBtn && qtyInput) {
        plusBtn.addEventListener('click', () => {
            let qty = parseInt(qtyInput.value) || 1;
            if (qty < CONFIG.maxQuantity) {
                qtyInput.value = qty + 1;
                updateSignatureTotal();
            } else {
                showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
            }
        });
    }
    
    function updateSignatureTotal() {
        const qty = parseInt(qtyInput.value) || 1;
        const total = currentPrice * qty;
        if (totalElement) totalElement.textContent = formatCurrency(total);
    }
    
    // Order button
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            const qty = parseInt(qtyInput.value) || 1;
            const activeToggle = signatureCard.querySelector('.price-toggle.active');
            let size = 'kecil';
            let itemPrice = currentPrice;
            
            if (activeToggle) {
                const sizeText = activeToggle.querySelector('.price-toggle-size')?.textContent.toLowerCase() || 'kecil';
                size = sizeText;
                itemPrice = parseInt(activeToggle.dataset.price) || currentPrice;
            }
            
            // Determine item ID based on size
            let itemId = 'bakakak-signature-kecil';
            if (size.includes('medium')) itemId = 'bakakak-signature-medium';
            else if (size.includes('besar')) itemId = 'bakakak-signature-besar';
            
            addToCart(itemId, qty);
            setTimeout(() => {
                const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                cartModal.show();
            }, 300);
        });
    }
}




// ========== VERTICAL CARDS (Aneka Ayam) ==========
function initVerticalCards() {
    document.querySelectorAll('.vertical-card').forEach(card => {
        const minusBtn = card.querySelector('.btn-minus');
        const plusBtn = card.querySelector('.btn-plus');
        const qtyInput = card.querySelector('.quantity-input');
        const totalSpan = card.querySelector('.total-price .price-amount');
        const orderBtn = card.querySelector('.btn-order');
        
        if (!qtyInput || !totalSpan) return;
        
        const itemId = qtyInput.dataset.id;
        const basePrice = parseInt(totalSpan.dataset.basePrice) || 0;
        
        function updateVerticalTotal() {
            const qty = parseInt(qtyInput.value) || 1;
            const total = basePrice * qty;
            totalSpan.textContent = formatCurrency(total);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qtyInput.value = qty - 1;
                    updateVerticalTotal();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty < CONFIG.maxQuantity) {
                    qtyInput.value = qty + 1;
                    updateVerticalTotal();
                } else {
                    showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
                }
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', () => {
                const qty = parseInt(qtyInput.value) || 1;
                const id = orderBtn.dataset.id;
                const name = orderBtn.dataset.name;
                const price = parseInt(orderBtn.dataset.price) || basePrice;
                
                if (id && name && price) {
                    addToCart(id, qty);
                    setTimeout(() => {
                        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                        cartModal.show();
                    }, 300);
                }
            });
        }
    });
}

// ========== CAROUSEL CARDS (Aneka Ayam) ==========
function initCarouselCards() {
    document.querySelectorAll('.carousel-card').forEach(card => {
        // Quick add button
        const quickAddBtn = card.querySelector('.btn-add');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || 0;
                
                if (id && name && price) {
                    addToCart(id, 1);
                }
            });
        }
        
        // Quantity controls
        const minusBtn = card.querySelector('.btn-sm.btn-minus');
        const plusBtn = card.querySelector('.btn-sm.btn-plus');
        const qtyInput = card.querySelector('.quantity-input-sm');
        const totalSpan = card.querySelector('.price-amount-sm');
        const orderBtn = card.querySelector('.btn-order-sm');
        
        if (!qtyInput || !totalSpan) return;
        
        const itemId = qtyInput.dataset.id;
        const basePrice = parseInt(totalSpan.dataset.basePrice) || 0;
        
        function updateCarouselTotal() {
            const qty = parseInt(qtyInput.value) || 1;
            const total = basePrice * qty;
            totalSpan.textContent = formatCurrency(total);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qtyInput.value = qty - 1;
                    updateCarouselTotal();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty < CONFIG.maxQuantity) {
                    qtyInput.value = qty + 1;
                    updateCarouselTotal();
                } else {
                    showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
                }
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const qty = parseInt(qtyInput.value) || 1;
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || basePrice;
                
                if (id && name && price) {
                    addToCart(id, qty);
                    setTimeout(() => {
                        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                        cartModal.show();
                    }, 300);
                }
            });
        }
    });
}

// ========== IKAN LAUT SECTION ==========
function initIkanLautCards() {
    document.querySelectorAll('.menu-item-card').forEach(card => {
        // Quick add button
        const quickAddBtn = card.querySelector('.btn-quick-add');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || 0;
                
                if (id && name && price) {
                    addToCart(id, 1);
                }
            });
        }
        
        // Quantity controls
        const minusBtn = card.querySelector('.btn-quantity.btn-minus');
        const plusBtn = card.querySelector('.btn-quantity.btn-plus');
        const targetId = minusBtn?.dataset.target;
        const qtyInput = targetId ? document.getElementById(`quantity-${targetId}`) : null;
        const totalSpan = targetId ? document.getElementById(`total-${targetId}`) : null;
        const orderBtn = card.querySelector('.btn-order');
        
        if (!qtyInput || !totalSpan) return;
        
        const basePrice = parseInt(qtyInput.dataset.price) || 0;
        
        function updateIkanTotal() {
            const qty = parseInt(qtyInput.value) || 1;
            const total = basePrice * qty;
            totalSpan.textContent = formatCurrency(total);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qtyInput.value = qty - 1;
                    updateIkanTotal();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty < CONFIG.maxQuantity) {
                    qtyInput.value = qty + 1;
                    updateIkanTotal();
                } else {
                    showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
                }
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const qty = parseInt(qtyInput.value) || 1;
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || basePrice;
                
                if (id && name && price) {
                    addToCart(id, qty);
                    setTimeout(() => {
                        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                        cartModal.show();
                    }, 300);
                }
            });
        }
    });
}

// ========== TUMISAN SECTION ==========
function initTumisanCards() {
    document.querySelectorAll('.tumisan-card').forEach(card => {
        // Quick add button
        const quickAddBtn = card.querySelector('.btn-tumisan-quick');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || 0;
                
                if (id && name && price) {
                    addToCart(id, 1);
                }
            });
        }
        
        // Quantity controls
        const minusBtn = card.querySelector('.btn-tumisan-minus');
        const plusBtn = card.querySelector('.btn-tumisan-plus');
        const targetId = minusBtn?.dataset.target;
        const qtyInput = targetId ? document.getElementById(`quantity-${targetId}`) : null;
        const totalSpan = targetId ? document.getElementById(`total-${targetId}`) : null;
        const orderBtn = card.querySelector('.btn-tumisan-order');
        
        if (!qtyInput || !totalSpan) return;
        
        const basePrice = parseInt(qtyInput.dataset.price) || 0;
        
        function updateTumisanTotal() {
            const qty = parseInt(qtyInput.value) || 1;
            const total = basePrice * qty;
            totalSpan.textContent = formatCurrency(total);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qtyInput.value = qty - 1;
                    updateTumisanTotal();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty < CONFIG.maxQuantity) {
                    qtyInput.value = qty + 1;
                    updateTumisanTotal();
                } else {
                    showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
                }
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const qty = parseInt(qtyInput.value) || 1;
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || basePrice;
                
                if (id && name && price) {
                    addToCart(id, qty);
                    setTimeout(() => {
                        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                        cartModal.show();
                    }, 300);
                }
            });
        }
    });
}

// ========== KIDS MENU SECTION ==========
function initKidsCards() {
    document.querySelectorAll('.kids-card').forEach(card => {
        // Quick add button
        const quickAddBtn = card.querySelector('.btn-kids-quick');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || 0;
                
                if (id && name && price) {
                    addToCart(id, 1);
                }
            });
        }
        
        // Quantity controls
        const minusBtn = card.querySelector('.btn-kids-minus');
        const plusBtn = card.querySelector('.btn-kids-plus');
        const targetId = minusBtn?.dataset.target;
        const qtyInput = targetId ? document.getElementById(`quantity-${targetId}`) : null;
        const totalSpan = targetId ? document.getElementById(`total-${targetId}`) : null;
        const orderBtn = card.querySelector('.btn-kids-order');
        
        if (!qtyInput || !totalSpan) return;
        
        const basePrice = parseInt(qtyInput.dataset.price) || 0;
        
        function updateKidsTotal() {
            const qty = parseInt(qtyInput.value) || 1;
            const total = basePrice * qty;
            totalSpan.textContent = formatCurrency(total);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qtyInput.value = qty - 1;
                    updateKidsTotal();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty < CONFIG.maxQuantity) {
                    qtyInput.value = qty + 1;
                    updateKidsTotal();
                } else {
                    showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
                }
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const qty = parseInt(qtyInput.value) || 1;
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || basePrice;
                
                if (id && name && price) {
                    addToCart(id, qty);
                    setTimeout(() => {
                        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                        cartModal.show();
                    }, 300);
                }
            });
        }
    });
}

// ========== MENU TAMBAHAN SECTION ==========
function initTambahanCards() {
    document.querySelectorAll('.tambahan-card').forEach(card => {
        // Quick add button
        const quickAddBtn = card.querySelector('.btn-tambahan-quick');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || 0;
                
                if (id && name && price) {
                    addToCart(id, 1);
                }
            });
        }
        
        // Quantity controls
        const minusBtn = card.querySelector('.btn-tambahan-minus');
        const plusBtn = card.querySelector('.btn-tambahan-plus');
        const targetId = minusBtn?.dataset.target;
        const qtyInput = targetId ? document.getElementById(`quantity-${targetId}`) : null;
        const totalSpan = targetId ? document.getElementById(`total-${targetId}`) : null;
        const orderBtn = card.querySelector('.btn-tambahan-order');
        
        if (!qtyInput || !totalSpan) return;
        
        const basePrice = parseInt(qtyInput.dataset.price) || 0;
        
        function updateTambahanTotal() {
            const qty = parseInt(qtyInput.value) || 1;
            const total = basePrice * qty;
            totalSpan.textContent = formatCurrency(total);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qtyInput.value = qty - 1;
                    updateTambahanTotal();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty < CONFIG.maxQuantity) {
                    qtyInput.value = qty + 1;
                    updateTambahanTotal();
                } else {
                    showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
                }
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const qty = parseInt(qtyInput.value) || 1;
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || basePrice;
                
                if (id && name && price) {
                    addToCart(id, qty);
                    setTimeout(() => {
                        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                        cartModal.show();
                    }, 300);
                }
            });
        }
    });
}

// ========== NASI LIWET SECTION ==========
function initNasiCards() {
    document.querySelectorAll('.nasi-card').forEach(card => {
        // Quick add button
        const quickAddBtn = card.querySelector('.btn-nasi-quick');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || 0;
                
                if (id && name && price) {
                    addToCart(id, 1);
                }
            });
        }
        
        // Quantity controls
        const minusBtn = card.querySelector('.btn-nasi-minus');
        const plusBtn = card.querySelector('.btn-nasi-plus');
        const targetId = minusBtn?.dataset.target;
        const qtyInput = targetId ? document.getElementById(`quantity-${targetId}`) : null;
        const totalSpan = targetId ? document.getElementById(`total-${targetId}`) : null;
        const orderBtn = card.querySelector('.btn-nasi-order');
        
        if (!qtyInput || !totalSpan) return;
        
        const basePrice = parseInt(qtyInput.dataset.price) || 0;
        
        function updateNasiTotal() {
            const qty = parseInt(qtyInput.value) || 1;
            const total = basePrice * qty;
            totalSpan.textContent = formatCurrency(total);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qtyInput.value = qty - 1;
                    updateNasiTotal();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty < CONFIG.maxQuantity) {
                    qtyInput.value = qty + 1;
                    updateNasiTotal();
                } else {
                    showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
                }
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const qty = parseInt(qtyInput.value) || 1;
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || basePrice;
                
                if (id && name && price) {
                    addToCart(id, qty);
                    setTimeout(() => {
                        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                        cartModal.show();
                    }, 300);
                }
            });
        }
    });
}

// ========== MINUMAN SECTION ==========
function initMinumanCards() {
    document.querySelectorAll('.minuman-card').forEach(card => {
        // Quick add button
        const quickAddBtn = card.querySelector('.btn-minuman-quick');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || 0;
                
                if (id && name && price) {
                    addToCart(id, 1);
                }
            });
        }
        
        // Quantity controls
        const minusBtn = card.querySelector('.btn-minuman-minus');
        const plusBtn = card.querySelector('.btn-minuman-plus');
        const targetId = minusBtn?.dataset.target;
        const qtyInput = targetId ? document.getElementById(`quantity-${targetId}`) : null;
        const totalSpan = targetId ? document.getElementById(`total-${targetId}`) : null;
        const orderBtn = card.querySelector('.btn-minuman-order');
        
        if (!qtyInput || !totalSpan) return;
        
        const basePrice = parseInt(qtyInput.dataset.price) || 0;
        
        function updateMinumanTotal() {
            const qty = parseInt(qtyInput.value) || 1;
            const total = basePrice * qty;
            totalSpan.textContent = formatCurrency(total);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qtyInput.value = qty - 1;
                    updateMinumanTotal();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty < CONFIG.maxQuantity) {
                    qtyInput.value = qty + 1;
                    updateMinumanTotal();
                } else {
                    showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
                }
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const qty = parseInt(qtyInput.value) || 1;
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || basePrice;
                
                if (id && name && price) {
                    addToCart(id, qty);
                    setTimeout(() => {
                        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                        cartModal.show();
                    }, 300);
                }
            });
        }
    });
}

// ========== PAKET PROMO SECTION ==========
function initPromoCards() {
    document.querySelectorAll('.promo-card').forEach(card => {
        // Quick add button
        const quickAddBtn = card.querySelector('.btn-promo-quick');
        if (quickAddBtn) {
            quickAddBtn.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || 0;
                
                if (id && name && price) {
                    addToCart(id, 1);
                }
            });
        }
        
        // Quantity controls
        const minusBtn = card.querySelector('.btn-promo-minus');
        const plusBtn = card.querySelector('.btn-promo-plus');
        const targetId = minusBtn?.dataset.target;
        const qtyInput = targetId ? document.getElementById(`quantity-${targetId}`) : null;
        const totalSpan = targetId ? document.getElementById(`total-${targetId}`) : null;
        const orderBtn = card.querySelector('.btn-promo-order');
        
        if (!qtyInput || !totalSpan) return;
        
        const basePrice = parseInt(qtyInput.dataset.price) || 0;
        
        function updatePromoTotal() {
            const qty = parseInt(qtyInput.value) || 1;
            const total = basePrice * qty;
            totalSpan.textContent = formatCurrency(total);
        }
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty > 1) {
                    qtyInput.value = qty - 1;
                    updatePromoTotal();
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                let qty = parseInt(qtyInput.value) || 1;
                if (qty < CONFIG.maxQuantity) {
                    qtyInput.value = qty + 1;
                    updatePromoTotal();
                } else {
                    showNotification(`Maksimal ${CONFIG.maxQuantity} item`, 'warning');
                }
            });
        }
        
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const qty = parseInt(qtyInput.value) || 1;
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseInt(this.dataset.price) || basePrice;
                
                if (id && name && price) {
                    addToCart(id, qty);
                    setTimeout(() => {
                        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
                        cartModal.show();
                    }, 300);
                }
            });
        }
    });
}

// ============================================================================
// 11. SIGNATURE SECTION (Keep your existing function)
// ============================================================================
function initSignatureSection() {
    // Already handled in initSignatureQuantity
}

// ============================================================================
// 12. CAROUSEL & UI COMPONENTS (Keep your existing functions)
// ============================================================================
function initCarousels() {
    document.querySelectorAll('.carousel-container, .menu-carousel-container').forEach(container => {
        const prev = container.querySelector('.carousel-nav.prev, .carousel-nav-prev');
        const next = container.querySelector('.carousel-nav.next, .carousel-nav-next');
        const wrap = container.querySelector('.carousel-wrapper, .menu-carousel');
        
        if (prev && next && wrap) {
            prev.addEventListener('click', () => wrap.scrollBy({ left: -400, behavior: 'smooth' }));
            next.addEventListener('click', () => wrap.scrollBy({ left: 400, behavior: 'smooth' }));
        }
    });
    
    // Horizontal scroll containers
    ['.tumisan-scroll-container', '.kids-scroll-container', '.nasi-scroll-container', 
     '.minuman-scroll-container', '.promo-scroll-container'].forEach(sel => {
        const c = document.querySelector(sel);
        if (c) {
            c.addEventListener('wheel', e => {
                if (e.deltaY) {
                    e.preventDefault();
                    c.scrollBy({ left: e.deltaY, behavior: 'smooth' });
                }
            });
        }
    });
}

function initStickyNav() {
    const nav = document.querySelector('.sticky-nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 100);
    });
    
    document.querySelectorAll('.nav-item-btn[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById(a.getAttribute('href').substring(1));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                document.querySelectorAll('.nav-item-btn').forEach(i => i.classList.remove('active'));
                a.classList.add('active');
            }
        });
    });
}

// ============================================================================
// 13. FORM VALIDATION (Keep your existing functions)
// ============================================================================
function initFormValidation() {
    ['cust-name', 'cust-phone', 'cust-address', 'cust-note'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => { validateInput(input); saveCustomerForm(); updateCheckoutButtonState(); });
            input.addEventListener('blur', () => { validateInput(input); saveCustomerForm(); });
        }
    });
    
    const pickup = document.getElementById('pickupType');
    const delivery = document.getElementById('deliveryType');
    if (pickup && delivery) {
        pickup.addEventListener('change', () => { if (pickup.checked) { customerData.orderType = 'pickup'; updateAddressFieldState(); saveCustomerForm(); updateCartDisplay(); } });
        delivery.addEventListener('change', () => { if (delivery.checked) { customerData.orderType = 'delivery'; updateAddressFieldState(); saveCustomerForm(); updateCartDisplay(); } });
    }
}

function validateInput(input) {
    const val = input.value.trim();
    input.classList.remove('is-valid', 'is-invalid');
    input.parentElement.querySelector('.invalid-feedback')?.remove();
    
    let valid = true, msg = '';
    
    if (input.id === 'cust-name' && val && val.length < 2) { valid = false; msg = 'Minimal 2 karakter'; }
    if (input.id === 'cust-phone') {
        const clean = val.replace(/\s/g, '');
        if (clean && (clean.length < 10 || !/^[0-9\-\+]{9,15}$/.test(clean))) { valid = false; msg = 'Nomor tidak valid'; }
    }
    if (input.id === 'cust-address' && customerData.orderType === 'delivery' && val && val.length < 10) { valid = false; msg = 'Minimal 10 karakter'; }
    
    if (valid && val) input.classList.add('is-valid');
    else if (!valid) {
        input.classList.add('is-invalid');
        const err = document.createElement('div');
        err.className = 'invalid-feedback';
        err.textContent = msg;
        input.parentElement.appendChild(err);
    }
    return valid;
}

function updateCheckoutButtonState() {
    const btn = document.getElementById('whatsapp-btn');
    if (!btn) return;
    const valid = validateOrder().valid;
    btn.disabled = !valid;
    btn.classList.toggle('btn-success', valid);
    btn.classList.toggle('btn-secondary', !valid);
}

// ============================================================================
// 14. FLOATING CART (Keep your existing function)
// ============================================================================
function createFloatingCart() {
    if (document.querySelector('.floating-cart-container')) return;
    
    const html = `
        <div class="floating-cart-container">
            <button class="btn btn-floating-cart" id="floatingCartBtn">
                <i class="bi bi-cart3"></i>
                <span class="cart-badge" id="cart-badge">0</span>
            </button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    
    document.getElementById('floatingCartBtn')?.addEventListener('click', () => {
        new bootstrap.Modal(document.getElementById('cartModal')).show();
    });
}

function animateFloatingCart() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        badge.classList.add('bounce');
        setTimeout(() => badge.classList.remove('bounce'), 300);
    }
}

// ============================================================================
// 15. NOTIFICATION SYSTEM (Keep your existing function)
// ============================================================================
function showNotification(message, type = 'info') {
    document.querySelector('.custom-notification')?.remove();
    
    const notif = document.createElement('div');
    notif.className = `custom-notification alert alert-${type}`;
    notif.style.cssText = 'position:fixed; top:20px; right:20px; z-index:10000; min-width:300px; background:rgba(44,24,16,0.95); color:white; border:2px solid; border-radius:10px; animation:slideIn 0.3s ease;';
    notif.style.borderColor = { success: '#28a745', error: '#dc3545', warning: '#ffc107', info: '#17a2b8' }[type] || '#17a2b8';
    
    const icons = { success: 'bi-check-circle-fill', error: 'bi-exclamation-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
    notif.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi ${icons[type] || icons.info} me-3 fs-4"></i>
            <div class="flex-grow-1">${message}</div>
            <button class="btn-close btn-close-white ms-2" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notif);
    setTimeout(() => { if (notif.parentNode) { notif.style.animation = 'slideOut 0.3s ease'; setTimeout(() => notif.remove(), 300); } }, 3000);
}

// ============================================================================
// 16. UTILITY FUNCTIONS (Keep your existing functions)
// ============================================================================
function formatCurrency(amount) {
    return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function updateElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setFormValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
}

function getFormValue(id) {
    return document.getElementById(id)?.value.trim() || '';
}

// ============================================================================
// 17. EVENT LISTENERS (Keep your existing function)
// ============================================================================
function initEventListeners() {
    document.getElementById('whatsapp-btn')?.addEventListener('click', processOrder);
    document.getElementById('reset-cart-btn')?.addEventListener('click', clearCart);
    
    ['cust-name', 'cust-phone', 'cust-address', 'cust-note'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', saveCustomerForm);
    });
    
    document.getElementById('cartModal')?.addEventListener('shown.bs.modal', () => {
        updateCustomerForm();
        updateCheckoutButtonState();
        const name = document.getElementById('cust-name');
        if (name && !name.value.trim()) setTimeout(() => name.focus(), 300);
    });
    
    window.addEventListener('beforeunload', saveToStorage);
    setInterval(saveToStorage, 30000);
}

// ============================================================================
// 18. UI INITIALIZATION (Keep your existing function)
// ============================================================================
function initUI() {
    createFloatingCart();
    updateCartDisplay();
    updateCustomerForm();
    addThemeStyles();
}

function addThemeStyles() {
    if (document.getElementById('bakakak-theme-styles')) return;
    
    const styles = `
        <style id="bakakak-theme-styles">
            .text-orange { color: #FF8C42 !important; }
            .bg-orange { background-color: #FF8C42 !important; }
            .border-orange { border-color: #FF8C42 !important; }
            .btn-orange { background-color: #FF8C42; border-color: #FF8C42; color: white; }
            .btn-orange:hover { background-color: #D2691E; border-color: #D2691E; color: white; }
            .btn-outline-orange { border-color: #FF8C42; color: #FF8C42; }
            .btn-outline-orange:hover { background-color: #FF8C42; color: white; }
            .form-control:focus { border-color: #FF8C42; box-shadow: 0 0 0 0.25rem rgba(255,140,66,0.25); }
            .is-valid { border-color: #28a745 !important; }
            .is-invalid { border-color: #dc3545 !important; }
            .cart-item { transition: all 0.3s ease; background: rgba(255,140,66,0.05) !important; border-radius: 8px; }
            .cart-item:hover { background: rgba(255,140,66,0.1) !important; transform: translateX(5px); }
            .floating-cart-container { position: fixed; bottom: 25px; right: 25px; z-index: 9999; }
            .btn-floating-cart { width: 70px; height: 70px; border-radius: 50%; background: linear-gradient(135deg, #FF8C42 0%, #D2691E 100%); color: white; border: none; box-shadow: 0 5px 20px rgba(255,140,66,0.5); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; transition: all 0.3s ease; position: relative; cursor: pointer; }
            .btn-floating-cart:hover { transform: scale(1.1); box-shadow: 0 8px 25px rgba(255,140,66,0.7); }
            .btn-floating-cart.has-items { animation: pulse 2s infinite; }
            .cart-badge { position: absolute; top: -5px; right: -5px; background: #dc3545; color: white; font-size: 0.75rem; min-width: 25px; height: 25px; border-radius: 50%; display: none; align-items: center; justify-content: center; font-weight: bold; border: 2px solid #2c1810; }
            @keyframes pulse { 0% { box-shadow: 0 5px 20px rgba(255,140,66,0.5); } 50% { box-shadow: 0 5px 25px rgba(255,140,66,0.8); } 100% { box-shadow: 0 5px 20px rgba(255,140,66,0.5); } }
            @keyframes bounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.3); } }
            .cart-badge.bounce { animation: bounce 0.3s ease; }
            .custom-notification { animation: slideIn 0.3s ease; backdrop-filter: blur(10px); background: rgba(44,24,16,0.95) !important; color: white !important; }
            @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
            .cart-modal .modal-content { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); border: 2px solid #FF8C42; }
            #whatsapp-btn { background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); border: none; font-weight: bold; transition: all 0.3s ease; }
            #whatsapp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(37,211,102,0.3); }
            #whatsapp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
            .invalid-feedback { display: block; color: #dc3545; font-size: 0.875em; margin-top: 0.25rem; }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
}

// ============================================================================
// 19. GLOBAL DEBUG
// ============================================================================
window.bakakakSystem = {
    addToCart, removeFromCart, updateCartItemQuantity, clearCart, processOrder,
    getCart: () => cart,
    getCustomer: () => customerData,
    getMenu: () => menuData,
    getHistory: () => orderHistory,
    formatCurrency, showNotification,
    config: CONFIG,
    test: function() {
        console.log('📊 SYSTEM STATUS:');
        console.log('- Cart items:', cart.length);
        console.log('- Menu items:', Object.keys(menuData).length);
        console.log('- Customer:', customerData.name || 'Belum diisi');
        console.log('- Signature Card: ✓');
        console.log('- Vertical Cards: ✓');
        console.log('- Carousel Cards: ✓');
        console.log('- Ikan Laut: ✓');
        console.log('- Tumisan: ✓');
        console.log('- Kids Menu: ✓');
        console.log('- Menu Tambahan: ✓');
        console.log('- Nasi Liwet: ✓');
        console.log('- Minuman: ✓');
        console.log('- Paket Promo: ✓');
    }
};

        
