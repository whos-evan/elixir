selectedIcon('icon-home');

if (getAboutBlank() === 'on') {
    openPage('search');
    selectedIcon('icon-search');
}

setupCustomShortcut();

const $searchSelect = document.getElementById('searchSelect');
$searchSelect.value = getSearchEngine();

const $analyticsSelect = document.getElementById('analyticsSelect');
$analyticsSelect.value = getAnalytics();

const $aboutBlankSelect = document.getElementById('aboutBlankSelect');
$aboutBlankSelect.value = getAboutBlank();

// Check their preferred search engine
function getSearchEngine () {
    return localStorage.getItem('searchEngine') || 'Google';
}

function getAnalytics() {
    return localStorage.getItem('analytics') || 'on';
}

function setAnalytics() {
    const $analyticsSelect = document.getElementById('analyticsSelect');
    const analyticsPref = $analyticsSelect.value;
    if (analyticsPref === 'on') {
        localStorage.setItem('analytics', 'on');
    } else if (analyticsPref === 'off') {
        localStorage.setItem('analytics', 'off');
    }
    location.reload();
}

// analytics
if(localStorage.getItem('analytics') != 'off') {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('async', '');
    scriptTag.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-CX3B4NHEG0');
    document.head.appendChild(scriptTag);
    // gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());

    gtag('config', 'G-CX3B4NHEG0');
}

//ads
if (getAnalytics() === 'on') {
    var scriptTag = document.createElement('script');

    scriptTag.setAttribute('async', '');
    scriptTag.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9866124135272809');
    scriptTag.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(scriptTag);
}

// Set their preferred search engine
function setSearchEngine () {
    const $searchSelect = document.getElementById('searchSelect');
    const searchEngine = $searchSelect.value;
    if (searchEngine === 'Google') {
        localStorage.setItem('searchEngineURL', 'https://google.com/search?q=');
        localStorage.setItem('searchEngine', 'Google');
    } else if (searchEngine === 'DuckDuckGo') {
        localStorage.setItem('searchEngineURL', 'https://duckduckgo.com/?q=');
        localStorage.setItem('searchEngine', 'DuckDuckGo');
    } else if (searchEngine === 'Bing') {
        localStorage.setItem('searchEngineURL', 'https://bing.com/search?q=');
        localStorage.setItem('searchEngine', 'Bing');
    } else if (searchEngine === 'Brave Search') {
        localStorage.setItem('searchEngineURL', 'https://search.brave.com/search?q=');
        localStorage.setItem('searchEngine', 'Brave Search');
    }
}

// get search engine url
function getSearchEngineURL() {
    return localStorage.getItem('searchEngineURL') || 'https://google.com/search?q=';
}

function getAboutBlank() {
    if (localStorage.getItem('aboutBlank') === 'on') {
        var introText = document.getElementById("introText");
        introText.innerHTML = "<b>Elixir:</b><br>Search the web without censorship or tracking.</a>"

        var searchPlaceholder = document.querySelector("input");
        searchPlaceholder.placeholder = "Search here without tracking";

        return 'on';
    } else {
        return 'off';
    }
}

// Opens page in a new about:blank tab
function setAboutBlank() {
    const $aboutBlankSelect = document.getElementById('aboutBlankSelect');
    const aboutBlankSelect = $aboutBlankSelect.value;
    if (aboutBlankSelect === 'on') {
        localStorage.setItem('aboutBlank', 'on');
        openAboutBlank();
    } else if (aboutBlankSelect === 'off') {
        localStorage.setItem('aboutBlank', 'off');
    }
}

// opens page in about:blank
function openAboutBlank(url) {
    if (url === undefined) {
      var encoded_url = window.location.origin;
    }
    else {
      var encoded_url = url;
    }
    var w = open('about:blank', '_blank') || alert("It seems like you are blocking pop-ups. Please try again once you have allowed pop-ups.")
      w.document.write(`<iframe style="height: 100%; width: 100%; border: none;" src="${encoded_url}" allowfullscreen></iframe>`)
      w.document.body.style.margin = '0'
    window.location.replace(getSearchEngineURL()); 
}

function selectedIcon(icon) {
    const icons = document.querySelectorAll(`[id^="icon"]`);
    icons.forEach(element =>{
        element.classList.remove('sidebar-icon-selected');
    });
    document.getElementById(icon).classList.toggle('sidebar-icon-selected')
}


function openPage(page) {
    if (page === 'home') {
        document.getElementById("search").style.display = "none";
        document.getElementById("settings").style.display = "none";
        document.getElementById("home").style.display = "flex";
    } else if (page === 'search') {
        document.getElementById("home").style.display = "none";
        document.getElementById("settings").style.display = "none";
        document.getElementById("search").style.display = "flex";
    } else if (page === 'settings') {
        document.getElementById("home").style.display = "none";
        document.getElementById("search").style.display = "none";
        document.getElementById("settings").style.display = "flex";
    }
}

function setCustomShortcut() {
    const $shortcutURL = document.getElementById('shortcutURL');
    const $shortcutLogo = document.getElementById('shortcutLogo');

    if ($shortcutURL.value === '' && $shortcutLogo.value === '') {
        alert('Cleared custom shortcut');
        localStorage.removeItem('shortcutURL');
        localStorage.removeItem('shortcutLogo');
        setupCustomShortcut();
    } else if ($shortcutURL.value === '' || $shortcutLogo.value === '') {
        alert('Please fill out both fields');
    } else {
        if ($shortcutURL.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)) {
            localStorage.setItem('shortcutURL', $shortcutURL.value);
            localStorage.setItem('shortcutLogo', $shortcutLogo.value.charAt(0));
            alert('Shortcut set!');
            setupCustomShortcut();
        } else {
            alert('Please enter a valid URL');
        }
    }
}

function setupCustomShortcut() {
    if (localStorage.getItem('shortcutURL') != null) {
        document.getElementById('customShortcutIcon').innerHTML = localStorage.getItem('shortcutLogo');
        document.getElementById('customShortcutDiv').onclick = function() {openURL(localStorage.getItem('shortcutURL'))};
    }
}