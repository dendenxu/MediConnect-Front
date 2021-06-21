const originalWebSocket = global.WebSocket;

export default function decorateWebSocket() {
  class Decorated extends WebSocket {
    constructor(url, ...options) {
      let finalUrl = url;

      const token = localStorage.getItem('token');
      console.log(`'Getting token from localStorage: ${token}`);
      if (token) {
        const arr = url.split('?');
        console.log(arr);
        if (url.length > 1 && arr[1]) {
          console.log('Found parameters....');
          finalUrl = `${url}&token=${token}`;
        } else {
          finalUrl = `${url}?token=${token}`;
        }
      }
      super(finalUrl, ...options);
    }
  }

  global.WebSocket = Decorated;
}
