const CACHE = 'sensor-note-v17';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // 네트워크 우선. 캐시가 있으면 2.5초 넘을 때 캐시로(신호 약한 곳), 캐시가 없으면 네트워크를 끝까지 기다림.
    // (예전: 캐시가 없을 때 index.html을 대신 돌려줘서 느린 망에서 노트 그림이 빈칸으로 보이는 문제)
    const net = fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; });
    e.respondWith(caches.match(req).then(cached => {
      if (!cached) return net.catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error());
      return Promise.race([net, new Promise(res => setTimeout(() => res(cached), 2500))]).catch(() => cached);
    }));
  } else if (url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); return res; })));
  }
});
