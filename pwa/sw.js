const cacheName = 'f1app-v2.5';

const staticAssets = [
    './app.html',
    './app.js',
    './style.css',
    './manifest.json',
    './data.json',

    './F1_safety_cars.jpg',
    './Fale_F1_Monza_2004_73.jpg',
    './Ferrari_Tipo_065-6_Engine_and_Mercedes_AMG_F1_W10_EQ_Power+_MGU-K_at_Formula_1_Exhibition,_London.jpg',
    './FIA_F1_Austria_2022_Podium_Race_(1).jpg',
    './freesound_community-f1-car-passing-66782.mp3',
    './RB7_adjustable_rear_wing.jpg',
    './Umpir.ump.edu.my_581_1_Ridhwan_Che_Zake.jpg',

    './icon-192-new.png',
    './icon-512-new.png'
];

self.addEventListener('install', event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(staticAssets);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== cacheName) {
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached || fetch(request);
}