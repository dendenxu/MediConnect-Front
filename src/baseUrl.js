// remember the original fetch-function to delegate to
const originalFetch = global.fetch;

export default function applyBaseUrlToFetch(baseUrl) {
  // replace the global fetch() with our version where we prefix the given URL with a baseUrl
  global.fetch = (url, options) => {
    const finalUrl = baseUrl + url;
    console.log(`Apply base url: ${url}, result: ${finalUrl}`);
    return originalFetch(finalUrl, options);
  };
}
