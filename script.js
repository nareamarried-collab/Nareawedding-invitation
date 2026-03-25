const i18n = {
    id: {
        theWeddingOf: "The Wedding Of",
        toDear: "Kepada Yth. Bapak/Ibu/Saudara/i",
        guestNameDefault: "Tamu Undangan",
        openInvitationBtn: "Buka Undangan",
        navCouple: "Mempelai",
        navEvent: "Acara",
        navGallery: "Galeri",
        navWishes: "Ucapan",
        weAreMarried: "Kami Menikah",
        saveDateBtn: "Simpan Jadwal",
        mempelai: "Mempelai",
        daughterOf: "Putri dari",
        parentArsya: "Bpk. Adi Sofian & Ibu Roskomala Sari",
        sonOf: "Putra dari",
        parentAndrea: "Bpk. Lukman (Alm) & Ibu Isma Delfi",
        eventInfo: "Informasi Acara",
        sunday: "Minggu",
        fullDate: "April 05, 2026",
        reception: "Resepsi",
        receptionTime: "19:00 WIB - 21:00 WIB",
        weddingGift: "Wedding Gift",
        giftNote: "Terima kasih atas tanda kasih Anda untuk kami.",
        sendGiftBtn: "Kirim Hadiah",
        copyAccountBtn: "Salin Rekening",
        copyAddressBtn: "Salin Alamat",
        shippingAddress: "Alamat Pengiriman",
        rsvpTitle: "Konfirmasi Kehadiran",
        rsvpNote: "Silakan isi formulir di bawah ini.",
        labelName: "Nama",
        labelStatus: "Kehadiran",
        labelGuests: "Jumlah Tamu",
        labelWish: "Ucapan / Doa",
        optAttending: "Hadir",
        optNotAttending: "Tidak Hadir",
        submitBtn: "Kirim Konfirmasi",
        submittingBtn: "Mengirim...",
        showQrBtn: "Tampilkan QR Check-in",
        qrTitle: "QR Check-in Anda",
        qrInstruction: "Simpan QR ini untuk masuk ke venue acara.",
        wishesTitle: "Buku Tamu",
        wishesNote: "Doa & Ucapan Teman & Keluarga.",
        createdBy: "Created By",
        msgSuccess: "Konfirmasi berhasil dikirim.",
        msgError: "Gagal mengirim data.",
        msgCopied: "Berhasil disalin!",
        msgNameRequired: "Nama wajib diisi."
    },
    en: {
        theWeddingOf: "The Wedding Of",
        toDear: "To Dear Mr/Mrs/Ms",
        guestNameDefault: "Invited Guest",
        openInvitationBtn: "Open Invitation",
        navCouple: "Couple",
        navEvent: "Event",
        navGallery: "Gallery",
        navWishes: "Wishes",
        weAreMarried: "We Are Getting Married",
        saveDateBtn: "Save the Date",
        mempelai: "Bride & Groom",
        daughterOf: "Daughter of",
        parentArsya: "Mr. Adi Sofian & Mrs. Roskomala Sari",
        sonOf: "Son of",
        parentAndrea: "Mr. Lukman (dec) & Mrs. Isma Delfi",
        eventInfo: "Event Information",
        sunday: "Sunday",
        fullDate: "April 05th, 2026",
        reception: "Reception",
        receptionTime: "07:00 PM - 09:00 PM",
        weddingGift: "Wedding Gift",
        giftNote: "Thank you for your kindness towards us.",
        sendGiftBtn: "Send Gift",
        copyAccountBtn: "Copy Account",
        copyAddressBtn: "Copy Address",
        shippingAddress: "Shipping Address",
        rsvpTitle: "RSVP Confirmation",
        rsvpNote: "Please fill out the form below.",
        labelName: "Name",
        labelStatus: "Attendance",
        labelGuests: "Number of Guests",
        labelWish: "Wishes / Prayers",
        optAttending: "Attending",
        optNotAttending: "Declining",
        submitBtn: "Submit RSVP",
        submittingBtn: "Submitting...",
        showQrBtn: "Show QR Check-in",
        qrTitle: "Your Check-in QR",
        qrInstruction: "Save this QR for venue check-in.",
        wishesTitle: "Guest Book",
        wishesNote: "Prayers & Wishes from Friends & Family.",
        createdBy: "Created By",
        msgSuccess: "RSVP submitted successfully.",
        msgError: "Failed to send data.",
        msgCopied: "Copied!",
        msgNameRequired: "Name is required."
    }
};

