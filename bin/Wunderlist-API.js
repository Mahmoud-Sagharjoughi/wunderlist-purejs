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
        console.log("Wat?", this.client_id);
    }
    Request.init = init;
    function make_request(url, req_type, data, callback) {
        console.log("Requesting....");
        console.log(url);
        var xhttp = new XMLHttpRequest();
        xhttp.open(req_type, url, true);
        xhttp.setRequestHeader('X-Client-ID', this.client_id);
        xhttp.setRequestHeader('X-Access-Token', this.token);
        if (data) {
            xhttp.setRequestHeader('Content-type', "application/json");
        }
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4) {
                if (xhttp.status != 401 && xhttp.status != 404 && xhttp.status != 400) {
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
    Request.make_request = make_request;
    function request(url, req_type, params, callback) {
        var final_url = this.base_url + url;
        if (req_type == 'GET')
            for (var key in params) {
                final_url += "&" + key + "=" + params[key];
            }
        Request.make_request(final_url, req_type, params, function (response) {
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
/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: I N S T A G R A M   A C C E S S A B L E   H I G H L E V E L   M E T H O D S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
/// <reference path="./request.ts"/>
var Wunderlist;
(function (Wunderlist) {
    Wunderlist.client_id = undefined;
    Wunderlist.redirect_uri = undefined;
    Wunderlist.token = undefined;
    Wunderlist.base_url = 'http://a.wunderlist.com/api/v1/';
    function init(client_id, redirect_uri) {
        this.client_id = client_id;
        this.redirect_uri = redirect_uri;
    }
    Wunderlist.init = init;
    //
    // ─── AUTHENTICATION METHODS ─────────────────────────────────────────────────────
    //
    function get_auth_url() {
        return 'https://www.wunderlist.com/oauth/authorize/?client_id=' + this.client_id
            + '&redirect_uri=' + this.redirect_uri +
            "&state=random";
    }
    Wunderlist.get_auth_url = get_auth_url;
    function set_token(token) {
        this.token = token;
        this.request = Request.init(this.base_url, this.client_id, this.token, function () { });
    }
    Wunderlist.set_token = set_token;
})(Wunderlist || (Wunderlist = {}));
/*
 * This file is created by: Mahmoud Sagharjoughi <mahmood.sa225@gmail.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: L I S T S   A P I   E N D P O I N T S   W R A P P E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
/// <reference path="./wunderlist.ts"/>
/// <reference path="./request.ts"/>
var Wunderlist;
(function (Wunderlist) {
    var Lists;
    (function (Lists) {
        function get_all_lists(callback) {
            var url = 'lists';
            Request.request(url, "GET", null, function (data) {
                callback(data);
            });
        }
        Lists.get_all_lists = get_all_lists;
        function get_list(list_id, callback) {
            var url = 'lists/' + list_id;
            Request.request(url, "GET", null, function (data) {
                callback(data);
            });
        }
        Lists.get_list = get_list;
    })(Lists = Wunderlist.Lists || (Wunderlist.Lists = {}));
})(Wunderlist || (Wunderlist = {}));
/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by:
*/
//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: U S E R S   A P I   E N D P O I N T S   W R A P P E R S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//
/// <reference path="./wunderlist.ts"/>
/// <reference path="./request.ts"/>
var Wunderlist;
(function (Wunderlist) {
    var Users;
    (function (Users) {
        function self(callback) {
            var url = 'user';
            Request.request(url, "GET", null, function (data) {
                callback(data);
            });
        }
        Users.self = self;
    })(Users = Wunderlist.Users || (Wunderlist.Users = {}));
})(Wunderlist || (Wunderlist = {}));
