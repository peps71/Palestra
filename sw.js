// Fa funzionare l'app anche senza rete (in palestra il campo va e viene).
// Pagina: prima la rete, se manca la copia salvata. Icone e manifesto: la copia salvata.
// Ad ogni nuova versione dell'app cambia VERSIONE.
const VERSIONE = "palestra-v1";
const FILE = ["./", "./index.html", "./manifest.webmanifest", "./icona-180.png", "./icona-192.png", "./icona-512.png", "./icona-32.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSIONE).then((c) => c.addAll(FILE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((n) => n !== VERSIONE).map((n) => caches.delete(n)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Firebase e Google Fonts vanno per conto loro
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(VERSIONE).then((x) => x.put("./index.html", c)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then((r) => r || fetch(req)));
});
