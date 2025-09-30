// --- 1. BENFICA SURVIVAL COUNTER (CORRIGIDO) ---
// Start date of Mourinho's tenure at Benfica: September 18, 2025 (10:00:00 AM WEST)
const benficaStartDate = new Date('September 18, 2025 10:00:00').getTime();
const counterElement = document.getElementById('benfica-timer');

function updateCounter() {
    const now = new Date().getTime();
    const difference = now - benficaStartDate;

    // Calculations
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Output in Days, Hours, Minutes, Seconds format
    counterElement.innerHTML = 
        `${days} DAYS, ${hours} HOURS, ${minutes} MINUTES, ${seconds} SECONDS`;
}

// CHAMA A FUNÇÃO PELA PRIMEIRA VEZ E DEPOIS INICIA O INTERVALO DE 1000ms (1 segundo)
updateCounter(); 
setInterval(updateCounter, 1000);

// --- 2. MULTI-LANGUAGE PWA SUGGESTION MODAL (NOVA VERSÃO COM INSTRUÇÕES) ---

const translations = {
    'pt': {
        title: "Adicionar ao Ecrã Principal?",
        message: "Obtenha o acesso mais rápido! Esta página pode ser adicionada ao seu ecrã principal para funcionar como uma app.",
        instructions_ios: "**Se usa Safari/iPhone:** Clique no ícone de partilha ($\uparrow$ ) e escolha \"Adicionar ao Ecrã Principal\".",
        instructions_android: "**Se usa Chrome/Android:** Clique no menu ($\vdots$ ) e escolha \"Instalar Aplicação\".",
        close: "Fechar e continuar",
    },
    'en': {
        title: "Add to Home Screen?",
        message: "Get the fastest access! This page can be added to your home screen to work just like an app.",
        instructions_ios: "**If you're on Safari/iPhone:** Click the share icon ($\uparrow$ ) and choose \"Add to Home Screen\".",
        instructions_android: "**If you're on Chrome/Android:** Click the menu ($\vdots$ ) and choose \"Install App\".",
        close: "Close and continue",
    },
    'es': {
        title: "¿Añadir a la Pantalla de Inicio?",
        message: "¡Obtén el acceso más rápido! Esta página puede añadirse a tu pantalla de inicio para funcionar como una aplicación.",
        instructions_ios: "**Si usas Safari/iPhone:** Haz clic en el icono de compartir ($\uparrow$ ) y elige \"Añadir a la Pantalla de Inicio\".",
        instructions_android: "**Si usas Chrome/Android:** Haz clic en el menú ($\vdots$ ) y elige \"Instalar Aplicación\".",
        close: "Cerrar y continuar",
    },
    'fr': {
        title: "Ajouter à l'écran d'accueil?",
        message: "Obtenez l'accès le plus rapide ! Cette page peut être ajoutée à votre écran d'accueil pour fonctionner comme une application.",
        instructions_ios: "**Si vous utilisez Safari/iPhone:** Cliquez sur l'icône de partage ($\uparrow$ ) et choisissez \"Ajouter à l'écran d'accueil\".",
        instructions_android: "**Si vous utilisez Chrome/Android:** Cliquez sur le menu ($\vdots$ ) et choisissez \"Installer l'application\".",
        close: "Fermer et continuer",
    },
    'it': {
        title: "Aggiungi alla schermata iniziale?",
        message: "Ottieni l'accesso più rapido! Questa pagina può essere aggiunta alla tua schermata iniziale per funzionare come un'app.",
        instructions_ios: "**Se usi Safari/iPhone:** Clicca sull'icona di condivisione ($\uparrow$ ) e scegli \"Aggiungi alla schermata iniziale\".",
        instructions_android: "**Se usi Chrome/Android:** Clicca sul menu ($\vdots$ ) e scegli \"Installa App\".",
        close: "Chiudi e continua",
    },
};

const modal = document.getElementById('pwa-suggestion-modal');
const closeButton = document.getElementById('pwa-close-button');
const instructionsIOS = document.getElementById('pwa-instructions-ios');
const instructionsAndroid = document.getElementById('pwa-instructions-android');


let userLang = (navigator.language || navigator.userLanguage).slice(0, 2).toLowerCase();
const langData = translations[userLang] || translations['en'];

function detectBrowser() {
    const ua = navigator.userAgent;
    
    // Simple check for Android/Chrome or iOS/Safari
    if (/android/i.test(ua) && /chrome/i.test(ua)) {
        instructionsAndroid.style.display = 'block';
        instructionsAndroid.innerHTML = langData.instructions_android;
    } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        instructionsIOS.style.display = 'block';
        instructionsIOS.innerHTML = langData.instructions_ios;
    }
}

function applyTranslation() {
    document.getElementById('pwa-title').textContent = langData.title;
    document.getElementById('pwa-message').textContent = langData.message;
    closeButton.textContent = langData.close;
    detectBrowser(); // Call detection after translation
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
    setTimeout(showModal, 3000); // Show 3 seconds after load
});