let currentLang = 'id';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzDXCBYjo6R4tZqih_CFm5Qb4GfW9se_dBPHRxLGsjeOO7Sfu-ob4tS3HxkzXnuRGiu/exec";

const bgMusic = document.getElementById('bg-music');
const video = document.getElementById('prewed-video');
const toast = document.getElementById('toast');

const rsvpForm = document.getElementById('rsvp-form');
const statusField = document.getElementById('form-status');
const guestsWrapper = document.getElementById('guests-wrapper');
const guestsField = document.getElementById('form-guests');
const submitBtn = document.getElementById('btn-submit');
const btnText = document.getElementById('btn-text');
const btnLoader = document.getElementById('btn-loader');
const qrDisplayBox = document.getElementById('qr-display-box');
const qrImageResult = document.getElementById('qr-image-result');
const guestIdResult = document.getElementById('guest-id-result');
const btnShowQr = document.getElementById('btn-show-qr');
const nameField = document.getElementById('form-name');
const wishField = document.getElementById('form-wish');
const wishesList = document.getElementById('wishes-list');

let isPlaying = false;

function changeLang(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-t]').forEach((el) => {
        const key = el.getAttribute('data-t');
        if (i18n[lang] && i18n[lang][key]) {
            el.textContent = i18n[lang][key];
        }
    });

    if (submitBtn && btnText && !submitBtn.disabled) {
        btnText.textContent = i18n[lang].submitBtn;
    }

    const btnId = document.getElementById('btn-id');
    const btnEn = document.getElementById('btn-en');

    if (btnId) btnId.classList.toggle('active', lang === 'id');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');
}

function openInvitation() {
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const visualizer = document.getElementById('visualizer');

    if (!cover || !mainContent) return;

    cover.classList.add('cover-hidden');
    mainContent.style.display = 'block';

    if (bgMusic) {
        bgMusic.play()
            .then(() => {
                isPlaying = true;
                if (visualizer) visualizer.classList.add('playing');
            })
            .catch(() => {});
    }

    setTimeout(() => {
        mainContent.style.opacity = '1';
        if (video) {
            video.play().catch(() => {});
        }
        initReveal();
    }, 300);

    window.scrollTo(0, 0);
}

function toggleMusic() {
    const visualizer = document.getElementById('visualizer');
    if (!bgMusic) return;

    if (isPlaying) {
        bgMusic.pause();
        if (visualizer) visualizer.classList.remove('playing');
    } else {
        bgMusic.play().catch(() => {});
        if (visualizer) visualizer.classList.add('playing');
    }

    isPlaying = !isPlaying;
}

function openGiftModal() {
    const giftModal = document.getElementById('gift-modal');
    if (giftModal) giftModal.style.display = 'flex';
}

function closeGiftModal() {
    const giftModal = document.getElementById('gift-modal');
    if (giftModal) giftModal.style.display = 'none';
}

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'show';

    setTimeout(() => {
        toast.className = '';
    }, 3000);
}

async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
        showToast(i18n[currentLang].msgCopied);
    } catch (err) {
        showToast(i18n[currentLang].msgError);
    }
}

function updateGuestFieldState() {
    if (!statusField || !guestsWrapper || !guestsField) return;

    const attending = statusField.value === 'hadir';
    guestsWrapper.style.opacity = attending ? '1' : '0.4';
    guestsField.disabled = !attending;

    if (!attending) {
        guestsField.value = '0';
    } else if (guestsField.value === '0' || !guestsField.value) {
        guestsField.value = '1';
    }
}

