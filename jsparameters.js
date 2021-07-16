function getParam(parameter) {
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    var param = url.searchParams.get(parameter);
    return param;
}