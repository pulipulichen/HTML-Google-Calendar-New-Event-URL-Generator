if ('serviceWorker' in navigator && false) {  // 不使用service-worker快取，這樣會無法安裝
//if ('serviceWorker' in navigator) {  
  navigator.serviceWorker.register('./service-worker.js')
    .then(function (registration) {
      // Registration was successful
      //console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {

      // registration failed
      console.log('ServiceWorker registration failed: ', err);
    });
}