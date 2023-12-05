window.onload = function() {
    var loadTime = window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
    document.getElementById("loadTime").innerHTML = 'Страница запустилась за ' + loadTime + 'ms';
}
