function init() {
    let mdPath = getAnchor();
    if (mdPath !== "") {
        loadWebPage(mdPath, loadViewer);
    }
    setMenuShow();
}

function loadViewer(content) {
    const Viewer = toastui.Editor;
    const codeSyntaxHighlight = Viewer.plugin.codeSyntaxHighlight;
    const viewer = new Viewer({
        el: document.querySelector("#viewer"),
        initialValue: content,
        plugins: [codeSyntaxHighlight],
    });
}

function loadWebPage(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + ".md");

    xhr.responseType = "text";

    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };

    xhr.send();
}

function getAnchor() {
    let url = decodeURI(location.href);
    return url.substring(url.indexOf("#") + 1, url.length);
}

function getParameter(param) {
    let url = decodeURI(location.href);
    let paramArr = url
        .substring(url.indexOf("#") + 1, url.length)
        .split("&");
    let value = "";

    for (let i = 0; i < paramArr.length; i++) {
        let temp = paramArr[i].split("=");

        if (temp[0].toUpperCase() == param.toUpperCase()) {
            value = paramArr[i].split("=")[1];
            break;
        }
    }

    return value;
}

function goPage(url) {
    window.location.href = "#" + encodeURI(url);
    loadWebPage(url, loadViewer);
}

function setMenuShow() {
    $(".left_menu .main").click(function () {
        if ($(this).parent().find("li").is(":visible")) {
            $(this).parent().find("li").slideUp(100);
        } else {
            $(this).parent().find("li").slideDown(100);
        }
    })
}

init();