const CACHE="calisthenics-tracker-v1";
const CORE=["./","./index.html","./css/style.css","./js/app.js","./data/exercises.json","./manifest.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener("fetch",e=>{if(e.request.method==="GET" && new URL(e.request.url).origin===location.origin)e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
