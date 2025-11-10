const cacheName = "v1";

// --- Cache-implementáció ---
async function impl(e) {
    let cache = await caches.open(cacheName);
    let cacheResponse = await cache.match(e.request);
    if (cacheResponse) {
        return cacheResponse;
    } else {
        let networkResponse = await fetch(e.request);
        cache.put(e.request, networkResponse.clone());
        return networkResponse;
    }
}
self.addEventListener("fetch", e => e.respondWith(impl(e)));

self.addEventListener("push", e => {

    const dataText = e.data?.text() || "Új üzenet érkezett!";

    const promiseChain = self.registration.showNotification("Chat Notification", {
        body: dataText,
    });

    e.waitUntil(promiseChain);
});
