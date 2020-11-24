function tplReplace (template, templateObject) {
    return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
        return templateObject[key.trim()];
    })
}

function scrollToTop() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
}

function setPageData(data, count) {
    const len = data.length;

    let pageData = [];
    let index = 0;

    while(index < len) {
        pageData.push(data.slice(index, index += count));
    }

    return pageData;
}

function scrollToBottom(cb) {
    if (_getScrollTop() + _getWindowHeight() === _getScrollHeight()) {
        console.log('reach bottom');
        cb();
    }
}

export {
    tplReplace,
    setPageData,
    scrollToTop,
    scrollToBottom
}


/*******************************内部方法 ****************************/

function _getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;

    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }

    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }

    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;

    return scrollTop;
}

function _getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;

    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }

    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }

    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;

    return scrollHeight;
}

function _getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }

    return windowHeight;
}