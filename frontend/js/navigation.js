// Footer Navigation Component
function createFooterNavigation() {
    const footer = document.createElement('footer');
    footer.className = 'bg-gray-900 p-4 flex justify-between items-center text-xs text-gray-300 fixed bottom-0 left-0 w-full z-50 border-t border-gray-800';
    footer.innerHTML = `
        <a href="anagiris.html" class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
            </svg>
            Anasayfa
        </a>
        <a href="ilanlar.html" class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6h13M9 11l3-3m0 0l3 3m-3-3v12" />
            </svg>
            İlanlar
        </a>
        <a href="mentorluk.html" class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 7v-7m0 0l-9-5m9 5l9-5" />
            </svg>
            Mentörlük
        </a>
        <a href="etkinlikler.html" class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-1 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8m-4-4v8" />
            </svg>
            Etkinlikler
        </a>
        <a href="burslar.html" class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Burslar
        </a>
    `;

    // Aktif sayfayı vurgula
    const currentPage = window.location.pathname.split('/').pop();
    const links = footer.querySelectorAll('a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('text-yellow-400');
            const icon = link.querySelector('svg');
            if (icon) {
                icon.classList.add('text-yellow-400');
            }
        }
    });

    return footer;
}

// Sayfa yüklendiğinde footer'ı ekle
document.addEventListener('DOMContentLoaded', () => {
    const footer = createFooterNavigation();
    document.body.appendChild(footer);
}); 