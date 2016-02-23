// Simple script loader based on https://bradb.net/blog/promise-based-js-script-loader/
// Feel free to replace if you find a good library!

const load = url => new Promise((resolve, reject) => {
  let ready = false;

  const lastScript = document.getElementsByTagName('script')[0];
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = url;
  script.async = true;
  script.onload = script.onreadystatechange = function checkIfLoaded() {
    if (!ready && (!this.readyState || this.readyState === 'complete')) {
      ready = true;
      resolve(this);
    }
  };
  script.onerror = script.onabort = reject;
  lastScript.parentNode.insertBefore(script, lastScript);
});

export default function (input) {
  if (Array.isArray(input)) {
    const loads = input.map(url => load(url));
    return Promise.all(loads);
  }

  return load(input);
}
