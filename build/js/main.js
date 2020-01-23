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
		this.currentUser = false;
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

	updateAllLocalStorage(){
		this.saveToLocalStorage('users', this.tempUsers);
		this.saveToLocalStorage('items', this.tempItems);

	}

	saveToLocalStorage(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	comparePriceToHigh(itemA, itemB){
		return itemB.price - itemA.price;
	}

	comparePriceToLow(itemA, itemB){
		return itemA.price - itemB.price;
	}

	 getTempStorage(name) {
		switch (name) {
			case 'items':
				return this.tempItems.sort(this.comparePriceToHigh);
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
		let filterArrItems = this.getItemsByAvailable();
		filterArrItems = this.getItemsByCondition(filterArrItems);
		filterArrItems = this.getItemsByShipping(filterArrItems);
		filterArrItems = this.getItemsByFormat(filterArrItems);
		filterArrItems = this.getItemsByPrice(filterArrItems);
		filterArrItems = this.getItemsByUserRequest(filterArrItems);
		filterArrItems - this.sortByDirection(filterArrItems)
		return filterArrItems;
	}

	makeArray(str) {
		return str.split(',');
	}

	getItemsByAvailable() {
		return this.tempItems.filter(item => item.reserved == false);
	}

	sortByDirection(arr) {
		if (this.filterParams['sort']){
			switch (this.filterParams['sort']){
				case 'lowprice':
					return arr.sort(this.comparePriceToHigh);
				break;
				case 'highprice':
					return arr.sort(this.comparePriceToLow);
				break;
				default: arr.sort(this.comparePriceToHigh);
			}
		}
		return arr.sort(this.comparePriceToHigh);
	}

	getItemsByUserRequest(arr){
		if (this.filterParams['userrequest']){
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

	getItemsByCondition(arr){
		if (this.filterParams['condition']){
			let arrParams = this.makeArray(this.filterParams['condition']);
			if (arrParams.length == 2) {
				return arr.filter(item => {return item.condition == arrParams[0] || item.condition == arrParams[1]})
			}
			if (arrParams.length == 1) {
				return arr.filter(item => item.condition == arrParams[0]);
			}
		}
		return arr;
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

	//add user who is logined to LocalStorage
	addLoginedUsertoLocalStorage(user){
		localStorage.setItem('activeUser', JSON.stringify(user));
	}

	removeLoginedUserFromLocalStorage(){
		localStorage.removeItem('activeUser');
	}

	getLoginedUserFromTempStorage(){
		let loginedUser = JSON.parse(localStorage.getItem('activeUser'));
		if (loginedUser){
			return this.tempUsers.find(user => user.login === loginedUser.login);
		} else {
			return null;
		}
	}

	addNewUsertoTempStorage(data){
		this.tempUsers.push(data);
		console.dir(this.tempUsers);
		this.saveToLocalStorage('users', this.tempUsers);
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
				sort: document.getElementById('sort'),
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
		this.sort = this.sort.bind(this);
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
			this.nodes.sort.addEventListener('change', this.handlerAll);
		} else {
			this.nodes.searchBtn.addEventListener('click', this.handler);
		}
	}

	makeArray(str) {
		return str.split(',');
	}

	// check filter and sort options after location.assign
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
		if (this.params['sort']){
			this.autoCheckSort(this.params['sort']);
		}
	}

	autoCheckSort(value){
		switch (value) {
			case 'lowprice':
				this.nodes.sort.getElementsByTagName('option')[0].selected = true;
			break;
			case 'highprice':
				this.nodes.sort.getElementsByTagName('option')[1].selected = true;
			break;
			default: console.log('invalid');
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

	sort(e) {
		let indexSelected = this.nodes.sort.selectedIndex;
		console.log(indexSelected);
		this.params[this.nodes.sort.getAttribute('name')] = this.nodes.sort.getElementsByTagName('option')[indexSelected].value;
		console.dir(this.params);
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
		this.sort();
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
		console.log('manager init');
	}
	async init() {
		await this.storage.init();
		this.getLoginedUser();
		this.getPath();
		this.getSearchParams()
		this.onloadPage();
	}

	getLoginedUser() {
		this.loginedUser = this.storage.getLoginedUserFromTempStorage();
	}

	async renderContactsPage() {
		let response = await fetch('json/page-contacts.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	async renderRegistration() {
		let response = await fetch('json/page-registration.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
	}

	async renderHeader() {
		if (this.loginedUser){
			let response = await fetch('json/page-nav-left-auth.json');
			let data = await response.json();
			renderHTML(data, document.getElementsByClassName('nav__left')[0]);
			document.getElementsByClassName('nav__user-name')[0].append(document.createTextNode(this.loginedUser.name));
		} else {
			let response = await fetch('json/page-nav-left-unauth.json');
			let data = await response.json();
			renderHTML(data, document.getElementsByClassName('nav__left')[0]);
		}
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

	async renderSignin() {
		let response = await fetch('json/page-signin.json');
		let data = await response.json();
		renderHTML(data, document.getElementsByClassName('main__container')[0]);
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
		await this.renderHeader();
		//render item by id
		if (this.currentPathName.match(this.regExpId)){
			this.renderItemPage(this.storage.getItemById(this.getItemIdfromPath()));
			this.item = new Item(this.storage.getItemById(this.getItemIdfromPath()));
			return;
		} //render by user filter and request
		if (this.currentPathName.match(this.regSearch)){
			console.log('render by params');
			await this.renderMainPage();
			this.renderResult(this.storage.getFilteredItems(this.params));
			this.filter = new Filter({option: 'all', params: this.params})
		} else {
			switch (this.currentPathName) {
				case '/register':
					await this.renderRegistration();
					this.registration = new Registration(this.storage.getTempStorage('users'));
				break;
				case '/sign':
					await this.renderSignin();
					this.signin = new Signin(this.storage.getTempStorage('users'));
				break;
				case '/contacts':
				this.renderContactsPage();
				this.filter = new Filter();
				break;
				case '/advert':
				this.renderAdvert();
				this.filter = new Filter();
				break;
				case '/logout':
					this.storage.removeLoginedUserFromLocalStorage();
					location.assign('/');
				break;
				case '/sell':
					console.log('sell')
				break;
				case '/':
				await this.renderMainPage();
				// this.renderResult(this.storage.getTempStorage('items'));
				this.renderResult(this.storage.getItemsByAvailable())
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
class Signin{
	constructor(users){
		this.storage = new Storage();
		this.users = users;
		this.emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
		this.passRegExp = /^\w{6,}$/;
		this.init();
	}

	async init(){
		await this.storage.init();
		this.findNodes();
		this.bindAll();
		this.addEvents();

	}

	findNodes(){
		this.nodes = {
			form: document.forms.signin,
			email: document.forms.signin.elements.email,
			pass: document.forms.signin.elements.pass,
			submit: document.forms.signin.elements.submit,
			warning: document.getElementsByClassName('signin__warning')[0]
		}
	}

	addEvents() {
		this.nodes.submit.addEventListener('click', this.submitForm)
	}

	bindAll() {
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e){
		e.preventDefault();
		let flag = true;
		this.nodes.warning.innerHTML = '';
		//check valid email
		if (!this.emailRegExp.test(this.nodes.email.value)) {
			this.createWarningMessage('email');
			flag = false;
		} //check valid passward
		if (!this.passRegExp.test(this.nodes.pass.value)) {
			this.createWarningMessage('password');
			flag = false;
		}
		if (flag){
			this.findUser(this.nodes.email.value, this.nodes.pass.value)
		} else {
			return;
		}
	}

	findUser(login, pass){
		let user = this.users.find(user => user.login === login && user.password === pass );
		if (!user) {
			this.createWarningMessage('unknownuser');
		} else {
			this.successLogin(user);
			//console.dir(this.storage.getLoginedUserFromLocalStorage());
			location.assign('/');
		}
	}

	// add user logined user to LocalStorage
	successLogin(user) {
		this.storage.addLoginedUsertoLocalStorage(user);
	}

	createWarningMessage(errorname){
		let message = document.createElement('p');
		switch (errorname){
			case 'email':
				message.append(document.createTextNode('You entered incorrect email'));
			break;
			case 'password':
				message.append(document.createTextNode('You entered incorrect pass: 6 lettes or numers or _'));
			break;
			case 'unknownuser':
				message.append(document.createTextNode('Unknown user'));
			break;
			default: console.log('incorrect error name');
		}
		this.nodes.warning.appendChild(message);
	}
 }
class Registration{
	constructor(users){
		this.storage = new Storage();
		this.users = users;
		this.emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
		this.passRegExp = /^\w{6,}$/;
		this.nameRegExp= /^[a-zа-яё]{3,}$/i;
		this.init();
	}

	async init(){
		await this.storage.init();
		this.findNodes();
		this.bindAll();
		this.addEvents();

	}

	findNodes(){
		this.nodes = {
			form: document.forms.registration,
			email: document.forms.registration.elements.email,
			name: document.forms.registration.elements.name,
			pass0: document.forms.registration.elements.pass[0],
			pass1: document.forms.registration.elements.pass[1],
			submit: document.forms.registration.elements.submit,
			warning: document.getElementsByClassName('registration__warning')[0]
		}
		console.dir(this.nodes);
	}

	addEvents() {
		this.nodes.submit.addEventListener('click', this.submitForm)
	}

	bindAll() {
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e){
		e.preventDefault();
		let flag = true;
		this.nodes.warning.innerHTML = '';
		//check valid email
		if (!this.emailRegExp.test(this.nodes.email.value)) {
			this.createWarningMessage('email');
			flag = false;
		}
		//check valid passward
		if (!this.passRegExp.test(this.nodes.pass0.value) || !this.passRegExp.test(this.nodes.pass1.value)) {
			this.createWarningMessage('password');
			flag = false;
		}
		//chek valid name
		if (!this.nameRegExp.test(this.nodes.name.value)) {
			this.createWarningMessage('name');
			flag = false;
		}
		if (!flag){
			return;
		} else if (this.findUser(this.nodes.email.value)) {
			this.addNewUserToLocalStorage(this.createUser());
			this.createWarningMessage('ok');
		} else {
			this.createWarningMessage('exist');
		}
	}

	createUser(){
		let	newUser = {
			login: this.nodes.email.value,
			name: this.nodes.name.value,
			password: this.nodes.pass0.value,
			buyitems: [],
			sellitems: []
		}
		return newUser;
	}

	addNewUserToLocalStorage(user){
		this.storage.addNewUsertoTempStorage(user)
	}

	findUser(login){
		let user = this.users.find(user => user.login === login);
		if (user) {
			//this user is exist
			return false;
		} else {
			// this user doesn't exist - go on registration
			return true;
		}
	}

	createWarningMessage(errorname){
		let message = document.createElement('p');
		switch (errorname){
			case 'email':
				message.append(document.createTextNode('You entered incorrect email'));
			break;
			case 'password':
				message.append(document.createTextNode('You entered incorrect pass: 6 lettes or numers or _ or they are not equal each other'));
			break;
			case 'name':
				message.append(document.createTextNode('You enterd incorrect name: only letters and min size=3'));
			break;
			case 'exist':
				message.append(document.createTextNode('This user have been existed'));
			break;
			case 'ok':
				message.append(document.createTextNode(`You've been just registered. Sign in!`));
			break;
			default: console.log('incorrect error name');
		}
		this.nodes.warning.appendChild(message);
	}
 }
class Item {
	constructor(item) {
		this.storage = new Storage();
		this.nodes = {};
		this.bidRegExp = /\d+/i;
		this.item = item;
		console.dir(item);
		this.init();
	}

	async init(){
		await this.storage.init();
		this.getTypeItem();
		this.findNodes();
		this.bindAll();
		this.addEvents();
		this.checkReserved()
	}

	findNodes() {
		if (this.type == 'auction'){
			this.nodes = {
				bid: document.getElementsByClassName('item-page__start-bid-input')[0],
				bids: document.getElementsByClassName('item-page_bids-value')[0],
				price: document.getElementsByClassName('item-page__start-bid-price')[0],
				buyBtn: document.getElementsByClassName('item-page__btn-bid')[0],
				startbid: document.getElementsByClassName('item-page__start-bid-price')[0],

			}
		} else {
			this.nodes = {
				buyBtn: document.getElementsByClassName('item-page-buy')[0]
			}
		}
	}

	bindAll(){
		this.handler = this.handler.bind(this);
	}

	addEvents() {
		this.nodes.buyBtn.addEventListener('click', this.handler);
	}

	getTypeItem(){
		if (this.item.auction){
			this.type = 'auction';
		} else {
			this.type = 'buyitnow';
		}
	}

	handler(e){
	let user  = this.storage.getLoginedUserFromTempStorage();
		if(user){
			if (this.type == 'buyitnow'){
				//save id of item to user
				for (let i =0; i < this.storage.tempUsers.length; i++){
					if (this.storage.tempUsers[i].login == user.login){
						this.storage.tempUsers[i].buyitems.push(this.item.id_item);
					}
				}
				// reserve item
				for (let i = 0; i < this.storage.tempItems.length; i++){
					if (this.storage.tempItems[i].id_item == this.item.id_item){
						this.storage.tempItems[i].reserved = true;
					}
				}
				console.dir(	this.storage.tempUsers);
				console.dir(	this.storage.tempItems);
				this.storage.updateAllLocalStorage();
				location.assign(`/item${this.item.id_item}`);
			} else {
				if ( this.checkBid()) {
					for (let i =0; i < this.storage.tempUsers.length; i++){
						if (this.storage.tempUsers[i].login == user.login){
							this.storage.tempUsers[i].buyitems.push({
								"item": this.item.id_item,
								"mybid": parseInt(this.nodes.bid.value) + '.00'
							});
						}
					}
					for (let i = 0; i < this.storage.tempItems.length; i++){
						if (this.storage.tempItems[i].id_item == this.item.id_item){
							this.storage.tempItems[i].price = parseInt(this.nodes.bid.value) + '.00';
							this.storage.tempItems[i].bids = +this.storage.tempItems[i].bids + 1;
						}
					}
					console.dir(	this.storage.tempUsers);
					console.dir(	this.storage.tempItems);
					this.storage.updateAllLocalStorage();
					this.changeTextBtn();
					this.changeInfoAboutItem();
				}
			}
		} else {
			location.assign('/sign');
		}
	}

	checkBid(){
		if (this.bidRegExp.test(this.nodes.bid.value) && this.nodes.bid.value > this.item.price) {
			return true;
		} else {
			alert('You entered incorrect bid');
			return false;
		}

	}
	changeTextBtn(){
		this.nodes.buyBtn.value = "Bought!";
		this.nodes.buyBtn.disabled = true;
	}

	changeInfoAboutItem() {
		this.nodes.price.innerHTML = this.nodes.bid.value + '.00' ;
		this.nodes.bids.innerHTML = +this.item.bids + 1;
	}

	checkReserved() {
		if (this.item.reserved == true) {
			this.changeTextBtn();
		}
	}

}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFRoaXJkIHBhcnR5XHJcbiAqL1xyXG4vLyAgICAgVW5kZXJzY29yZS5qcyAxLjguM1xyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIG4obil7ZnVuY3Rpb24gdCh0LHIsZSx1LGksbyl7Zm9yKDtpPj0wJiZvPmk7aSs9bil7dmFyIGE9dT91W2ldOmk7ZT1yKGUsdFthXSxhLHQpfXJldHVybiBlfXJldHVybiBmdW5jdGlvbihyLGUsdSxpKXtlPWIoZSxpLDQpO3ZhciBvPSFrKHIpJiZtLmtleXMociksYT0ob3x8cikubGVuZ3RoLGM9bj4wPzA6YS0xO3JldHVybiBhcmd1bWVudHMubGVuZ3RoPDMmJih1PXJbbz9vW2NdOmNdLGMrPW4pLHQocixlLHUsbyxjLGEpfX1mdW5jdGlvbiB0KG4pe3JldHVybiBmdW5jdGlvbih0LHIsZSl7cj14KHIsZSk7Zm9yKHZhciB1PU8odCksaT1uPjA/MDp1LTE7aT49MCYmdT5pO2krPW4paWYocih0W2ldLGksdCkpcmV0dXJuIGk7cmV0dXJuLTF9fWZ1bmN0aW9uIHIobix0LHIpe3JldHVybiBmdW5jdGlvbihlLHUsaSl7dmFyIG89MCxhPU8oZSk7aWYoXCJudW1iZXJcIj09dHlwZW9mIGkpbj4wP289aT49MD9pOk1hdGgubWF4KGkrYSxvKTphPWk+PTA/TWF0aC5taW4oaSsxLGEpOmkrYSsxO2Vsc2UgaWYociYmaSYmYSlyZXR1cm4gaT1yKGUsdSksZVtpXT09PXU/aTotMTtpZih1IT09dSlyZXR1cm4gaT10KGwuY2FsbChlLG8sYSksbS5pc05hTiksaT49MD9pK286LTE7Zm9yKGk9bj4wP286YS0xO2k+PTAmJmE+aTtpKz1uKWlmKGVbaV09PT11KXJldHVybiBpO3JldHVybi0xfX1mdW5jdGlvbiBlKG4sdCl7dmFyIHI9SS5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9bS5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8YSxpPVwiY29uc3RydWN0b3JcIjtmb3IobS5oYXMobixpKSYmIW0uY29udGFpbnModCxpKSYmdC5wdXNoKGkpO3ItLTspaT1JW3JdLGkgaW4gbiYmbltpXSE9PXVbaV0mJiFtLmNvbnRhaW5zKHQsaSkmJnQucHVzaChpKX12YXIgdT10aGlzLGk9dS5fLG89QXJyYXkucHJvdG90eXBlLGE9T2JqZWN0LnByb3RvdHlwZSxjPUZ1bmN0aW9uLnByb3RvdHlwZSxmPW8ucHVzaCxsPW8uc2xpY2Uscz1hLnRvU3RyaW5nLHA9YS5oYXNPd25Qcm9wZXJ0eSxoPUFycmF5LmlzQXJyYXksdj1PYmplY3Qua2V5cyxnPWMuYmluZCx5PU9iamVjdC5jcmVhdGUsZD1mdW5jdGlvbigpe30sbT1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIG0/bjp0aGlzIGluc3RhbmNlb2YgbT92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IG0obil9O1widW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzPyhcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9bSksZXhwb3J0cy5fPW0pOnUuXz1tLG0uVkVSU0lPTj1cIjEuOC4zXCI7dmFyIGI9ZnVuY3Rpb24obix0LHIpe2lmKHQ9PT12b2lkIDApcmV0dXJuIG47c3dpdGNoKG51bGw9PXI/MzpyKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKHIpe3JldHVybiBuLmNhbGwodCxyKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihyLGUpe3JldHVybiBuLmNhbGwodCxyLGUpfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKHIsZSx1KXtyZXR1cm4gbi5jYWxsKHQscixlLHUpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKHIsZSx1LGkpe3JldHVybiBuLmNhbGwodCxyLGUsdSxpKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkodCxhcmd1bWVudHMpfX0seD1mdW5jdGlvbihuLHQscil7cmV0dXJuIG51bGw9PW4/bS5pZGVudGl0eTptLmlzRnVuY3Rpb24obik/YihuLHQscik6bS5pc09iamVjdChuKT9tLm1hdGNoZXIobik6bS5wcm9wZXJ0eShuKX07bS5pdGVyYXRlZT1mdW5jdGlvbihuLHQpe3JldHVybiB4KG4sdCwxLzApfTt2YXIgXz1mdW5jdGlvbihuLHQpe3JldHVybiBmdW5jdGlvbihyKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoO2lmKDI+ZXx8bnVsbD09cilyZXR1cm4gcjtmb3IodmFyIHU9MTtlPnU7dSsrKWZvcih2YXIgaT1hcmd1bWVudHNbdV0sbz1uKGkpLGE9by5sZW5ndGgsYz0wO2E+YztjKyspe3ZhciBmPW9bY107dCYmcltmXSE9PXZvaWQgMHx8KHJbZl09aVtmXSl9cmV0dXJuIHJ9fSxqPWZ1bmN0aW9uKG4pe2lmKCFtLmlzT2JqZWN0KG4pKXJldHVybnt9O2lmKHkpcmV0dXJuIHkobik7ZC5wcm90b3R5cGU9bjt2YXIgdD1uZXcgZDtyZXR1cm4gZC5wcm90b3R5cGU9bnVsbCx0fSx3PWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09dD92b2lkIDA6dFtuXX19LEE9TWF0aC5wb3coMiw1MyktMSxPPXcoXCJsZW5ndGhcIiksaz1mdW5jdGlvbihuKXt2YXIgdD1PKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiB0JiZ0Pj0wJiZBPj10fTttLmVhY2g9bS5mb3JFYWNoPWZ1bmN0aW9uKG4sdCxyKXt0PWIodCxyKTt2YXIgZSx1O2lmKGsobikpZm9yKGU9MCx1PW4ubGVuZ3RoO3U+ZTtlKyspdChuW2VdLGUsbik7ZWxzZXt2YXIgaT1tLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO3U+ZTtlKyspdChuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LG0ubWFwPW0uY29sbGVjdD1mdW5jdGlvbihuLHQscil7dD14KHQscik7Zm9yKHZhciBlPSFrKG4pJiZtLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO3U+bztvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109dChuW2FdLGEsbil9cmV0dXJuIGl9LG0ucmVkdWNlPW0uZm9sZGw9bS5pbmplY3Q9bigxKSxtLnJlZHVjZVJpZ2h0PW0uZm9sZHI9bigtMSksbS5maW5kPW0uZGV0ZWN0PWZ1bmN0aW9uKG4sdCxyKXt2YXIgZTtyZXR1cm4gZT1rKG4pP20uZmluZEluZGV4KG4sdCxyKTptLmZpbmRLZXkobix0LHIpLGUhPT12b2lkIDAmJmUhPT0tMT9uW2VdOnZvaWQgMH0sbS5maWx0ZXI9bS5zZWxlY3Q9ZnVuY3Rpb24obix0LHIpe3ZhciBlPVtdO3JldHVybiB0PXgodCxyKSxtLmVhY2gobixmdW5jdGlvbihuLHIsdSl7dChuLHIsdSkmJmUucHVzaChuKX0pLGV9LG0ucmVqZWN0PWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbS5maWx0ZXIobixtLm5lZ2F0ZSh4KHQpKSxyKX0sbS5ldmVyeT1tLmFsbD1mdW5jdGlvbihuLHQscil7dD14KHQscik7Zm9yKHZhciBlPSFrKG4pJiZtLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDt1Pmk7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighdChuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LG0uc29tZT1tLmFueT1mdW5jdGlvbihuLHQscil7dD14KHQscik7Zm9yKHZhciBlPSFrKG4pJiZtLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDt1Pmk7aSsrKXt2YXIgbz1lP2VbaV06aTtpZih0KG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0sbS5jb250YWlucz1tLmluY2x1ZGVzPW0uaW5jbHVkZT1mdW5jdGlvbihuLHQscixlKXtyZXR1cm4gayhuKXx8KG49bS52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2Ygcnx8ZSkmJihyPTApLG0uaW5kZXhPZihuLHQscik+PTB9LG0uaW52b2tlPWZ1bmN0aW9uKG4sdCl7dmFyIHI9bC5jYWxsKGFyZ3VtZW50cywyKSxlPW0uaXNGdW5jdGlvbih0KTtyZXR1cm4gbS5tYXAobixmdW5jdGlvbihuKXt2YXIgdT1lP3Q6blt0XTtyZXR1cm4gbnVsbD09dT91OnUuYXBwbHkobixyKX0pfSxtLnBsdWNrPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG0ubWFwKG4sbS5wcm9wZXJ0eSh0KSl9LG0ud2hlcmU9ZnVuY3Rpb24obix0KXtyZXR1cm4gbS5maWx0ZXIobixtLm1hdGNoZXIodCkpfSxtLmZpbmRXaGVyZT1mdW5jdGlvbihuLHQpe3JldHVybiBtLmZpbmQobixtLm1hdGNoZXIodCkpfSxtLm1heD1mdW5jdGlvbihuLHQscil7dmFyIGUsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PXQmJm51bGwhPW4pe249ayhuKT9uOm0udmFsdWVzKG4pO2Zvcih2YXIgYT0wLGM9bi5sZW5ndGg7Yz5hO2ErKyllPW5bYV0sZT5pJiYoaT1lKX1lbHNlIHQ9eCh0LHIpLG0uZWFjaChuLGZ1bmN0aW9uKG4scixlKXt1PXQobixyLGUpLCh1Pm98fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxtLm1pbj1mdW5jdGlvbihuLHQscil7dmFyIGUsdSxpPTEvMCxvPTEvMDtpZihudWxsPT10JiZudWxsIT1uKXtuPWsobik/bjptLnZhbHVlcyhuKTtmb3IodmFyIGE9MCxjPW4ubGVuZ3RoO2M+YTthKyspZT1uW2FdLGk+ZSYmKGk9ZSl9ZWxzZSB0PXgodCxyKSxtLmVhY2gobixmdW5jdGlvbihuLHIsZSl7dT10KG4scixlKSwobz51fHwxLzA9PT11JiYxLzA9PT1pKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LG0uc2h1ZmZsZT1mdW5jdGlvbihuKXtmb3IodmFyIHQscj1rKG4pP246bS52YWx1ZXMobiksZT1yLmxlbmd0aCx1PUFycmF5KGUpLGk9MDtlPmk7aSsrKXQ9bS5yYW5kb20oMCxpKSx0IT09aSYmKHVbaV09dVt0XSksdVt0XT1yW2ldO3JldHVybiB1fSxtLnNhbXBsZT1mdW5jdGlvbihuLHQscil7cmV0dXJuIG51bGw9PXR8fHI/KGsobil8fChuPW0udmFsdWVzKG4pKSxuW20ucmFuZG9tKG4ubGVuZ3RoLTEpXSk6bS5zaHVmZmxlKG4pLnNsaWNlKDAsTWF0aC5tYXgoMCx0KSl9LG0uc29ydEJ5PWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gdD14KHQsciksbS5wbHVjayhtLm1hcChuLGZ1bmN0aW9uKG4scixlKXtyZXR1cm57dmFsdWU6bixpbmRleDpyLGNyaXRlcmlhOnQobixyLGUpfX0pLnNvcnQoZnVuY3Rpb24obix0KXt2YXIgcj1uLmNyaXRlcmlhLGU9dC5jcml0ZXJpYTtpZihyIT09ZSl7aWYocj5lfHxyPT09dm9pZCAwKXJldHVybiAxO2lmKGU+cnx8ZT09PXZvaWQgMClyZXR1cm4tMX1yZXR1cm4gbi5pbmRleC10LmluZGV4fSksXCJ2YWx1ZVwiKX07dmFyIEY9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKHQscixlKXt2YXIgdT17fTtyZXR1cm4gcj14KHIsZSksbS5lYWNoKHQsZnVuY3Rpb24oZSxpKXt2YXIgbz1yKGUsaSx0KTtuKHUsZSxvKX0pLHV9fTttLmdyb3VwQnk9RihmdW5jdGlvbihuLHQscil7bS5oYXMobixyKT9uW3JdLnB1c2godCk6bltyXT1bdF19KSxtLmluZGV4Qnk9RihmdW5jdGlvbihuLHQscil7bltyXT10fSksbS5jb3VudEJ5PUYoZnVuY3Rpb24obix0LHIpe20uaGFzKG4scik/bltyXSsrOm5bcl09MX0pLG0udG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9tLmlzQXJyYXkobik/bC5jYWxsKG4pOmsobik/bS5tYXAobixtLmlkZW50aXR5KTptLnZhbHVlcyhuKTpbXX0sbS5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6ayhuKT9uLmxlbmd0aDptLmtleXMobikubGVuZ3RofSxtLnBhcnRpdGlvbj1mdW5jdGlvbihuLHQscil7dD14KHQscik7dmFyIGU9W10sdT1bXTtyZXR1cm4gbS5lYWNoKG4sZnVuY3Rpb24obixyLGkpeyh0KG4scixpKT9lOnUpLnB1c2gobil9KSxbZSx1XX0sbS5maXJzdD1tLmhlYWQ9bS50YWtlPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbnVsbD09bj92b2lkIDA6bnVsbD09dHx8cj9uWzBdOm0uaW5pdGlhbChuLG4ubGVuZ3RoLXQpfSxtLmluaXRpYWw9ZnVuY3Rpb24obix0LHIpe3JldHVybiBsLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXR8fHI/MTp0KSkpfSxtLmxhc3Q9ZnVuY3Rpb24obix0LHIpe3JldHVybiBudWxsPT1uP3ZvaWQgMDpudWxsPT10fHxyP25bbi5sZW5ndGgtMV06bS5yZXN0KG4sTWF0aC5tYXgoMCxuLmxlbmd0aC10KSl9LG0ucmVzdD1tLnRhaWw9bS5kcm9wPWZ1bmN0aW9uKG4sdCxyKXtyZXR1cm4gbC5jYWxsKG4sbnVsbD09dHx8cj8xOnQpfSxtLmNvbXBhY3Q9ZnVuY3Rpb24obil7cmV0dXJuIG0uZmlsdGVyKG4sbS5pZGVudGl0eSl9O3ZhciBTPWZ1bmN0aW9uKG4sdCxyLGUpe2Zvcih2YXIgdT1bXSxpPTAsbz1lfHwwLGE9TyhuKTthPm87bysrKXt2YXIgYz1uW29dO2lmKGsoYykmJihtLmlzQXJyYXkoYyl8fG0uaXNBcmd1bWVudHMoYykpKXt0fHwoYz1TKGMsdCxyKSk7dmFyIGY9MCxsPWMubGVuZ3RoO2Zvcih1Lmxlbmd0aCs9bDtsPmY7KXVbaSsrXT1jW2YrK119ZWxzZSByfHwodVtpKytdPWMpfXJldHVybiB1fTttLmZsYXR0ZW49ZnVuY3Rpb24obix0KXtyZXR1cm4gUyhuLHQsITEpfSxtLndpdGhvdXQ9ZnVuY3Rpb24obil7cmV0dXJuIG0uZGlmZmVyZW5jZShuLGwuY2FsbChhcmd1bWVudHMsMSkpfSxtLnVuaXE9bS51bmlxdWU9ZnVuY3Rpb24obix0LHIsZSl7bS5pc0Jvb2xlYW4odCl8fChlPXIscj10LHQ9ITEpLG51bGwhPXImJihyPXgocixlKSk7Zm9yKHZhciB1PVtdLGk9W10sbz0wLGE9TyhuKTthPm87bysrKXt2YXIgYz1uW29dLGY9cj9yKGMsbyxuKTpjO3Q/KG8mJmk9PT1mfHx1LnB1c2goYyksaT1mKTpyP20uY29udGFpbnMoaSxmKXx8KGkucHVzaChmKSx1LnB1c2goYykpOm0uY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxtLnVuaW9uPWZ1bmN0aW9uKCl7cmV0dXJuIG0udW5pcShTKGFyZ3VtZW50cywhMCwhMCkpfSxtLmludGVyc2VjdGlvbj1mdW5jdGlvbihuKXtmb3IodmFyIHQ9W10scj1hcmd1bWVudHMubGVuZ3RoLGU9MCx1PU8obik7dT5lO2UrKyl7dmFyIGk9bltlXTtpZighbS5jb250YWlucyh0LGkpKXtmb3IodmFyIG89MTtyPm8mJm0uY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXImJnQucHVzaChpKX19cmV0dXJuIHR9LG0uZGlmZmVyZW5jZT1mdW5jdGlvbihuKXt2YXIgdD1TKGFyZ3VtZW50cywhMCwhMCwxKTtyZXR1cm4gbS5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4hbS5jb250YWlucyh0LG4pfSl9LG0uemlwPWZ1bmN0aW9uKCl7cmV0dXJuIG0udW56aXAoYXJndW1lbnRzKX0sbS51bnppcD1mdW5jdGlvbihuKXtmb3IodmFyIHQ9biYmbS5tYXgobixPKS5sZW5ndGh8fDAscj1BcnJheSh0KSxlPTA7dD5lO2UrKylyW2VdPW0ucGx1Y2sobixlKTtyZXR1cm4gcn0sbS5vYmplY3Q9ZnVuY3Rpb24obix0KXtmb3IodmFyIHI9e30sZT0wLHU9TyhuKTt1PmU7ZSsrKXQ/cltuW2VdXT10W2VdOnJbbltlXVswXV09bltlXVsxXTtyZXR1cm4gcn0sbS5maW5kSW5kZXg9dCgxKSxtLmZpbmRMYXN0SW5kZXg9dCgtMSksbS5zb3J0ZWRJbmRleD1mdW5jdGlvbihuLHQscixlKXtyPXgocixlLDEpO2Zvcih2YXIgdT1yKHQpLGk9MCxvPU8obik7bz5pOyl7dmFyIGE9TWF0aC5mbG9vcigoaStvKS8yKTtyKG5bYV0pPHU/aT1hKzE6bz1hfXJldHVybiBpfSxtLmluZGV4T2Y9cigxLG0uZmluZEluZGV4LG0uc29ydGVkSW5kZXgpLG0ubGFzdEluZGV4T2Y9cigtMSxtLmZpbmRMYXN0SW5kZXgpLG0ucmFuZ2U9ZnVuY3Rpb24obix0LHIpe251bGw9PXQmJih0PW58fDAsbj0wKSxyPXJ8fDE7Zm9yKHZhciBlPU1hdGgubWF4KE1hdGguY2VpbCgodC1uKS9yKSwwKSx1PUFycmF5KGUpLGk9MDtlPmk7aSsrLG4rPXIpdVtpXT1uO3JldHVybiB1fTt2YXIgRT1mdW5jdGlvbihuLHQscixlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXJldHVybiBuLmFwcGx5KHIsdSk7dmFyIGk9aihuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIG0uaXNPYmplY3Qobyk/bzppfTttLmJpbmQ9ZnVuY3Rpb24obix0KXtpZihnJiZuLmJpbmQ9PT1nKXJldHVybiBnLmFwcGx5KG4sbC5jYWxsKGFyZ3VtZW50cywxKSk7aWYoIW0uaXNGdW5jdGlvbihuKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciByPWwuY2FsbChhcmd1bWVudHMsMiksZT1mdW5jdGlvbigpe3JldHVybiBFKG4sZSx0LHRoaXMsci5jb25jYXQobC5jYWxsKGFyZ3VtZW50cykpKX07cmV0dXJuIGV9LG0ucGFydGlhbD1mdW5jdGlvbihuKXt2YXIgdD1sLmNhbGwoYXJndW1lbnRzLDEpLHI9ZnVuY3Rpb24oKXtmb3IodmFyIGU9MCx1PXQubGVuZ3RoLGk9QXJyYXkodSksbz0wO3U+bztvKyspaVtvXT10W29dPT09bT9hcmd1bWVudHNbZSsrXTp0W29dO2Zvcig7ZTxhcmd1bWVudHMubGVuZ3RoOylpLnB1c2goYXJndW1lbnRzW2UrK10pO3JldHVybiBFKG4scix0aGlzLHRoaXMsaSl9O3JldHVybiByfSxtLmJpbmRBbGw9ZnVuY3Rpb24obil7dmFyIHQscixlPWFyZ3VtZW50cy5sZW5ndGg7aWYoMT49ZSl0aHJvdyBuZXcgRXJyb3IoXCJiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzXCIpO2Zvcih0PTE7ZT50O3QrKylyPWFyZ3VtZW50c1t0XSxuW3JdPW0uYmluZChuW3JdLG4pO3JldHVybiBufSxtLm1lbW9pemU9ZnVuY3Rpb24obix0KXt2YXIgcj1mdW5jdGlvbihlKXt2YXIgdT1yLmNhY2hlLGk9XCJcIisodD90LmFwcGx5KHRoaXMsYXJndW1lbnRzKTplKTtyZXR1cm4gbS5oYXModSxpKXx8KHVbaV09bi5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHVbaV19O3JldHVybiByLmNhY2hlPXt9LHJ9LG0uZGVsYXk9ZnVuY3Rpb24obix0KXt2YXIgcj1sLmNhbGwoYXJndW1lbnRzLDIpO3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkobnVsbCxyKX0sdCl9LG0uZGVmZXI9bS5wYXJ0aWFsKG0uZGVsYXksbSwxKSxtLnRocm90dGxlPWZ1bmN0aW9uKG4sdCxyKXt2YXIgZSx1LGksbz1udWxsLGE9MDtyfHwocj17fSk7dmFyIGM9ZnVuY3Rpb24oKXthPXIubGVhZGluZz09PSExPzA6bS5ub3coKSxvPW51bGwsaT1uLmFwcGx5KGUsdSksb3x8KGU9dT1udWxsKX07cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGY9bS5ub3coKTthfHxyLmxlYWRpbmchPT0hMXx8KGE9Zik7dmFyIGw9dC0oZi1hKTtyZXR1cm4gZT10aGlzLHU9YXJndW1lbnRzLDA+PWx8fGw+dD8obyYmKGNsZWFyVGltZW91dChvKSxvPW51bGwpLGE9ZixpPW4uYXBwbHkoZSx1KSxvfHwoZT11PW51bGwpKTpvfHxyLnRyYWlsaW5nPT09ITF8fChvPXNldFRpbWVvdXQoYyxsKSksaX19LG0uZGVib3VuY2U9ZnVuY3Rpb24obix0LHIpe3ZhciBlLHUsaSxvLGEsYz1mdW5jdGlvbigpe3ZhciBmPW0ubm93KCktbzt0PmYmJmY+PTA/ZT1zZXRUaW1lb3V0KGMsdC1mKTooZT1udWxsLHJ8fChhPW4uYXBwbHkoaSx1KSxlfHwoaT11PW51bGwpKSl9O3JldHVybiBmdW5jdGlvbigpe2k9dGhpcyx1PWFyZ3VtZW50cyxvPW0ubm93KCk7dmFyIGY9ciYmIWU7cmV0dXJuIGV8fChlPXNldFRpbWVvdXQoYyx0KSksZiYmKGE9bi5hcHBseShpLHUpLGk9dT1udWxsKSxhfX0sbS53cmFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG0ucGFydGlhbCh0LG4pfSxtLm5lZ2F0ZT1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4hbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxtLmNvbXBvc2U9ZnVuY3Rpb24oKXt2YXIgbj1hcmd1bWVudHMsdD1uLmxlbmd0aC0xO3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgcj10LGU9blt0XS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7ci0tOyllPW5bcl0uY2FsbCh0aGlzLGUpO3JldHVybiBlfX0sbS5hZnRlcj1mdW5jdGlvbihuLHQpe3JldHVybiBmdW5jdGlvbigpe3JldHVybi0tbjwxP3QuYXBwbHkodGhpcyxhcmd1bWVudHMpOnZvaWQgMH19LG0uYmVmb3JlPWZ1bmN0aW9uKG4sdCl7dmFyIHI7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuLS1uPjAmJihyPXQuYXBwbHkodGhpcyxhcmd1bWVudHMpKSwxPj1uJiYodD1udWxsKSxyfX0sbS5vbmNlPW0ucGFydGlhbChtLmJlZm9yZSwyKTt2YXIgTT0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksST1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXTttLmtleXM9ZnVuY3Rpb24obil7aWYoIW0uaXNPYmplY3QobikpcmV0dXJuW107aWYodilyZXR1cm4gdihuKTt2YXIgdD1bXTtmb3IodmFyIHIgaW4gbiltLmhhcyhuLHIpJiZ0LnB1c2gocik7cmV0dXJuIE0mJmUobix0KSx0fSxtLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIW0uaXNPYmplY3QobikpcmV0dXJuW107dmFyIHQ9W107Zm9yKHZhciByIGluIG4pdC5wdXNoKHIpO3JldHVybiBNJiZlKG4sdCksdH0sbS52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciB0PW0ua2V5cyhuKSxyPXQubGVuZ3RoLGU9QXJyYXkociksdT0wO3I+dTt1KyspZVt1XT1uW3RbdV1dO3JldHVybiBlfSxtLm1hcE9iamVjdD1mdW5jdGlvbihuLHQscil7dD14KHQscik7Zm9yKHZhciBlLHU9bS5rZXlzKG4pLGk9dS5sZW5ndGgsbz17fSxhPTA7aT5hO2ErKyllPXVbYV0sb1tlXT10KG5bZV0sZSxuKTtyZXR1cm4gb30sbS5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHQ9bS5rZXlzKG4pLHI9dC5sZW5ndGgsZT1BcnJheShyKSx1PTA7cj51O3UrKyllW3VdPVt0W3VdLG5bdFt1XV1dO3JldHVybiBlfSxtLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHQ9e30scj1tLmtleXMobiksZT0wLHU9ci5sZW5ndGg7dT5lO2UrKyl0W25bcltlXV1dPXJbZV07cmV0dXJuIHR9LG0uZnVuY3Rpb25zPW0ubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgdD1bXTtmb3IodmFyIHIgaW4gbiltLmlzRnVuY3Rpb24obltyXSkmJnQucHVzaChyKTtyZXR1cm4gdC5zb3J0KCl9LG0uZXh0ZW5kPV8obS5hbGxLZXlzKSxtLmV4dGVuZE93bj1tLmFzc2lnbj1fKG0ua2V5cyksbS5maW5kS2V5PWZ1bmN0aW9uKG4sdCxyKXt0PXgodCxyKTtmb3IodmFyIGUsdT1tLmtleXMobiksaT0wLG89dS5sZW5ndGg7bz5pO2krKylpZihlPXVbaV0sdChuW2VdLGUsbikpcmV0dXJuIGV9LG0ucGljaz1mdW5jdGlvbihuLHQscil7dmFyIGUsdSxpPXt9LG89bjtpZihudWxsPT1vKXJldHVybiBpO20uaXNGdW5jdGlvbih0KT8odT1tLmFsbEtleXMobyksZT1iKHQscikpOih1PVMoYXJndW1lbnRzLCExLCExLDEpLGU9ZnVuY3Rpb24obix0LHIpe3JldHVybiB0IGluIHJ9LG89T2JqZWN0KG8pKTtmb3IodmFyIGE9MCxjPXUubGVuZ3RoO2M+YTthKyspe3ZhciBmPXVbYV0sbD1vW2ZdO2UobCxmLG8pJiYoaVtmXT1sKX1yZXR1cm4gaX0sbS5vbWl0PWZ1bmN0aW9uKG4sdCxyKXtpZihtLmlzRnVuY3Rpb24odCkpdD1tLm5lZ2F0ZSh0KTtlbHNle3ZhciBlPW0ubWFwKFMoYXJndW1lbnRzLCExLCExLDEpLFN0cmluZyk7dD1mdW5jdGlvbihuLHQpe3JldHVybiFtLmNvbnRhaW5zKGUsdCl9fXJldHVybiBtLnBpY2sobix0LHIpfSxtLmRlZmF1bHRzPV8obS5hbGxLZXlzLCEwKSxtLmNyZWF0ZT1mdW5jdGlvbihuLHQpe3ZhciByPWoobik7cmV0dXJuIHQmJm0uZXh0ZW5kT3duKHIsdCkscn0sbS5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gbS5pc09iamVjdChuKT9tLmlzQXJyYXkobik/bi5zbGljZSgpOm0uZXh0ZW5kKHt9LG4pOm59LG0udGFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHQobiksbn0sbS5pc01hdGNoPWZ1bmN0aW9uKG4sdCl7dmFyIHI9bS5rZXlzKHQpLGU9ci5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtlPmk7aSsrKXt2YXIgbz1yW2ldO2lmKHRbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9O3ZhciBOPWZ1bmN0aW9uKG4sdCxyLGUpe2lmKG49PT10KXJldHVybiAwIT09bnx8MS9uPT09MS90O2lmKG51bGw9PW58fG51bGw9PXQpcmV0dXJuIG49PT10O24gaW5zdGFuY2VvZiBtJiYobj1uLl93cmFwcGVkKSx0IGluc3RhbmNlb2YgbSYmKHQ9dC5fd3JhcHBlZCk7dmFyIHU9cy5jYWxsKG4pO2lmKHUhPT1zLmNhbGwodCkpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIit0O2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT09K24/K3QhPT0rdDowPT09K24/MS8rbj09PTEvdDorbj09PSt0O2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PT0rdH12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHQpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXQuY29uc3RydWN0b3I7aWYobyE9PWEmJiEobS5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmbS5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHQpcmV0dXJuITF9cj1yfHxbXSxlPWV8fFtdO2Zvcih2YXIgYz1yLmxlbmd0aDtjLS07KWlmKHJbY109PT1uKXJldHVybiBlW2NdPT09dDtpZihyLnB1c2gobiksZS5wdXNoKHQpLGkpe2lmKGM9bi5sZW5ndGgsYyE9PXQubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighTihuW2NdLHRbY10scixlKSlyZXR1cm4hMX1lbHNle3ZhciBmLGw9bS5rZXlzKG4pO2lmKGM9bC5sZW5ndGgsbS5rZXlzKHQpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGY9bFtjXSwhbS5oYXModCxmKXx8IU4obltmXSx0W2ZdLHIsZSkpcmV0dXJuITF9cmV0dXJuIHIucG9wKCksZS5wb3AoKSwhMH07bS5pc0VxdWFsPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIE4obix0KX0sbS5pc0VtcHR5PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPyEwOmsobikmJihtLmlzQXJyYXkobil8fG0uaXNTdHJpbmcobil8fG0uaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09bS5rZXlzKG4pLmxlbmd0aH0sbS5pc0VsZW1lbnQ9ZnVuY3Rpb24obil7cmV0dXJuISghbnx8MSE9PW4ubm9kZVR5cGUpfSxtLmlzQXJyYXk9aHx8ZnVuY3Rpb24obil7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09cy5jYWxsKG4pfSxtLmlzT2JqZWN0PWZ1bmN0aW9uKG4pe3ZhciB0PXR5cGVvZiBuO3JldHVyblwiZnVuY3Rpb25cIj09PXR8fFwib2JqZWN0XCI9PT10JiYhIW59LG0uZWFjaChbXCJBcmd1bWVudHNcIixcIkZ1bmN0aW9uXCIsXCJTdHJpbmdcIixcIk51bWJlclwiLFwiRGF0ZVwiLFwiUmVnRXhwXCIsXCJFcnJvclwiXSxmdW5jdGlvbihuKXttW1wiaXNcIituXT1mdW5jdGlvbih0KXtyZXR1cm4gcy5jYWxsKHQpPT09XCJbb2JqZWN0IFwiK24rXCJdXCJ9fSksbS5pc0FyZ3VtZW50cyhhcmd1bWVudHMpfHwobS5pc0FyZ3VtZW50cz1mdW5jdGlvbihuKXtyZXR1cm4gbS5oYXMobixcImNhbGxlZVwiKX0pLFwiZnVuY3Rpb25cIiE9dHlwZW9mLy4vJiZcIm9iamVjdFwiIT10eXBlb2YgSW50OEFycmF5JiYobS5pc0Z1bmN0aW9uPWZ1bmN0aW9uKG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG58fCExfSksbS5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4gaXNGaW5pdGUobikmJiFpc05hTihwYXJzZUZsb2F0KG4pKX0sbS5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4gbS5pc051bWJlcihuKSYmbiE9PStufSxtLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4gbj09PSEwfHxuPT09ITF8fFwiW29iamVjdCBCb29sZWFuXVwiPT09cy5jYWxsKG4pfSxtLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LG0uaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIG49PT12b2lkIDB9LG0uaGFzPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGwhPW4mJnAuY2FsbChuLHQpfSxtLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdS5fPWksdGhpc30sbS5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0sbS5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LG0ubm9vcD1mdW5jdGlvbigpe30sbS5wcm9wZXJ0eT13LG0ucHJvcGVydHlPZj1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj9mdW5jdGlvbigpe306ZnVuY3Rpb24odCl7cmV0dXJuIG5bdF19fSxtLm1hdGNoZXI9bS5tYXRjaGVzPWZ1bmN0aW9uKG4pe3JldHVybiBuPW0uZXh0ZW5kT3duKHt9LG4pLGZ1bmN0aW9uKHQpe3JldHVybiBtLmlzTWF0Y2godCxuKX19LG0udGltZXM9ZnVuY3Rpb24obix0LHIpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3Q9Yih0LHIsMSk7Zm9yKHZhciB1PTA7bj51O3UrKyllW3VdPXQodSk7cmV0dXJuIGV9LG0ucmFuZG9tPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG51bGw9PXQmJih0PW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoodC1uKzEpKX0sbS5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBCPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sVD1tLmludmVydChCKSxSPWZ1bmN0aW9uKG4pe3ZhciB0PWZ1bmN0aW9uKHQpe3JldHVybiBuW3RdfSxyPVwiKD86XCIrbS5rZXlzKG4pLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKHIpLHU9UmVnRXhwKHIsXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07bS5lc2NhcGU9UihCKSxtLnVuZXNjYXBlPVIoVCksbS5yZXN1bHQ9ZnVuY3Rpb24obix0LHIpe3ZhciBlPW51bGw9PW4/dm9pZCAwOm5bdF07cmV0dXJuIGU9PT12b2lkIDAmJihlPXIpLG0uaXNGdW5jdGlvbihlKT9lLmNhbGwobik6ZX07dmFyIHE9MDttLnVuaXF1ZUlkPWZ1bmN0aW9uKG4pe3ZhciB0PSsrcStcIlwiO3JldHVybiBuP24rdDp0fSxtLnRlbXBsYXRlU2V0dGluZ3M9e2V2YWx1YXRlOi88JShbXFxzXFxTXSs/KSU+L2csaW50ZXJwb2xhdGU6LzwlPShbXFxzXFxTXSs/KSU+L2csZXNjYXBlOi88JS0oW1xcc1xcU10rPyklPi9nfTt2YXIgSz0vKC4pXi8sej17XCInXCI6XCInXCIsXCJcXFxcXCI6XCJcXFxcXCIsXCJcXHJcIjpcInJcIixcIlxcblwiOlwiblwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LEQ9L1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nLEw9ZnVuY3Rpb24obil7cmV0dXJuXCJcXFxcXCIreltuXX07bS50ZW1wbGF0ZT1mdW5jdGlvbihuLHQscil7IXQmJnImJih0PXIpLHQ9bS5kZWZhdWx0cyh7fSx0LG0udGVtcGxhdGVTZXR0aW5ncyk7dmFyIGU9UmVnRXhwKFsodC5lc2NhcGV8fEspLnNvdXJjZSwodC5pbnRlcnBvbGF0ZXx8Sykuc291cmNlLCh0LmV2YWx1YXRlfHxLKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksdT0wLGk9XCJfX3ArPSdcIjtuLnJlcGxhY2UoZSxmdW5jdGlvbih0LHIsZSxvLGEpe3JldHVybiBpKz1uLnNsaWNlKHUsYSkucmVwbGFjZShELEwpLHU9YSt0Lmxlbmd0aCxyP2krPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjplP2krPVwiJytcXG4oKF9fdD0oXCIrZStcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOm8mJihpKz1cIic7XFxuXCIrbytcIlxcbl9fcCs9J1wiKSx0fSksaSs9XCInO1xcblwiLHQudmFyaWFibGV8fChpPVwid2l0aChvYmp8fHt9KXtcXG5cIitpK1wifVxcblwiKSxpPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIitpK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dmFyIG89bmV3IEZ1bmN0aW9uKHQudmFyaWFibGV8fFwib2JqXCIsXCJfXCIsaSl9Y2F0Y2goYSl7dGhyb3cgYS5zb3VyY2U9aSxhfXZhciBjPWZ1bmN0aW9uKG4pe3JldHVybiBvLmNhbGwodGhpcyxuLG0pfSxmPXQudmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIGMuc291cmNlPVwiZnVuY3Rpb24oXCIrZitcIil7XFxuXCIraStcIn1cIixjfSxtLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciB0PW0obik7cmV0dXJuIHQuX2NoYWluPSEwLHR9O3ZhciBQPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4uX2NoYWluP20odCkuY2hhaW4oKTp0fTttLm1peGluPWZ1bmN0aW9uKG4pe20uZWFjaChtLmZ1bmN0aW9ucyhuKSxmdW5jdGlvbih0KXt2YXIgcj1tW3RdPW5bdF07bS5wcm90b3R5cGVbdF09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIGYuYXBwbHkobixhcmd1bWVudHMpLFAodGhpcyxyLmFwcGx5KG0sbikpfX0pfSxtLm1peGluKG0pLG0uZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24obil7dmFyIHQ9b1tuXTttLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3ZhciByPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkocixhcmd1bWVudHMpLFwic2hpZnRcIiE9PW4mJlwic3BsaWNlXCIhPT1ufHwwIT09ci5sZW5ndGh8fGRlbGV0ZSByWzBdLFAodGhpcyxyKX19KSxtLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgdD1vW25dO20ucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIFAodGhpcyx0LmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksbS5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0sbS5wcm90b3R5cGUudmFsdWVPZj1tLnByb3RvdHlwZS50b0pTT049bS5wcm90b3R5cGUudmFsdWUsbS5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIlwiK3RoaXMuX3dyYXBwZWR9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIG19KX0pLmNhbGwodGhpcyk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuZGVyc2NvcmUtbWluLm1hcFxyXG5cclxuXHJcblxyXG4vKlxyXG4gKiBDdXN0b21cclxuICovXHJcbmZ1bmN0aW9uIGFkZFRleHROb2RlKHRleHQpIHtcclxuICBsZXQgbmV3dGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xyXG4gIHJldHVybiBuZXd0ZXh0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRBdHRyKGl0ZW0sIGh0bWxFbGVtZW50KXtcclxuXHRmb3IgKGtleSBpbiBpdGVtKXtcclxuXHRcdGlmIChrZXkgIT0gXCJ0ZXh0XCIgJiYga2V5ICE9IFwidGFnXCIgJiYga2V5ICE9IFwiaHRtbFwiICYmIGtleSAhPSBcInRleHRcIiAmJiBrZXkgIT0gXCJjaGlsZHJlblwiKSB7XHJcblx0XHRcdGh0bWxFbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGl0ZW1ba2V5XSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJIVE1MKGVsZW1lbnQsIHBhcmVudCl7XHJcblx0Ly9pZiBpdCBpcyB0aGUgZGVlcGVzdCB0YWcgZWxlbWVudFxyXG5cdGlmICghQXJyYXkuaXNBcnJheShlbGVtZW50KSAmJiAhZWxlbWVudC5jaGlsZHJlbikge1xyXG5cdFx0aWYgKGVsZW1lbnQudGV4dCkge1xyXG5cdFx0XHRyZXR1cm4gcGFyZW50LmFwcGVuZChhZGRUZXh0Tm9kZShlbGVtZW50LnRleHQpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxldCBodG1sRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudC50YWcpO1xyXG5cdFx0XHQvL2FkZCBhdHRyaWJ1dGVzXHJcblx0XHRcdHNldEF0dHIoZWxlbWVudCxodG1sRWxlbSk7XHJcblxyXG5cdFx0XHRodG1sRWxlbS5hcHBlbmQoYWRkVGV4dE5vZGUoZWxlbWVudC5odG1sKSk7XHJcblx0XHRcdHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoaHRtbEVsZW0pO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRlbGVtZW50LmZvckVhY2goKGl0ZW0pPT4ge1xyXG5cdFx0XHRpZiAoaXRlbS5jaGlsZHJlbikge1xyXG5cdFx0XHRcdGxldCBodG1sRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS50YWcpO1xyXG5cdFx0XHRcdC8vYWRkIGF0dHJpYnV0ZXNcclxuXHRcdFx0XHRzZXRBdHRyKGl0ZW0sIGh0bWxFbGVtKTtcclxuXHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENoaWxkKGh0bWxFbGVtKTtcclxuXHRcdFx0XHRyZW5kZXJIVE1MKGl0ZW0uY2hpbGRyZW4sIGh0bWxFbGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZW5kZXJIVE1MKGl0ZW0sIHBhcmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbi8vcmV0dXJuIGpzb24gcGFyc2VkIGpzb24gZmlsZVxyXG5jb25zdCAgZ2V0SlNPTiA9IGFzeW5jIChwYXRoKT0+IHtcclxuXHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXRoKTtcclxuXHRsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5jbGFzcyBTdG9yYWdlIHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy50ZW1wSXRlbXMgPSBbXTtcclxuXHRcdHRoaXMudGVtcFVzZXJzID0gW107XHJcblx0XHR0aGlzLmN1cnJlbnRVc2VyID0gZmFsc2U7XHJcblx0XHR0aGlzLmZpbHRlclBhcmFtcyA9IHt9O1xyXG5cdFx0dGhpcy5wYXRoID0ge1xyXG5cdFx0XHRpdGVtczogJ2pzb24vbGlzdGl0ZW1zLmpzb24nLFxyXG5cdFx0XHR1c2VyczogJ2pzb24vdXNlcnMuanNvbidcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpIHtcclxuXHRcdGF3YWl0IHRoaXMubG9hZExvY2FsU3RvcmFnZSgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgbG9hZExvY2FsU3RvcmFnZSgpIHtcclxuXHRcdGxldCBpdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpdGVtcycpO1xyXG5cdFx0bGV0IHVzZXJzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJzJyk7XHJcblx0XHRhd2FpdCB0aGlzLnVwZGF0ZVRlbXBTdG9yYWdlKGl0ZW1zLCAnaXRlbXMnKTtcclxuXHRcdGF3YWl0IHRoaXMudXBkYXRlVGVtcFN0b3JhZ2UodXNlcnMsICd1c2VycycpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdXBkYXRlVGVtcFN0b3JhZ2UoZGF0YSwga2V5KSB7XHJcblx0XHRzd2l0Y2ggKGtleSkge1xyXG5cdFx0XHRjYXNlICdpdGVtcyc6XHJcblx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdHRoaXMudGVtcEl0ZW1zID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy50ZW1wSXRlbXMgPSBhd2FpdCBnZXRKU09OKHRoaXMucGF0aC5pdGVtcyk7XHJcblx0XHRcdFx0XHR0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHRoaXMudGVtcEl0ZW1zKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICd1c2Vycyc6XHJcblx0XHRcdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0XHRcdHRoaXMudGVtcFVzZXJzID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy50ZW1wVXNlcnMgPSBhd2FpdCBnZXRKU09OKHRoaXMucGF0aC51c2Vycyk7XHJcblx0XHRcdFx0XHR0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZShrZXksIHRoaXMudGVtcFVzZXJzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiB0aHJvdyBFcnJvciAoJ3NlcmV2ZXIgbm90IHJlc3BvbmQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZUFsbExvY2FsU3RvcmFnZSgpe1xyXG5cdFx0dGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ3VzZXJzJywgdGhpcy50ZW1wVXNlcnMpO1xyXG5cdFx0dGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ2l0ZW1zJywgdGhpcy50ZW1wSXRlbXMpO1xyXG5cclxuXHR9XHJcblxyXG5cdHNhdmVUb0xvY2FsU3RvcmFnZShrZXksIGRhdGEpIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cdH1cclxuXHJcblx0Y29tcGFyZVByaWNlVG9IaWdoKGl0ZW1BLCBpdGVtQil7XHJcblx0XHRyZXR1cm4gaXRlbUIucHJpY2UgLSBpdGVtQS5wcmljZTtcclxuXHR9XHJcblxyXG5cdGNvbXBhcmVQcmljZVRvTG93KGl0ZW1BLCBpdGVtQil7XHJcblx0XHRyZXR1cm4gaXRlbUEucHJpY2UgLSBpdGVtQi5wcmljZTtcclxuXHR9XHJcblxyXG5cdCBnZXRUZW1wU3RvcmFnZShuYW1lKSB7XHJcblx0XHRzd2l0Y2ggKG5hbWUpIHtcclxuXHRcdFx0Y2FzZSAnaXRlbXMnOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRlbXBJdGVtcy5zb3J0KHRoaXMuY29tcGFyZVByaWNlVG9IaWdoKTtcclxuXHRcdFx0Y2FzZSAndXNlcnMnOlxyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRlbXBVc2VycztcclxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgRXJyb3IgKCdzZXJldmVyIG5vdCByZXNwb25kJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtQnlJZChpZCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudGVtcEl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmlkX2l0ZW0gPT0gaWQpO1xyXG5cdH1cclxuXHJcblx0Z2V0RmlsdGVyZWRJdGVtcyhwYXJhbXMpe1xyXG5cdFx0dGhpcy5maWx0ZXJQYXJhbXMgPSBwYXJhbXM7XHJcblx0XHRjb25zb2xlLmRpcih0aGlzLmZpbHRlclBhcmFtcyk7XHJcblx0XHRsZXQgZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlBdmFpbGFibGUoKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zID0gdGhpcy5nZXRJdGVtc0J5Q29uZGl0aW9uKGZpbHRlckFyckl0ZW1zKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zID0gdGhpcy5nZXRJdGVtc0J5U2hpcHBpbmcoZmlsdGVyQXJySXRlbXMpO1xyXG5cdFx0ZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlGb3JtYXQoZmlsdGVyQXJySXRlbXMpO1xyXG5cdFx0ZmlsdGVyQXJySXRlbXMgPSB0aGlzLmdldEl0ZW1zQnlQcmljZShmaWx0ZXJBcnJJdGVtcyk7XHJcblx0XHRmaWx0ZXJBcnJJdGVtcyA9IHRoaXMuZ2V0SXRlbXNCeVVzZXJSZXF1ZXN0KGZpbHRlckFyckl0ZW1zKTtcclxuXHRcdGZpbHRlckFyckl0ZW1zIC0gdGhpcy5zb3J0QnlEaXJlY3Rpb24oZmlsdGVyQXJySXRlbXMpXHJcblx0XHRyZXR1cm4gZmlsdGVyQXJySXRlbXM7XHJcblx0fVxyXG5cclxuXHRtYWtlQXJyYXkoc3RyKSB7XHJcblx0XHRyZXR1cm4gc3RyLnNwbGl0KCcsJyk7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtc0J5QXZhaWxhYmxlKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMudGVtcEl0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0ucmVzZXJ2ZWQgPT0gZmFsc2UpO1xyXG5cdH1cclxuXHJcblx0c29ydEJ5RGlyZWN0aW9uKGFycikge1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyUGFyYW1zWydzb3J0J10pe1xyXG5cdFx0XHRzd2l0Y2ggKHRoaXMuZmlsdGVyUGFyYW1zWydzb3J0J10pe1xyXG5cdFx0XHRcdGNhc2UgJ2xvd3ByaWNlJzpcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvSGlnaCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnaGlnaHByaWNlJzpcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvTG93KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvSGlnaCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBhcnIuc29ydCh0aGlzLmNvbXBhcmVQcmljZVRvSGlnaCk7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtc0J5VXNlclJlcXVlc3QoYXJyKXtcclxuXHRcdGlmICh0aGlzLmZpbHRlclBhcmFtc1sndXNlcnJlcXVlc3QnXSl7XHJcblx0XHRcdGxldCBzdHJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLmZpbHRlclBhcmFtc1sndXNlcnJlcXVlc3QnXSkuam9pbignICcpO1xyXG5cdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IG5ldyBSZWdFeHAoc3RyUGFyYW1zLCAnaScpLnRlc3QoaXRlbS50aXRsZSkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGFycjtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1zQnlQcmljZShhcnIpe1xyXG5cdFx0aWYodGhpcy5maWx0ZXJQYXJhbXNbJ2Zyb20nXSkge1xyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJQYXJhbXNbJ3RvJ10pIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUludChpdGVtLnByaWNlKSA+PSArdGhpcy5maWx0ZXJQYXJhbXNbJ2Zyb20nXSAmJiBwYXJzZUludChpdGVtLnByaWNlKSA8PSArdGhpcy5maWx0ZXJQYXJhbXNbJ3RvJ107XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBwYXJzZUludChpdGVtLnByaWNlKSA+PSArdGhpcy5maWx0ZXJQYXJhbXNbJ2Zyb20nXTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gYXJyO1xyXG5cdH1cclxuXHJcblx0Z2V0SXRlbXNCeUNvbmRpdGlvbihhcnIpe1xyXG5cdFx0aWYgKHRoaXMuZmlsdGVyUGFyYW1zWydjb25kaXRpb24nXSl7XHJcblx0XHRcdGxldCBhcnJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLmZpbHRlclBhcmFtc1snY29uZGl0aW9uJ10pO1xyXG5cdFx0XHRpZiAoYXJyUGFyYW1zLmxlbmd0aCA9PSAyKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiB7cmV0dXJuIGl0ZW0uY29uZGl0aW9uID09IGFyclBhcmFtc1swXSB8fCBpdGVtLmNvbmRpdGlvbiA9PSBhcnJQYXJhbXNbMV19KVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChhcnJQYXJhbXMubGVuZ3RoID09IDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IGl0ZW0uY29uZGl0aW9uID09IGFyclBhcmFtc1swXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBhcnI7XHJcblx0fVxyXG5cclxuXHRyZXBsYWNlU2hpcHBpbmdQYXJhbXMoYXJyKXtcclxuXHRcdHJldHVybiBhcnIubWFwKG5hbWUgPT57XHJcblx0XHRcdGlmIChuYW1lID09ICdmcmVlJykge1xyXG5cdFx0XHRcdHJldHVybiAnRnJlZSBTaGlwcGluZyc7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG5hbWUgPT0gJ2luc3RvcmUnKSB7XHJcblx0XHRcdFx0cmV0dXJuICdGcmVlIEluLXN0b3JlIFBpY2t1cCc7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG5hbWUgPT0gJ2xvY2FsJykge1xyXG5cdFx0XHRcdHJldHVybiAnRnJlZSBMb2NhbCBQaWNrdXAnO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Z2V0SXRlbXNCeVNoaXBwaW5nKGFycil7XHJcblx0XHRpZiAodGhpcy5maWx0ZXJQYXJhbXNbJ3NoaXBwaW5nJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5maWx0ZXJQYXJhbXNbJ3NoaXBwaW5nJ10pO1xyXG5cdFx0XHRhcnJQYXJhbXMgPSB0aGlzLnJlcGxhY2VTaGlwcGluZ1BhcmFtcyhhcnJQYXJhbXMpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhhcnJQYXJhbXMpO1xyXG5cdFx0XHRcdGlmIChhcnJQYXJhbXMubGVuZ3RoID09IDMpIHtcclxuXHRcdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4ge3JldHVybiBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1swXSB8fCBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1sxXSB8fCBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1syXX0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoYXJyUGFyYW1zLmxlbmd0aCA9PSAyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IHtyZXR1cm4gaXRlbS5zaGlwcGluZyA9PSBhcnJQYXJhbXNbMF0gfHwgaXRlbS5zaGlwcGluZyA9PSBhcnJQYXJhbXNbMV19KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGFyclBhcmFtcy5sZW5ndGggPT0gMSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFyci5maWx0ZXIoaXRlbSA9PiBpdGVtLnNoaXBwaW5nID09IGFyclBhcmFtc1swXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGFycjtcclxuXHR9XHJcblxyXG5cdGdldEl0ZW1zQnlGb3JtYXQoYXJyKXtcclxuXHRcdHN3aXRjaCAodGhpcy5maWx0ZXJQYXJhbXNbJ2Zvcm1hdCddKXtcclxuXHRcdFx0Y2FzZSAnYnV5aXRub3cnOlxyXG5cdFx0XHRcdHJldHVybiBhcnIuZmlsdGVyKGl0ZW0gPT4gaXRlbS5idXkgPT0gdHJ1ZSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdhdWN0aW9uJzpcclxuXHRcdFx0XHRyZXR1cm4gYXJyLmZpbHRlcihpdGVtID0+IGl0ZW0uYXVjdGlvbiA9PSB0cnVlKVxyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2RlZmF1bHQnKTsgcmV0dXJuIGFycjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vYWRkIHVzZXIgd2hvIGlzIGxvZ2luZWQgdG8gTG9jYWxTdG9yYWdlXHJcblx0YWRkTG9naW5lZFVzZXJ0b0xvY2FsU3RvcmFnZSh1c2VyKXtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY3RpdmVVc2VyJywgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlTG9naW5lZFVzZXJGcm9tTG9jYWxTdG9yYWdlKCl7XHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWN0aXZlVXNlcicpO1xyXG5cdH1cclxuXHJcblx0Z2V0TG9naW5lZFVzZXJGcm9tVGVtcFN0b3JhZ2UoKXtcclxuXHRcdGxldCBsb2dpbmVkVXNlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjdGl2ZVVzZXInKSk7XHJcblx0XHRpZiAobG9naW5lZFVzZXIpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50ZW1wVXNlcnMuZmluZCh1c2VyID0+IHVzZXIubG9naW4gPT09IGxvZ2luZWRVc2VyLmxvZ2luKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWRkTmV3VXNlcnRvVGVtcFN0b3JhZ2UoZGF0YSl7XHJcblx0XHR0aGlzLnRlbXBVc2Vycy5wdXNoKGRhdGEpO1xyXG5cdFx0Y29uc29sZS5kaXIodGhpcy50ZW1wVXNlcnMpO1xyXG5cdFx0dGhpcy5zYXZlVG9Mb2NhbFN0b3JhZ2UoJ3VzZXJzJywgdGhpcy50ZW1wVXNlcnMpO1xyXG5cdH1cclxufVxyXG4vLyBvcHRpb24gYWxsIG9yIGVtcHR5XHJcbmNsYXNzIEZpbHRlciB7XHJcblx0Y29uc3RydWN0b3Ioe29wdGlvbiA9ICdzZWFyY2gnLCBwYXJhbXMgPSB7fX0gPXt9KXtcclxuXHRcdHRoaXMucmVnRXhwID0gL15cXC9zZWFyY2guKy9pO1xyXG5cdFx0dGhpcy51c2VycmVxdWVzdFJlZ0V4cCA9IC9bYS16MC05YS160LAt0Y/RkV0rL2dpO1xyXG5cdFx0dGhpcy5vcHRpb24gPSBvcHRpb247XHJcblx0XHR0aGlzLnBhcmFtcyA9IHBhcmFtcztcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHRpbml0KCkge1xyXG5cdFx0dGhpcy5maW5kTm9kZXMoKTtcclxuXHRcdHRoaXMuYmluZEFsbCgpO1xyXG5cdFx0dGhpcy5hZGRFdmVudHMoKTtcclxuXHRcdHRoaXMuYXV0b0NoZWNrKCk7XHJcblx0fVxyXG5cclxuXHRmaW5kTm9kZXMoKSB7XHJcblx0XHRpZiAodGhpcy5vcHRpb24gPT0gJ2FsbCcpIHtcclxuXHRcdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0XHRjb25kaXRpb246IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCdjb25kaXRpb24nKSxcclxuXHRcdFx0XHRzaGlwcGluZzogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoJ3NoaXBwaW5nJyksXHJcblx0XHRcdFx0ZnJvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zyb20nKSxcclxuXHRcdFx0XHR0bzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvJyksXHJcblx0XHRcdFx0YnRuZnJvbXRvOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuZnJvbXRvJyksXHJcblx0XHRcdFx0c2VhcmNoOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJyksXHJcblx0XHRcdFx0c2VhcmNoQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLWlucHV0JyksXHJcblx0XHRcdFx0YnV5aXRub3c6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXlpdG5vdycpLFxyXG5cdFx0XHRcdGF1Y3Rpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdWN0aW9uJyksXHJcblx0XHRcdFx0Zm9ybWF0OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnZm9ybWF0JyksXHJcblx0XHRcdFx0c29ydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvcnQnKSxcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0XHRzZWFyY2g6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKSxcclxuXHRcdFx0XHRzZWFyY2hCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gtaW5wdXQnKSxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdGJpbmRBbGwoKSB7XHJcblx0XHR0aGlzLmNoZWNrQ29uZGl0aW9uID0gdGhpcy5jaGVja0NvbmRpdGlvbi5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5jaGVja1NoaXBwaW5nID0gdGhpcy5jaGVja1NoaXBwaW5nLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnJhbmdlUHJpY2UgPSB0aGlzLnJhbmdlUHJpY2UuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuY2hlY2tGb3JtYXQgPSB0aGlzLmNoZWNrRm9ybWF0LmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnNlYXJjaCA9IHRoaXMuc2VhcmNoLmJpbmQodGhpcyk7XHJcblx0XHR0aGlzLnNvcnQgPSB0aGlzLnNvcnQuYmluZCh0aGlzKTtcclxuXHRcdHRoaXMuaGFuZGxlciA9IHRoaXMuaGFuZGxlci5iaW5kKHRoaXMpO1xyXG5cdFx0dGhpcy5oYW5kbGVyQWxsID0gdGhpcy5oYW5kbGVyQWxsLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRhZGRFdmVudHMoKSB7XHJcblx0XHRpZiAodGhpcy5vcHRpb24gPT0gJ2FsbCcpe1xyXG5cdFx0XHR0aGlzLm5vZGVzLmNvbmRpdGlvblswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuY29uZGl0aW9uWzFdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1swXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuc2hpcHBpbmdbMV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLnNoaXBwaW5nWzJdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5idG5mcm9tdG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLmZvcm1hdFswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlckFsbCk7XHJcblx0XHRcdHRoaXMubm9kZXMuZm9ybWF0WzFdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdFx0dGhpcy5ub2Rlcy5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZXJBbGwpO1xyXG5cdFx0XHR0aGlzLm5vZGVzLnNvcnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVyQWxsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubm9kZXMuc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG1ha2VBcnJheShzdHIpIHtcclxuXHRcdHJldHVybiBzdHIuc3BsaXQoJywnKTtcclxuXHR9XHJcblxyXG5cdC8vIGNoZWNrIGZpbHRlciBhbmQgc29ydCBvcHRpb25zIGFmdGVyIGxvY2F0aW9uLmFzc2lnblxyXG5cdGF1dG9DaGVjaygpIHtcclxuXHRcdGlmICh0aGlzLnBhcmFtc1snY29uZGl0aW9uJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ2NvbmRpdGlvbiddKTtcclxuXHRcdFx0dGhpcy5hdXRvQ2hlY2tDb25kaXRpb24oYXJyUGFyYW1zKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBhcmFtc1snc2hpcHBpbmcnXSl7XHJcblx0XHRcdGxldCBhcnJQYXJhbXMgPSB0aGlzLm1ha2VBcnJheSh0aGlzLnBhcmFtc1snc2hpcHBpbmcnXSk7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrU2hpcHBpbmcoYXJyUGFyYW1zKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3RvJ10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ3RvJ10pO1xyXG5cdFx0XHR0aGlzLmF1dG9DaGVja1JhbmdlUHJpY2UoYXJyUGFyYW1zLCAndG8nKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnBhcmFtc1snZnJvbSddKXtcclxuXHRcdFx0bGV0IGFyclBhcmFtcyA9IHRoaXMubWFrZUFycmF5KHRoaXMucGFyYW1zWydmcm9tJ10pO1xyXG5cdFx0XHR0aGlzLmF1dG9DaGVja1JhbmdlUHJpY2UoYXJyUGFyYW1zLCAnZnJvbScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMucGFyYW1zWydmb3JtYXQnXSl7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrRm9ybWF0KHRoaXMucGFyYW1zWydmb3JtYXQnXSk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3VzZXJyZXF1ZXN0J10pe1xyXG5cdFx0XHRsZXQgYXJyUGFyYW1zID0gdGhpcy5tYWtlQXJyYXkodGhpcy5wYXJhbXNbJ3VzZXJyZXF1ZXN0J10pO1xyXG5cdFx0XHR0aGlzLmF1dG9GaWxsU2VhcmNoKGFyclBhcmFtcyk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5wYXJhbXNbJ3NvcnQnXSl7XHJcblx0XHRcdHRoaXMuYXV0b0NoZWNrU29ydCh0aGlzLnBhcmFtc1snc29ydCddKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGF1dG9DaGVja1NvcnQodmFsdWUpe1xyXG5cdFx0c3dpdGNoICh2YWx1ZSkge1xyXG5cdFx0XHRjYXNlICdsb3dwcmljZSc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5zb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKVswXS5zZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdoaWdocHJpY2UnOlxyXG5cdFx0XHRcdHRoaXMubm9kZXMuc29ydC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJylbMV0uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2ludmFsaWQnKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGF1dG9GaWxsU2VhcmNoKGFycikge1xyXG5cdFx0dGhpcy5ub2Rlcy5zZWFyY2gudmFsdWUgPSBhcnIuam9pbignICcpO1xyXG5cdH1cclxuXHJcblx0YXV0b0NoZWNrRm9ybWF0KHZhbHVlKXtcclxuXHRcdHN3aXRjaCAodmFsdWUpIHtcclxuXHRcdFx0Y2FzZSAnYnV5aXRub3cnOlxyXG5cdFx0XHRcdHRoaXMubm9kZXMuZm9ybWF0WzBdLmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnYXVjdGlvbic6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5mb3JtYXRbMV0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRhdXRvQ2hlY2tSYW5nZVByaWNlKGFyciwgaW5wdXQpe1xyXG5cdFx0c3dpdGNoIChpbnB1dCkge1xyXG5cdFx0XHRjYXNlICd0byc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy50by52YWx1ZSA9IGFyci50b1N0cmluZygpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZnJvbSc6XHJcblx0XHRcdFx0dGhpcy5ub2Rlcy5mcm9tLnZhbHVlID0gYXJyLnRvU3RyaW5nKCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdGF1dG9DaGVja1NoaXBwaW5nKGFycikge1xyXG5cdFx0YXJyLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdHN3aXRjaCAoZWxlbWVudCkge1xyXG5cdFx0XHRcdGNhc2UgJ2ZyZWUnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1swXS5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICdpbnN0b3JlJzpcclxuXHRcdFx0XHRcdHRoaXMubm9kZXMuc2hpcHBpbmdbMV0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnbG9jYWwnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5zaGlwcGluZ1syXS5jaGVja2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiBjb25zb2xlLmxvZygnaW52YWxpZCBxdWVyeSBzdHJpbmcnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhdXRvQ2hlY2tDb25kaXRpb24oYXJyKSB7XHJcblx0XHRhcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHRcdFx0c3dpdGNoIChlbGVtZW50KSB7XHJcblx0XHRcdFx0Y2FzZSAnbmV3JzpcclxuXHRcdFx0XHRcdHRoaXMubm9kZXMuY29uZGl0aW9uWzBdLmNoZWNrZWQgPSB0cnVlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3VzZWQnOlxyXG5cdFx0XHRcdFx0dGhpcy5ub2Rlcy5jb25kaXRpb25bMV0uY2hlY2tlZCA9IHRydWU7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2ludmFsaWQgcXVlcnkgc3RyaW5nJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0UGF0aCgpIHtcclxuXHRcdHRoaXMuY3VycmVudFBhdGhOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5cdH1cclxuXHJcblx0c2VhcmNoKGUpIHtcclxuXHRcdGlmICh0aGlzLm5vZGVzLnNlYXJjaC52YWx1ZSkge1xyXG5cdFx0XHR0aGlzLnBhcmFtc1sndXNlcnJlcXVlc3QnXSA9IHRoaXMubm9kZXMuc2VhcmNoLnZhbHVlLm1hdGNoKHRoaXMudXNlcnJlcXVlc3RSZWdFeHApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMucGFyYW1zWyd1c2VycmVxdWVzdCddO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c29ydChlKSB7XHJcblx0XHRsZXQgaW5kZXhTZWxlY3RlZCA9IHRoaXMubm9kZXMuc29ydC5zZWxlY3RlZEluZGV4O1xyXG5cdFx0Y29uc29sZS5sb2coaW5kZXhTZWxlY3RlZCk7XHJcblx0XHR0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLnNvcnQuZ2V0QXR0cmlidXRlKCduYW1lJyldID0gdGhpcy5ub2Rlcy5zb3J0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdvcHRpb24nKVtpbmRleFNlbGVjdGVkXS52YWx1ZTtcclxuXHRcdGNvbnNvbGUuZGlyKHRoaXMucGFyYW1zKTtcclxuXHR9XHJcblxyXG5cdGNoZWNrRm9ybWF0KGUpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2Rlcy5mb3JtYXQubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMubm9kZXMuZm9ybWF0W2ldLmNoZWNrZWQpIHtcclxuXHRcdFx0XHR0aGlzLnBhcmFtc1t0aGlzLm5vZGVzLmZvcm1hdFtpXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKV0gPSB0aGlzLm5vZGVzLmZvcm1hdFtpXS52YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmFuZ2VQcmljZShlKSB7XHJcblx0XHRsZXQgZnJvbSA9IHRoaXMubm9kZXMuZnJvbS52YWx1ZSB8fCAwO1xyXG5cdFx0bGV0IHRvID0gdGhpcy5ub2Rlcy50by52YWx1ZSB8fCBJbmZpbml0eTtcclxuXHRcdHRoaXMucGFyYW1zWydmcm9tJ10gPSBmcm9tO1xyXG5cdFx0aWYgKGlzRmluaXRlKHRvKSkge1xyXG5cdFx0XHR0aGlzLnBhcmFtc1sndG8nXSA9IHRvO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2hlY2tDb25kaXRpb24oZSkge1xyXG5cdFx0bGV0IHF1ZXJ5U3RyaW5nID0gJyc7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZXMuY29uZGl0aW9uLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLm5vZGVzLmNvbmRpdGlvbltpXS5jaGVja2VkKSB7XHJcblx0XHRcdFx0cXVlcnlTdHJpbmcgKz0gdGhpcy5ub2Rlcy5jb25kaXRpb25baV0udmFsdWUgKyAnLCc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcuc2xpY2UoMCwgLTEpO1xyXG5cdFx0aWYgKHF1ZXJ5U3RyaW5nKSB7XHJcblx0XHRcdHRoaXMucGFyYW1zW3RoaXMubm9kZXMuY29uZGl0aW9uWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpXSA9IHF1ZXJ5U3RyaW5nO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGVsZXRlIHRoaXMucGFyYW1zW3RoaXMubm9kZXMuY29uZGl0aW9uWzBdLmdldEF0dHJpYnV0ZSgnbmFtZScpXTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNoZWNrU2hpcHBpbmcoZSkge1xyXG5cdFx0bGV0IHF1ZXJ5U3RyaW5nID0gJyc7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZXMuc2hpcHBpbmcubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0aWYgKHRoaXMubm9kZXMuc2hpcHBpbmdbaV0uY2hlY2tlZCkge1xyXG5cdFx0XHRcdHF1ZXJ5U3RyaW5nICs9IHRoaXMubm9kZXMuc2hpcHBpbmdbaV0udmFsdWUgKyAnLCc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcuc2xpY2UoMCwgLTEpO1xyXG5cdFx0aWYgKHF1ZXJ5U3RyaW5nKSB7XHJcblx0XHRcdHRoaXMucGFyYW1zW3RoaXMubm9kZXMuc2hpcHBpbmdbMF0uZ2V0QXR0cmlidXRlKCduYW1lJyldID0gcXVlcnlTdHJpbmc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5wYXJhbXNbdGhpcy5ub2Rlcy5zaGlwcGluZ1swXS5nZXRBdHRyaWJ1dGUoJ25hbWUnKV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRoYW5kbGVyQWxsKGUpIHtcclxuXHRcdHRoaXMuY2hlY2tGb3JtYXQoKTtcclxuXHRcdHRoaXMuY2hlY2tDb25kaXRpb24oKTtcclxuXHRcdHRoaXMuY2hlY2tTaGlwcGluZygpO1xyXG5cdFx0dGhpcy5yYW5nZVByaWNlKCk7XHJcblx0XHR0aGlzLnNlYXJjaCgpO1xyXG5cdFx0dGhpcy5zb3J0KCk7XHJcblx0XHR0aGlzLmNyZWF0ZVVSTCgpO1xyXG5cdH1cclxuXHJcblx0aGFuZGxlcihlKSB7XHJcblx0XHR0aGlzLnNlYXJjaCgpO1xyXG5cdFx0dGhpcy5jcmVhdGVVUkwoKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZVVSTCgpe1xyXG5cdFx0bGV0IHVybCA9ICcvc2VhcmNoPyc7XHJcblx0XHRmb3IgKGtleSBpbiB0aGlzLnBhcmFtcykge1xyXG5cdFx0XHRpZiAoa2V5ID09ICd1c2VycmVxdWVzdCcpIHtcclxuXHRcdFx0XHRsZXQgcmVxdWVzdHVybCA9IHRoaXMucGFyYW1zW2tleV0ucmVkdWNlKChzdW0sIGN1cnJlbnQpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBzdW0gKyBjdXJyZW50ICsgJywnO1xyXG5cdFx0XHRcdH0sICd1c2VycmVxdWVzdD0nKTtcclxuXHRcdFx0XHR1cmwgKz0gcmVxdWVzdHVybC5zbGljZSgwLCAtMSkgKyAnJic7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dXJsICs9IGtleSArICc9JyArIHRoaXMucGFyYW1zW2tleV0gKyAnJic7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdC8vIHVybCA9IGVuY29kZVVSSSh1cmwuc2xpY2UoMCwgLTEpKTtcclxuXHRcdHVybCA9IHVybC5zbGljZSgwLCAtMSk7XHJcblx0XHRjb25zb2xlLmxvZyh1cmwpO1xyXG5cdFx0bG9jYXRpb24uYXNzaWduKHVybCk7XHJcblx0fVxyXG59XHJcbmNsYXNzIE1hbmFnZXIge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHR0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xyXG5cdFx0dGhpcy5yZWdFeHBJZCA9IC9eXFwvaXRlbVxcZCskL2k7XHJcblx0XHR0aGlzLnJlZ1NlYXJjaCA9IC9eXFwvc2VhcmNoJC9pO1xyXG5cdFx0dGhpcy5wYXJhbXMgPSB7fTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0Y29uc29sZS5sb2coJ21hbmFnZXIgaW5pdCcpO1xyXG5cdH1cclxuXHRhc3luYyBpbml0KCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zdG9yYWdlLmluaXQoKTtcclxuXHRcdHRoaXMuZ2V0TG9naW5lZFVzZXIoKTtcclxuXHRcdHRoaXMuZ2V0UGF0aCgpO1xyXG5cdFx0dGhpcy5nZXRTZWFyY2hQYXJhbXMoKVxyXG5cdFx0dGhpcy5vbmxvYWRQYWdlKCk7XHJcblx0fVxyXG5cclxuXHRnZXRMb2dpbmVkVXNlcigpIHtcclxuXHRcdHRoaXMubG9naW5lZFVzZXIgPSB0aGlzLnN0b3JhZ2UuZ2V0TG9naW5lZFVzZXJGcm9tVGVtcFN0b3JhZ2UoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlbmRlckNvbnRhY3RzUGFnZSgpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2UtY29udGFjdHMuanNvbicpO1xyXG5cdFx0bGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21haW5fX2NvbnRhaW5lcicpWzBdKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlbmRlclJlZ2lzdHJhdGlvbigpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2UtcmVnaXN0cmF0aW9uLmpzb24nKTtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYWluX19jb250YWluZXInKVswXSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJIZWFkZXIoKSB7XHJcblx0XHRpZiAodGhpcy5sb2dpbmVkVXNlcil7XHJcblx0XHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2UtbmF2LWxlZnQtYXV0aC5qc29uJyk7XHJcblx0XHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdl9fbGVmdCcpWzBdKTtcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2X191c2VyLW5hbWUnKVswXS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy5sb2dpbmVkVXNlci5uYW1lKSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnanNvbi9wYWdlLW5hdi1sZWZ0LXVuYXV0aC5qc29uJyk7XHJcblx0XHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdl9fbGVmdCcpWzBdKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlbmRlckFkdmVydCgpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2UtdGV4dC5qc29uJyk7XHJcblx0XHRsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHRcdHJlbmRlckhUTUwoZGF0YSwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWFpbl9fY29udGFpbmVyJylbMF0pO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyUmVzdWx0KGFycikge1xyXG5cdFx0bGV0IHRlbXBsYXRlQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbVwiKTtcclxuXHRcdGxldCB0ZW1wbGF0ZSA9IF8udGVtcGxhdGUodGVtcGxhdGVDb250ZW50LmlubmVySFRNTCk7XHJcblx0XHRsZXQgcmVzdWx0ID0gYXJyLnJlZHVjZShmdW5jdGlvbihzdW0sIGN1cnJlbnQpIHtcclxuXHRcdFx0cmV0dXJuICB0ZW1wbGF0ZShjdXJyZW50KSArIHN1bTtcclxuXHRcdH0uYmluZCh0aGlzKSxcIlwiKTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXN1bHRfX2NvbnRhaW5lclwiKVswXS5pbm5lckhUTUwgPSByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRyZW5kZXJJdGVtUGFnZShvYmopIHtcclxuXHRcdGxldCB0ZW1wbGF0ZVBhZ2VJdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpdGVtLXBhZ2VcIik7XHJcblx0XHRsZXQgdGVtcGxhdGVJdGVtID0gXy50ZW1wbGF0ZSh0ZW1wbGF0ZVBhZ2VJdGVtLmlubmVySFRNTCk7XHJcblx0XHRsZXQgcmVzdWx0ID0gdGVtcGxhdGVJdGVtKG9iaik7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibWFpbl9fY29udGFpbmVyXCIpWzBdLmlubmVySFRNTCA9IHJlc3VsdDtcclxuXHRcdC8vZ2FsbGVyeVxyXG5cdFx0dmFyIHRlbXBsYXRlUGFnZUdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeS1pdGVtJyk7XHJcblx0XHR2YXIgdGVtcGxhdGVHYWxsYXJ5ID0gXy50ZW1wbGF0ZSh0ZW1wbGF0ZVBhZ2VHYWxsZXJ5LmlubmVySFRNTCk7XHJcblx0XHR2YXIgcmVzdWx0VUwgPSBvYmoucGljdHVyZXMucmVkdWNlKChzdW0sIGN1cnJlbnQpID0+IHtcclxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlR2FsbGFyeShjdXJyZW50KSArIHN1bTtcclxuXHRcdH0sXCJcIiApXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLXBhZ2VfX2xpc3QtaW1hZ2VzJylbMF0uaW5uZXJIVE1MID0gcmVzdWx0VUw7XHJcblx0fVxyXG5cclxuXHRhc3luYyByZW5kZXJNYWluUGFnZSgpIHtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgZ2V0SlNPTignanNvbi9wYWdlLWFzaWRlLXJlc3VsdC5qc29uJyk7XHJcblx0XHRyZW5kZXJIVE1MKGRhdGEsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21haW5fX2NvbnRhaW5lcicpWzBdKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHJlbmRlclNpZ25pbigpIHtcclxuXHRcdGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdqc29uL3BhZ2Utc2lnbmluLmpzb24nKTtcclxuXHRcdGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cdFx0cmVuZGVySFRNTChkYXRhLCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtYWluX19jb250YWluZXInKVswXSk7XHJcblx0fVxyXG5cclxuXHRnZXRQYXRoKCkge1xyXG5cdFx0dGhpcy5jdXJyZW50UGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcblx0fVxyXG5cclxuXHRnZXRTZWFyY2hQYXJhbXMoKSB7XHJcblx0XHR0aGlzLnNlYXJjaFBhcmFtcyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcblx0fVxyXG5cclxuXHRnZXRJdGVtSWRmcm9tUGF0aCgpIHtcclxuXHRcdGxldCByZWcgPSAvXlxcL2l0ZW0oXFxkKyQpL2k7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50UGF0aE5hbWUubWF0Y2gocmVnKVsxXTtcclxuXHR9XHJcblxyXG5cdHBhcnNlU2VhcmNoUGFyYW1zKCkge1xyXG5cdFx0Ly9sZXQgc3RyID1cdCcvc2VhcmNoP2NvbmRpdGlvbj1uZXcsdXNlZCZzaGlwcGluZz1mcmVlLGluc3RvcmUsbG9jYWwmZnJvbT00JmZvcm1hdD1idXlpdG5vdyZ1c2VycmVxdWVzdD1tYW1hK3BhcGEnO1xyXG5cdFx0bGV0IHN0ciA9IHRoaXMuc2VhcmNoUGFyYW1zO1xyXG5cdFx0aWYgKHN0cil7XHJcblx0XHRcdGxldCBwYXJhbXNTdHJpbmcgPSBzdHIuc2xpY2UoMSk7XHJcblx0XHRcdGxldCBlbGVtZW50cyA9IHBhcmFtc1N0cmluZy5zcGxpdCgnJicpO1xyXG5cdFx0XHRpZiAoZWxlbWVudHMubGVuZ3RoKXtcclxuXHRcdFx0XHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHRcdFx0dmFyIGtleVZhbHVlID0gZWxlbWVudC5zcGxpdCgnPScpO1xyXG5cdFx0XHRcdFx0dGhpcy5wYXJhbXNba2V5VmFsdWVbMF1dID0ga2V5VmFsdWVbMV07XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHQvL2NvbnNvbGUuZGlyKHRoaXMucGFyYW1zKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFzeW5jIG9ubG9hZFBhZ2UoKSB7XHJcblx0XHR0aGlzLnBhcnNlU2VhcmNoUGFyYW1zKCk7XHJcblx0XHRhd2FpdCB0aGlzLnJlbmRlckhlYWRlcigpO1xyXG5cdFx0Ly9yZW5kZXIgaXRlbSBieSBpZFxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFBhdGhOYW1lLm1hdGNoKHRoaXMucmVnRXhwSWQpKXtcclxuXHRcdFx0dGhpcy5yZW5kZXJJdGVtUGFnZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbUJ5SWQodGhpcy5nZXRJdGVtSWRmcm9tUGF0aCgpKSk7XHJcblx0XHRcdHRoaXMuaXRlbSA9IG5ldyBJdGVtKHRoaXMuc3RvcmFnZS5nZXRJdGVtQnlJZCh0aGlzLmdldEl0ZW1JZGZyb21QYXRoKCkpKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fSAvL3JlbmRlciBieSB1c2VyIGZpbHRlciBhbmQgcmVxdWVzdFxyXG5cdFx0aWYgKHRoaXMuY3VycmVudFBhdGhOYW1lLm1hdGNoKHRoaXMucmVnU2VhcmNoKSl7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdyZW5kZXIgYnkgcGFyYW1zJyk7XHJcblx0XHRcdGF3YWl0IHRoaXMucmVuZGVyTWFpblBhZ2UoKTtcclxuXHRcdFx0dGhpcy5yZW5kZXJSZXN1bHQodGhpcy5zdG9yYWdlLmdldEZpbHRlcmVkSXRlbXModGhpcy5wYXJhbXMpKTtcclxuXHRcdFx0dGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKHtvcHRpb246ICdhbGwnLCBwYXJhbXM6IHRoaXMucGFyYW1zfSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN3aXRjaCAodGhpcy5jdXJyZW50UGF0aE5hbWUpIHtcclxuXHRcdFx0XHRjYXNlICcvcmVnaXN0ZXInOlxyXG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5yZW5kZXJSZWdpc3RyYXRpb24oKTtcclxuXHRcdFx0XHRcdHRoaXMucmVnaXN0cmF0aW9uID0gbmV3IFJlZ2lzdHJhdGlvbih0aGlzLnN0b3JhZ2UuZ2V0VGVtcFN0b3JhZ2UoJ3VzZXJzJykpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9zaWduJzpcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVuZGVyU2lnbmluKCk7XHJcblx0XHRcdFx0XHR0aGlzLnNpZ25pbiA9IG5ldyBTaWduaW4odGhpcy5zdG9yYWdlLmdldFRlbXBTdG9yYWdlKCd1c2VycycpKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvY29udGFjdHMnOlxyXG5cdFx0XHRcdHRoaXMucmVuZGVyQ29udGFjdHNQYWdlKCk7XHJcblx0XHRcdFx0dGhpcy5maWx0ZXIgPSBuZXcgRmlsdGVyKCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAnL2FkdmVydCc6XHJcblx0XHRcdFx0dGhpcy5yZW5kZXJBZHZlcnQoKTtcclxuXHRcdFx0XHR0aGlzLmZpbHRlciA9IG5ldyBGaWx0ZXIoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvbG9nb3V0JzpcclxuXHRcdFx0XHRcdHRoaXMuc3RvcmFnZS5yZW1vdmVMb2dpbmVkVXNlckZyb21Mb2NhbFN0b3JhZ2UoKTtcclxuXHRcdFx0XHRcdGxvY2F0aW9uLmFzc2lnbignLycpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJy9zZWxsJzpcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdzZWxsJylcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlICcvJzpcclxuXHRcdFx0XHRhd2FpdCB0aGlzLnJlbmRlck1haW5QYWdlKCk7XHJcblx0XHRcdFx0Ly8gdGhpcy5yZW5kZXJSZXN1bHQodGhpcy5zdG9yYWdlLmdldFRlbXBTdG9yYWdlKCdpdGVtcycpKTtcclxuXHRcdFx0XHR0aGlzLnJlbmRlclJlc3VsdCh0aGlzLnN0b3JhZ2UuZ2V0SXRlbXNCeUF2YWlsYWJsZSgpKVxyXG5cdFx0XHRcdHRoaXMuZmlsdGVyID0gbmV3IEZpbHRlcih7b3B0aW9uOiAnYWxsJ30pXHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ3BhZ2Ugbm90IGZvdW5kJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHRfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XHJcblx0XHRldmFsdWF0ZSAgICA6IC9cXHtcXHsoW1xcc1xcU10rPylcXH1cXH0vZyxcclxuXHRcdGludGVycG9sYXRlIDogL1xce1xcez0oW1xcc1xcU10rPylcXH1cXH0vZyxcclxuXHRcdGVzY2FwZSAgICAgIDogL1xce1xcey0oW1xcc1xcU10rPylcXH1cXH0vZ1xyXG5cdH07XHJcblx0bGV0IG1hbmFnZXIgPSBuZXcgTWFuYWdlcigpO1xyXG59KTtcclxuY2xhc3MgU2lnbmlue1xyXG5cdGNvbnN0cnVjdG9yKHVzZXJzKXtcclxuXHRcdHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XHJcblx0XHR0aGlzLnVzZXJzID0gdXNlcnM7XHJcblx0XHR0aGlzLmVtYWlsUmVnRXhwID0gL14oW2EtejAtOV8tXStcXC4pKlthLXowLTlfLV0rQFthLXowLTlfLV0rKFxcLlthLXowLTlfLV0rKSpcXC5bYS16XXsyLDZ9JC9pO1xyXG5cdFx0dGhpcy5wYXNzUmVnRXhwID0gL15cXHd7Nix9JC87XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIGluaXQoKXtcclxuXHRcdGF3YWl0IHRoaXMuc3RvcmFnZS5pbml0KCk7XHJcblx0XHR0aGlzLmZpbmROb2RlcygpO1xyXG5cdFx0dGhpcy5iaW5kQWxsKCk7XHJcblx0XHR0aGlzLmFkZEV2ZW50cygpO1xyXG5cclxuXHR9XHJcblxyXG5cdGZpbmROb2Rlcygpe1xyXG5cdFx0dGhpcy5ub2RlcyA9IHtcclxuXHRcdFx0Zm9ybTogZG9jdW1lbnQuZm9ybXMuc2lnbmluLFxyXG5cdFx0XHRlbWFpbDogZG9jdW1lbnQuZm9ybXMuc2lnbmluLmVsZW1lbnRzLmVtYWlsLFxyXG5cdFx0XHRwYXNzOiBkb2N1bWVudC5mb3Jtcy5zaWduaW4uZWxlbWVudHMucGFzcyxcclxuXHRcdFx0c3VibWl0OiBkb2N1bWVudC5mb3Jtcy5zaWduaW4uZWxlbWVudHMuc3VibWl0LFxyXG5cdFx0XHR3YXJuaW5nOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzaWduaW5fX3dhcm5pbmcnKVswXVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWRkRXZlbnRzKCkge1xyXG5cdFx0dGhpcy5ub2Rlcy5zdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN1Ym1pdEZvcm0pXHJcblx0fVxyXG5cclxuXHRiaW5kQWxsKCkge1xyXG5cdFx0dGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRzdWJtaXRGb3JtKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bGV0IGZsYWcgPSB0cnVlO1xyXG5cdFx0dGhpcy5ub2Rlcy53YXJuaW5nLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0Ly9jaGVjayB2YWxpZCBlbWFpbFxyXG5cdFx0aWYgKCF0aGlzLmVtYWlsUmVnRXhwLnRlc3QodGhpcy5ub2Rlcy5lbWFpbC52YWx1ZSkpIHtcclxuXHRcdFx0dGhpcy5jcmVhdGVXYXJuaW5nTWVzc2FnZSgnZW1haWwnKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fSAvL2NoZWNrIHZhbGlkIHBhc3N3YXJkXHJcblx0XHRpZiAoIXRoaXMucGFzc1JlZ0V4cC50ZXN0KHRoaXMubm9kZXMucGFzcy52YWx1ZSkpIHtcclxuXHRcdFx0dGhpcy5jcmVhdGVXYXJuaW5nTWVzc2FnZSgncGFzc3dvcmQnKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGZsYWcpe1xyXG5cdFx0XHR0aGlzLmZpbmRVc2VyKHRoaXMubm9kZXMuZW1haWwudmFsdWUsIHRoaXMubm9kZXMucGFzcy52YWx1ZSlcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZpbmRVc2VyKGxvZ2luLCBwYXNzKXtcclxuXHRcdGxldCB1c2VyID0gdGhpcy51c2Vycy5maW5kKHVzZXIgPT4gdXNlci5sb2dpbiA9PT0gbG9naW4gJiYgdXNlci5wYXNzd29yZCA9PT0gcGFzcyApO1xyXG5cdFx0aWYgKCF1c2VyKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ3Vua25vd251c2VyJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnN1Y2Nlc3NMb2dpbih1c2VyKTtcclxuXHRcdFx0Ly9jb25zb2xlLmRpcih0aGlzLnN0b3JhZ2UuZ2V0TG9naW5lZFVzZXJGcm9tTG9jYWxTdG9yYWdlKCkpO1xyXG5cdFx0XHRsb2NhdGlvbi5hc3NpZ24oJy8nKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGFkZCB1c2VyIGxvZ2luZWQgdXNlciB0byBMb2NhbFN0b3JhZ2VcclxuXHRzdWNjZXNzTG9naW4odXNlcikge1xyXG5cdFx0dGhpcy5zdG9yYWdlLmFkZExvZ2luZWRVc2VydG9Mb2NhbFN0b3JhZ2UodXNlcik7XHJcblx0fVxyXG5cclxuXHRjcmVhdGVXYXJuaW5nTWVzc2FnZShlcnJvcm5hbWUpe1xyXG5cdFx0bGV0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcblx0XHRzd2l0Y2ggKGVycm9ybmFtZSl7XHJcblx0XHRcdGNhc2UgJ2VtYWlsJzpcclxuXHRcdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnWW91IGVudGVyZWQgaW5jb3JyZWN0IGVtYWlsJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncGFzc3dvcmQnOlxyXG5cdFx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdZb3UgZW50ZXJlZCBpbmNvcnJlY3QgcGFzczogNiBsZXR0ZXMgb3IgbnVtZXJzIG9yIF8nKSk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICd1bmtub3dudXNlcic6XHJcblx0XHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1Vua25vd24gdXNlcicpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6IGNvbnNvbGUubG9nKCdpbmNvcnJlY3QgZXJyb3IgbmFtZScpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5ub2Rlcy53YXJuaW5nLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG5cdH1cclxuIH1cclxuY2xhc3MgUmVnaXN0cmF0aW9ue1xyXG5cdGNvbnN0cnVjdG9yKHVzZXJzKXtcclxuXHRcdHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XHJcblx0XHR0aGlzLnVzZXJzID0gdXNlcnM7XHJcblx0XHR0aGlzLmVtYWlsUmVnRXhwID0gL14oW2EtejAtOV8tXStcXC4pKlthLXowLTlfLV0rQFthLXowLTlfLV0rKFxcLlthLXowLTlfLV0rKSpcXC5bYS16XXsyLDZ9JC9pO1xyXG5cdFx0dGhpcy5wYXNzUmVnRXhwID0gL15cXHd7Nix9JC87XHJcblx0XHR0aGlzLm5hbWVSZWdFeHA9IC9eW2EtetCwLdGP0ZFdezMsfSQvaTtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgaW5pdCgpe1xyXG5cdFx0YXdhaXQgdGhpcy5zdG9yYWdlLmluaXQoKTtcclxuXHRcdHRoaXMuZmluZE5vZGVzKCk7XHJcblx0XHR0aGlzLmJpbmRBbGwoKTtcclxuXHRcdHRoaXMuYWRkRXZlbnRzKCk7XHJcblxyXG5cdH1cclxuXHJcblx0ZmluZE5vZGVzKCl7XHJcblx0XHR0aGlzLm5vZGVzID0ge1xyXG5cdFx0XHRmb3JtOiBkb2N1bWVudC5mb3Jtcy5yZWdpc3RyYXRpb24sXHJcblx0XHRcdGVtYWlsOiBkb2N1bWVudC5mb3Jtcy5yZWdpc3RyYXRpb24uZWxlbWVudHMuZW1haWwsXHJcblx0XHRcdG5hbWU6IGRvY3VtZW50LmZvcm1zLnJlZ2lzdHJhdGlvbi5lbGVtZW50cy5uYW1lLFxyXG5cdFx0XHRwYXNzMDogZG9jdW1lbnQuZm9ybXMucmVnaXN0cmF0aW9uLmVsZW1lbnRzLnBhc3NbMF0sXHJcblx0XHRcdHBhc3MxOiBkb2N1bWVudC5mb3Jtcy5yZWdpc3RyYXRpb24uZWxlbWVudHMucGFzc1sxXSxcclxuXHRcdFx0c3VibWl0OiBkb2N1bWVudC5mb3Jtcy5yZWdpc3RyYXRpb24uZWxlbWVudHMuc3VibWl0LFxyXG5cdFx0XHR3YXJuaW5nOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZWdpc3RyYXRpb25fX3dhcm5pbmcnKVswXVxyXG5cdFx0fVxyXG5cdFx0Y29uc29sZS5kaXIodGhpcy5ub2Rlcyk7XHJcblx0fVxyXG5cclxuXHRhZGRFdmVudHMoKSB7XHJcblx0XHR0aGlzLm5vZGVzLnN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc3VibWl0Rm9ybSlcclxuXHR9XHJcblxyXG5cdGJpbmRBbGwoKSB7XHJcblx0XHR0aGlzLnN1Ym1pdEZvcm0gPSB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHN1Ym1pdEZvcm0oZSl7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRsZXQgZmxhZyA9IHRydWU7XHJcblx0XHR0aGlzLm5vZGVzLndhcm5pbmcuaW5uZXJIVE1MID0gJyc7XHJcblx0XHQvL2NoZWNrIHZhbGlkIGVtYWlsXHJcblx0XHRpZiAoIXRoaXMuZW1haWxSZWdFeHAudGVzdCh0aGlzLm5vZGVzLmVtYWlsLnZhbHVlKSkge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdlbWFpbCcpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHQvL2NoZWNrIHZhbGlkIHBhc3N3YXJkXHJcblx0XHRpZiAoIXRoaXMucGFzc1JlZ0V4cC50ZXN0KHRoaXMubm9kZXMucGFzczAudmFsdWUpIHx8ICF0aGlzLnBhc3NSZWdFeHAudGVzdCh0aGlzLm5vZGVzLnBhc3MxLnZhbHVlKSkge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVdhcm5pbmdNZXNzYWdlKCdwYXNzd29yZCcpO1xyXG5cdFx0XHRmbGFnID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHQvL2NoZWsgdmFsaWQgbmFtZVxyXG5cdFx0aWYgKCF0aGlzLm5hbWVSZWdFeHAudGVzdCh0aGlzLm5vZGVzLm5hbWUudmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ25hbWUnKTtcclxuXHRcdFx0ZmxhZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCFmbGFnKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmZpbmRVc2VyKHRoaXMubm9kZXMuZW1haWwudmFsdWUpKSB7XHJcblx0XHRcdHRoaXMuYWRkTmV3VXNlclRvTG9jYWxTdG9yYWdlKHRoaXMuY3JlYXRlVXNlcigpKTtcclxuXHRcdFx0dGhpcy5jcmVhdGVXYXJuaW5nTWVzc2FnZSgnb2snKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlV2FybmluZ01lc3NhZ2UoJ2V4aXN0Jyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVVc2VyKCl7XHJcblx0XHRsZXRcdG5ld1VzZXIgPSB7XHJcblx0XHRcdGxvZ2luOiB0aGlzLm5vZGVzLmVtYWlsLnZhbHVlLFxyXG5cdFx0XHRuYW1lOiB0aGlzLm5vZGVzLm5hbWUudmFsdWUsXHJcblx0XHRcdHBhc3N3b3JkOiB0aGlzLm5vZGVzLnBhc3MwLnZhbHVlLFxyXG5cdFx0XHRidXlpdGVtczogW10sXHJcblx0XHRcdHNlbGxpdGVtczogW11cclxuXHRcdH1cclxuXHRcdHJldHVybiBuZXdVc2VyO1xyXG5cdH1cclxuXHJcblx0YWRkTmV3VXNlclRvTG9jYWxTdG9yYWdlKHVzZXIpe1xyXG5cdFx0dGhpcy5zdG9yYWdlLmFkZE5ld1VzZXJ0b1RlbXBTdG9yYWdlKHVzZXIpXHJcblx0fVxyXG5cclxuXHRmaW5kVXNlcihsb2dpbil7XHJcblx0XHRsZXQgdXNlciA9IHRoaXMudXNlcnMuZmluZCh1c2VyID0+IHVzZXIubG9naW4gPT09IGxvZ2luKTtcclxuXHRcdGlmICh1c2VyKSB7XHJcblx0XHRcdC8vdGhpcyB1c2VyIGlzIGV4aXN0XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIHRoaXMgdXNlciBkb2Vzbid0IGV4aXN0IC0gZ28gb24gcmVnaXN0cmF0aW9uXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlV2FybmluZ01lc3NhZ2UoZXJyb3JuYW1lKXtcclxuXHRcdGxldCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cdFx0c3dpdGNoIChlcnJvcm5hbWUpe1xyXG5cdFx0XHRjYXNlICdlbWFpbCc6XHJcblx0XHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBlbnRlcmVkIGluY29ycmVjdCBlbWFpbCcpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Bhc3N3b3JkJzpcclxuXHRcdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnWW91IGVudGVyZWQgaW5jb3JyZWN0IHBhc3M6IDYgbGV0dGVzIG9yIG51bWVycyBvciBfIG9yIHRoZXkgYXJlIG5vdCBlcXVhbCBlYWNoIG90aGVyJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnbmFtZSc6XHJcblx0XHRcdFx0bWVzc2FnZS5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1lvdSBlbnRlcmQgaW5jb3JyZWN0IG5hbWU6IG9ubHkgbGV0dGVycyBhbmQgbWluIHNpemU9MycpKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ2V4aXN0JzpcclxuXHRcdFx0XHRtZXNzYWdlLmFwcGVuZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnVGhpcyB1c2VyIGhhdmUgYmVlbiBleGlzdGVkJykpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnb2snOlxyXG5cdFx0XHRcdG1lc3NhZ2UuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGBZb3UndmUgYmVlbiBqdXN0IHJlZ2lzdGVyZWQuIFNpZ24gaW4hYCkpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdFx0ZGVmYXVsdDogY29uc29sZS5sb2coJ2luY29ycmVjdCBlcnJvciBuYW1lJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLm5vZGVzLndhcm5pbmcuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XHJcblx0fVxyXG4gfVxyXG5jbGFzcyBJdGVtIHtcclxuXHRjb25zdHJ1Y3RvcihpdGVtKSB7XHJcblx0XHR0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xyXG5cdFx0dGhpcy5ub2RlcyA9IHt9O1xyXG5cdFx0dGhpcy5iaWRSZWdFeHAgPSAvXFxkKy9pO1xyXG5cdFx0dGhpcy5pdGVtID0gaXRlbTtcclxuXHRcdGNvbnNvbGUuZGlyKGl0ZW0pO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBpbml0KCl7XHJcblx0XHRhd2FpdCB0aGlzLnN0b3JhZ2UuaW5pdCgpO1xyXG5cdFx0dGhpcy5nZXRUeXBlSXRlbSgpO1xyXG5cdFx0dGhpcy5maW5kTm9kZXMoKTtcclxuXHRcdHRoaXMuYmluZEFsbCgpO1xyXG5cdFx0dGhpcy5hZGRFdmVudHMoKTtcclxuXHRcdHRoaXMuY2hlY2tSZXNlcnZlZCgpXHJcblx0fVxyXG5cclxuXHRmaW5kTm9kZXMoKSB7XHJcblx0XHRpZiAodGhpcy50eXBlID09ICdhdWN0aW9uJyl7XHJcblx0XHRcdHRoaXMubm9kZXMgPSB7XHJcblx0XHRcdFx0YmlkOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLXBhZ2VfX3N0YXJ0LWJpZC1pbnB1dCcpWzBdLFxyXG5cdFx0XHRcdGJpZHM6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2l0ZW0tcGFnZV9iaWRzLXZhbHVlJylbMF0sXHJcblx0XHRcdFx0cHJpY2U6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2l0ZW0tcGFnZV9fc3RhcnQtYmlkLXByaWNlJylbMF0sXHJcblx0XHRcdFx0YnV5QnRuOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLXBhZ2VfX2J0bi1iaWQnKVswXSxcclxuXHRcdFx0XHRzdGFydGJpZDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXRlbS1wYWdlX19zdGFydC1iaWQtcHJpY2UnKVswXSxcclxuXHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubm9kZXMgPSB7XHJcblx0XHRcdFx0YnV5QnRuOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpdGVtLXBhZ2UtYnV5JylbMF1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YmluZEFsbCgpe1xyXG5cdFx0dGhpcy5oYW5kbGVyID0gdGhpcy5oYW5kbGVyLmJpbmQodGhpcyk7XHJcblx0fVxyXG5cclxuXHRhZGRFdmVudHMoKSB7XHJcblx0XHR0aGlzLm5vZGVzLmJ1eUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlcik7XHJcblx0fVxyXG5cclxuXHRnZXRUeXBlSXRlbSgpe1xyXG5cdFx0aWYgKHRoaXMuaXRlbS5hdWN0aW9uKXtcclxuXHRcdFx0dGhpcy50eXBlID0gJ2F1Y3Rpb24nO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy50eXBlID0gJ2J1eWl0bm93JztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGhhbmRsZXIoZSl7XHJcblx0bGV0IHVzZXIgID0gdGhpcy5zdG9yYWdlLmdldExvZ2luZWRVc2VyRnJvbVRlbXBTdG9yYWdlKCk7XHJcblx0XHRpZih1c2VyKXtcclxuXHRcdFx0aWYgKHRoaXMudHlwZSA9PSAnYnV5aXRub3cnKXtcclxuXHRcdFx0XHQvL3NhdmUgaWQgb2YgaXRlbSB0byB1c2VyXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9MDsgaSA8IHRoaXMuc3RvcmFnZS50ZW1wVXNlcnMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RvcmFnZS50ZW1wVXNlcnNbaV0ubG9naW4gPT0gdXNlci5sb2dpbil7XHJcblx0XHRcdFx0XHRcdHRoaXMuc3RvcmFnZS50ZW1wVXNlcnNbaV0uYnV5aXRlbXMucHVzaCh0aGlzLml0ZW0uaWRfaXRlbSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIHJlc2VydmUgaXRlbVxyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdG9yYWdlLnRlbXBJdGVtcy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5zdG9yYWdlLnRlbXBJdGVtc1tpXS5pZF9pdGVtID09IHRoaXMuaXRlbS5pZF9pdGVtKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5zdG9yYWdlLnRlbXBJdGVtc1tpXS5yZXNlcnZlZCA9IHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnNvbGUuZGlyKFx0dGhpcy5zdG9yYWdlLnRlbXBVc2Vycyk7XHJcblx0XHRcdFx0Y29uc29sZS5kaXIoXHR0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zKTtcclxuXHRcdFx0XHR0aGlzLnN0b3JhZ2UudXBkYXRlQWxsTG9jYWxTdG9yYWdlKCk7XHJcblx0XHRcdFx0bG9jYXRpb24uYXNzaWduKGAvaXRlbSR7dGhpcy5pdGVtLmlkX2l0ZW19YCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKCB0aGlzLmNoZWNrQmlkKCkpIHtcclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPTA7IGkgPCB0aGlzLnN0b3JhZ2UudGVtcFVzZXJzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuc3RvcmFnZS50ZW1wVXNlcnNbaV0ubG9naW4gPT0gdXNlci5sb2dpbil7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zdG9yYWdlLnRlbXBVc2Vyc1tpXS5idXlpdGVtcy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0XHRcdFwiaXRlbVwiOiB0aGlzLml0ZW0uaWRfaXRlbSxcclxuXHRcdFx0XHRcdFx0XHRcdFwibXliaWRcIjogcGFyc2VJbnQodGhpcy5ub2Rlcy5iaWQudmFsdWUpICsgJy4wMCdcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuc3RvcmFnZS50ZW1wSXRlbXNbaV0uaWRfaXRlbSA9PSB0aGlzLml0ZW0uaWRfaXRlbSl7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zdG9yYWdlLnRlbXBJdGVtc1tpXS5wcmljZSA9IHBhcnNlSW50KHRoaXMubm9kZXMuYmlkLnZhbHVlKSArICcuMDAnO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc3RvcmFnZS50ZW1wSXRlbXNbaV0uYmlkcyA9ICt0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zW2ldLmJpZHMgKyAxO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25zb2xlLmRpcihcdHRoaXMuc3RvcmFnZS50ZW1wVXNlcnMpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5kaXIoXHR0aGlzLnN0b3JhZ2UudGVtcEl0ZW1zKTtcclxuXHRcdFx0XHRcdHRoaXMuc3RvcmFnZS51cGRhdGVBbGxMb2NhbFN0b3JhZ2UoKTtcclxuXHRcdFx0XHRcdHRoaXMuY2hhbmdlVGV4dEJ0bigpO1xyXG5cdFx0XHRcdFx0dGhpcy5jaGFuZ2VJbmZvQWJvdXRJdGVtKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsb2NhdGlvbi5hc3NpZ24oJy9zaWduJyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjaGVja0JpZCgpe1xyXG5cdFx0aWYgKHRoaXMuYmlkUmVnRXhwLnRlc3QodGhpcy5ub2Rlcy5iaWQudmFsdWUpICYmIHRoaXMubm9kZXMuYmlkLnZhbHVlID4gdGhpcy5pdGVtLnByaWNlKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YWxlcnQoJ1lvdSBlbnRlcmVkIGluY29ycmVjdCBiaWQnKTtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0Y2hhbmdlVGV4dEJ0bigpe1xyXG5cdFx0dGhpcy5ub2Rlcy5idXlCdG4udmFsdWUgPSBcIkJvdWdodCFcIjtcclxuXHRcdHRoaXMubm9kZXMuYnV5QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGNoYW5nZUluZm9BYm91dEl0ZW0oKSB7XHJcblx0XHR0aGlzLm5vZGVzLnByaWNlLmlubmVySFRNTCA9IHRoaXMubm9kZXMuYmlkLnZhbHVlICsgJy4wMCcgO1xyXG5cdFx0dGhpcy5ub2Rlcy5iaWRzLmlubmVySFRNTCA9ICt0aGlzLml0ZW0uYmlkcyArIDE7XHJcblx0fVxyXG5cclxuXHRjaGVja1Jlc2VydmVkKCkge1xyXG5cdFx0aWYgKHRoaXMuaXRlbS5yZXNlcnZlZCA9PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuY2hhbmdlVGV4dEJ0bigpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0iXSwiZmlsZSI6Im1haW4uanMifQ==

//# sourceMappingURL=main.js.map
