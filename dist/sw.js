const CACHE_NAME = "my-cache"
self.addEventListener("install", (e) => {
	console.log("installing sw");
	e.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll([
					"/",
					"../index.html",
			])
		.then(() => self.skipWaiting());
	}));
});

self.addEventListener('activate', (e) => {
	console.log("activating sw");
	e.waitUntil(self.clients.claim());
});