const C='davinia-v3',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{const c=await caches.open(C);try{const r=await Promise.race([fetch(e.request,{cache:'no-cache'}),new Promise((_,j)=>setTimeout(j,3000))]);c.put(e.request,r.clone());return r}catch(x){return (await c.match(e.request))||(await c.match('./index.html'))||Response.error()}})())});
