/*
 * Third party
 */
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map



/*
 * Custom
 */
function addTextNode(text) {
  let newtext = document.createTextNode(text);
  return newtext;
}

function setAttr(item, htmlElement){
	for (key in item){
		if (key != "text" && key != "tag" && key != "html" && key != "text" && key != "children") {
			htmlElement.setAttribute(key, item[key]);
		}
	}
}

function renderHTML(element, parent){
	//if it is the deepest tag element
	if (!Array.isArray(element) && !element.children) {
		if (element.text) {
			return parent.append(addTextNode(element.text));
		} else {
			let htmlElem = document.createElement(element.tag);
			//add attributes
			setAttr(element,htmlElem);

			htmlElem.append(addTextNode(element.html));
			return parent.appendChild(htmlElem);
		}
	} else {
		element.forEach((item)=> {
			if (item.children) {
				let htmlElem = document.createElement(item.tag);
				//add attributes
				setAttr(item, htmlElem);

				parent.appendChild(htmlElem);
				renderHTML(item.children, htmlElem);
			} else {
				renderHTML(item, parent);
			}
		})
	}
}
//return json parsed json file
const  getJSON = async (path)=> {
	let response = await fetch(path);
	let data = await response.json();
	return data;
}
'use strict';

class Storage {
	constructor(){
		this.tempItems = [];
		this.tempUsers = [];
		this.filterParams = {};
		this.path = {
			items: 'json/listitems.json',
			users: 'json/users.json'
		}
		return this;
	}

	async init() {
		await this.loadLocalStorage();
	}

	async loadLocalStorage() {
		let items = localStorage.getItem('items');
		let users = localStorage.getItem('users');
		await this.updateTempStorage(items, 'items');
		await this.updateTempStorage(users, 'users');
	}

	async updateTempStorage(data, key) {
		switch (key) {
			case 'items':
				if (data) {
					this.tempItems = JSON.parse(data);
				} else {
					this.tempItems = await getJSON(this.path.items);
					this.saveToLocalStorage(key, this.tempItems);
				}
			break;
			case 'users':
				if (data) {
					this.tempUsers = JSON.parse(data);
				} else {
					this.tempUsers = await getJSON(this.path.users);
					this.saveToLocalStorage(key, this.tempUsers);
				}
			break;
			default: throw Error ('serever not respond');
		}
	}

	saveToLocalStorage(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	 getTempStorage(name) {
		switch (name) {
			case 'items':
				return this.tempItems;
			case 'users':
				return this.tempUsers;
			default: throw Error ('serever not respond');
		}
	}

	getItemById(id) {
		return this.tempItems.find(item => item.id_item == id);
	}

	getFilteredItems(params){
		this.filterParams = params;
		console.dir(this.filterParams);
		let filterArrItems = this.getItemsByCondition();
		filterArrItems = this.getItemsByShipping(filterArrItems);
		filterArrItems = this.getItemsByFormat(filterArrItems);
		filterArrItems = this.getItemsByPrice(filterArrItems);
		filterArrItems = this.getItemsByUserRequest(filterArrItems);
		console.dir(filterArrItems);
		return filterArrItems;

	}

	makeArray(str) {
		return str.split(',');
	}

	getItemsByUserRequest(arr){
		if (this.filterParams['userrequest']){
			console.log('here');
			let strParams = this.makeArray(this.filterParams['userrequest']).join(' ');
			return arr.filter(item => new RegExp(strParams, 'i').test(item.title));
		}
		return arr;
	}

	getItemsByPrice(arr){
		if(this.filterParams['from']) {
			if (this.filterParams['to']) {
				return arr.filter(item => {
					return parseInt(item.price) >= +this.filterParams['from'] && parseInt(item.price) <= +this.filterParams['to'];
				})
			} else {
				return arr.filter(item => {
					return parseInt(item.price) >= +this.filterParams['from'];
				})
			}
		}
		return arr;
	}

	getItemsByCondition(){
		if (this.filterParams['condition']){
			let arrParams = this.makeArray(this.filterParams['condition']);
			if (arrParams.length == 2) {
				return this.tempItems.filter(item => {return item.condition == arrParams[0] || item.condition == arrParams[1]})
			}
			if (arrParams.length == 1) {
				return this.tempItems.filter(item => item.condition == arrParams[0]);
			}
		}
		return this.tempItems;
	}

	replaceShippingParams(arr){
		return arr.map(name =>{
			if (name == 'free') {
				return 'Free Shipping';
			}
			if (name == 'instore') {
				return 'Free In-store Pickup';
			}
			if (name == 'local') {
				return 'Free Local Pickup';
			}
		})
	}

	getItemsByShipping(arr){
		if (this.filterParams['shipping']){
			let arrParams = this.makeArray(this.filterParams['shipping']);
			arrParams = this.replaceShippingParams(arrParams);
			console.log(arrParams);
				if (arrParams.length == 3) {
					return arr.filter(item => {return item.shipping == arrParams[0] || item.shipping == arrParams[1] || item.shipping == arrParams[2]});
				}
				if (arrParams.length == 2) {
					return arr.filter(item => {return item.shipping == arrParams[0] || item.shipping == arrParams[1]});
				}
				if (arrParams.length == 1) {
					return arr.filter(item => item.shipping == arrParams[0]);
				}
		}
		return arr;
	}

	getItemsByFormat(arr){
		switch (this.filterParams['format']){
			case 'buyitnow':
				return arr.filter(item => item.buy == true);
			break;
			case 'auction':
				return arr.filter(item => item.auction == true)
			break;
			default: console.log('default'); return arr;
		}
	}
}
// option all or empty
class Filter {
	constructor({option = 'search', params = {}} ={}){
		this.regExp = /^\/search.+/i;
		this.userrequestRegExp = /[a-z0-9a-zа-яё]+/gi;
		this.option = option;
		this.params = params;
		this.init();
		return this;
	}

	init() {
		this.findNodes();
		this.bindAll();
		this.addEvents();
		this.autoCheck();
	}

	findNodes() {
		if (this.option == 'all') {
			this.nodes = {
				condition: document.getElementsByName('condition'),
				shipping: document.getElementsByName('shipping'),
				from: document.getElementById('from'),
				to: document.getElementById('to'),
				btnfromto: document.getElementById('btnfromto'),
				search: document.getElementById('search'),
				searchBtn: document.getElementById('search-input'),
				buyitnow: document.getElementById('buyitnow'),
				auction: document.getElementById('auction'),
				format: document.getElementsByName('format'),
			}
		} else {
			this.nodes = {
				search: document.getElementById('search'),
				searchBtn: document.getElementById('search-input'),
			}
		}

	}

	bindAll() {
		this.checkCondition = this.checkCondition.bind(this);
		this.checkShipping = this.checkShipping.bind(this);
		this.rangePrice = this.rangePrice.bind(this);
		this.checkFormat = this.checkFormat.bind(this);
		this.search = this.search.bind(this);
		this.handler = this.handler.bind(this);
		this.handlerAll = this.handlerAll.bind(this);
	}

	addEvents() {
		if (this.option == 'all'){
			this.nodes.condition[0].addEventListener('click', this.handlerAll);
			this.nodes.condition[1].addEventListener('click', this.handlerAll);
			this.nodes.shipping[0].addEventListener('click', this.handlerAll);
			this.nodes.shipping[1].addEventListener('click', this.handlerAll);
			this.nodes.shipping[2].addEventListener('click', this.handlerAll);
			this.nodes.btnfromto.addEventListener('click', this.handlerAll);
			this.nodes.format[0].addEventListener('click', this.handlerAll);
			this.nodes.format[1].addEventListener('click', this.handlerAll);
			this.nodes.searchBtn.addEventListener('click', this.handlerAll);
		} else {
			this.nodes.searchBtn.addEventListener('click', this.handler);
		}
	}

	makeArray(str) {
		return str.split(',');
	}

	autoCheck() {
		if (this.params['condition']){
			let arrParams = this.makeArray(this.params['condition']);
			this.autoCheckCondition(arrParams);
		}
		if (this.params['shipping']){
			let arrParams = this.makeArray(this.params['shipping']);
			this.autoCheckShipping(arrParams);
		}

		if (this.params['to']){
			let arrParams = this.makeArray(this.params['to']);
			this.autoCheckRangePrice(arrParams, 'to');
		}
		if (this.params['from']){
			let arrParams = this.makeArray(this.params['from']);
			this.autoCheckRangePrice(arrParams, 'from');
		}
		if (this.params['format']){
			this.autoCheckFormat(this.params['format']);
		}
		if (this.params['userrequest']){
			let arrParams = this.makeArray(this.params['userrequest']);
			this.autoFillSearch(arrParams);
		}
	}

	autoFillSearch(arr) {
		this.nodes.search.value = arr.join(' ');
	}

	autoCheckFormat(value){
		switch (value) {
			case 'buyitnow':
				this.nodes.format[0].checked = true;
			break;
			case 'auction':
				this.nodes.format[1].checked = true;
			break;
			default: console.log('invalid query string');
		}

	}

	autoCheckRangePrice(arr, input){
		switch (input) {
			case 'to':
				this.nodes.to.value = arr.toString();
			break;
			case 'from':
				this.nodes.from.value = arr.toString();
			break;
			default: console.log('invalid query string');
		}

	}
	autoCheckShipping(arr) {
		arr.forEach(element => {
			switch (element) {
				case 'free':
					this.nodes.shipping[0].checked = true;
				break;
				case 'instore':
					this.nodes.shipping[1].checked = true;
				break;
				case 'local':
					this.nodes.shipping[2].checked = true;
				break;
				default: console.log('invalid query string');
			}
		});
	}

	autoCheckCondition(arr) {
		arr.forEach(element => {
			switch (element) {
				case 'new':
					this.nodes.condition[0].checked = true;
				break;
				case 'used':
					this.nodes.condition[1].checked = true;
				break;
				default: console.log('invalid query string');
			}
		});
	}

	getPath() {
		this.currentPathName = window.location.pathname;
	}

	search(e) {
		if (this.nodes.search.value) {
			this.params['userrequest'] = this.nodes.search.value.match(this.userrequestRegExp);
		} else {
			delete this.params['userrequest'];
		}
	}

	checkFormat(e) {
		for (let i = 0; i < this.nodes.format.length; i++) {
			if (this.nodes.format[i].checked) {
				this.params[this.nodes.format[i].getAttribute('name')] = this.nodes.format[i].value;
			}
		}
	}

	rangePrice(e) {
		let from = this.nodes.from.value || 0;
		let to = this.nodes.to.value || Infinity;
		this.params['from'] = from;
		if (isFinite(to)) {
			this.params['to'] = to;
		}
	}

	checkCondition(e) {
		let queryString = '';
		for (let i = 0; i < this.nodes.condition.length; i++) {
			if (this.nodes.condition[i].checked) {
				queryString += this.nodes.condition[i].value + ',';
			}
		}
		queryString = queryString.slice(0, -1);
		if (queryString) {
			this.params[this.nodes.condition[0].getAttribute('name')] = queryString;
		} else {
			delete this.params[this.nodes.condition[0].getAttribute('name')];
		}
	}

