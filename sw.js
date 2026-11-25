// 離線快取：先用網路拿最新版，沒網路時用快取
// 音檔不預先下載（太多），播放過一次就會被快取，之後離線也能播
const CACHE = 'hk-cantonese-v6';
const FILES = ['./', './index.html', './lessons.js', './patterns.js', './stories.js', './content-muse.js', './weekly.js', './codemix.js', './vendor/to-jyutping.js', './audio-map.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // 音檔：先用快取；沒有就下載完整檔案（不用分段）存起來，之後離線也能播
  if (new URL(e.request.url).pathname.includes('/audio/')) {
    const url = e.request.url.split('#')[0];
    e.respondWith(caches.open(CACHE).then(c => c.match(url).then(hit => hit || fetch(url).then(res => {
      if (res.ok && res.status === 200) c.put(url, res.clone());
      return res;
    }))));
    return;
  }
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
