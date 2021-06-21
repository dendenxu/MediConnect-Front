global.originalWebSocket = global.WebSocket;

export default function decorateWebSocket(origin, protocol) {
  console.log(`decorating: ${protocol}://${origin}`);
  class Decorated extends global.originalWebSocket {
    constructor(url, ...options) {
      let finalUrl = url;

      const token = localStorage.getItem('token');
      console.log(`'Getting token from localStorage:`);
      console.log(token);
      if (token) {
        const arr = url.split('?');
        const key = 'token';
        let split = '?';
        console.log(arr);
        if (url.length > 1 && arr[1]) {
          split = '&';
        }
        finalUrl = `${protocol}://${origin}${url}${split}${key}=${token}`;
      } else {
        finalUrl = `${protocol}://${origin}${url}`;
      }
      console.log(`Constructing new websocket url: ${finalUrl}`);
      super(finalUrl, ...options);
    }
  }

  global.WebSocket = Decorated;
}
