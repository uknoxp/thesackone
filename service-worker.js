// O nome do Cache. Mude para v3 se já tiver implementado a v2.
const CACHE_NAME = 'sack-one-cache-v3'; 

// A lista de todos os ficheiros críticos para o site funcionar offline
const urlsToCache = [
    '/',
    '/index.html',
    // CORRIGIDO: Adicionando o Manifest, que é essencial para o PWA!
    '/manifest.json', 
    '/favicon.png', 
    
    // Fontes (A fonte principal do site para carregamento offline)
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap',
    
    // Imagens Essenciais (Adicione aqui todos os ficheiros de imagem que usa)
    '/images/mourinho.jpg',
    '/images/trophies/champions.png',
    '/images/trophies/europa.png',
    '/images/trophies/league-pt.png',
    '/images/trophies/cup-pt.png',
    '/images/trophies/supercup-pt.png',
    // ... Adicione os restantes ficheiros de troféus e outras imagens aqui ...
];

// 1. INSTALAÇÃO: Armazena os ficheiros essenciais no cache
self.addEventListener('install', event => {
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
                    // Se o nome do cache não for o nome atual, ele é removido.
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Removendo cache antiga:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
