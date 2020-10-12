"use strict";

/*! js-cookie v3.0.0-rc.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,r=e.Cookies=t();r.noConflict=function(){return e.Cookies=n,r}}())}(this,function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var t={read:function(e){return e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};return function n(r,o){function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),n=r.write(n,t);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n+c}}return Object.create({set:i,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],o={},i=0;i<n.length;i++){var c=n[i].split("="),u=c.slice(1).join("=");'"'===u[0]&&(u=u.slice(1,-1));try{var f=t.read(c[0]);if(o[f]=r.read(u,f),e===f)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){i(t,"",e({},n,{expires:-1}))},withAttributes:function(t){return n(this.converter,e({},this.attributes,t))},withConverter:function(t){return n(e({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(r)}})}(t,{path:"/"})});

class CustomStartStorageCookie {
  constructor() {
    this.key = 'customstart-data';
  }

  async set(obj) {
    Cookies.set(this.key, JSON.stringify(obj), { expires: 365, sameSite: 'strict' })
  }

  delete() {
    return Cookies.remove(this.key)
  }

  async get() {
    const retrievedObject = Cookies.get(this.key)

    if (retrievedObject) {
      return JSON.parse(retrievedObject)
    }

    return this.getDefault();
  }
}

// class CustomStartStorageLocalStorage {
//   constructor() {
//     this.key = 'customstart-data';
//   }

//   async set(obj) {
//     localStorage.setItem(this.key, JSON.stringify(obj));
//   }

//   delete() {
//     localStorage.delete(this.key);
//   }

//   async get() {
//     const retrievedObject = localStorage.getItem(this.key);

//     if (retrievedObject) {
//       return JSON.parse(retrievedObject);
//     }

//     return this.getDefault();
//   }

// }

// class CustomStartStorageApi {
//     async set(obj) {
//         const rawResponse = await fetch('/api/data', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(obj)
//         });
//         const content = await rawResponse.json();
//         console.log(content);
//     }
//     delete() {
//         throw "Delete not implemented on API.";
//     }
//     async get() {
//         return await fetch('/api/data')
//             .then(res => res.json())
//             .then(out => {
//                 return out;
//             })
//             .catch(err => { throw err });
//     }
// }


class CustomStartStorage extends CustomStartStorageCookie {
  constructor() {
    super();
  }

  async getDefault() {
    const fetchDataUrl = "/api/data";

    return await fetch(fetchDataUrl).then(res => res.json()).then(out => {
      return out;
    }).catch(err => {
      throw err;
    });
  }

}
//# sourceMappingURL=storage.min.js.map
