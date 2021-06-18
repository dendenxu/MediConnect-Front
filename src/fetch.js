// remember the original fetch-function to delegate to
const originalFetch = global.fetch;

export default function decorateFetch(origin) {
  // replace the global fetch() with our version where we prefix the given URL with a baseUrl
  // and add credentials: "include" to make the broser use cookies
  let protocol = process.env.REACT_APP_FIXED_RESOURCE_PROTOCOL;
  if (protocol === '' || protocol === undefined) {
    // eslint-disable-next-line no-restricted-globals
    protocol = location.protocol;
  }
  const baseUrl = `${protocol}//${origin}`;
  global.fetch = (url, options) => {
    const finalUrl = baseUrl + url;
    const finalOptions = options; // getting a reference
    finalOptions.credentials = 'include';
    console.warn(`Apply base url: ${url}, result: ${finalUrl}`);
    console.warn(`Modifying credentials to: include`);
    return originalFetch(finalUrl, finalOptions);
  };
}
