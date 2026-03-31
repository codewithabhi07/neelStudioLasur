// Dynamic Data from Admin Panel
let portfolioData = JSON.parse(localStorage.getItem('publicPortfolio')) || [
    { id: 1, category: 'wedding', title: 'The Royal Wedding', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { id: 2, category: 'prewedding', title: 'Palace Romance', image: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { id: 3, category: 'wedding', title: 'The Elegant Bride', image: 'https://images.unsplash.com/photo-1544120190-2751b8fc23bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { id: 4, category: 'wedding', title: 'Mehendi Moments', image: 'https://images.unsplash.com/photo-1632152271320-990ef6600001?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { id: 5, category: 'cinematic', title: 'Groom Portrait', image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { id: 6, category: 'wedding', title: 'Pheras & Promises', image: 'https://images.unsplash.com/photo-1597157639073-69284dc0f9a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { id: 7, category: 'prewedding', title: 'Golden Hour Love', image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { id: 8, category: 'wedding', title: 'Bridal Glow', image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
    { id: 9, category: 'maternity', title: 'Divine Journey', image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
];

let studioSettings = JSON.parse(localStorage.getItem('studioSettings')) || { 
    studioName: 'Neel Studio',
    studioPhone: '+91 83906 29068'
};

document.addEventListener('DOMContentLoaded', () => {
    // Sync Studio Info
    const logoSpan = document.querySelector('.logo span');
    if (logoSpan) logoSpan.innerText = studioSettings.studioName;
    
    const contactPhone = document.querySelector('.footer-info-item[href^="tel"] span');
    if (contactPhone) contactPhone.innerText = studioSettings.studioPhone;

    // Initialize AOS
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
    });

    const navbar = document.querySelector('.navbar');
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Scroll Effect for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Render Gallery
    function renderGallery(filter = 'all') {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';
        const filteredData = filter === 'all' ? portfolioData : portfolioData.filter(item => item.category === filter);

        filteredData.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('data-aos', 'zoom-in-up');
            galleryItem.setAttribute('data-aos-delay', (index % 3) * 100);
            galleryItem.onclick = () => openLightbox(item.image);
            
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
            `;
            galleryGrid.appendChild(galleryItem);
        });
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Initial Render
    renderGallery();

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderGallery(filter);
            setTimeout(() => AOS.refresh(), 100);
        });
    });
});

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (window.innerWidth <= 768) navLinks.classList.toggle('active');
}

// Lightbox Logic
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
