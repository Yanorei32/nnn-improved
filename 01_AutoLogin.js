// ==UserScript==
// @name		NYIM Series 01 - Auto Login
// @description	ホームページに飛んだ時にクリックが必要っておかしくないですか？  :thinking:
// @author		yanorei32
// @supportURL  https://twitter.com/yanorei32
// @namespace	http://tyan0.dip.jp/~rei/
// @website     http://tyan0.dip.jp/~rei/
// @include		https://www.nnn.ed.nico/
// @version		0.1
// @grant		none
// @license		MIT License
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';
    location.href = '/oauth_login';
})();

