// Avatar Menu Component
function createAvatarMenu() {
    const container = document.createElement('div');
    container.className = 'fixed top-4 right-4 z-50';
    container.innerHTML = `
        <div class="relative">
            <button id="avatarBtn" class="bg-yellow-400 p-2 rounded-full focus:outline-none flex items-center justify-center w-10 h-10">
                <img id="userAvatar" src="https://ui-avatars.com/api/?name=Kullanici&background=FACC15&color=111827&size=64" alt="Avatar" class="rounded-full w-8 h-8 object-cover" />
            </button>
            <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                <button id="editProfileBtn" class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">Profili Görüntüle</button>
                <button id="settingsBtn" class="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">Ayarlar</button>
                <button id="logoutBtn" class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800">Çıkış Yap</button>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // Dropdown menü aç/kapat
    const avatarBtn = container.querySelector('#avatarBtn');
    const dropdownMenu = container.querySelector('#dropdownMenu');
    avatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        if (!avatarBtn.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });

    // Firebase entegrasyonu
    import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js').then(({ initializeApp }) => {
        import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js').then(({ getAuth, onAuthStateChanged, signOut }) => {
            import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js').then(({ getFirestore, doc, getDoc }) => {
                import('../firebase-config.js').then(({ firebaseConfig }) => {
                    const app = initializeApp(firebaseConfig);
                    const auth = getAuth(app);
                    const db = getFirestore(app);

                    // Çıkış işlemi
                    container.querySelector('#logoutBtn').addEventListener('click', () => {
                        signOut(auth).then(() => {
                            window.location.href = "anasayfa.html";
                        }).catch((error) => {
                            console.error("Çıkış yapılırken hata oluştu:", error);
                        });
                    });
                    // Profili Düzenle ve Ayarlar butonları
                    container.querySelector('#editProfileBtn').addEventListener('click', () => {
                        window.location.href = "profil.html";
                    });
                    container.querySelector('#settingsBtn').addEventListener('click', () => {
                        window.location.href = "ayarlar.html";
                    });
                    // Kullanıcı adı ve avatarı doldur
                    onAuthStateChanged(auth, async (user) => {
                        if (user) {
                            try {
                                const userDoc = await getDoc(doc(db, "users", user.uid));
                                let adSoyad = user.displayName || user.email;
                                if (userDoc.exists()) {
                                    const userData = userDoc.data();
                                    const ad = userData.ad || '';
                                    const soyad = userData.soyad || '';
                                    adSoyad = (ad + ' ' + soyad).trim() || adSoyad;
                                    container.querySelector('#userAvatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(adSoyad)}&background=FACC15&color=111827&size=64`;
                                }
                            } catch (error) {
                                console.error("Kullanıcı bilgileri alınamadı:", error);
                            }
                        } else {
                            window.location.href = "anasayfa.html";
                        }
                    });
                });
            });
        });
    });
}

// Sayfa yüklendiğinde avatar menüyü ekle
if (!window.__avatarMenuLoaded) {
    document.addEventListener('DOMContentLoaded', () => {
        createAvatarMenu();
        window.__avatarMenuLoaded = true;
    });
} 