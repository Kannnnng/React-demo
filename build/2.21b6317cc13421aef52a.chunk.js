webpackJsonp([2],{527:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){for(var t=e,n=!1,o=0,r=0,a=t.length;r<a;r++)t[r]&&(r!==o&&(t[o]=t[r],t[r]=null),n||t[o-1]!==t[o]?o++:(t[o-1]+=t[o],t[o]=null,n=!0));return t}Object.defineProperty(t,"__esModule",{value:!0});var s=n(30),l=n.n(s),c=n(752),u=n.n(c),A=function(){function e(e,t){var n=[],o=!0,r=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(o=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{!o&&s.return&&s.return()}finally{if(r)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),p=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleOnClickReset=function(){n.setState({chessBoard:[2,null,2,null,2,null,null,null,2,null,2,null,2,null,2,4]})},n.handleOnKeyDown=function(e){var t=n.state.chessBoard,o=[],r=null;switch(e.code){case"ArrowUp":for(r=0;r<4;){var a=i([t[r],t[r+4],t[r+8],t[r+12]]),s=A(a,4);o[r]=s[0],o[r+4]=s[1],o[r+8]=s[2],o[r+12]=s[3],r++}break;case"ArrowDown":for(r=12;r<16;){var l=i([t[r],t[r-4],t[r-8],t[r-12]]),c=A(l,4);o[r]=c[0],o[r-4]=c[1],o[r-8]=c[2],o[r-12]=c[3],r++}break;case"ArrowLeft":for(r=0;r<13;){var u=i([t[r],t[r+1],t[r+2],t[r+3]]),f=A(u,4);o[r]=f[0],o[r+1]=f[1],o[r+2]=f[2],o[r+3]=f[3],r+=4}break;case"ArrowRight":for(r=3;r<16;){var p=i([t[r],t[r-1],t[r-2],t[r-3]]),d=A(p,4);o[r]=d[0],o[r-1]=d[1],o[r-2]=d[2],o[r-3]=d[3],r+=4}}var b=o.reduce(function(e,t,n){return t||e.push(n),e},[]);o[b[Math.round(Math.random()*b.length)]]=2,n.setState({chessBoard:o})},n.state={chessBoard:[2,null,2,null,2,null,null,null,2,null,2,null,2,null,2,4]},n}return a(t,e),f(t,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleOnKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleOnKeyDown)}},{key:"renderChessBoard",value:function(){return this.state.chessBoard.map(function(e,t){return l.a.createElement("div",{className:u.a.chessMan,key:t},l.a.createElement("div",{className:u.a.chessManText},e||""))})}},{key:"render",value:function(){return l.a.createElement("div",{className:u.a.container},l.a.createElement("button",{onClick:this.handleOnClickReset},"复原"),l.a.createElement("div",{className:u.a.box},this.renderChessBoard()))}}]),t}(l.a.Component);t.default=p},580:function(e,t,n){e.exports=n.p+"0b94918fb3c4f9a793234131cfc870ab.jpg"},745:function(e,t,n){t=e.exports=n(526)(!0),t.push([e.i,".e269e{position:absolute;top:0;right:0;bottom:0;left:0;background-image:url("+n(580)+");background-position:50%;background-repeat:no-repeat;background-size:cover;overflow-x:hidden}._4546e{width:410px;height:410px;position:absolute;top:50%;left:50%;margin-top:-205px;margin-left:-205px;overflow:hidden;border-radius:5px}._4546e,.bfb02{padding:5px;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#776e65}.bfb02{width:100px;height:100px;float:left}._48d1b{width:90px;height:90px;line-height:90px;text-align:center;font-size:45px;font-family:Raleway,Verdana,sans-serif;font-weight:700;background-color:#bbada0}","",{version:3,sources:["/Users/kang/Documents/Project/React-demo/app/containers/Game2048/styles.scss"],names:[],mappings:"AAAA,OAAW,kBAAkB,MAAM,QAAQ,SAAS,OAAO,+CAA4C,wBAAwB,4BAA4B,sBAAsB,iBAAiB,CAAC,QAAK,YAAY,aAAa,kBAAkB,QAAQ,SAAS,kBAAkB,mBAAmB,gBAAgB,iBAAiB,CAAC,eAAe,YAAY,8BAA8B,sBAAsB,wBAAwB,CAAC,OAAU,YAAY,aAAa,UAAU,CAAC,QAAc,WAAW,YAAY,iBAAiB,kBAAkB,eAAe,uCAAuC,gBAAgB,wBAAwB,CAAC",file:"styles.scss",sourcesContent:[".container{position:absolute;top:0;right:0;bottom:0;left:0;background-image:url(images/background.jpg);background-position:50%;background-repeat:no-repeat;background-size:cover;overflow-x:hidden}.box{width:410px;height:410px;position:absolute;top:50%;left:50%;margin-top:-205px;margin-left:-205px;overflow:hidden;border-radius:5px}.box,.chessMan{padding:5px;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#776e65}.chessMan{width:100px;height:100px;float:left}.chessManText{width:90px;height:90px;line-height:90px;text-align:center;font-size:45px;font-family:Raleway,Verdana,sans-serif;font-weight:700;background-color:#bbada0}"],sourceRoot:""}]),t.locals={container:"e269e",box:"_4546e",chessMan:"bfb02",chessManText:"_48d1b"}},752:function(e,t,n){var o=n(745);"string"==typeof o&&(o=[[e.i,o,""]]);n(525)(o,{});o.locals&&(e.exports=o.locals)}});