function renderQr(guestId) {
    if (!qrImageResult || !guestIdResult || !qrDisplayBox || !btnShowQr) return;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(guestId)}`;
    qrImageResult.src = qrUrl;
    guestIdResult.textContent = guestId;

    qrDisplayBox.classList.remove('hidden');
    setTimeout(() => {
        qrDisplayBox.style.opacity = '1';
    }, 100);

    btnShowQr.classList.remove('hidden');
}

function addWishToList(name, wish) {
    if (!wishesList || !wish || String(wish).trim() === '') return;

    const wishEl = document.createElement('div');
    wishEl.className = 'bg-white p-4 rounded-2xl border border-[#e5dfd3] shadow-sm';

    wishEl.innerHTML = `
        <p class="text-[11px] font-bold text-[#4a4238]"></p>
        <p class="text-[11px] text-[#8c7355] mt-1 leading-relaxed"></p>
    `;

    wishEl.querySelector('p:nth-child(1)').textContent = name || 'Guest';
    wishEl.querySelector('p:nth-child(2)').textContent = wish;

    wishesList.appendChild(wishEl);
}

async function loadWishes() {
    if (!wishesList) return;

    try {
        const response = await fetch(`${SCRIPT_URL}?t=${Date.now()}`);
        const result = await response.json();

        console.log('Wishes response:', result);

        if (result.status !== 'success' || !Array.isArray(result.wishes)) {
            wishesList.innerHTML = `
                <div class="bg-white p-4 rounded-2xl border border-[#e5dfd3] shadow-sm text-center text-[11px] text-[#8c7355]">
                    Belum ada ucapan.
                </div>
            `;
            return;
        }

        wishesList.innerHTML = '';

        result.wishes.forEach((item) => {
            addWishToList(item.name, item.wish);
        });

        if (result.wishes.length === 0) {
            wishesList.innerHTML = `
                <div class="bg-white p-4 rounded-2xl border border-[#e5dfd3] shadow-sm text-center text-[11px] text-[#8c7355]">
                    Belum ada ucapan.
                </div>
            `;
        }
    } catch (error) {
        console.error('Error load wishes:', error);
        wishesList.innerHTML = `
            <div class="bg-white p-4 rounded-2xl border border-[#e5dfd3] shadow-sm text-center text-[11px] text-red-500">
                Gagal memuat ucapan.
            </div>
        `;
    }
}

function setSubmittingState(isSubmitting) {
    if (!submitBtn || !btnLoader || !btnText) return;

    submitBtn.disabled = isSubmitting;
    btnLoader.classList.toggle('hidden', !isSubmitting);
    btnText.textContent = isSubmitting
        ? i18n[currentLang].submittingBtn
        : i18n[currentLang].submitBtn;
}

function setSubmittedState() {
    if (!submitBtn || !btnLoader || !btnText) return;

    submitBtn.disabled = true;
    btnLoader.classList.add('hidden');
    btnText.textContent = '✓ Submitted';
    submitBtn.classList.remove('bg-[#8c7355]');
    submitBtn.classList.add('bg-emerald-500');
}

function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach((el) => observer.observe(el));
}

if (statusField) {
    statusField.addEventListener('change', updateGuestFieldState);
}

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = nameField ? nameField.value.trim() : '';
        const wish = wishField ? wishField.value.trim() : '';

        if (!name) {
            showToast(i18n[currentLang].msgNameRequired);
            return;
        }

        setSubmittingState(true);

        const payload = {
            name,
            status: statusField && statusField.value === 'hadir' ? 'Hadir' : 'Tidak Hadir',
            guests: statusField && statusField.value === 'hadir'
                ? Number(guestsField ? guestsField.value : 0)
                : 0,
            wish
        };

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.status === 'success' || result.result === 'success') {
                const guestId = result.guestId || 'Tamu000';

                renderQr(guestId);
                await loadWishes();
                showToast(i18n[currentLang].msgSuccess);
                setSubmittedState();

                rsvpForm.reset();
                updateGuestFieldState();

                setTimeout(() => {
                    if (qrDisplayBox) {
                        qrDisplayBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 300);
            } else {
                throw new Error(result.message || 'Unknown error');
            }
        } catch (error) {
            console.error(error);
            showToast(i18n[currentLang].msgError);
            setSubmittingState(false);
        }
    });
}

if (btnShowQr) {
    btnShowQr.addEventListener('click', () => {
        if (qrDisplayBox) {
            qrDisplayBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadWishes();
    changeLang('id');
    updateGuestFieldState();
});

window.changeLang = changeLang;
window.openInvitation = openInvitation;
window.toggleMusic = toggleMusic;
window.openGiftModal = openGiftModal;
window.closeGiftModal = closeGiftModal;
window.copyToClipboard = copyToClipboard;
