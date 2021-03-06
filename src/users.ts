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

module Wunderlist.Users {    

    export function self(callback:Function) {
        let url = 'user';
        Request.request(url, "GET", null, function(data){
            callback(data);
        });
    }
}