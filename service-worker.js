if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),l={module:{uri:o},exports:t,require:c};i[o]=Promise.all(r.map((e=>l[e]||c(e)))).then((e=>(s(...e),t)))}}define(["./workbox-d249b2c8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"7a5bb1a67555aeec88cd.png",revision:null},{url:"83c1bc1337052fe46365.png",revision:null},{url:"favicon.ico",revision:"5929587e309ab534e696466302f1d252"},{url:"index.html",revision:"aef6a98facc9ee4ea440db689614b91f"},{url:"main.css",revision:"63d02f20ce86fae06e2f91d483ae53e7"},{url:"main.js",revision:"62b4a98e00ea1b7499fbb849389c91bd"}],{})}));
