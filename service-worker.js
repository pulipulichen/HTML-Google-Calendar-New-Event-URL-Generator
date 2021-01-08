/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/* global self, caches */

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v2020-1130-0624';
const RUNTIME = 'runtime';

/**
 * How to build cache list?
 * 
 * 1. FilelistCreator 
 * 2. String replace
 */

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  './index.html',
  
  //'./dist/', // Alias for index.html
   './components/float-action-button.less',
  './components/float-action-button.vue',
  './components/replace-panel.less',
  './components/replace-panel.vue',
  './components/template.less',
  './components/template.vue',
  './components/textarea-editor.less',
  './components/textarea-editor.vue',
  './img/favicon/android-icon-144x144.png',
  './img/favicon/android-icon-192x192.png',
  './img/favicon/android-icon-36x36.png',
  './img/favicon/android-icon-48x48.png',
  './img/favicon/android-icon-72x72.png',
  './img/favicon/android-icon-96x96.png',
  './img/favicon/apple-icon-114x114.png',
  './img/favicon/apple-icon-120x120.png',
  './img/favicon/apple-icon-144x144.png',
  './img/favicon/apple-icon-152x152.png',
  './img/favicon/apple-icon-180x180.png',
  './img/favicon/apple-icon-57x57.png',
  './img/favicon/apple-icon-60x60.png',
  './img/favicon/apple-icon-72x72.png',
  './img/favicon/apple-icon-76x76.png',
  './img/favicon/apple-icon-precomposed.png',
  './img/favicon/apple-icon.png',
  './img/favicon/browserconfig.xml',
  './img/favicon/favicon-16x16.png',
  './img/favicon/favicon-32x32.png',
  './img/favicon/favicon-96x96.png',
  './img/favicon/favicon.ico',
  './img/favicon/favicon.png',
  './img/favicon/manifest.json',
  './img/favicon/ms-icon-144x144.png',
  './img/favicon/ms-icon-150x150.png',
  './img/favicon/ms-icon-310x310.png',
  './img/favicon/ms-icon-70x70.png',
  './img/favicon/README.md',
  './scripts/vue-app-components.js',
  './scripts/vue-app-computed.js',
  './scripts/vue-app-data.js',
  './scripts/vue-app-methods.js',
  './scripts/vue-app-mounted.js',
  './scripts/vue-app-watch.js',
  './scripts/vue-app.js',
  './styles/import.less',
  './styles/styles.less',
  './vendors/dom-to-img/dom-to-image.min.js',
  './vendors/dom-to-img/README.md',
  './vendors/Floating-Action-Button-jQuery-CSS3/css/index.css',
  './vendors/Floating-Action-Button-jQuery-CSS3/js/index.js',
  './vendors/hotkeys/hotkeys.min.js',
  './vendors/jquery/jquery.min.js',
  './vendors/less/less.min.js',
  './vendors/semantic-ui/components/accordion.css',
  './vendors/semantic-ui/components/accordion.js',
  './vendors/semantic-ui/components/accordion.min.css',
  './vendors/semantic-ui/components/accordion.min.js',
  './vendors/semantic-ui/components/ad.css',
  './vendors/semantic-ui/components/ad.min.css',
  './vendors/semantic-ui/components/api.js',
  './vendors/semantic-ui/components/api.min.js',
  './vendors/semantic-ui/components/breadcrumb.css',
  './vendors/semantic-ui/components/breadcrumb.min.css',
  './vendors/semantic-ui/components/button.css',
  './vendors/semantic-ui/components/button.min.css',
  './vendors/semantic-ui/components/card.css',
  './vendors/semantic-ui/components/card.min.css',
  './vendors/semantic-ui/components/checkbox.css',
  './vendors/semantic-ui/components/checkbox.js',
  './vendors/semantic-ui/components/checkbox.min.css',
  './vendors/semantic-ui/components/checkbox.min.js',
  './vendors/semantic-ui/components/colorize.js',
  './vendors/semantic-ui/components/colorize.min.js',
  './vendors/semantic-ui/components/comment.css',
  './vendors/semantic-ui/components/comment.min.css',
  './vendors/semantic-ui/components/container.css',
  './vendors/semantic-ui/components/container.min.css',
  './vendors/semantic-ui/components/dimmer.css',
  './vendors/semantic-ui/components/dimmer.js',
  './vendors/semantic-ui/components/dimmer.min.css',
  './vendors/semantic-ui/components/dimmer.min.js',
  './vendors/semantic-ui/components/divider.css',
  './vendors/semantic-ui/components/divider.min.css',
  './vendors/semantic-ui/components/dropdown.css',
  './vendors/semantic-ui/components/dropdown.js',
  './vendors/semantic-ui/components/dropdown.min.css',
  './vendors/semantic-ui/components/dropdown.min.js',
  './vendors/semantic-ui/components/embed.css',
  './vendors/semantic-ui/components/embed.js',
  './vendors/semantic-ui/components/embed.min.css',
  './vendors/semantic-ui/components/embed.min.js',
  './vendors/semantic-ui/components/feed.css',
  './vendors/semantic-ui/components/feed.min.css',
  './vendors/semantic-ui/components/flag.css',
  './vendors/semantic-ui/components/flag.min.css',
  './vendors/semantic-ui/components/form.css',
  './vendors/semantic-ui/components/form.js',
  './vendors/semantic-ui/components/form.min.css',
  './vendors/semantic-ui/components/form.min.js',
  './vendors/semantic-ui/components/grid.css',
  './vendors/semantic-ui/components/grid.min.css',
  './vendors/semantic-ui/components/header.css',
  './vendors/semantic-ui/components/header.min.css',
  './vendors/semantic-ui/components/icon.css',
  './vendors/semantic-ui/components/icon.min.css',
  './vendors/semantic-ui/components/image.css',
  './vendors/semantic-ui/components/image.min.css',
  './vendors/semantic-ui/components/input.css',
  './vendors/semantic-ui/components/input.min.css',
  './vendors/semantic-ui/components/item.css',
  './vendors/semantic-ui/components/item.min.css',
  './vendors/semantic-ui/components/label.css',
  './vendors/semantic-ui/components/label.min.css',
  './vendors/semantic-ui/components/list.css',
  './vendors/semantic-ui/components/list.min.css',
  './vendors/semantic-ui/components/loader.css',
  './vendors/semantic-ui/components/loader.min.css',
  './vendors/semantic-ui/components/menu.css',
  './vendors/semantic-ui/components/menu.min.css',
  './vendors/semantic-ui/components/message.css',
  './vendors/semantic-ui/components/message.min.css',
  './vendors/semantic-ui/components/modal.css',
  './vendors/semantic-ui/components/modal.js',
  './vendors/semantic-ui/components/modal.min.css',
  './vendors/semantic-ui/components/modal.min.js',
  './vendors/semantic-ui/components/nag.css',
  './vendors/semantic-ui/components/nag.js',
  './vendors/semantic-ui/components/nag.min.css',
  './vendors/semantic-ui/components/nag.min.js',
  './vendors/semantic-ui/components/placeholder.css',
  './vendors/semantic-ui/components/placeholder.min.css',
  './vendors/semantic-ui/components/popup.css',
  './vendors/semantic-ui/components/popup.js',
  './vendors/semantic-ui/components/popup.min.css',
  './vendors/semantic-ui/components/popup.min.js',
  './vendors/semantic-ui/components/progress.css',
  './vendors/semantic-ui/components/progress.js',
  './vendors/semantic-ui/components/progress.min.css',
  './vendors/semantic-ui/components/progress.min.js',
  './vendors/semantic-ui/components/rail.css',
  './vendors/semantic-ui/components/rail.min.css',
  './vendors/semantic-ui/components/rating.css',
  './vendors/semantic-ui/components/rating.js',
  './vendors/semantic-ui/components/rating.min.css',
  './vendors/semantic-ui/components/rating.min.js',
  './vendors/semantic-ui/components/reset.css',
  './vendors/semantic-ui/components/reset.min.css',
  './vendors/semantic-ui/components/reveal.css',
  './vendors/semantic-ui/components/reveal.min.css',
  './vendors/semantic-ui/components/search.css',
  './vendors/semantic-ui/components/search.js',
  './vendors/semantic-ui/components/search.min.css',
  './vendors/semantic-ui/components/search.min.js',
  './vendors/semantic-ui/components/segment.css',
  './vendors/semantic-ui/components/segment.min.css',
  './vendors/semantic-ui/components/shape.css',
  './vendors/semantic-ui/components/shape.js',
  './vendors/semantic-ui/components/shape.min.css',
  './vendors/semantic-ui/components/shape.min.js',
  './vendors/semantic-ui/components/sidebar.css',
  './vendors/semantic-ui/components/sidebar.js',
  './vendors/semantic-ui/components/sidebar.min.css',
  './vendors/semantic-ui/components/sidebar.min.js',
  './vendors/semantic-ui/components/site.css',
  './vendors/semantic-ui/components/site.js',
  './vendors/semantic-ui/components/site.min.css',
  './vendors/semantic-ui/components/site.min.js',
  './vendors/semantic-ui/components/state.js',
  './vendors/semantic-ui/components/state.min.js',
  './vendors/semantic-ui/components/statistic.css',
  './vendors/semantic-ui/components/statistic.min.css',
  './vendors/semantic-ui/components/step.css',
  './vendors/semantic-ui/components/step.min.css',
  './vendors/semantic-ui/components/sticky.css',
  './vendors/semantic-ui/components/sticky.js',
  './vendors/semantic-ui/components/sticky.min.css',
  './vendors/semantic-ui/components/sticky.min.js',
  './vendors/semantic-ui/components/tab.css',
  './vendors/semantic-ui/components/tab.js',
  './vendors/semantic-ui/components/tab.min.css',
  './vendors/semantic-ui/components/tab.min.js',
  './vendors/semantic-ui/components/table.css',
  './vendors/semantic-ui/components/table.min.css',
  './vendors/semantic-ui/components/transition.css',
  './vendors/semantic-ui/components/transition.js',
  './vendors/semantic-ui/components/transition.min.css',
  './vendors/semantic-ui/components/transition.min.js',
  './vendors/semantic-ui/components/video.css',
  './vendors/semantic-ui/components/video.js',
  './vendors/semantic-ui/components/video.min.css',
  './vendors/semantic-ui/components/video.min.js',
  './vendors/semantic-ui/components/visibility.js',
  './vendors/semantic-ui/components/visibility.min.js',
  './vendors/semantic-ui/components/visit.js',
  './vendors/semantic-ui/components/visit.min.js',
  './vendors/semantic-ui/themes/default/assets/fonts/brand-icons.eot',
  './vendors/semantic-ui/themes/default/assets/fonts/brand-icons.svg',
  './vendors/semantic-ui/themes/default/assets/fonts/brand-icons.ttf',
  './vendors/semantic-ui/themes/default/assets/fonts/brand-icons.woff',
  './vendors/semantic-ui/themes/default/assets/fonts/brand-icons.woff2',
  './vendors/semantic-ui/themes/default/assets/fonts/icons.eot',
  './vendors/semantic-ui/themes/default/assets/fonts/icons.otf',
  './vendors/semantic-ui/themes/default/assets/fonts/icons.svg',
  './vendors/semantic-ui/themes/default/assets/fonts/icons.ttf',
  './vendors/semantic-ui/themes/default/assets/fonts/icons.woff',
  './vendors/semantic-ui/themes/default/assets/fonts/icons.woff2',
  './vendors/semantic-ui/themes/default/assets/fonts/outline-icons.eot',
  './vendors/semantic-ui/themes/default/assets/fonts/outline-icons.svg',
  './vendors/semantic-ui/themes/default/assets/fonts/outline-icons.ttf',
  './vendors/semantic-ui/themes/default/assets/fonts/outline-icons.woff',
  './vendors/semantic-ui/themes/default/assets/fonts/outline-icons.woff2',
  './vendors/semantic-ui/themes/default/assets/images/flags.png',
  './vendors/semantic-ui/.versions',
  './vendors/semantic-ui/LICENSE',
  './vendors/semantic-ui/package.js',
  './vendors/semantic-ui/package.json',
  './vendors/semantic-ui/README.md',
  './vendors/semantic-ui/semantic.css',
  './vendors/semantic-ui/semantic.js',
  './vendors/semantic-ui/semantic.min.css',
  './vendors/semantic-ui/semantic.min.js',
  './vendors/vue/httpVueLoader.js',
  './vendors/vue/vue.min.js',
  './vendors/date-helper.js',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});