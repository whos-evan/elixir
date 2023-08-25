const form = document.querySelector("form");
const input = document.getElementById("searchInput");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = input.value.trim();
    openURL(url);
});
  
function isUrl(val = "") {
    if (
        /^http(s?):\/\//.test(val) ||
        (val.includes(".") && val.substr(0, 1) !== " ")
    )
        return true;
    return false;
}

// open url function
function openURL(url) {
    window.navigator.serviceWorker
    .register("./uv.js", {
      scope: __uv$config.prefix,
    })
    .then(() => { // Missing function declaration was fixed
        if (!isUrl(url)) url = getSearchEngineURL() + url;
        else if (!(url.startsWith("https://") || url.startsWith("http://")))
            url = "http://" + url;

        // Logic to actually open the URL would go here
        // For example:
        // window.open(url, '_blank');
    });
}

// Check their preferred search engine
// Hardcoded as 'Google'
function getSearchEngine() {
    return 'Google';
}

// get search engine url
// Hardcoded as Google Search URL
function getSearchEngineURL() {
    return 'https://google.com/search?q=';
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(window.location.origin + "/js/sw.js");
}
