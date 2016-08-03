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

module Wunderlist{

    export let client_id : string = undefined;
    export let redirect_uri : string = undefined;
    export let token : string = undefined;

    export let base_url : string = 'http://a.wunderlist.com/api/v1/';

    export let request;

    export function init( client_id : string , redirect_uri : string ) {
        this.client_id = client_id;
        this.redirect_uri = redirect_uri;
    }
    

    //
    // ─── AUTHENTICATION METHODS ─────────────────────────────────────────────────────
    //


        export function get_auth_url() : string {
            return 'https://www.wunderlist.com/oauth/authorize/?client_id=' + this.client_id
                + '&redirect_uri=' + this.redirect_uri + 
                "&state=random";
        }

        export function set_token( token : string) : void {
            this.token = token;
            this.request = Request.init( this.base_url, this.client_id, this.token, function(){} );
        }

    // ────────────────────────────────────────────────────────────────────────────────    
}