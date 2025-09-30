// --- 1. BENFICA SURVIVAL COUNTER ---
const benficaStartDate = new Date('September 18, 2025 10:00:00').getTime();
const counterElement = document.getElementById('benfica-timer');

function updateCounter() {
    const now = new Date().getTime();
    const difference = now - benficaStartDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    counterElement.innerHTML =
        `${days} DAYS, ${hours} HOURS, ${minutes} MINUTES, ${seconds} SECONDS`;
}

updateCounter();
setInterval(updateCounter, 1000);

// --- 2. MULTI-LANGUAGE PWA SUGGESTION MODAL ---
const translations = {
    pt: {
        title: "Adicionar ao Ecrã Principal?",
        message: "Obtenha o acesso mais rápido! Esta página pode ser adicionada ao seu ecrã principal para funcionar como uma app.",
        instructions_ios: "Se usa Safari/iPhone: Clique no ícone de partilha e escolha \"Adicionar ao Ecrã Principal\".",
        instructions_android: "Se usa Chrome/Android: Clique no menu (3 Pontos) e escolha \"Instalar Aplicação\".",
        close: "Fechar e continuar",
    },
    en: {
        title: "Add to Home Screen?",
        message: "Get the fastest access! This page can be added to your home screen to work just like an app.",
        instructions_ios: "If you're on Safari/iPhone: Click the share icon and choose \"Add to Home Screen\".",
        instructions_android: "If you're on Chrome/Android: Click the menu (3 Dots) and choose \"Install App\".",
        close: "Close and continue",
    },
    es: {
        title: "¿Añadir a la Pantalla de Inicio?",
        message: "¡Obtén el acceso más rápido! Esta página puede añadirse a tu pantalla de inicio para funcionar como una aplicación.",
        instructions_ios: "Si usas Safari/iPhone: Haz clic en el icono de compartir y elige \"Añadir a la Pantalla de Inicio\".",
        instructions_android: "Si usas Chrome/Android: Haz clic en el menú (3 Puntos) y elige \"Instalar Aplicación\".",
        close: "Cerrar y continuar",
    },
    fr: {
        title: "Ajouter à l'écran d'accueil?",
        message: "Obtenez l'accès le plus rapide ! Cette page peut être ajoutée à votre écran d'accueil pour fonctionner comme une application.",
        instructions_ios: "Si vous utilisez Safari/iPhone: Cliquez sur l'icône de partage et choisissez \"Ajouter à l'écran d'accueil\".",
        instructions_android: "Si vous utilisez Chrome/Android: Cliquez sur le menu (3 Points) et choisissez \"Installer l'application\".",
        close: "Fermer et continuer",
    },
    it: {
        title: "Aggiungi alla schermata iniziale?",
        message: "Ottieni l'accesso più rapido! Questa pagina può essere aggiunta alla tua schermata iniziale per funzionare come un'app.",
        instructions_ios: "Se usi Safari/iPhone: Clicca sull'icona di condivisione e scegli \"Aggiungi alla schermata iniziale\".",
        instructions_android: "Se usi Chrome/Android: Clicca sul menu (3 Punti) e scegli \"Installa App\".",
        close: "Chiudi e continua",
    },
};

const modal = document.getElementById('pwa-modal');
const closeButton = modal.querySelector('.close-btn');
let userLang = (navigator.language || navigator.userLanguage).slice(0, 2).toLowerCase();
const langData = translations[userLang] || translations['en'];

function detectBrowser() {
    const ua = navigator.userAgent;
    let instructions = "";

    if (/android/i.test(ua) && /chrome/i.test(ua)) {
        instructions = langData.instructions_android;
    } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        instructions = langData.instructions_ios;
    }
    return instructions;
}

function applyTranslation() {
    modal.querySelector('h4').textContent = langData.title;
    modal.querySelector('p').textContent = langData.message + " " + detectBrowser();
    closeButton.textContent = langData.close;
}

function showModal() {
    if (localStorage.getItem('pwaDismissed') !== 'true') {
        applyTranslation();
        modal.style.display = 'flex';
    }
}

function dismissModal() {
    modal.style.display = 'none';
    localStorage.setItem('pwaDismissed', 'true');
}

closeButton.addEventListener('click', dismissModal);

window.addEventListener('load', () => {
    setTimeout(showModal, 3000);
});
