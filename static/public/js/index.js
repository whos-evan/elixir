const form = document.querySelector("form");
const input = document.getElementById("searchInput");

// start of password protection
if (getPassword() == null) {
    openPage('home');
} else {
    openPage('password');
    document.getElementById('sidebar').style.display = 'none';
}

function getPassword() {
    return localStorage.getItem('password') || null;
}

function setPassword() {
    const $password = document.getElementById('password-set');
    const password = $password.value;
    if (password == null || password == '') {
        alert('Removed password');
        localStorage.removeItem('password');
        return;
    }
    if (confirm("Are you sure you want to password protect this page? If you do, you will not be able to access this page without the password. If you do not want to password protect this page, click cancel.") == true) {
        localStorage.setItem('password', password);
    }
}

function checkPassword() {
    const $password = document.getElementById('password-prompt');
    const password = $password.value;
    if (password == getPassword()) {
        openPage('home');
        document.getElementById('sidebar').style.display = 'flex';
    } else {
        window.location.href = getSearchEngineURL();
    }
}

function togglePassword() {
    var x = document.getElementById("passwordToggle");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// end of password protection

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
    .then(() => {
      if (!isUrl(url)) url = getSearchEngineURL() + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "http://" + url;

      if (getAboutBlank() === 'on') {
        openAboutBlank(window.location.href.slice(0, -1) + __uv$config.prefix + __uv$config.encodeUrl(url));
      } else {
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
      }
    });
};

selectedIcon('icon-home');

setupCloak();

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

// start of anaylitics functions

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

// analytics (change it if you want to enable it)
if(localStorage.getItem('analytics') != 'off') {
    var scriptTagGTAG = document.createElement('script');
    scriptTagGTAG.setAttribute('async', '');
    scriptTagGTAG.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-CX3B4NHEG0');
    document.head.appendChild(scriptTagGTAG);
    // gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());

    gtag('config', 'G-CX3B4NHEG0');

    // arc
    var scriptTagARC = document.createElement('script');
    scriptTagARC.setAttribute('async', '');
    scriptTagARC.setAttribute('src', 'https://arc.io/widget.min.js#85sFzH5m');
    document.head.appendChild(scriptTagARC);
}

// end of anaylitics functions

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

// Start of about:blank functions

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
// end of about:blank functions

// changes the selected icon
function selectedIcon(icon) {
    const icons = document.querySelectorAll(`[id^="icon"]`);
    icons.forEach(element =>{
        element.classList.remove('sidebar-icon-selected');
    });
    document.getElementById(icon).classList.toggle('sidebar-icon-selected')
}

// opens a certain page using css and hides the others
function openPage(page) {
    if (page === 'home') {
        document.getElementById("search").style.display = "none";
        document.getElementById("settings").style.display = "none";
        document.getElementById("home").style.display = "flex";
        document.getElementById("footer").style.display = "block";
        document.getElementById("password").style.display = "none";
    } else if (page === 'search') {
        document.getElementById("home").style.display = "none";
        document.getElementById("settings").style.display = "none";
        document.getElementById("search").style.display = "flex";
        document.getElementById("footer").style.display = "block";
        document.getElementById("password").style.display = "none";
    } else if (page === 'settings') {
        document.getElementById("home").style.display = "none";
        document.getElementById("search").style.display = "none";
        document.getElementById("settings").style.display = "flex";
        document.getElementById("footer").style.display = "none";
        document.getElementById("password").style.display = "none";
    } else if (page === 'password') {
        document.getElementById("home").style.display = "none";
        document.getElementById("search").style.display = "none";
        document.getElementById("settings").style.display = "none";
        document.getElementById("footer").style.display = "none";
        document.getElementById("password").style.display = "flex";
    }
}

// sets the custom shortcut
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

// changes the text on the custom shortcut and changes the onclick function to open the shortcut url
function setupCustomShortcut() {
    if (localStorage.getItem('shortcutURL') != null) {
        document.getElementById('customShortcutIcon').innerHTML = localStorage.getItem('shortcutLogo');
        document.getElementById('customShortcutDiv').onclick = function() {openURL(localStorage.getItem('shortcutURL'))};
    }
}

// sets the cloak
function setCloak() {
    const $cloakTitle = document.getElementById('cloakTitle');
    const $cloakFavicon = document.getElementById('cloakFavicon');

    if ($cloakTitle.value === '' && $cloakFavicon.value === '') {
        alert('Cleared cloak');
        localStorage.removeItem('cloakTitle');
        localStorage.removeItem('cloakFavicon');
    } else if ($cloakTitle.value === '' && $cloakFavicon.value != '') {
        if ($cloakFavicon.value.match(/(https?:\/\/).*/gi)) {
            localStorage.setItem('cloakFavicon', $cloakFavicon.value);
        }
    } else if ($cloakTitle.value != '' && $cloakFavicon.value === '') {
        localStorage.setItem('cloakTitle', $cloakTitle.value);
    } else {
        localStorage.setItem('cloakTitle', $cloakTitle.value);
        if ($cloakFavicon.value.match(/(https?:\/\/).*/gi)) {
            localStorage.setItem('cloakFavicon', $cloakFavicon.value);
        } else {
            alert('Please enter a valid URL like: https://example.com/favicon.ico');
        }
    }
    setupCloak();
}

// changes the text on the custom shortcut and changes the onclick function to open the shortcut url
function setupCloak() {
    if (localStorage.getItem('cloakTitle') != null) {
        document.title = localStorage.getItem('cloakTitle');
    }
    if (localStorage.getItem('cloakFavicon') != null) {
        changeFavicon(localStorage.getItem('cloakFavicon'));
    }
    if (localStorage.getItem('cloakTitle') == null && localStorage.getItem('cloakFavicon') == null) {
        document.title = 'Elixir - Blazingly Fast Math Help!';
        changeFavicon('favicon.ico');
    }
}

// changes the favicon
function changeFavicon(src) {
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
     document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
   }
   
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(window.location.origin + "/js/sw.js");
  }

// announcement code
function announcement(text) {
    document.getElementById("notification-text").innerHTML = text;
    document.getElementById("announcement").style.display = "block";
}

function fetchAnnouncement() {
    fetch("./assets/announcement.json")
    .then(response => response.json())
    .then(data => {
        // randonly selects an announcement
        const announcementText = data.announcements.sort();
        const randomAnnouncement = announcementText[Math.floor(Math.random() * announcementText.length)];
        const importantAnnouncement = data['important'][0]
        const superAnnouncement = data['super'][0]
        if (superAnnouncement != null) {
            announcement(superAnnouncement);
        } else {
            // randomly choose between important and normal announcement
            const random = Math.floor(Math.random() * 2);
            if (random === 0) {
                announcement(randomAnnouncement);
            } else {
                announcement(importantAnnouncement);
            }
        }
    });
}

function closeAnnouncement() {
    document.getElementById("announcement").style.display = "none";
    // dont show for 24 hours
    localStorage.setItem('announcement', Date.now());
}

function showAnnouncement() {
    // check if announcement has been shown in the last 24 hours
    if (localStorage.getItem('announcement') != null) {
        const lastShown = localStorage.getItem('announcement');
        const now = Date.now();
        const diff = now - lastShown;
        const hours = Math.floor(diff / 1000 / 60 / 60);
        if (hours > 2) {
            fetchAnnouncement();
        }
    } else {
        fetchAnnouncement();
    }
}

showAnnouncement();

// end of announcement code