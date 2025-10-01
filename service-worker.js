// O nome do Cache. MUDE O NÚMERO (v1, v2, v3...) sempre que atualizar a lista de ficheiros abaixo.
const CACHE_NAME = 'sack-one-cache-v2'; // Alterado para v2 para incluir limpeza e novos ficheiros

// A lista de todos os ficheiros críticos para o site funcionar offline
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json', // Ficheiro manifest
    '/favicon.png', // O ícone do site
    
    // Imagens Essenciais (Inferencia a partir do seu HTML)
    '/images/mourinho.jpg',
    '/images/trophies/champions.png',
    '/images/trophies/europa.png',
    '/images/trophies/league-pt.png',
    '/images/trophies/cup-pt.png',
    '/images/trophies/supercup-pt.png',
    // Adicione aqui os restantes ficheiros de imagem (trophies)
    
    // Fontes (A fonte principal do site para carregamento offline)
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap',
];

// 1. INSTALAÇÃO: Armazena os ficheiros essenciais no cache
self.addEventListener('install', event => {
    // self.skipWaiting() garante que o novo Service Worker assume o controlo imediatamente
    self.skipWaiting(); 
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache. Adding essential files.');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                 console.error('Falha ao adicionar ficheiros ao cache:', err);
            })
    );
});

// 2. BUSCA: Serve o ficheiro do cache se existir, caso contrário, vai buscar online
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - retorna a resposta guardada
                if (response) {
                    return response;
                }
                // Não está no cache, vai buscar online
                return fetch(event.request);
            })
    );
});

// 3. ATIVAÇÃO: Limpa as versões antigas do cache para que as atualizações funcionem
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Verifica se o nome do cache é diferente do nome atual (CACHE_NAME)
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Removendo cache antiga:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
