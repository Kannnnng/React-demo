webpackJsonp([3],{286:function(e,n,t){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var a=t(287),o=r(a),u=t(290),s=r(u);n.default=function(){function e(e,n){var t=[],r=!0,a=!1,o=void 0;try{for(var u,c=(0,s.default)(e);!(r=(u=c.next()).done)&&(t.push(u.value),!n||t.length!==n);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&c.return&&c.return()}finally{if(a)throw o}}return t}return function(n,t){if(Array.isArray(n))return n;if((0,o.default)(Object(n)))return e(n,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},287:function(e,n,t){e.exports={default:t(288),__esModule:!0}},288:function(e,n,t){t(82),t(47),e.exports=t(289)},289:function(e,n,t){var r=t(87),a=t(4)("iterator"),o=t(18);e.exports=t(3).isIterable=function(e){var n=Object(e);return void 0!==n[a]||"@@iterator"in n||o.hasOwnProperty(r(n))}},290:function(e,n,t){e.exports={default:t(291),__esModule:!0}},291:function(e,n,t){t(82),t(47),e.exports=t(292)},292:function(e,n,t){var r=t(12),a=t(86);e.exports=t(3).getIterator=function(e){var n=a(e);if("function"!=typeof n)throw TypeError(e+" is not iterable!");return r(n.call(e))}},293:function(e,n){e.exports={container:"e269e",box:"_4546e",chessMan:"bfb02",chessManText:"_48d1b"}},378:function(e,n,t){"use strict";function r(e){for(var n=!1,t=0,r=0,a=e.length;r<a;r++)e[r]&&(r!==t&&(e[t]=e[r],e[r]=null),n||e[t]!==e[t+1]?t++:(e[t]+=e[t+1],e[t+1]=null,n=!0));return e}Object.defineProperty(n,"__esModule",{value:!0}),t.d(n,"default",function(){return k});var a=t(286),o=t.n(a),u=t(72),s=t.n(u),c=t(43),i=t.n(c),l=t(73),f=t.n(l),d=t(74),h=t.n(d),v=t(75),p=t.n(v),y=t(1),m=t.n(y),w=t(293),b=t.n(w),_=Array(16).fill(null).map(function(){return Math.random()>.5?2:null}),k=function(e){function n(e){i()(this,n);var t=h()(this,(n.__proto__||s()(n)).call(this,e));return t.handleOnClickReset=function(){t.setState({chessBoard:_})},t.handleOnKeyDown=function(e){var n=t.state.chessBoard,a=[],u=null;switch(e.code){case"ArrowUp":for(u=0;u<4;){var s=r([n[u],n[u+4],n[u+8],n[u+12]]),c=o()(s,4);a[u]=c[0],a[u+4]=c[1],a[u+8]=c[2],a[u+12]=c[3],u++}break;case"ArrowDown":for(u=12;u<16;){var i=r([n[u],n[u-4],n[u-8],n[u-12]]),l=o()(i,4);a[u]=l[0],a[u-4]=l[1],a[u-8]=l[2],a[u-12]=l[3],u++}break;case"ArrowLeft":for(u=0;u<13;){var f=r([n[u],n[u+1],n[u+2],n[u+3]]),d=o()(f,4);a[u]=d[0],a[u+1]=d[1],a[u+2]=d[2],a[u+3]=d[3],u+=4}break;case"ArrowRight":for(u=3;u<16;){var h=r([n[u],n[u-1],n[u-2],n[u-3]]),v=o()(h,4);a[u]=v[0],a[u-1]=v[1],a[u-2]=v[2],a[u-3]=v[3],u+=4}}var p=a.reduce(function(e,n,t){return n||e.push(t),e},[]);a[p[Math.floor(Math.random()*p.length)]]=2,t.setState({chessBoard:a})},t.state={chessBoard:_},t}return p()(n,e),f()(n,[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.handleOnKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleOnKeyDown)}},{key:"renderChessBoard",value:function(){return this.state.chessBoard.map(function(e,n){return m.a.createElement("div",{className:b.a.chessMan,key:n},m.a.createElement("div",{className:b.a.chessManText},e||""))})}},{key:"render",value:function(){return m.a.createElement("div",{className:b.a.container},m.a.createElement("button",{onClick:this.handleOnClickReset},"复原"),m.a.createElement("div",{className:b.a.box},this.renderChessBoard()))}}]),n}(m.a.Component)}});