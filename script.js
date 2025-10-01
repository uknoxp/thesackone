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

  counterElement.textContent =
    `${days} DAYS, ${hours} HOURS, ${minutes} MINUTES, ${seconds} SECONDS`;
}

updateCounter();
setInterval(updateCounter, 1000);

// --- 2. MULTI-LANGUAGE PWA MODAL ---
const translations = {
  pt: {
    title: "Adicionar ao Ecrã Principal?",
    message: "Obtenha o acesso mais rápido! Esta página pode ser adicionada ao seu ecrã principal.",
    instructions_ios: "Se usa Safari/iPhone: clique no ícone de partilha e escolha \"Adicionar ao Ecrã Principal\".",
    instructions_android: "Se usa Chrome/Android: clique no menu (3 pontos) e escolha \"Instalar Aplicação\".",
    close: "Fechar e continuar",
  },
  en: {
    title: "Add to Home Screen?",
    message: "Get the fastest access! This page can be added to your home screen.",
    instructions_ios: "If you're on Safari/iPhone: click the share icon and choose \"Add to Home Screen\".",
    instructions_android: "If you're on Chrome/Android: click the menu (3 dots) and choose \"Install App\".",
    close: "Close and continue",
  },
  es: {
    title: "¿Añadir a la Pantalla de Inicio?",
    message: "¡Obtén el acceso más rápido! Esta página puede añadirse a tu pantalla de inicio.",
    instructions_ios: "Si usas Safari/iPhone: haz clic en el icono de compartir y elige \"Añadir a la Pantalla de Inicio\".",
    instructions_android: "Si usas Chrome/Android: haz clic en el menú (3 Puntos) y elige \"Instalar Aplicación\".",
    close: "Cerrar y continuar",
  }
};

const modal = document.getElementById('pwa-suggestion-modal');
const closeButton = document.getElementById('pwa-close-button');
const instructionsIOS = document.getElementById('pwa-instructions-ios');
const instructionsAndroid = document.getElementById('pwa-instructions-android');

let userLang = (navigator.language || navigator.userLanguage || "en").slice(0, 2).toLowerCase();
const langData = translations[userLang] || translations['en'];

function detectBrowser() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua) && /chrome/i.test(ua)) {
    instructionsAndroid.style.display = 'block';
    instructionsAndroid.textContent = langData.instructions_android;
  } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    instructionsIOS.style.display = 'block';
    instructionsIOS.textContent = langData.instructions_ios;
  }
}

function applyTranslation() {
  document.getElementById('pwa-title').textContent = langData.title;
  document.getElementById('pwa-message').textContent = langData.message;
  closeButton.textContent = langData.close;
  detectBrowser();
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
window.addEventListener('load', () => setTimeout(showModal, 3000));
