const i18n = { ... }; // (biarkan seperti punya kamu, tidak saya ubah)

let currentLang = 'id';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzDXCBYjo6R4tZqih_CFm5Qb4GfW9se_dBPHRxLGsjeOO7Sfu-ob4tS3HxkzXnuRGiu/exec";

const bgMusic = document.getElementById('bg-music');
const video = document.getElementById('prewed-video');
const toast = document.getElementById("toast");

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

    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (i18n[lang][key]) {
            el.textContent = i18n[lang][key];
        }
    });

    if (!submitBtn.disabled) {
        btnText.textContent = i18n[lang].submitBtn;
    }

    document.getElementById('btn-id').classList.toggle('active', lang === 'id');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
}

function openInvitation() {
    document.getElementById('cover').classList.add('cover-hidden');
    document.getElementById('main-content').style.display = 'block';

    bgMusic.play().catch(() => {});

    setTimeout(() => {
        document.getElementById('main-content').style.opacity = '1';
        video?.play().catch(() => {});
        initReveal();
    }, 300);

    window.scrollTo(0, 0);
}

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        document.getElementById('visualizer').classList.remove('playing');
    } else {
        bgMusic.play().catch(() => {});
        document.getElementById('visualizer').classList.add('playing');
    }
    isPlaying = !isPlaying;
}

function showToast(message) {
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => toast.className = "", 3000);
}

function updateGuestFieldState() {
    const attending = statusField.value === 'hadir';
    guestsWrapper.style.opacity = attending ? '1' : '0.4';
    guestsField.disabled = !attending;
    guestsField.value = attending ? (guestsField.value || '1') : '0';
}

function renderQr(guestId) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(guestId)}`;
    qrImageResult.src = qrUrl;
    guestIdResult.textContent = guestId;

    qrDisplayBox.classList.remove('hidden');
    setTimeout(() => qrDisplayBox.style.opacity = '1', 100);

    btnShowQr.classList.remove('hidden');
}

function addWishToList(name, wish) {
    if (!wish?.trim()) return;

    const el = document.createElement('div');
    el.className = 'bg-white p-4 rounded-2xl border border-[#e5dfd3] shadow-sm';

    el.innerHTML = `
        <p class="text-[11px] font-bold text-[#4a4238]">${name || 'Guest'}</p>
        <p class="text-[11px] text-[#8c7355] mt-1 leading-relaxed">${wish}</p>
    `;

    wishesList.appendChild(el);
}

async function loadWishes() {
    try {
        const res = await fetch(`${SCRIPT_URL}?t=${Date.now()}`);
        const data = await res.json();

        wishesList.innerHTML = '';

        if (!data.wishes?.length) {
            wishesList.innerHTML = `<div class="text-center text-[11px] text-[#8c7355]">Belum ada ucapan.</div>`;
            return;
        }

        data.wishes.forEach(w => addWishToList(w.name, w.wish));

    } catch (e) {
        console.error(e);
    }
}

function setSubmittingState(v) {
    submitBtn.disabled = v;
    btnLoader.classList.toggle('hidden', !v);
    btnText.textContent = v ? i18n[currentLang].submittingBtn : i18n[currentLang].submitBtn;
}

function setSubmittedState() {
    submitBtn.disabled = true;
    btnText.textContent = '✓ Submitted';
}

rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameField.value.trim();
    if (!name) {
        showToast(i18n[currentLang].msgNameRequired);
        return;
    }

    setSubmittingState(true);

    const payload = {
        name,
        status: statusField.value === 'hadir' ? 'Hadir' : 'Tidak Hadir',
        guests: statusField.value === 'hadir' ? Number(guestsField.value) : 0,
        wish: wishField.value.trim()
    };

    try {
        const res = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (result.status === 'success') {
            renderQr(result.guestId);
            await loadWishes();
            setSubmittedState();
            rsvpForm.reset();
            updateGuestFieldState();
        }

    } catch (err) {
        console.error(err);
        setSubmittingState(false);
    }
});

function initReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('active');
        });
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    loadWishes();
    changeLang('id');
    updateGuestFieldState();
});