	checkShipping(e) {
		let queryString = '';
		for (let i = 0; i < this.nodes.shipping.length; i++) {
			if (this.nodes.shipping[i].checked) {
				queryString += this.nodes.shipping[i].value + ',';
			}
		}
		queryString = queryString.slice(0, -1);
		if (queryString) {
			this.params[this.nodes.shipping[0].getAttribute('name')] = queryString;
		} else {
			delete this.params[this.nodes.shipping[0].getAttribute('name')];
		}
	}

	handlerAll(e) {
		this.checkFormat();
		this.checkCondition();
		this.checkShipping();
		this.rangePrice();
		this.search();
		this.createURL();
	}

	handler(e) {
		this.search();
		this.createURL();
	}

	createURL(){
		let url = '/search?';
		for (key in this.params) {
			if (key == 'userrequest') {
				let requesturl = this.params[key].reduce((sum, current) => {
					return sum + current + ',';
				}, 'userrequest=');
				url += requesturl.slice(0, -1) + '&';
			} else {
				url += key + '=' + this.params[key] + '&';
			}
		}
		// url = encodeURI(url.slice(0, -1));
		url = url.slice(0, -1);
		console.log(url);
		location.assign(url);
	}
}
class Manager {
	constructor(){
		this.storage = new Storage();
		this.regExpId = /^\/item\d+$/i;
		this.regSearch = /^\/search$/i;
		this.params = {};
		this.init();
	}
	async init() {
		await this.storage.init();
		this.getPath();
		this.getSearchParams()
		this.onloadPage();
	}

