import 'zone.js';
import { initFederation } from '@angular-architects/native-federation';

const isProd = location.hostname !== 'localhost';

const manifest = {
  analytics: isProd
    ? 'https://nexus-analytics-pink.vercel.app/remoteEntry.json'
    : 'http://localhost:4201/remoteEntry.json',
};

initFederation(manifest, {
  hostRemoteEntry: { url: './remoteEntry.json' }
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));