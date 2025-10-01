// ===============================================
// 0. GOOGLE ANALYTICS (Movido para um ficheiro externo para evitar erros CSP)
// ===============================================
// Note: Este formato (IIFE) é necessário para evitar conflitos de variáveis e é a forma padrão de carregar GA.
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.googletagmanager.com/gtag/js?id=G-XVTW5TR4M8','gtag');

// Variáveis e chamadas do GA
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XVTW5TR4M8');


// --- 1. BENFICA SURVIVAL COUNTER ---
// Start date of Mourinho's tenure at Benfica: September 18, 2025 (10:00:00 AM WEST)
const benficaStartDate = new Date('September 18, 2025 10:00:00').getTime();
const counterElement = document.getElementById('benfica-timer');

function updateCounter() {
    // Utiliza a hora atual do PC do utilizador
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


// --- 2. MULTI-LANGUAGE PWA SUGGESTION MODAL ---

let deferredPrompt; // Variável para armazenar o evento de instalação
const modal = document.getElementById('pwa-suggestion-modal');
const installButton = document.getElementById('pwa-install-button');
const closeButton = document.getElementById('pwa-close-button');

// Objeto Translations
const translations = {
    'pt': {
        title: "Adicionar ao Ecrã Principal?",
        message: "Obtenha a experiência completa! Adicione esta página ao seu ecrã principal para acesso rápido, como uma aplicação.",
        install: "Instalar Aplicação",
        close: "Não, obrigado.",
        fallback: "Por favor, siga as instruções do seu navegador para 'Adicionar ao Ecrã Principal' (ou 'Instalar App')."
    },
    'en': {
        title: "Add to Home Screen?",
        message: "Get the full experience! Add this page to your home screen for quick, fullscreen access, just like an app.",
        install: "Install App",
        close: "No, thanks.",
        fallback: "Please follow your browser's instructions to 'Add to Home Screen' or 'Install App'."
    },
    'es': {
        title: "¿Añadir a la Pantalla de Inicio?",
        message: "¡Obtén la experiencia completa! Añade esta página a tu pantalla de inicio para un acceso rápido y a pantalla completa, como una aplicación.",
        install: "Instalar Aplicación",
        close: "No, gracias.",
        fallback: "Por favor, siga las instrucciones de su navegador para 'Añadir a la Pantalla de Inicio' o 'Instalar App'."
    },
    'fr': {
        title: "Ajouter à l'écran d'accueil?",
        message: "Bénéficiez de l'expérience complète! Ajoutez esta página à votre écran d'accueil para un accès rápido et en plein écran, como uma application.",
        install: "Installer l'application",
        close: "Non, merci.",
        fallback: "Veuillez suivre les instructions de votre navigateur pour 'Ajouter à l'écran d'accueil' ou 'Installer l'application'."
    },
    'it': {
        title: "Aggiungi alla schermata iniziale?",
        message: "Ottieni l'esperienza completa! Aggiungi questa pagina alla tua schermata iniziale per un accesso rapido e a schermo intero, proprio come un'app.",
        install: "Installa App",
        close: "No, grazie.",
        fallback: "Si prega di seguire le istruções del browser per 'Aggiungi a schermata iniziale' o 'Installa App'."
    },
};

let userLang = (navigator.language || navigator.userLanguage).slice(0, 2).toLowerCase();
const langData = translations[userLang] || translations['en'];

function applyTranslation() {
    document.getElementById('pwa-title').textContent = langData.title;
    document.getElementById('pwa-message').textContent = langData.message;
    installButton.textContent = langData.install;
    closeButton.textContent = langData.close;
}

function dismissModal() {
    modal.style.display = 'none';
    localStorage.setItem('pwaDismissed', 'true');
}

// O NAVEGADOR DISPARA ESTE EVENTO QUANDO PODE INSTALAR O PWA
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e; 
    // Mostra o modal se não foi dispensado e o PWA está pronto para ser instalado
    if (localStorage.getItem('pwaDismissed') !== 'true') {
         applyTranslation();
         modal.style.display = 'flex';
    }
});

closeButton.addEventListener('click', dismissModal);
installButton.addEventListener('click', () => {
    dismissModal();
    
    if (deferredPrompt) {
        // Tenta invocar a interface de instalação nativa
        deferredPrompt.prompt(); 
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null; 
        });
    } else {
        // Mensagem fallback (se o PWA não estiver pronto ou não for suportado)
        alert(langData.fallback); 
    }
});

// Fallback para ecrãs que não disparam 'beforeinstallprompt' imediatamente
window.addEventListener('load', () => {
    // Aplicamos a tradução na primeira carga
    applyTranslation();
    
    if (!deferredPrompt) {
         setTimeout(function() {
            if (!deferredPrompt && localStorage.getItem('pwaDismissed') !== 'true') {
                // Se o prompt não disparou, mostramos o modal manualmente
                modal.style.display = 'flex';
             }
         }, 3000); 
    }
});


// ====================================================================
// 3. REGISTO DO SERVICE WORKER (Movido e Corrigido para /service-worker.js)
// ====================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Usando o nome correto: service-worker.js
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker Registado com sucesso! Scope:', registration.scope);
            })
            .catch(error => {
                console.log('Falha no registo do Service Worker:', error);
            });
    });
}
