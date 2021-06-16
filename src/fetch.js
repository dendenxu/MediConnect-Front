// remember the original fetch-function to delegate to
const originalFetch = global.fetch;

export default function decorateFetch(baseUrl) {
  // replace the global fetch() with our version where we prefix the given URL with a baseUrl
  // and add credentials: "include" to make the broser use cookies
  global.fetch = (url, options) => {
    const finalUrl = baseUrl + url;
    const finalOptions = options; // getting a reference
    finalOptions.credentials = 'include';
    console.warn(`Apply base url: ${url}, result: ${finalUrl}`);
    console.warn(`Modifying credentials to: include`);
    return originalFetch(finalUrl, finalOptions);
  };
}
