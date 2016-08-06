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

module Wunderlist.Lists {

    export function get_all_lists(callback:Function) {
        let url = 'lists';
        Request.request(url, "GET", null, function(data){
            callback(data);
        });
    }

    export function get_list(list_id : string, callback:Function) {
        let url = 'lists/' + list_id;
        Request.request(url, "GET", null, function(data){
            callback(data);
        });
    }
}