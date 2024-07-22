function init() {
    let mdPath = getAnchor();
    if (mdPath !== "") {
        loadWebPage(mdPath, loadViewer);
    } else {
        loadWebPage("README", loadViewer);
    }
    setMenuShow();
    setHistoryBackEvent();
}

function setHistoryBackEvent() {
    if (window.addEventListener) {
        window.addEventListener("popstate", changePageState);
    } else {
        window.attachEvent("popstate", changePageState);
    }
}

function changePageState() {
    if ((history.state !== null) && (typeof history.state.url !== "undefined")) {
        loadWebPage(history.state.url, loadViewer);
    }
}

function pushState(url) {
    if (url !== "") {
        history.pushState({ url: url }, "", "/#" + url);
    }
}

function loadViewer(content) {
    const Viewer = toastui.Editor;
    const codeSyntaxHighlight = Viewer.plugin.codeSyntaxHighlight;

    // 이미지 처리를 위한 Set 생성
    const processedImages = new Set();

    const viewer = new Viewer({
        el: document.querySelector("#viewer"),
        initialValue: content,
        plugins: [codeSyntaxHighlight],
        customHTMLRenderer: {
            image(node, context) {
                const { src, alt } = node;

                const ImageURL = "/" + document.location.hash.substring(1, document.location.hash.lastIndexOf("/") + 1) + node.destination  

                // 이미 처리된 이미지인지 확인
                if (processedImages.has(ImageURL)) {
                    return false; // 이미 처리된 이미지는 기본 렌더링 사용
                }
                
                // 새 이미지 처리
                processedImages.add(ImageURL);

                return {
                    type: 'openTag',
                    tagName: 'img',
                    attributes: { src: ImageURL, alt },
                    selfClose: true
                };
            }
        }
    });
}

function loadWebPage(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/" + url + ".md");
    xhr.responseType = "text";
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            callback(xhr.responseText);
            if (location.pathname !== "/content.html") {
                focusContent();
            }
        }
    };

    xhr.send();
}

function focusContent() {
    if (getAnchor() !== "") {
        const targetSection = document.getElementById('content');
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function getAnchor() {
    let url = decodeURI(location.href);
    if (url.indexOf("#") > -1) {
        return url.substring(url.indexOf("#") + 1, url.length);
    } else {
        return "";
    }
}

function getParameter(param) {
    let url = decodeURI(location.href);
    let paramArr = url
        .substring(url.indexOf("#") + 1, url.length)
        .split("&");
    let value = "";

    for (let item in paramArr) {
        let temp = item.split("=");

        if (temp[0].toUpperCase() == param.toUpperCase()) {
            value = item.split("=")[1];
            break;
        }
    }

    return value;
}

function goPage(url) {
    loadWebPage(url, loadViewer);
    pushState(url);
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