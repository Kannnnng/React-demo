webpackJsonp([1],{1055:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(336),r=n(1063);n.d(t,"testAction",function(){return a});var a=n.i(o.a)("TEST_ACTION",r.a)},1056:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),s=n(244),u=n(548),l=(n.n(u),n(291)),p=n(411),f=n(1064),b=n(1062),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),A={},d=n.i(f.a)(A),h=n.i(u.getMuiTheme)({}),g=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),m(t,[{key:"render",value:function(){return c.a.createElement(p.a,{store:d},c.a.createElement(l.a,{muiTheme:h},c.a.createElement(s.a,{basename:"/"},b.a)))}}]),t}(c.a.Component);t.a=g},1057:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),s=n(244),u=n(443),l=n.n(u),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),f=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),p(t,[{key:"render",value:function(){return c.a.createElement("div",{className:l.a.container},c.a.createElement("div",{className:l.a.centerBox},c.a.createElement("div",{className:l.a.title},c.a.createElement("div",{style:{textAlign:"center"}},c.a.createElement(s.c,{to:"/test"},"跳转至测试页")),c.a.createElement("div",{style:{textAlign:"center"}},c.a.createElement(s.c,{to:"/pro"},"跳转至个人主页")))))}}]),t}(c.a.Component);t.a=f},1058:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),s=n(330),u=n.n(s),l=n(444),p=n.n(l),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),b=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleOnAddHobby=function(){var e=n.state.hobbies;n.hobby.value&&e.push(n.hobby.value),n.setState({hobbies:e},function(){n.hobby.value=""})},n.handleOnClickliked=function(){n.setState({liked:n.state.liked+1})},n.state={liked:0,hobbies:["read","play games"]},n}return a(t,e),f(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.name,o=t.age,r=this.state,a=r.liked,i=r.hobbies;return c.a.createElement("div",{className:p.a.profileComponent},c.a.createElement("h1",null,"我的名字叫做",n),c.a.createElement("h1",null,"我今年",o,"岁了"),c.a.createElement("button",{onClick:this.handleOnClickliked},"给我点赞"),c.a.createElement("h2",null,"获得的赞：",a),c.a.createElement("h2",null,"我的爱好"),c.a.createElement("ul",null,i.map(function(e,t){return c.a.createElement("li",{key:t},e)})),c.a.createElement("input",{type:"text",ref:function(t){e.hobby=t}}),c.a.createElement("button",{onClick:this.handleOnAddHobby},"添加爱好"))}}]),t}(c.a.Component);b.propTypes={name:u.a.string,age:u.a.string},b.defaultProps={name:"闫守康",age:"23"},t.a=b},1059:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){return{message:e.test.get("message")}}function c(e){var t=g({},A);return{actions:n.i(f.a)(t,e)}}var s=n(0),u=n.n(s),l=n(330),p=n.n(l),f=n(165),b=n(411),m=n(291),A=n(1055),d=n(445),h=n.n(d),g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},y=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),E=function(e){function t(){var e,n,a,i;o(this,t);for(var c=arguments.length,s=Array(c),u=0;u<c;u++)s[u]=arguments[u];return n=a=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),a.handleOnClick=function(){a.props.actions.testAction(12345)},i=n,r(a,i)}return a(t,e),y(t,[{key:"render",value:function(){var e=this.props.message;return u.a.createElement("div",{className:h.a.divTest},"这是一段测试文本，点击按钮以后下面显示信息会发生变化",u.a.createElement("div",null,e),u.a.createElement("div",null,u.a.createElement(m.b,{icon:u.a.createElement(m.c,{className:"fa fa-heart"}),label:"点击我就会发送 action！",onTouchTap:this.handleOnClick,primary:!0})))}}]),t}(u.a.Component);E.propTypes={actions:p.a.object,message:p.a.string},t.a=n.i(b.b)(i,c)(E)},1060:function(e,t,n){"use strict";var o=n(962),r=(n.n(o),n(336)),a=n.i(o.Map)({message:"这是一段测试代码"});t.a=n.i(r.b)({TEST_ACTION:{next:function(e){return e.set("message","现在已经发出 Action 了")},throw:function(e){return e}}},a)},1061:function(e,t,n){"use strict";var o=n(963),r=(n.n(o),n(165)),a=n(1060),i={routing:o.routerReducer,test:a.a};t.a=n.i(r.c)(i)},1062:function(e,t,n){"use strict";var o=n(0),r=n.n(o),a=n(244),i=n(1057),c=n(1058),s=n(1059),u=r.a.createElement("div",null,r.a.createElement(a.b,{path:"/",component:i.a,exact:!0,strict:!0}),r.a.createElement(a.b,{path:"/test",component:s.a,exact:!0,strict:!0}),r.a.createElement(a.b,{path:"/pro",component:c.a,exact:!0,strict:!0}));t.a=u},1063:function(e,t,n){"use strict";function o(e){return r.a.get("test?"+e).then(function(e){return e})}var r=n(1065);t.a=o},1064:function(e,t,n){"use strict";function o(e){return c(i.a,e)}var r=n(165),a=n(939),i=(n.n(a),n(1061)),c=(window.devToolsExtension?window.devToolsExtension()(r.b):r.b,r.b);n.i(a.createLogger)({collapsed:!0});t.a=o},1065:function(e,t,n){"use strict";function o(e,t){return u.get(e,t).then(function(e){return e.data}).catch(function(e){console.log(e)})}function r(e,t,n){return u.post(e,t,n).then(function(e){return e.data}).catch(function(e){console.log(e)})}function a(e,t,n){return u.put(e,t,n).then(function(e){return e.data}).catch(function(e){console.log(e)})}function i(e,t){return u.delete(e,t).then(function(e){return e.data}).catch(function(e){console.log(e)})}var c=n(424),s=n.n(c),u=s.a.create({baseURL:"/api/",timeout:1e3,headers:{"X-Custom-Header":"foobar","X-Requested-With":"XMLHttpRequest"}});t.a={get:o,post:r,put:a,delete:i}},1066:function(e,t,n){n(419),n(258),e.exports=n(420)},258:function(e,t,n){var o=n(585);"string"==typeof o&&(o=[[e.i,o,""]]);n(117)(o,{});o.locals&&(e.exports=o.locals)},420:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(446),r=(n.n(o),n(0)),a=n.n(r),i=n(22),c=n.n(i),s=n(697),u=n.n(s),l=n(931),p=(n.n(l),n(1056)),f=n(258);n.n(f);u()();c.a.render(a.a.createElement(p.a,null),document.getElementById("app"))},443:function(e,t,n){var o=n(582);"string"==typeof o&&(o=[[e.i,o,""]]);n(117)(o,{});o.locals&&(e.exports=o.locals)},444:function(e,t,n){var o=n(583);"string"==typeof o&&(o=[[e.i,o,""]]);n(117)(o,{});o.locals&&(e.exports=o.locals)},445:function(e,t,n){var o=n(584);"string"==typeof o&&(o=[[e.i,o,""]]);n(117)(o,{});o.locals&&(e.exports=o.locals)},582:function(e,t,n){t=e.exports=n(123)(!0),t.push([e.i,".container_0ab83 {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-image: url("+n(590)+");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  overflow-x: hidden; }\n\n.centerBox_ed805 {\n  width: 200px;\n  height: 100px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-top: -50px;\n  margin-left: -100px; }\n\n.title_bc2be {\n  color: #FFF;\n  font-size: 16px; }\n","",{version:3,sources:["/Users/kang/Documents/Project/React-demo/app/containers/Home/index.scss"],names:[],mappings:"AAAA;EACE,mBAAmB;EACnB,OAAO;EACP,SAAS;EACT,UAAU;EACV,QAAQ;EACR,gDAA+C;EAC/C,4BAA4B;EAC5B,6BAA6B;EAC7B,uBAAuB;EACvB,mBAAmB,EAAE;;AAEvB;EACE,aAAa;EACb,cAAc;EACd,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,kBAAkB;EAClB,oBAAoB,EAAE;;AAExB;EACE,YAAY;EACZ,gBAAgB,EAAE",file:"index.scss",sourcesContent:['.container {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-image: url("images/background.jpg");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  overflow-x: hidden; }\n\n.centerBox {\n  width: 200px;\n  height: 100px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-top: -50px;\n  margin-left: -100px; }\n\n.title {\n  color: #FFF;\n  font-size: 16px; }\n'],sourceRoot:""}]),t.locals={container:"container_0ab83",centerBox:"centerBox_ed805",title:"title_bc2be"}},583:function(e,t,n){t=e.exports=n(123)(!0),t.push([e.i,".profileComponent_2ae23 {\n  font-size: 32px; }\n","",{version:3,sources:["/Users/kang/Documents/Project/React-demo/app/containers/Profile/index.scss"],names:[],mappings:"AAAA;EACE,gBAAgB,EAAE",file:"index.scss",sourcesContent:[".profileComponent {\n  font-size: 32px; }\n"],sourceRoot:""}]),t.locals={profileComponent:"profileComponent_2ae23"}},584:function(e,t,n){t=e.exports=n(123)(!0),t.push([e.i,".divTest_4ff18 {\n  color: red; }\n","",{version:3,sources:["/Users/kang/Documents/Project/React-demo/app/containers/Test/index.scss"],names:[],mappings:"AAAA;EACE,WAAW,EAAE",file:"index.scss",sourcesContent:[".divTest {\n  color: red; }\n"],sourceRoot:""}]),t.locals={divTest:"divTest_4ff18"}},585:function(e,t,n){t=e.exports=n(123)(!0),t.push([e.i,"/* 撑满页面 */\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n}\n","",{version:3,sources:["/Users/kang/Documents/Project/React-demo/app/index.css"],names:[],mappings:"AAAA,UAAU;AACV;;EAEE,UAAU;EACV,WAAW;CACZ",file:"index.css",sourcesContent:["/* 撑满页面 */\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n}\n"],sourceRoot:""}])},590:function(e,t,n){e.exports=n.p+"0b94918fb3c4f9a793234131cfc870ab.jpg"}},[1066]);