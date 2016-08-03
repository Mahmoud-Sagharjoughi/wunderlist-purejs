/*
 * This file is created by: Sina Bakhtiari <sinabakh44@live.com>
 *      and is modified by: 
*/

//
// ──────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A B S T A C T I O N   L A Y E R   F O R   R E Q U E S T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────── 
//

module Request {

    let base_url:string = undefined;
    let token : string = undefined;
    let client_id : string = undefined;
    let fail_function:Function = undefined;

    export function init( base_url : string, client_id : string, token : string , fail_function : Function ) {
        this.base_url = base_url;
        this.client_id = client_id;
        this.token = token;
        this.fail_function = fail_function;
        console.log("Wat?", this.client_id);
        
    }

    export function make_request( url : string, req_type : string, data : any, callback:Function ) : any {
        console.log("Requesting....");
        console.log(url);
        
        let xhttp =  new XMLHttpRequest();
        xhttp.open(req_type, url, true);
        xhttp.setRequestHeader('X-Client-ID', this.client_id);
        xhttp.setRequestHeader('X-Access-Token', this.token);
        if(data)
        {
            xhttp.setRequestHeader('Content-type', "application/json");
        }
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 ) {
                if(xhttp.status != 401 && xhttp.status != 404 && xhttp.status != 400)
                {
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
        if(data)
            xhttp.send(data);
        else    
            xhttp.send(null);
    }

    export function request( url : string, req_type : string, params:any , callback : Function ) {
        let final_url = this.base_url + url;
        if(req_type == 'GET')
            for(var key in params)
            {   
                final_url += "&" + key + "=" + params[key];
            }
        Request.make_request( final_url, req_type, params, function(response) {
                response = JSON.parse(response);
                callback(response);
        });
    }

    function failure(response:any) {
        response = JSON.parse(response);
        console.log("ERROR: ");
        console.log(response.error);
    }
}