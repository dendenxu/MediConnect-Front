/* eslint-disable no-param-reassign */
// remember the original fetch-function to delegate to
const originalFetch = global.fetch;

export default function decorateFetch(origin, protocol) {
  // replace the global fetch() with our version where we prefix the given URL with a baseUrl
  // and add credentials: "include" to make the broser use cookies
  if (!protocol) {
    // eslint-disable-next-line no-restricted-globals
    protocol = location.protocol;
  }
  const baseUrl = `${protocol}://${origin}`;
  global.fetch = (url, options) => {
    const finalUrl = baseUrl + url;
    const finalOptions = options || { headers: {} }; // getting a reference
    finalOptions.credentials = 'include';
    const token = localStorage.getItem('token');
    console.log(`'Getting token from localStorage: ${token}`);
    if (token) {
      finalOptions.headers.Authorization = `Bearer ${token}`;
      console.log(`Updated finalOptions: ${finalOptions}`);
    }
    console.warn(`Apply base url: ${url}, result: ${finalUrl}`);
    console.warn(`Modifying credentials to: include`);
    return originalFetch(finalUrl, finalOptions);
  };
}