	async renderContactsPage() {
		let response = await fetch('json/page-contacts.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	renderRegisterPage() {

	}

	async renderAdvert() {
		let response = await fetch('json/page-text.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	renderResult(arr) {
		let templateContent = document.getElementById("item");
		let template = _.template(templateContent.innerHTML);
		let result = arr.reduce(function(sum, current) {
			return  template(current) + sum;
		}.bind(this),"");
		document.getElementsByClassName("result__container")[0].innerHTML = result;
	}

	renderItemPage(obj) {
		let templatePageItem = document.getElementById("item-page");
		let templateItem = _.template(templatePageItem.innerHTML);
		let result = templateItem(obj);
		document.getElementsByClassName("main__container")[0].innerHTML = result;
		//gallery
		var templatePageGallery = document.getElementById('gallery-item');
		var templateGallary = _.template(templatePageGallery.innerHTML);
		var resultUL = obj.pictures.reduce((sum, current) => {
			return templateGallary(current) + sum;
		},"" )
		document.getElementsByClassName('item-page__list-images')[0].innerHTML = resultUL;
	}

	async renderMainPage() {
		let data = await getJSON('json/page-aside-result.json');
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	renderfilteredResult() {

	}

	getPath() {
		this.currentPathName = window.location.pathname;
	}

	getSearchParams() {
		this.searchParams = window.location.search;
	}

	getItemIdfromPath() {
		let reg = /^\/item(\d+$)/i;
		return this.currentPathName.match(reg)[1];
	}

	parseSearchParams() {
		//let str =	'/search?condition=new,used&shipping=free,instore,local&from=4&format=buyitnow&userrequest=mama+papa';
		let str = this.searchParams;
		if (str){
			let paramsString = str.slice(1);
			let elements = paramsString.split('&');
			if (elements.length){
				elements.forEach(element => {
					var keyValue = element.split('=');
					this.params[keyValue[0]] = keyValue[1];
				})
			}
			//console.dir(this.params);
		}
	}

	async onloadPage() {
		this.parseSearchParams();
		//render item by id
		if (this.currentPathName.match(this.regExpId)){
			this.renderItemPage(this.storage.getItemById(this.getItemIdfromPath()))
		} //render by user filter and request
		if (this.currentPathName.match(this.regSearch)){
			console.log('render by params');
			await this.renderMainPage();
			this.renderResult(this.storage.getFilteredItems(this.params));
			this.filter = new Filter({option: 'all', params: this.params})
		} else {
			switch (this.currentPathName) {
				case '/register':
				console.log('register');
				break;
				case '/sign':
				console.log('sign');
				break;
				case '/contacts':
				this.renderContactsPage();
				this.filter = new Filter();
				break;
				case '/advert':
				this.renderAdvert();
				case '/':
				await this.renderMainPage();
				this.renderResult(this.storage.getTempStorage('items'));
				this.filter = new Filter({option: 'all'})
				break;
				default: console.log('page not found');
			}
		}
	}
}
document.addEventListener("DOMContentLoaded", function(){
	_.templateSettings = {
		evaluate    : /\{\{([\s\S]+?)\}\}/g,
		interpolate : /\{\{=([\s\S]+?)\}\}/g,
		escape      : /\{\{-([\s\S]+?)\}\}/g
	};
	let manager = new Manager();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFRoaXJkIHBhcnR5XHJcbiAqL1xyXG4vLyAgICAgVW5kZXJzY29yZS5qcyAxLjguM1xyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIG4obil7ZnVuY3Rpb24gdCh0LHIsZSx1LGksbyl7Zm9yKDtpPj0wJiZvPmk7aSs9bil7dmFyIGE9dT91W2ldOmk7ZT1yKGUsdFthXSxhLHQpfXJldHVybiBlfXJldHVybiBmdW5jdGlvbihyLGUsdSxpKXtlPWIoZSxpLDQpO3ZhciBvPSFrKHIpJiZtLmtleXMociksYT0ob3x8cikubGVuZ3RoLGM9bj4wPzA6YS0xO3JldHVybiBhcmd1bWVudHMubGVuZ3RoPDMmJih1PXJbbz9vW2NdOmNdLGMrPW4pLHQocixlLHUsbyxjLGEpfX1mdW5jdGlvbiB0KG4pe3JldHVybiBmdW5jdGlvbih0LHIsZSl7cj14KHIsZSk7Zm9yKHZhciB1PU8odCksaT1uPjA/MDp1LTE7aT49MCYmdT5pO2krPW4paWYocih0W2ldLGksdCkpcmV0dXJuIGk7cmV0dXJuLTF9fWZ1bmN0aW9uIHIobix0LHIpe3JldHVybiBmdW5jdGlvbihlLHUsaSl7dmFyIG89MCxhPU8oZSk7aWYoXCJudW1iZXJcIj09dHlwZW9mIGkpbj4wP289aT49MD9pOk1hdGgubWF4KGkrYSxvKTphPWk+PTA/TWF0aC5taW4oaSsxLGEpOmkrYSsxO2Vsc2UgaWYociYmaSYmYSlyZXR1cm4gaT1yKGUsdSksZVtpXT09PXU/aTotMTtpZih1IT09dSlyZXR1cm4gaT10KGwuY2FsbChlLG8sYSksbS5pc05hTiksaT49MD9pK286LTE7Zm9yKGk9bj4wP286YS0xO2k+PTAmJmE+aTtpKz1uKWlmKGVbaV09PT11KXJldHVybiBpO3JldHVybi0xfX1mdW5jdGlvbiBlKG4sdCl7dmFyIHI9SS5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9bS5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8YSxpPVwiY29uc3RydWN0b3JcIjtmb3IobS5oYXMobixpKSYmIW0uY29udGFpbnModCxpKSYmdC5wdXNoKGkpO3ItLTspaT1JW3JdLGkgaW4gbiYmbltpXSE9PXVbaV0mJiFtLmNvbnRhaW5zKHQsaSkmJnQucHVzaChpKX12YXIgdT10aGlzLGk9dS5fLG89QXJyYXkucHJvdG90eXBlLGE9T2JqZWN0LnByb3RvdHlwZSxjPUZ1bmN0aW9uLnByb3RvdHlwZSxmPW8ucHVzaCxsPW8uc2xpY2Uscz1hLnRvU3RyaW5nLHA9YS5oYXNPd25Qcm9wZXJ0eSxoPUFycmF5LmlzQXJyYXksdj1PYmplY3Qua2V5cyxnPWMuYmluZCx5PU9iamVjdC5jcmVhdGUsZD1mdW5jdGlvbigpe30sbT1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIG0/bjp0aGlzIGluc3RhbmNlb2YgbT92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IG0obil9O1widW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzPyhcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9bSksZXhwb3J0cy5fPW0pOnUuXz1tLG0uVkVSU0lPTj1cIjEuOC4zXCI7dmFyIGI9ZnVuY3Rpb24obix0LHIpe2lmKHQ9PT12b2lkIDApcmV0dXJuIG47c3dpdGNoKG51bGw9PXI/MzpyKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKHIpe3JldHVybiBuLmNhbGwodCxyKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihyLGUpe3JldHVybiBuLmNhbGwodCxyLGUpfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKHIsZSx1KXtyZXR1cm4gbi5jYWxsKHQscixlLHUpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKHIsZSx1LGkpe3JldHVybiBuLmNhbGwodCxyLGUsdSxpKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkodCxhcmd1bWVudHMpfX0seD1mdW5jdGlvbihuLHQscil7cmV0dXJuIG51bGw9PW4/bS5pZGVudGl0eTptLmlzRnVuY3Rpb24obik/YihuLHQscik6bS5pc09iamVjdChuKT9tLm1hdGNoZXIobik6bS5wcm9wZXJ0eShuKX07bS5pdGVyYXRlZT1mdW5jdGlvbihuLHQpe3JldHVybiB4KG4sdCwxLzApfTt2YXIgXz1mdW5jdGlvbihuLHQpe3JldHVybiBmdW5jdGlvbihyKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoO2lmKDI+ZXx8bnVsbD09cilyZXR1cm4gcjtmb3IodmFyIHU9MTtlPnU7dSsrKWZvcih2YXIgaT1hcmd1bWVudHNbdV0sbz1uKGkpLGE9by5sZW5ndGgsYz0wO2E+YztjKyspe3ZhciBmPW9bY107dCYmcltmXSE9PXZvaWQgMHx8KHJbZl09aVtmXSl9cmV0dXJuIHJ9fSxqPWZ1bmN0aW9uKG4pe2lmKCFtLmlzT2JqZWN0KG4pKXJldHVybnt9O2lmKHkpcmV0dXJuIHkobik7ZC5wcm90b3R5cGU9bjt2YXIgdD1uZXcgZDtyZXR1cm4gZC5wcm90b3R5cGU9bnVsbCx0fSx3PWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09dD92b2lkIDA6dFtuXX19LEE9TWF0aC5wb3coMiw1MyktMSxPPXcoXCJsZW5ndGhcIiksaz1mdW5jdGlvbihuKXt2YXIgdD1PKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0JiZ0Pj0wJiZBPj10fTttLmVhY2g9bS5mb3JFYWNoPWZ1bmN0aW9uKG4sdCxyKXt0PWIodCxyKTt2YXIgZSx1O2lmKGsobikpZm9yKGU9MCx1PW4ubGVuZ3RoO3U+ZTtlKyspdChuW2VdLGUsbik7ZWxzZXt2YXIgaT1tLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO3U+ZTtlKyspdChuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LG0ubWFwPW0uY29sbGVjdD1mdW5jdGlvbihuLHQscil7dD14KHQscik7Zm9yKHZhciBlPSFrKG4pJiZtLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO3U+bztvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109dChuW2FdLGEsbil9cmV0dXJuIGl9LG0ucmVkdWNlPW0uZm9sZGw9bS5pbmplY3Q9bigxKSxtLnJlZHVjZVJpZ2h0PW0uZm9sZHI9bigtMSksbS5maW5kPW0uZGV0ZWN0PWZ1bmN0aW9uKG4sdCxyKXt2YXIgZTtyZXR1cm4gZT1rKG4pP20uZmluZEluZGV4KG4sdCxyKTptLmZpbmRLZXkobix0LHIpLGUhPT12b2lkIDAmJmUhPT0tMT9uW2VdOnZvaWQgMH0sbS5maWx0ZXI9bS5zZWxlY3Q9ZnVuY3Rpb24obix0LHIpe3ZhciBlPVtdO3JldHVybiB0PXgodCxyKSxtLmVhY2gobixmdW5jdGlvbihuLHIsdSl7dChuLHIsdSkmJmUucHVzaChuKX0pLGV9LG0ucmVqZWN0PWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbS5maWx0ZXIobixtLm5lZ2F0ZSh4KHQpKSxyKX0sbS5ldmVyeT1tLmFsbD1mdW5jdGlvbihuLHQscil7dD14KHQscik7Zm9yKHZhciBlPSFrKG4pJiZtLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDt1Pmk7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighdChuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LG0uc29tZT1tLmFueT1mdW5jdGlvbihuLHQscil7dD14KHQscik7Zm9yKHZhciBlPSFrKG4pJiZtLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDt1Pmk7aSsrKXt2YXIgbz1lP2VbaV06aTtpZih0KG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0sbS5jb250YWlucz1tLmluY2x1ZGVzPW0uaW5jbHVkZT1mdW5jdGlvbihuLHQscixlKXtyZXR1cm4gayhuKXx8KG49bS52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2Ygcnx8ZSkmJihyPTApLG0uaW5kZXhPZihuLHQscik+PTB9LG0uaW52b2tlPWZ1bmN0aW9uKG4sdCl7dmFyIHI9bC5jYWxsKGFyZ3VtZW50cywyKSxlPW0uaXNGdW5jdGlvbih0KTtyZXR1cm4gbS5tYXAobixmdW5jdGlvbihuKXt2YXIgdT1lP3Q6blt0XTtyZXR1cm4gbnVsbD09dT91OnUuYXBwbHkobixyKX0pfSxtLnBsdWNrPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG0ubWFwKG4sbS5wcm9wZXJ0eSh0KSl9LG0ud2hlcmU9ZnVuY3Rpb24obix0KXtyZXR1cm4gbS5maWx0ZXIobixtLm1hdGNoZXIodCkpfSxtLmZpbmRXaGVyZT1mdW5jdGlvbihuLHQpe3JldHVybiBtLmZpbmQobixtLm1hdGNoZXIodCkpfSxtLm1heD1mdW5jdGlvbihuLHQscil7dmFyIGUsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PXQmJm51bGwhPW4pe249ayhuKT9uOm0udmFsdWVzKG4pO2Zvcih2YXIgYT0wLGM9bi5sZW5ndGg7Yz5hO2ErKyllPW5bYV0sZT5pJiYoaT1lKX1lbHNlIHQ9eCh0LHIpLG0uZWFjaChuLGZ1bmN0aW9uKG4scixlKXt1PXQobixyLGUpLCh1Pm98fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxtLm1pbj1mdW5jdGlvbihuLHQscil7dmFyIGUsdSxpPTEvMCxvPTEvMDtpZihudWxsPT10JiZudWxsIT1uKXtuPWsobik/bjptLnZhbHVlcyhuKTtmb3IodmFyIGE9MCxjPW4ubGVuZ3RoO2M+YTthKyspZT1uW2FdLGk+ZSYmKGk9ZSl9ZWxzZSB0PXgodCxyKSxtLmVhY2gobixmdW5jdGlvbihuLHIsZSl7dT10KG4scixlKSwobz51fHwxLzA9PT11JiYxLzA9PT1pKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LG0uc2h1ZmZsZT1mdW5jdGlvbihuKXtmb3IodmFyIHQscj1rKG4pP246bS52YWx1ZXMobiksZT1yLmxlbmd0aCx1PUFycmF5KGUpLGk9MDtlPmk7aSsrKXQ9bS5yYW5kb20oMCxpKSx0IT09aSYmKHVbaV09dVt0XSksdVt0XT1yW2ldO3JldHVybiB1fSxtLnNhbXBsZT1mdW5jdGlvbihuLHQscil7cmV0dXJuIG51bGw9PXR8fHI/KGsobil8fChuPW0udmFsdWVzKG4pKSxuW20ucmFuZG9tKG4ubGVuZ3RoLTEpXSk6bS5zaHVmZmxlKG4pLnNsaWNlKDAsTWF0aC5tYXgoMCx0KSl9LG0uc29ydEJ5PWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gdD14KHQsciksbS5wbHVjayhtLm1hcChuLGZ1bmN0aW9uKG4scixlKXtyZXR1cm57dmFsdWU6bixpbmRleDpyLGNyaXRlcmlhOnQobixyLGUpfX0pLnNvcnQoZnVuY3Rpb24obix0KXt2YXIgcj1uLmNyaXRlcmlhLGU9dC5jcml0ZXJpYTtpZihyIT09ZSl7aWYocj5lfHxyPT09dm9pZCAwKXJldHVybiAxO2lmKGU+cnx8ZT09PXZvaWQgMClyZXR1cm4tMX1yZXR1cm4gbi5pbmRleC10LmluZGV4fSksXCJ2YWx1ZVwiKX07dmFyIEY9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXt2YXIgdT17fTtyZXR1cm4gcj14KHIsZSksbS5lYWNoKHQsZnVuY3Rpb24oZSxpKXt2YXIgbz1yKGUsaSx0KTtuKHUsZSxvKX0pLHV9fTttLmdyb3VwQnk9RihmdW5jdGlvbihuLHQscil7bS5oYXMobixyKT9uW3JdLnB1c2godCk6bltyXT1bdF19KSxtLmluZGV4Qnk9RihmdW5jdGlvbihuLHQscil7bltyXT10fSksbS5jb3VudEJ5PUYoZnVuY3Rpb24obix0LHIpe20uaGFzKG4scik/bltyXSsrOm5bcl09MX0pLG0udG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9tLmlzQXJyYXkobik/bC5jYWxsKG4pOmsobik/bS5tYXAobixtLmlkZW50aXR5KTptLnZhbHVlcyhuKTpbXX0sbS5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6ayhuKT9uLmxlbmd0aDptLmtleXMobikubGVuZ3RofSxtLnBhcnRpdGlvbj1mdW5jdGlvbihuLHQscil7dD14KHQscik7dmFyIGU9W10sdT1bXTtyZXR1cm4gbS5lYWNoKG4sZnVuY3Rpb24obixyLGkpeyh0KG4scixpKT9lOnUpLnB1c2gobil9KSxbZSx1XX0sbS5maXJzdD1tLmhlYWQ9bS50YWtlPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbnVsbD09bj92b2lkIDA6bnVsbD09dHx8cj9uWzBdOm0uaW5pdGlhbChuLG4ubGVuZ3RoLXQpfSxtLmluaXRpYWw9ZnVuY3Rpb24obix0LHIpe3JldHVybiBsLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXR8fHI/MTp0KSkpfSxtLmxhc3Q9ZnVuY3Rpb24obix0LHIpe3JldHVybiBudWxsPT1uP3ZvaWQgMDpudWxsPT10fHxyP25bbi5sZW5ndGgtMV06bS5yZXN0KG4sTWF0aC5tYXgoMCxuLmxlbmd0aC10KSl9LG0ucmVzdD1tLnRhaWw9bS5kcm9wPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbC5jYWxsKG4sbnVsbD09dHx8cj8xOnQpfSxtLmNvbXBhY3Q9ZnVuY3Rpb24obil7cmV0dXJuIG0uZmlsdGVyKG4sbS5pZGVudGl0eSl9O3ZhciBTPWZ1bmN0aW9uKG4sdCxyLGUpe2Zvcih2YXIgdT1bXSxpPTAsbz1lfHwwLGE9TyhuKTthPm87bysrKXt2YXIgYz1uW29dO2lmKGsoYykmJihtLmlzQXJyYXkoYyl8fG0uaXNBcmd1bWVudHMoYykpKXt0fHwoYz1TKGMsdCxyKSk7dmFyIGY9MCxsPWMubGVuZ3RoO2Zvcih1Lmxlbmd0aCs9bDtsPmY7KXVbaSsrXT1jW2YrK119ZWxzZSByfHwodVtpKytdPWMpfXJldHVybiB1fTttLmZsYXR0ZW49ZnVuY3Rpb24obix0KXtyZXR1cm4gUyhuLHQsITEpfSxtLndpdGhvdXQ9ZnVuY3Rpb24obil7cmV0dXJuIG0uZGlmZmVyZW5jZShuLGwuY2FsbChhcmd1bWVudHMsMSkpfSxtLnVuaXE9bS51bmlxdWU9ZnVuY3Rpb24obix0LHIsZSl7bS5pc0Jvb2xlYW4odCl8fChlPXIscj10LHQ9ITEpLG51bGwhPXImJihyPXgocixlKSk7Zm9yKHZhciB1PVtdLGk9W10sbz0wLGE9TyhuKTthPm87bysrKXt2YXIgYz1uW29dLGY9cj9yKGMsbyxuKTpjO3Q/KG8mJmk9PT1mfHx1LnB1c2goYyksaT1mKTpyP20uY29udGFpbnMoaSxmKXx8KGkucHVzaChmKSx1LnB1c2goYykpOm0uY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxtLnVuaW9uPWZ1bmN0aW9uKCl7cmV0dXJuIG0udW5pcShTKGFyZ3VtZW50cywhMCwhMCkpfSxtLmludGVyc2VjdGlvbj1mdW5jdGlvbihuKXtmb3IodmFyIHQ9W10scj1hcmd1bWVudHMubGVuZ3RoLGU9MCx1PU8obik7dT5lO2UrKyl7dmFyIGk9bltlXTtpZighbS5jb250YWlucyh0LGkpKXtmb3IodmFyIG89MTtyPm8mJm0uY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXImJnQucHVzaChpKX19cmV0dXJuIHR9LG0uZGlmZmVyZW5jZT1mdW5jdGlvbihuKXt2YXIgdD1TKGFyZ3VtZW50cywhMCwhMCwxKTtyZXR1cm4gbS5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4hbS5jb250YWlucyh0LG4pfSl9LG0uemlwPWZ1bmN0aW9uKCl7cmV0dXJuIG0udW56aXAoYXJndW1lbnRzKX0sbS51bnppcD1mdW5jdGlvbihuKXtmb3IodmFyIHQ9biYmbS5tYXgobixPKS5sZW5ndGh8fDAscj1BcnJheSh0KSxlPTA7dD5lO2UrKylyW2VdPW0ucGx1Y2sobixlKTtyZXR1cm4gcn0sbS5vYmplY3Q9ZnVuY3Rpb24obix0KXtmb3IodmFyIHI9e30sZT0wLHU9TyhuKTt1PmU7ZSsrKXQ/cltuW2VdXT10W2VdOnJbbltlXVswXV09bltlXVsxXTtyZXR1cm4gcn0sbS5maW5kSW5kZXg9dCgxKSxtLmZpbmRMYXN0SW5kZXg9dCgtMSksbS5zb3J0ZWRJbmRleD1mdW5jdGlvbihuLHQscixlKXtyPXgocixlLDEpO2Zvcih2YXIgdT1yKHQpLGk9MCxvPU8obik7bz5pOyl7dmFyIGE9TWF0aC5mbG9vcigoaStvKS8yKTtyKG5bYV0pPHU/aT1hKzE6bz1hfXJldHVybiBpfSxtLmluZGV4T2Y9cigxLG0uZmluZEluZGV4LG0uc29ydGVkSW5kZXgpLG0ubGFzdEluZGV4T2Y9cigtMSxtLmZpbmRMYXN0SW5kZXgpLG0ucmFuZ2U9ZnVuY3Rpb24obix0LHIpe251bGw9PXQmJih0PW58fDAsbj0wKSxyPXJ8fDE7Zm9yKHZhciBlPU1hdGgubWF4KE1hdGguY2VpbCgodC1uKS9yKSwwKSx1PUFycmF5KGUpLGk9MDtlPmk7aSsrLG4rPXIpdVtpXT1uO3JldHVybiB1fTt2YXIgRT1mdW5jdGlvbihuLHQscixlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXJldHVybiBuLmFwcGx5KHIsdSk7dmFyIGk9aihuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIG0uaXNPYmplY3Qobyk/bzppfTttLmJpbmQ9ZnVuY3Rpb24obix0KXtpZihnJiZuLmJpbmQ9PT1nKXJldHVybiBnLmFwcGx5KG4sbC5jYWxsKGFyZ3VtZW50cywxKSk7aWYoIW0uaXNGdW5jdGlvbihuKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciByPWwuY2FsbChhcmd1bWVudHMsMiksZT1mdW5jdGlvbigpe3JldHVybiBFKG4sZSx0LHRoaXMsci5jb25jYXQobC5jYWxsKGFyZ3VtZW50cykpKX07cmV0dXJuIGV9LG0ucGFydGlhbD1mdW5jdGlvbihuKXt2YXIgdD1sLmNhbGwoYXJndW1lbnRzLDEpLHI9ZnVuY3Rpb24oKXtmb3IodmFyIGU9MCx1PXQubGVuZ3RoLGk9QXJyYXkodSksbz0wO3U+bztvKyspaVtvXT10W29dPT09bT9hcmd1bWVudHNbZSsrXTp0W29dO2Zvcig7ZTxhcmd1bWVudHMubGVuZ3RoOylpLnB1c2goYXJndW1lbnRzW2UrK10pO3JldHVybiBFKG4scix0aGlzLHRoaXMsaSl9O3JldHVybiByfSxtLmJpbmRBbGw9ZnVuY3Rpb24obil7dmFyIHQscixlPWFyZ3VtZW50cy5sZW5ndGg7aWYoMT49ZSl0aHJvdyBuZXcgRXJyb3IoXCJiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzXCIpO2Zvcih0PTE7ZT50O3QrKylyPWFyZ3VtZW50c1t0XSxuW3JdPW0uYmluZChuW3JdLG4pO3JldHVybiBufSxtLm1lbW9pemU9ZnVuY3Rpb24obix0KXt2YXIgcj1mdW5jdGlvbihlKXt2YXIgdT1yLmNhY2hlLGk9XCJcIisodD90LmFwcGx5KHRoaXMsYXJndW1lbnRzKTplKTtyZXR1cm4gbS5oYXModSxpKXx8KHVbaV09bi5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHVbaV19O3JldHVybiByLmNhY2hlPXt9LHJ9LG0uZGVsYXk9ZnVuY3Rpb24obix0KXt2YXIgcj1sLmNhbGwoYXJndW1lbnRzLDIpO3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkobnVsbCxyKX0sdCl9LG0uZGVmZXI9bS5wYXJ0aWFsKG0uZGVsYXksbSwxKSxtLnRocm90dGxlPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZSx1LGksbz1udWxsLGE9MDtyfHwocj17fSk7dmFyIGM9ZnVuY3Rpb24oKXthPXIubGVhZGluZz09PSExPzA6bS5ub3coKSxvPW51bGwsaT1uLmFwcGx5KGUsdSksb3x8KGU9dT1udWxsKX07cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGY9bS5ub3coKTthfHxyLmxlYWRpbmchPT0hMXx8KGE9Zik7dmFyIGw9dC0oZi1hKTtyZXR1cm4gZT10aGlzLHU9YXJndW1lbnRzLDA+PWx8fGw+dD8obyYmKGNsZWFyVGltZW91dChvKSxvPW51bGwpLGE9ZixpPW4uYXBwbHkoZSx1KSxvfHwoZT11PW51bGwpKTpvfHxyLnRyYWlsaW5nPT09ITF8fChvPXNldFRpbWVvdXQoYyxsKSksaX19LG0uZGVib3VuY2U9ZnVuY3Rpb24obix0LHIpe3ZhciBlLHUsaSxvLGEsYz1mdW5jdGlvbigpe3ZhciBmPW0ubm93KCktbzt0PmYmJmY+PTA/ZT1zZXRUaW1lb3V0KGMsdC1mKTooZT1udWxsLHJ8fChhPW4uYXBwbHkoaSx1KSxlfHwoaT11PW51bGwpKSl9O3JldHVybiBmdW5jdGlvbigpe2k9dGhpcyx1PWFyZ3VtZW50cyxvPW0ubm93KCk7dmFyIGY9ciYmIWU7cmV0dXJuIGV8fChlPXNldFRpbWVvdXQoYyx0KSksZiYmKGE9bi5hcHBseShpLHUpLGk9dT1udWxsKSxhfX0sbS53cmFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG0ucGFydGlhbCh0LG4pfSxtLm5lZ2F0ZT1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4hbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxtLmNvbXBvc2U9ZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHMsdD1uLmxlbmd0aC0xO3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgcj10LGU9blt0XS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7ci0tOyllPW5bcl0uY2FsbCh0aGlzLGUpO3JldHVybiBlfX0sbS5hZnRlcj1mdW5jdGlvbihuLHQpe3JldHVybiBmdW5jdGlvbigpe3JldHVybi0tbjwxP3QuYXBwbHkodGhpcyxhcmd1bWVudHMpOnZvaWQgMH19LG0uYmVmb3JlPWZ1bmN0aW9uKG4sdCl7dmFyIHI7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuLS1uPjAmJihyPXQuYXBwbHkodGhpcyxhcmd1bWVudHMpKSwxPj1uJiYodD1udWxsKSxyfX0sbS5vbmNlPW0ucGFydGlhbChtLmJlZm9yZSwyKTt2YXIgTT0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksST1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXTttLmtleXM9ZnVuY3Rpb24obil7aWYoIW0uaXNPYmplY3QobikpcmV0dXJuW107aWYodilyZXR1cm4gdihuKTt2YXIgdD1bXTtmb3IodmFyIHIgaW4gbiltLmhhcyhuLHIpJiZ0LnB1c2gocik7cmV0dXJuIE0mJmUobix0KSx0fSxtLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIW0uaXNPYmplY3QobikpcmV0dXJuW107dmFyIHQ9W107Zm9yKHZhciByIGluIG4pdC5wdXNoKHIpO3JldHVybiBNJiZlKG4sdCksdH0sbS52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciB0PW0ua2V5cyhuKSxyPXQubGVuZ3RoLGU9QXJyYXkociksdT0wO3I+dTt1KyspZVt1XT1uW3RbdV1dO3JldHVybiBlfSxtLm1hcE9iamVjdD1mdW5jdGlvbihuLHQscil7dD14KHQscik7Zm9yKHZhciBlLHU9bS5rZXlzKG4pLGk9dS5sZW5ndGgsbz17fSxhPTA7aT5hO2ErKyllPXVbYV0sb1tlXT10KG5bZV0sZSxuKTtyZXR1cm4gb30sbS5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHQ9bS5rZXlzKG4pLHI9dC5sZW5ndGgsZT1BcnJheShyKSx1PTA7cj51O3UrKyllW3VdPVt0W3VdLG5bdFt1XV1dO3JldHVybiBlfSxtLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHQ9e30scj1tLmtleXMobiksZT0wLHU9ci5sZW5ndGg7dT5lO2UrKyl0W25bcltlXV1dPXJbZV07cmV0dXJuIHR9LG0uZnVuY3Rpb25zPW0ubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgdD1bXTtmb3IodmFyIHIgaW4gbiltLmlzRnVuY3Rpb24obltyXSkmJnQucHVzaChyKTtyZXR1cm4gdC5zb3J0KCl9LG0uZXh0ZW5kPV8obS5hbGxLZXlzKSxtLmV4dGVuZE93bj1tLmFzc2lnbj1fKG0ua2V5cyksbS5maW5kS2V5PWZ1bmN0aW9uKG4sdCxyKXt0PXgodCxyKTtmb3IodmFyIGUsdT1tLmtleXMobiksaT0wLG89dS5sZW5ndGg7bz5pO2krKylpZihlPXVbaV0sdChuW2VdLGUsbikpcmV0dXJuIGV9LG0ucGljaz1mdW5jdGlvbihuLHQscil7dmFyIGUsdSxpPXt9LG89bjtpZihudWxsPT1vKXJldHVybiBpO20uaXNGdW5jdGlvbih0KT8odT1tLmFsbEtleXMobyksZT1iKHQscikpOih1PVMoYXJndW1lbnRzLCExLCExLDEpLGU9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0IGluIHJ9LG89T2JqZWN0KG8pKTtmb3IodmFyIGE9MCxjPXUubGVuZ3RoO2M+YTthKyspe3ZhciBmPXVbYV0sbD1vW2ZdO2UobCxmLG8pJiYoaVtmXT1sKX1yZXR1cm4gaX0sbS5vbWl0PWZ1bmN0aW9uKG4sdCxyKXtpZihtLmlzRnVuY3Rpb24odCkpdD1tLm5lZ2F0ZSh0KTtlbHNle3ZhciBlPW0ubWFwKFMoYXJndW1lbnRzLCExLCExLDEpLFN0cmluZyk7dD1mdW5jdGlvbihuLHQpe3JldHVybiFtLmNvbnRhaW5zKGUsdCl9fXJldHVybiBtLnBpY2sobix0LHIpfSxtLmRlZmF1bHRzPV8obS5hbGxLZXlzLCEwKSxtLmNyZWF0ZT1mdW5jdGlvbihuLHQpe3ZhciByPWoobik7cmV0dXJuIHQmJm0uZXh0ZW5kT3duKHIsdCkscn0sbS5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gbS5pc09iamVjdChuKT9tLmlzQXJyYXkobik/bi5zbGljZSgpOm0uZXh0ZW5kKHt9LG4pOm59LG0udGFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHQobiksbn0sbS5pc01hdGNoPWZ1bmN0aW9uKG4sdCl7dmFyIHI9bS5rZXlzKHQpLGU9ci5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtlPmk7aSsrKXt2YXIgbz1yW2ldO2lmKHRbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9O3ZhciBOPWZ1bmN0aW9uKG4sdCxyLGUpe2lmKG49PT10KXJldHVybiAwIT09bnx8MS9uPT09MS90O2lmKG51bGw9PW58fG51bGw9PXQpcmV0dXJuIG49PT10O24gaW5zdGFuY2VvZiBtJiYobj1uLl93cmFwcGVkKSx0IGluc3RhbmNlb2YgbSYmKHQ9dC5fd3JhcHBlZCk7dmFyIHU9cy5jYWxsKG4pO2lmKHUhPT1zLmNhbGwodCkpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIit0O2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT09K24/K3QhPT0rdDowPT09K24/MS8rbj09PTEvdDorbj09PSt0O2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PT0rdH12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHQpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXQuY29uc3RydWN0b3I7aWYobyE9PWEmJiEobS5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmbS5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHQpcmV0dXJuITF9cj1yfHxbXSxlPWV8fFtdO2Zvcih2YXIgYz1yLmxlbmd0aDtjLS07KWlmKHJbY109PT1uKXJldHVybiBlW2NdPT09dDtpZihyLnB1c2gobiksZS5wdXNoKHQpLGkpe2lmKGM9bi5sZW5ndGgsYyE9PXQubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighTihuW2NdLHRbY10scixlKSlyZXR1cm4hMX1lbHNle3ZhciBmLGw9bS5rZXlzKG4pO2lmKGM9bC5sZW5ndGgsbS5rZXlzKHQpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGY9bFtjXSwhbS5oYXModCxmKXx8IU4obltmXSx0W2ZdLHIsZSkpcmV0dXJuITF9cmV0dXJuIHIucG9wKCksZS5wb3AoKSwhMH07bS5pc0VxdWFsPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIE4obix0KX0sbS5pc0VtcHR5PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPyEwOmsobikmJihtLmlzQXJyYXkobil8fG0uaXNTdHJpbmcobil8fG0uaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09bS5rZXlzKG4pLmxlbmd0aH0sbS5pc0VsZW1lbnQ9ZnVuY3Rpb24obil7cmV0dXJuISghbnx8MSE9PW4ubm9kZVR5cGUpfSxtLmlzQXJyYXk9aHx8ZnVuY3Rpb24obil7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09cy5jYWxsKG4pfSxtLmlzT2JqZWN0PWZ1bmN0aW9uKG4pe3ZhciB0PXR5cGVvZiBuO3JldHVyblwiZnVuY3Rpb25cIj09PXR8fFwib2JqZWN0XCI9PT10JiYhIW59LG0uZWFjaChbXCJBcmd1bWVudHNcIixcIkZ1bmN0aW9uXCIsXCJTdHJpbmdcIixcIk51bWJlclwiLFwiRGF0ZVwiLFwiUmVnRXhwXCIsXCJFcnJvclwiXSxmdW5jdGlvbihuKXttW1wiaXNcIituXT1mdW5jdGlvbih0KXtyZXR1cm4gcy5jYWxsKHQpPT09XCJbb2JqZWN0IFwiK24rXCJdXCJ9fSksbS5pc0FyZ3VtZW50cyhhcmd1bWVudHMpfHwobS5pc0FyZ3VtZW50cz1mdW5jdGlvbihuKXtyZXR1cm4gbS5oYXMobixcImNhbGxlZVwiKX0pLFwiZnVuY3Rpb25cIiE9dHlwZW9mLy4vJiZcIm9iamVjdFwiIT10eXBlb2YgSW50OEFycmF5JiYobS5pc0Z1bmN0aW9uPWZ1bmN0aW9uKG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG58fCExfSksbS5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4gaXNGaW5pdGUobikmJiFpc05hTihwYXJzZUZsb2F0KG4pKX0sbS5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4gbS5pc051bWJlcihuKSYmbiE9PStufSxtLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4gbj09PSEwfHxuPT09ITF8fFwiW29iamVjdCBCb29sZWFuXVwiPT09cy5jYWxsKG4pfSxtLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LG0uaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIG49PT12b2lkIDB9LG0uaGFzPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGwhPW4mJnAuY2FsbChuLHQpfSxtLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdS5fPWksdGhpc30sbS5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0sbS5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LG0ubm9vcD1mdW5jdGlvbigpe30sbS5wcm9wZXJ0eT13LG0ucHJvcGVydHlPZj1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj9mdW5jdGlvbigpe306ZnVuY3Rpb24odCl7cmV0dXJuIG5bdF19fSxtLm1hdGNoZXI9bS5tYXRjaGVzPWZ1bmN0aW9uKG4pe3JldHVybiBuPW0uZXh0ZW5kT3duKHt9LG4pLGZ1bmN0aW9uKHQpe3JldHVybiBtLmlzTWF0Y2godCxuKX19LG0udGltZXM9ZnVuY3Rpb24obix0LHIpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3Q9Yih0LHIsMSk7Zm9yKHZhciB1PTA7bj51O3UrKyllW3VdPXQodSk7cmV0dXJuIGV9LG0ucmFuZG9tPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PXQmJih0PW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoodC1uKzEpKX0sbS5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBCPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sVD1tLmludmVydChCKSxSPWZ1bmN0aW9uKG4pe3ZhciB0PWZ1bmN0aW9uKHQpe3JldHVybiBuW3RdfSxyPVwiKD86XCIrbS5rZXlzKG4pLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKHIpLHU9UmVnRXhwKHIsXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07bS5lc2NhcGU9UihCKSxtLnVuZXNjYXBlPVIoVCksbS5yZXN1bHQ9ZnVuY3Rpb24obix0LHIpe3ZhciBlPW51bGw9PW4/dm9pZCAwOm5bdF07cmV0dXJuIGU9PT12b2lkIDAmJihlPXIpLG0uaXNGdW5jdGlvbihlKT9lLmNhbGwobik6ZX07dmFyIHE9MDttLnVuaXF1ZUlkPWZ1bmN0aW9uKG4pe3ZhciB0PSsrcStcIlwiO3JldHVybiBuP24rdDp0fSxtLnRlbXBsYXRlU2V0dGluZ3M9e2V2YWx1YXRlOi88JShbXFxzXFxTXSs/KSU+L2csaW50ZXJwb2xhdGU6LzwlPShbXFxzXFxTXSs/KSU+L2csZXNjYXBlOi88JS0oW1xcc1xcU10rPyklPi9nfTt2YXIgSz0vKC4pXi8sej17XCInXCI6XCInXCIsXCJcXFxcXCI6XCJcXFxcXCIsXCJcXHJcIjpcInJcIixcIlxcblwiOlwiblwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LEQ9L1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nLEw9ZnVuY3Rpb24obil7cmV0dXJuXCJcXFxcXCIreltuXX07bS50ZW1wbGF0ZT1mdW5jdGlvbihuLHQscil7IXQmJnImJih0PXIpLHQ9bS5kZWZhdWx0cyh7fSx0LG0udGVtcGxhdGVTZXR0aW5ncyk7dmFyIGU9UmVnRXhwKFsodC5lc2NhcGV8fEspLnNvdXJjZSwodC5pbnRlcnBvbGF0ZXx8Sykuc291cmNlLCh0LmV2YWx1YXRlfHxLKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksdT0wLGk9XCJfX3ArPSdcIjtuLnJlcGxhY2UoZSxmdW5jdGlvbih0LHIsZSxvLGEpe3JldHVybiBpKz1uLnNsaWNlKHUsYSkucmVwbGFjZShELEwpLHU9YSt0Lmxlbmd0aCxyP2krPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjplP2krPVwiJytcXG4oKF9fdD0oXCIrZStcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOm8mJihpKz1cIic7XFxuXCIrbytcIlxcbl9fcCs9J1wiKSx0fSksaSs9XCInO1xcblwiLHQudmFyaWFibGV8fChpPVwid2l0aChvYmp8fHt9KXtcXG5cIitpK1wifVxcblwiKSxpPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIitpK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dmFyIG89bmV3IEZ1bmN0aW9uKHQudmFyaWFibGV8fFwib2JqXCIsXCJfXCIsaSl9Y2F0Y2goYSl7dGhyb3cgYS5zb3VyY2U9aSxhfXZhciBjPWZ1bmN0aW9uKG4pe3JldHVybiBvLmNhbGwodGhpcyxuLG0pfSxmPXQudmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIGMuc291cmNlPVwiZnVuY3Rpb24oXCIrZitcIil7XFxuXCIraStcIn1cIixjfSxtLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciB0PW0obik7cmV0dXJuIHQuX2NoYWluPSEwLHR9O3ZhciBQPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4uX2NoYWluP20odCkuY2hhaW4oKTp0fTttLm1peGluPWZ1bmN0aW9uKG4pe20uZWFjaChtLmZ1bmN0aW9ucyhuKSxmdW5jdGlvbih0KXt2YXIgcj1tW3RdPW5bdF07bS5wcm90b3R5cGVbdF09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIGYuYXBwbHkobixhcmd1bWVudHMpLFAodGhpcyxyLmFwcGx5KG0sbikpfX0pfSxtLm1peGluKG0pLG0uZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24obil7dmFyIHQ9b1tuXTttLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3ZhciByPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkocixhcmd1bWVudHMpLFwic2hpZnRcIiE9PW4mJlwic3BsaWNlXCIhPT1ufHwwIT09ci5sZW5ndGh8fGRlbGV0ZSByWzBdLFAodGhpcyxyKX19KSxtLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgdD1vW25dO20ucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIFAodGhpcyx0LmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksbS5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0sbS5wcm90b3R5cGUudmFsdWVPZj1tLnByb3RvdHlwZS50b0pTT049bS5wcm90b3R5cGUudmFsdWUsbS5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIlwiK3RoaXMuX3dyYXBwZWR9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIG19KX0pLmNhbGwodGhpcyk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuZGVyc2NvcmUtbWluLm1hcFxyXG5cclxuXHJcblxyXG4vKlxyXG4gKiBDdXN0b21cclxuICovXHJcbmZ1bmN0aW9uIGFkZFRleHROb2RlKHRleHQpIHtcclxuICBsZXQgbmV3dGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xyXG4gIHJldHVybiBuZXd0ZXh0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRBdHRyKGl0ZW0sIGh0bWxFbGVtZW50KXtcclxuXHRmb3IgKGtleSBpbiBpdGVtKXtcclxuXHRcdGlmIChrZXkgIT0gXCJ0ZXh0XCIgJiYga2V5ICE9IFwidGFnXCIgJiYga2V5ICE9IFwiaHRtbFwiICYmIGtleSAhPSBcInRleHRcIiAmJiBrZXkgIT0gXCJjaGlsZHJlblwiKSB7XHJcblx0XHRcdGh0bWxFbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGl0ZW1ba2V5XSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJIVE1MKGVsZW1lbnQsIHBhcmVudCl7XHJcblx0Ly9pZiBpdCBpcyB0aGUgZGVlcGVzdCB0YWcgZWxlbWVudFxyXG5cdGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50KSAmJiAhZWxlbWVudC5jaGlsZHJlbikge1xyXG5cdFx0aWYgKGVsZW1lbnQudGV4dCkge1xyXG5cdFx0XHRyZXR1cm4gcGFyZW50LmFwcGVuZChhZGRUZXh0Tm9kZShlbGVtZW50LnRleHQpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBodG1sRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudC50YWcpO1xyXG5cdFx0XHQvL2FkZCBhdHRyaWJ1dGVzXHJcblx0XHRcdHNldEF0dHIoZWxlbWVudCxodG1sRWxlbSk7XHJcblxyXG5cdFx0XHRodG1sRWxlbS5hcHBlbmQoYWRkVGV4dE5vZGUoZWxlbWVudC5odG1sKSk7XHJcblx0XHRcdHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoaHRtbEVsZW0pO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRlbGVtZW50LmZvckVhY2goKGl0ZW0pPT4ge1xyXG5cdFx0XHRpZiAoaXRlbS5jaGlsZHJlbikge1xyXG5cdFx0XHRcdGxldCBodG1sRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS50YWcpO1xyXG5cdFx0XHRcdC8vYWRkIGF0dHJpYnV0ZXNcclxuXHRcdFx0XHRzZXRBdHRyKGl0ZW0sIGh0bWxFbGVtKTtcclxuXHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENoaWxkKGh0bWxFbGVtKTtcclxuXHRcdFx0XHRyZW5kZXJIVE1MKGl0ZW0uY2hpbGRyZW4sIGh0bWxFbGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZW5kZXJIVE1MKGl0ZW0sIHBhcmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbi8vcmV0dXJuIGpzb24gcGFyc2VkIGpzb24gZmlsZVxyXG5jb25zdCAgZ2V0SlNPTiA9IGFzeW5jIChwYXRoKT0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXRoKTtcclxuXHRsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBTdG9yYWdlIHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy50ZW1wSXRlbXMgPSBbXTtcclxuXHRcdHRoaXMudGVtcFVzZXJzID0gW107XHJcblx0XHR0aGlzLmZpbHRlclBhcmFtcyA9IHt9O1xyXG5cdFx0dGhpcy5wYXRoID0ge1xyXG5cdFx0XHRpdGVtczogJ2pzb24vbGlzdGl0ZW1zLmpzb24nLFxyXG5cdFx0XHR1c2VyczogJ2pzb24vdXNlcnMuanNvbidcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHRoaXMubG9hZExvY2FsU3RvcmFnZSgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbG9hZExvY2FsU3RvcmFnZSgpIHtcclxuXHRcdGxldCBpdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpdGVtcycpO1xyXG5cdFx0bGV0IHVzZXJzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJzJyk7XHJcblx0XHRhd2FpdCB0aGlzLnVwZGF0ZVRlbXBTdG9yYWdlKGl0ZW1zLCAnaXRlbXMnKTtcclxuXHRcdGF3YWl0IHRoaXMudXBkYXRlVGVtcFN0b3JhZ2UodXNlcnMsICd1c2VycycpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlVGVtcFN0b3JhZ2UoZGF0YSwga2V5KSB7XHJcblx0XHRzd2l0Y2ggKGtleSkge1xyXG5cdFx0XHRjYXNlICdpdGVtcyc6XHJcblx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdHRoaXMudGVtcEl0ZW1zID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy50ZW1wSXRlbXMgPSBhd2FpdCBnZXRKU09OKHRoaXMucGF0aC5pdGVtcyk7XHJcblx0XHRcdFx0XHR0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHRoaXMudGVtcEl0ZW1zKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICd1c2Vycyc6XHJcblx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdHRoaXMudGVtcFVzZXJzID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy50ZW1wVXNlcnMgPSBhd2FpdCBnZXRKU09OKHRoaXMucGF0aC51c2Vycyk7XHJcblx0XHRcdFx0XHR0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHRoaXMudGVtcFVzZXJzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBFcnJvciAoJ3NlcmV2ZXIgbm90IHJlc3BvbmQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNhdmVUb0xvY2FsU3RvcmFnZShrZXksIGRhdGEpIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cdH1cclxuXHJcblx0IGdldFRlbXBTdG9yYWdlKG5hbWUpIHtcclxuXHRcdHN3aXRjaCAobmFtZSkge1xyXG5cdFx0XHRjYXNlICdpdGVtcyc6XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudGVtcEl0ZW1zO1xyXG5cdFx0XHRjYXNlICd1c2Vycyc6XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudGVtcFVzZXJzO1xyXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBFcnJvciAoJ3NlcmV2ZXIgbm90IHJlc3BvbmQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldEl0ZW1CeUlkKGlkKSB7XHJcblx0XHRyZXR1cm4gdGhpcy50ZW1wSXRlbXMuZmluZChpdGVtID0+IGl0ZW0uaWRfaXRlbSA9PSBpZCk7XHJcblx0fVxyXG5cclxuXHRnZXRGaWx0ZXJlZEl0ZW1zKHBhcmFtcyl7XHJcblx0XHR0aGlzLmZpbHRlclBhcmFtcyA9IHBhcmFtcztcclxuXHRcdGNvbnNvbGUuZGlyKHRoaXMuZmlsdGVyUGFyYW1zKTtcclxuXHRcdGxldCBmaWx0ZXJBcnJJdGVtcyA9IHRoaXMuZ2V0SXRlbXNCeUNvbmRpdGlvbigpO1xyXG5cdFx0ZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlTaGlwcGluZyhmaWx0ZXJBcnJJdGVtcyk7XHJcblx0XHRmaWx0ZXJBcnJJdGVtcyA9IHRoaXMuZ2V0SXRlbXNCeUZvcm1hdChmaWx0ZXJBcnJJdGVtcyk7XHJcblx0XHRmaWx0ZXJBcnJJdGVtcyA9IHRoaXMuZ2V0SXRlbXNCeVByaWNlKGZpbHRlckFyckl0ZW1zKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zID0gdGhpcy5nZXRJdGVtc0J5VXNlclJlcXVlc3QoZmlsdGVyQXJySXRlbXMpO1xyXG5cdFx0Y29uc29sZS5kaXIoZmlsdGVyQXJySXRlbXMpO1xyXG5cdFx0cmV0dXJuIGZpbHRlckFyckl0ZW1zO1xyXG5cclxuXHR9XHJcblxyXG5cdG1ha2VBcnJheShzdHIpIHtcclxuXHRcdHJldHVybiBzdHIuc3BsaXQoJywnKTtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1zQnlVc2VyUmVxdWVzdChhcnIpe1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyUGFyYW1zWyd1c2VycmVxdWVzdCddKXtcclxuXHRcdFx0Y29uc29sZS5sb2coJ2hlcmUnKTtcclxuXHRcdFx0bGV0IHN0clBhcmFtcyA9IHRoaXMubWFrZUFycmF5KHRoaXMuZmlsdGVyUGFyYW1zWyd1c2VycmVxdWVzdCddKS5qb2luKCcgJyk7XHJcblx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4gbmV3IFJlZ0V4cChzdHJQYXJhbXMsICdpJykudGVzdChpdGVtLnRpdGxlKSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gYXJyO1xyXG5cdH1cclxuXHJcblx0Z2V0SXRlbXNCeVByaWNlKGFycil7XHJcblx0XHRpZih0aGlzLmZpbHRlclBhcmFtc1snZnJvbSddKSB7XHJcblx0XHRcdGlmICh0aGlzLmZpbHRlclBhcmFtc1sndG8nXSkge1xyXG5cdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlSW50KGl0ZW0ucHJpY2UpID49ICt0aGlzLmZpbHRlclBhcmFtc1snZnJvbSddICYmIHBhcnNlSW50KGl0ZW0ucHJpY2UpIDw9ICt0aGlzLmZpbHRlclBhcmFtc1sndG8nXTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHBhcnNlSW50KGl0ZW0ucHJpY2UpID49ICt0aGlzLmZpbHRlclBhcmFtc1snZnJvbSddO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBhcnI7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtc0J5Q29uZGl0aW9uKCl7XHJcblx0XHRpZiAodGhpcy5maWx0ZXJQYXJhbXNbJ2NvbmRpdGlvbiddKXtcclxuXHRcdFx0bGV0IGFyclBhcmFtcyA9IHRoaXMubWFrZUFycmF5KHRoaXMuZmlsdGVyUGFyYW1zWydjb25kaXRpb24nXSk7XHJcblx0XHRcdGlmIChhcnJQYXJhbXMubGVuZ3RoID09IDIpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy50ZW1wSXRlbXMuZmlsdGVyKGl0ZW0gPT4ge3JldHVybiBpdGVtLmNvbmRpdGlvbiA9PSBhcnJQYXJhbXNbMF0gfHwgaXRlbS5jb25kaXRpb24gPT0gYXJyUGFyYW1zWzFdfSlcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoYXJyUGFyYW1zLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudGVtcEl0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uY29uZGl0aW9uID09IGFyclBhcmFtc1swXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLnRlbXBJdGVtcztcclxuXHR9XHJcblxyXG5cdHJlcGxhY2VTaGlwcGluZ1BhcmFtcyhhcnIpe1xyXG5cdFx0cmV0dXJuIGFyci5tYXAobmFtZSA9PntcclxuXHRcdFx0aWYgKG5hbWUgPT0gJ2ZyZWUnKSB7XHJcblx0XHRcdFx0cmV0dXJuICdGcmVlIFNoaXBwaW5nJztcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAobmFtZSA9PSAnaW5zdG9yZScpIHtcclxuXHRcdFx0XHRyZXR1cm4gJ0ZyZWUgSW4tc3RvcmUgUGlja3VwJztcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAobmFtZSA9PSAnbG9jYWwnKSB7XHJcblx0XHRcdFx0cmV0dXJuICdGcmVlIExvY2FsIFBpY2t1cCc7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRnZXRJdGVtc0J5U2hpcHBpbmcoYXJyKXtcclxuXHRcdGlmICh0aGlzLmZpbHRlclBhcmFtc1snc2hpcHBpbmcnXSl7XHJcblx0XHRcdGxldCBhcnJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLmZpbHRlclBhcmFtc1snc2hpcHBpbmcnXSk7XHJcblx0XHRcdGFyclBhcmFtcyA9IHRoaXMucmVwbGFjZVNoaXBwaW5nUGFyYW1zKGFyclBhcmFtcyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKGFyclBhcmFtcyk7XHJcblx0XHRcdFx0aWYgKGFyclBhcmFtcy5sZW5ndGggPT0gMykge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiB7cmV0dXJuIGl0ZW0uc2hpcHBpbmcgPT0gYXJyUGFyYW1zWzBdIHx8IGl0ZW0uc2hpcHBpbmcgPT0gYXJyUGFyYW1zWzFdIHx8IGl0ZW0uc2hpcHBpbmcgPT0gYXJyUGFyYW1zWzJdfSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChhcnJQYXJhbXMubGVuZ3RoID09IDIpIHtcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4ge3JldHVybiBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1swXSB8fCBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1sxXX0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoYXJyUGFyYW1zLmxlbmd0aCA9PSAxKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IGl0ZW0uc2hpcHBpbmcgPT0gYXJyUGFyYW1zWzBdKTtcclxuXHRcdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gYXJyO1xyXG5cdH1cclxuXHJcblx0Z2V0SXRlbXNCeUZvcm1hdChhcnIpe1xyXG5cdFx0c3dpdGNoICh0aGlzLmZpbHRlclBhcmFtc1snZm9ybWF0J10pe1xyXG5cdFx0XHRjYXNlICdidXlpdG5vdyc6XHJcblx0XHRcdFx0cmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiBpdGVtLmJ1eSA9PSB0cnVlKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2F1Y3Rpb24nOlxyXG5cdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4gaXRlbS5hdWN0aW9uID09IHRydWUpXHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnZGVmYXVsdCcpOyByZXR1cm4gYXJyO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4vLyBvcHRpb24gYWxsIG9yIGVtcHR5XHJcbmNsYXNzIEZpbHRlciB7XHJcblx0Y29uc3RydWN0b3Ioe29wdGlvbiA9ICdzZWFyY2gnLCBwYXJhbXMgPSB7fX0gPXt9KXtcclxuXHRcdHRoaXMucmVnRXhwID0gL15cXC9zZWFyY2guKy9pO1xyXG5cdFx0dGhpcy51c2VycmVxdWVzdFJlZ0V4cCA9IC9bYS16MC05YS160LAt0Y/RkV0rL2dpO1xyXG5cdFx0dGhpcy5vcHRpb24gPSBvcHRpb247XHJcblx0XHR0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0dGhpcy5maW5kTm9kZXMoKTtcclxuXHRcdHRoaXMuYmluZEFsbCgpO1xyXG5cdFx0dGhpcy5hZGRFdmVudHMoKTtcclxuXHRcdHRoaXMuYXV0b0NoZWNrKCk7XHJcblx0fVxyXG5cclxuXHRmaW5kTm9kZXMoKSB7XHJcblx0XHRpZiAodGhpcy5vcHRpb24gPT0gJ2FsbCcpIHtcclxuXHRcdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0XHRjb25kaXRpb246IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjb25kaXRpb24nKSxcclxuXHRcdFx0XHRzaGlwcGluZzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3NoaXBwaW5nJyksXHJcblx0XHRcdFx0ZnJvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zyb20nKSxcclxuXHRcdFx0XHR0bzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvJyksXHJcblx0XHRcdFx0YnRuZnJvbXRvOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuZnJvbXRvJyksXHJcblx0XHRcdFx0c2VhcmNoOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJyksXHJcblx0XHRcdFx0c2VhcmNoQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0JyksXHJcblx0XHRcdFx0YnV5aXRub3c6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXlpdG5vdycpLFxyXG5cdFx0XHRcdGF1Y3Rpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdWN0aW9uJyksXHJcblx0XHRcdFx0Zm9ybWF0OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnZm9ybWF0JyksXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubm9kZXMgPSB7XHJcblx0XHRcdFx0c2VhcmNoOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJyksXHJcblx0XHRcdFx0c2VhcmNoQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0JyksXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRiaW5kQWxsKCkge1xyXG5cdFx0dGhpcy5jaGVja0NvbmRpdGlvbiA9IHRoaXMuY2hlY2tDb25kaXRpb24uYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuY2hlY2tTaGlwcGluZyA9IHRoaXMuY2hlY2tTaGlwcGluZy5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5yYW5nZVByaWNlID0gdGhpcy5yYW5nZVByaWNlLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmNoZWNrRm9ybWF0ID0gdGhpcy5jaGVja0Zvcm1hdC5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5zZWFyY2ggPSB0aGlzLnNlYXJjaC5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5oYW5kbGVyID0gdGhpcy5oYW5kbGVyLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLmhhbmRsZXJBbGwgPSB0aGlzLmhhbmRsZXJBbGwuYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdGFkZEV2ZW50cygpIHtcclxuXHRcdGlmICh0aGlzLm9wdGlvbiA9PSAnYWxsJyl7XHJcblx0XHRcdHRoaXMubm9kZXMuY29uZGl0aW9uWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5jb25kaXRpb25bMV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLnNoaXBwaW5nWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1sxXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuc2hpcHBpbmdbMl0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLmJ0bmZyb210by5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuZm9ybWF0WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5mb3JtYXRbMV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm5vZGVzLnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlcik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRtYWtlQXJyYXkoc3RyKSB7XHJcblx0XHRyZXR1cm4gc3RyLnNwbGl0KCcsJyk7XHJcblx0fVxyXG5cclxuXHRhdXRvQ2hlY2soKSB7XHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ2NvbmRpdGlvbiddKXtcclxuXHRcdFx0bGV0IGFyclBhcmFtcyA9IHRoaXMubWFrZUFycmF5KHRoaXMucGFyYW1zWydjb25kaXRpb24nXSk7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrQ29uZGl0aW9uKGFyclBhcmFtcyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3NoaXBwaW5nJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ3NoaXBwaW5nJ10pO1xyXG5cdFx0XHR0aGlzLmF1dG9DaGVja1NoaXBwaW5nKGFyclBhcmFtcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMucGFyYW1zWyd0byddKXtcclxuXHRcdFx0bGV0IGFyclBhcmFtcyA9IHRoaXMubWFrZUFycmF5KHRoaXMucGFyYW1zWyd0byddKTtcclxuXHRcdFx0dGhpcy5hdXRvQ2hlY2tSYW5nZVByaWNlKGFyclBhcmFtcywgJ3RvJyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ2Zyb20nXSl7XHJcblx0XHRcdGxldCBhcnJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLnBhcmFtc1snZnJvbSddKTtcclxuXHRcdFx0dGhpcy5hdXRvQ2hlY2tSYW5nZVByaWNlKGFyclBhcmFtcywgJ2Zyb20nKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBhcmFtc1snZm9ybWF0J10pe1xyXG5cdFx0XHR0aGlzLmF1dG9DaGVja0Zvcm1hdCh0aGlzLnBhcmFtc1snZm9ybWF0J10pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMucGFyYW1zWyd1c2VycmVxdWVzdCddKXtcclxuXHRcdFx0bGV0IGFyclBhcmFtcyA9IHRoaXMubWFrZUFycmF5KHRoaXMucGFyYW1zWyd1c2VycmVxdWVzdCddKTtcclxuXHRcdFx0dGhpcy5hdXRvRmlsbFNlYXJjaChhcnJQYXJhbXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXV0b0ZpbGxTZWFyY2goYXJyKSB7XHJcblx0XHR0aGlzLm5vZGVzLnNlYXJjaC52YWx1ZSA9IGFyci5qb2luKCcgJyk7XHJcblx0fVxyXG5cclxuXHRhdXRvQ2hlY2tGb3JtYXQodmFsdWUpe1xyXG5cdFx0c3dpdGNoICh2YWx1ZSkge1xyXG5cdFx0XHRjYXNlICdidXlpdG5vdyc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5mb3JtYXRbMF0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdhdWN0aW9uJzpcclxuXHRcdFx0XHR0aGlzLm5vZGVzLmZvcm1hdFsxXS5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6IGNvbnNvbGUubG9nKCdpbnZhbGlkIHF1ZXJ5IHN0cmluZycpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdGF1dG9DaGVja1JhbmdlUHJpY2UoYXJyLCBpbnB1dCl7XHJcblx0XHRzd2l0Y2ggKGlucHV0KSB7XHJcblx0XHRcdGNhc2UgJ3RvJzpcclxuXHRcdFx0XHR0aGlzLm5vZGVzLnRvLnZhbHVlID0gYXJyLnRvU3RyaW5nKCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdmcm9tJzpcclxuXHRcdFx0XHR0aGlzLm5vZGVzLmZyb20udmFsdWUgPSBhcnIudG9TdHJpbmcoKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6IGNvbnNvbGUubG9nKCdpbnZhbGlkIHF1ZXJ5IHN0cmluZycpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0YXV0b0NoZWNrU2hpcHBpbmcoYXJyKSB7XHJcblx0XHRhcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0c3dpdGNoIChlbGVtZW50KSB7XHJcblx0XHRcdFx0Y2FzZSAnZnJlZSc6XHJcblx0XHRcdFx0XHR0aGlzLm5vZGVzLnNoaXBwaW5nWzBdLmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ2luc3RvcmUnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1sxXS5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdsb2NhbCc6XHJcblx0XHRcdFx0XHR0aGlzLm5vZGVzLnNoaXBwaW5nWzJdLmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6IGNvbnNvbGUubG9nKCdpbnZhbGlkIHF1ZXJ5IHN0cmluZycpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGF1dG9DaGVja0NvbmRpdGlvbihhcnIpIHtcclxuXHRcdGFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRzd2l0Y2ggKGVsZW1lbnQpIHtcclxuXHRcdFx0XHRjYXNlICduZXcnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5jb25kaXRpb25bMF0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAndXNlZCc6XHJcblx0XHRcdFx0XHR0aGlzLm5vZGVzLmNvbmRpdGlvblsxXS5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRQYXRoKCkge1xyXG5cdFx0dGhpcy5jdXJyZW50UGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcblx0fVxyXG5cclxuXHRzZWFyY2goZSkge1xyXG5cdFx0aWYgKHRoaXMubm9kZXMuc2VhcmNoLnZhbHVlKSB7XHJcblx0XHRcdHRoaXMucGFyYW1zWyd1c2VycmVxdWVzdCddID0gdGhpcy5ub2Rlcy5zZWFyY2gudmFsdWUubWF0Y2godGhpcy51c2VycmVxdWVzdFJlZ0V4cCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5wYXJhbXNbJ3VzZXJyZXF1ZXN0J107XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjaGVja0Zvcm1hdChlKSB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZXMuZm9ybWF0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLm5vZGVzLmZvcm1hdFtpXS5jaGVja2VkKSB7XHJcblx0XHRcdFx0dGhpcy5wYXJhbXNbdGhpcy5ub2Rlcy5mb3JtYXRbaV0uZ2V0QXR0cmlidXRlKCduYW1lJyldID0gdGhpcy5ub2Rlcy5mb3JtYXRbaV0udmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJhbmdlUHJpY2UoZSkge1xyXG5cdFx0bGV0IGZyb20gPSB0aGlzLm5vZGVzLmZyb20udmFsdWUgfHwgMDtcclxuXHRcdGxldCB0byA9IHRoaXMubm9kZXMudG8udmFsdWUgfHwgSW5maW5pdHk7XHJcblx0XHR0aGlzLnBhcmFtc1snZnJvbSddID0gZnJvbTtcclxuXHRcdGlmIChpc0Zpbml0ZSh0bykpIHtcclxuXHRcdFx0dGhpcy5wYXJhbXNbJ3RvJ10gPSB0bztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNoZWNrQ29uZGl0aW9uKGUpIHtcclxuXHRcdGxldCBxdWVyeVN0cmluZyA9ICcnO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVzLmNvbmRpdGlvbi5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5ub2Rlcy5jb25kaXRpb25baV0uY2hlY2tlZCkge1xyXG5cdFx0XHRcdHF1ZXJ5U3RyaW5nICs9IHRoaXMubm9kZXMuY29uZGl0aW9uW2ldLnZhbHVlICsgJywnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLnNsaWNlKDAsIC0xKTtcclxuXHRcdGlmIChxdWVyeVN0cmluZykge1xyXG5cdFx0XHR0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLmNvbmRpdGlvblswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKV0gPSBxdWVyeVN0cmluZztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRlbGV0ZSB0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLmNvbmRpdGlvblswXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjaGVja1NoaXBwaW5nKGUpIHtcclxuXHRcdGxldCBxdWVyeVN0cmluZyA9ICcnO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGVzLnNoaXBwaW5nLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLm5vZGVzLnNoaXBwaW5nW2ldLmNoZWNrZWQpIHtcclxuXHRcdFx0XHRxdWVyeVN0cmluZyArPSB0aGlzLm5vZGVzLnNoaXBwaW5nW2ldLnZhbHVlICsgJywnO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLnNsaWNlKDAsIC0xKTtcclxuXHRcdGlmIChxdWVyeVN0cmluZykge1xyXG5cdFx0XHR0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLnNoaXBwaW5nWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpXSA9IHF1ZXJ5U3RyaW5nO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMucGFyYW1zW3RoaXMubm9kZXMuc2hpcHBpbmdbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyldO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aGFuZGxlckFsbChlKSB7XHJcblx0XHR0aGlzLmNoZWNrRm9ybWF0KCk7XHJcblx0XHR0aGlzLmNoZWNrQ29uZGl0aW9uKCk7XHJcblx0XHR0aGlzLmNoZWNrU2hpcHBpbmcoKTtcclxuXHRcdHRoaXMucmFuZ2VQcmljZSgpO1xyXG5cdFx0dGhpcy5zZWFyY2goKTtcclxuXHRcdHRoaXMuY3JlYXRlVVJMKCk7XHJcblx0fVxyXG5cclxuXHRoYW5kbGVyKGUpIHtcclxuXHRcdHRoaXMuc2VhcmNoKCk7XHJcblx0XHR0aGlzLmNyZWF0ZVVSTCgpO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlVVJMKCl7XHJcblx0XHRsZXQgdXJsID0gJy9zZWFyY2g/JztcclxuXHRcdGZvciAoa2V5IGluIHRoaXMucGFyYW1zKSB7XHJcblx0XHRcdGlmIChrZXkgPT0gJ3VzZXJyZXF1ZXN0Jykge1xyXG5cdFx0XHRcdGxldCByZXF1ZXN0dXJsID0gdGhpcy5wYXJhbXNba2V5XS5yZWR1Y2UoKHN1bSwgY3VycmVudCkgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHN1bSArIGN1cnJlbnQgKyAnLCc7XHJcblx0XHRcdFx0fSwgJ3VzZXJyZXF1ZXN0PScpO1xyXG5cdFx0XHRcdHVybCArPSByZXF1ZXN0dXJsLnNsaWNlKDAsIC0xKSArICcmJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR1cmwgKz0ga2V5ICsgJz0nICsgdGhpcy5wYXJhbXNba2V5XSArICcmJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Ly8gdXJsID0gZW5jb2RlVVJJKHVybC5zbGljZSgwLCAtMSkpO1xyXG5cdFx0dXJsID0gdXJsLnNsaWNlKDAsIC0xKTtcclxuXHRcdGNvbnNvbGUubG9nKHVybCk7XHJcblx0XHRsb2NhdGlvbi5hc3NpZ24odXJsKTtcclxuXHR9XHJcbn1cclxuY2xhc3MgTWFuYWdlciB7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XHJcblx0XHR0aGlzLnJlZ0V4cElkID0gL15cXC9pdGVtXFxkKyQvaTtcclxuXHRcdHRoaXMucmVnU2VhcmNoID0gL15cXC9zZWFyY2gkL2k7XHJcblx0XHR0aGlzLnBhcmFtcyA9IHt9O1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG5cdGFzeW5jIGluaXQoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnN0b3JhZ2UuaW5pdCgpO1xyXG5cdFx0dGhpcy5nZXRQYXRoKCk7XHJcblx0XHR0aGlzLmdldFNlYXJjaFBhcmFtcygpXHJcblx0XHR0aGlzLm9ubG9hZFBhZ2UoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlbmRlckNvbnRhY3RzUGFnZSgpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2UtY29udGFjdHMuanNvbicpO1xyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21haW5fX2NvbnRhaW5lcicpWzBdKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlclJlZ2lzdGVyUGFnZSgpIHtcclxuXHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJBZHZlcnQoKSB7XHJcblx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnanNvbi9wYWdlLXRleHQuanNvbicpO1xyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21haW5fX2NvbnRhaW5lcicpWzBdKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlclJlc3VsdChhcnIpIHtcclxuXHRcdGxldCB0ZW1wbGF0ZUNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIml0ZW1cIik7XHJcblx0XHRsZXQgdGVtcGxhdGUgPSBfLnRlbXBsYXRlKHRlbXBsYXRlQ29udGVudC5pbm5lckhUTUwpO1xyXG5cdFx0bGV0IHJlc3VsdCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24oc3VtLCBjdXJyZW50KSB7XHJcblx0XHRcdHJldHVybiAgdGVtcGxhdGUoY3VycmVudCkgKyBzdW07XHJcblx0XHR9LmJpbmQodGhpcyksXCJcIik7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmVzdWx0X19jb250YWluZXJcIilbMF0uaW5uZXJIVE1MID0gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0cmVuZGVySXRlbVBhZ2Uob2JqKSB7XHJcblx0XHRsZXQgdGVtcGxhdGVQYWdlSXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbS1wYWdlXCIpO1xyXG5cdFx0bGV0IHRlbXBsYXRlSXRlbSA9IF8udGVtcGxhdGUodGVtcGxhdGVQYWdlSXRlbS5pbm5lckhUTUwpO1xyXG5cdFx0bGV0IHJlc3VsdCA9IHRlbXBsYXRlSXRlbShvYmopO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1haW5fX2NvbnRhaW5lclwiKVswXS5pbm5lckhUTUwgPSByZXN1bHQ7XHJcblx0XHQvL2dhbGxlcnlcclxuXHRcdHZhciB0ZW1wbGF0ZVBhZ2VHYWxsZXJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnktaXRlbScpO1xyXG5cdFx0dmFyIHRlbXBsYXRlR2FsbGFyeSA9IF8udGVtcGxhdGUodGVtcGxhdGVQYWdlR2FsbGVyeS5pbm5lckhUTUwpO1xyXG5cdFx0dmFyIHJlc3VsdFVMID0gb2JqLnBpY3R1cmVzLnJlZHVjZSgoc3VtLCBjdXJyZW50KSA9PiB7XHJcblx0XHRcdHJldHVybiB0ZW1wbGF0ZUdhbGxhcnkoY3VycmVudCkgKyBzdW07XHJcblx0XHR9LFwiXCIgKVxyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbS1wYWdlX19saXN0LWltYWdlcycpWzBdLmlubmVySFRNTCA9IHJlc3VsdFVMO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgcmVuZGVyTWFpblBhZ2UoKSB7XHJcblx0XHRsZXQgZGF0YSA9IGF3YWl0IGdldEpTT04oJ2pzb24vcGFnZS1hc2lkZS1yZXN1bHQuanNvbicpO1xyXG5cdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYWluX19jb250YWluZXInKVswXSk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJmaWx0ZXJlZFJlc3VsdCgpIHtcclxuXHJcblx0fVxyXG5cclxuXHRnZXRQYXRoKCkge1xyXG5cdFx0dGhpcy5jdXJyZW50UGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXRTZWFyY2hQYXJhbXMoKSB7XHJcblx0XHR0aGlzLnNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtSWRmcm9tUGF0aCgpIHtcclxuXHRcdGxldCByZWcgPSAvXlxcL2l0ZW0oXFxkKyQpL2k7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50UGF0aE5hbWUubWF0Y2gocmVnKVsxXTtcclxuXHR9XHJcblxyXG5cdHBhcnNlU2VhcmNoUGFyYW1zKCkge1xyXG5cdFx0Ly9sZXQgc3RyID1cdCcvc2VhcmNoP2NvbmRpdGlvbj1uZXcsdXNlZCZzaGlwcGluZz1mcmVlLGluc3RvcmUsbG9jYWwmZnJvbT00JmZvcm1hdD1idXlpdG5vdyZ1c2VycmVxdWVzdD1tYW1hK3BhcGEnO1xyXG5cdFx0bGV0IHN0ciA9IHRoaXMuc2VhcmNoUGFyYW1zO1xyXG5cdFx0aWYgKHN0cil7XHJcblx0XHRcdGxldCBwYXJhbXNTdHJpbmcgPSBzdHIuc2xpY2UoMSk7XHJcblx0XHRcdGxldCBlbGVtZW50cyA9IHBhcmFtc1N0cmluZy5zcGxpdCgnJicpO1xyXG5cdFx0XHRpZiAoZWxlbWVudHMubGVuZ3RoKXtcclxuXHRcdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRcdFx0dmFyIGtleVZhbHVlID0gZWxlbWVudC5zcGxpdCgnPScpO1xyXG5cdFx0XHRcdFx0dGhpcy5wYXJhbXNba2V5VmFsdWVbMF1dID0ga2V5VmFsdWVbMV07XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHQvL2NvbnNvbGUuZGlyKHRoaXMucGFyYW1zKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIG9ubG9hZFBhZ2UoKSB7XHJcblx0XHR0aGlzLnBhcnNlU2VhcmNoUGFyYW1zKCk7XHJcblx0XHQvL3JlbmRlciBpdGVtIGJ5IGlkXHJcblx0XHRpZiAodGhpcy5jdXJyZW50UGF0aE5hbWUubWF0Y2godGhpcy5yZWdFeHBJZCkpe1xyXG5cdFx0XHR0aGlzLnJlbmRlckl0ZW1QYWdlKHRoaXMuc3RvcmFnZS5nZXRJdGVtQnlJZCh0aGlzLmdldEl0ZW1JZGZyb21QYXRoKCkpKVxyXG5cdFx0fSAvL3JlbmRlciBieSB1c2VyIGZpbHRlciBhbmQgcmVxdWVzdFxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFBhdGhOYW1lLm1hdGNoKHRoaXMucmVnU2VhcmNoKSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdyZW5kZXIgYnkgcGFyYW1zJyk7XHJcblx0XHRcdGF3YWl0IHRoaXMucmVuZGVyTWFpblBhZ2UoKTtcclxuXHRcdFx0dGhpcy5yZW5kZXJSZXN1bHQodGhpcy5zdG9yYWdlLmdldEZpbHRlcmVkSXRlbXModGhpcy5wYXJhbXMpKTtcclxuXHRcdFx0dGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKHtvcHRpb246ICdhbGwnLCBwYXJhbXM6IHRoaXMucGFyYW1zfSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN3aXRjaCAodGhpcy5jdXJyZW50UGF0aE5hbWUpIHtcclxuXHRcdFx0XHRjYXNlICcvcmVnaXN0ZXInOlxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdyZWdpc3RlcicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9zaWduJzpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnc2lnbicpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9jb250YWN0cyc6XHJcblx0XHRcdFx0dGhpcy5yZW5kZXJDb250YWN0c1BhZ2UoKTtcclxuXHRcdFx0XHR0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvYWR2ZXJ0JzpcclxuXHRcdFx0XHR0aGlzLnJlbmRlckFkdmVydCgpO1xyXG5cdFx0XHRcdGNhc2UgJy8nOlxyXG5cdFx0XHRcdGF3YWl0IHRoaXMucmVuZGVyTWFpblBhZ2UoKTtcclxuXHRcdFx0XHR0aGlzLnJlbmRlclJlc3VsdCh0aGlzLnN0b3JhZ2UuZ2V0VGVtcFN0b3JhZ2UoJ2l0ZW1zJykpO1xyXG5cdFx0XHRcdHRoaXMuZmlsdGVyID0gbmV3IEZpbHRlcih7b3B0aW9uOiAnYWxsJ30pXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ3BhZ2Ugbm90IGZvdW5kJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHRfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XHJcblx0XHRldmFsdWF0ZSAgICA6IC9cXHtcXHsoW1xcc1xcU10rPylcXH1cXH0vZyxcclxuXHRcdGludGVycG9sYXRlIDogL1xce1xcez0oW1xcc1xcU10rPylcXH1cXH0vZyxcclxuXHRcdGVzY2FwZSAgICAgIDogL1xce1xcey0oW1xcc1xcU10rPylcXH1cXH0vZ1xyXG5cdH07XHJcblx0bGV0IG1hbmFnZXIgPSBuZXcgTWFuYWdlcigpO1xyXG59KTsiXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
