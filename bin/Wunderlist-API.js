/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A B S T A C T I O N   L A Y E R   F O R   R E Q U E S T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
var Request;
(function (Request) {
    var base_url = undefined;
    var token = undefined;
    var client_id = undefined;
    var fail_function = undefined;
    function init(base_url, client_id, token, fail_function) {
        this.base_url = base_url;
        this.client_id = client_id;
        this.token = token;
        this.fail_function = fail_function;
    }
    Request.init = init;
    function make_request(url, req_type, data, callback) {
        console.log("Requesting....");
        console.log(url);
        var xhttp = new XMLHttpRequest();
        xhttp.setRequestHeader('X-Client-ID', this.client_id);
        xhttp.setRequestHeader('X-Access-Token', this.token);
        if (data) {
            xhttp.setRequestHeader('Content-type', "application/json");
        }
        xhttp.open(req_type, url, true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status != 401 || xhttp.status != 404 || xhttp.status != 400) {
                    console.log("Response OK!");
                    callback(xhttp.response);
                }
                else {
                    console.log("Response Not OK!");
                    // FIXME
                    failure(xhttp.response);
                }
            }
        };
        if (data)
            xhttp.send(data);
        else
            xhttp.send(null);
    }
    function request(url, req_type, params, callback) {
        var final_url = this.base_url + url + '?access_token=' + this.token;
        if (req_type == 'GET')
            for (var key in params) {
                final_url += "&" + key + "=" + params[key];
            }
        make_request(final_url, req_type, params, function (response) {
            response = JSON.parse(response);
            callback(response);
        });
    }
    Request.request = request;
    function failure(response) {
        response = JSON.parse(response);
        console.log("ERROR: ");
        console.log(response.error);
    }
})(Request || (Request = {}));
