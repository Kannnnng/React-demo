webpackJsonp([4],{294:function(e,t){e.exports={profileComponent:"a2740"}},379:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,l,i=n(72),o=n.n(i),r=n(43),u=n.n(r),s=n(73),c=n.n(s),h=n(74),b=n.n(h),d=n(75),p=n.n(d),m=n(1),f=n.n(m),k=n(2),y=n.n(k),v=n(294),E=n.n(v),C=(l=a=function(e){function t(e){u()(this,t);var n=b()(this,(t.__proto__||o()(t)).call(this,e));return n.handleOnAddHobby=function(){var e=n.state.hobbies;n.hobby.value&&e.push(n.hobby.value),n.setState({hobbies:e},function(){n.hobby.value=""})},n.handleOnClickliked=function(){n.setState({liked:n.state.liked+1})},n.state={liked:0,hobbies:["read","play games"]},n}return p()(t,e),c()(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.name,a=t.age,l=this.state,i=l.liked,o=l.hobbies;return f.a.createElement("div",{className:E.a.profileComponent},f.a.createElement("h1",null,"我的名字叫做",n),f.a.createElement("h1",null,"我今年",a,"岁了"),f.a.createElement("button",{onClick:this.handleOnClickliked},"给我点赞"),f.a.createElement("h2",null,"获得的赞：",i),f.a.createElement("h2",null,"我的爱好"),f.a.createElement("ul",null,o.map(function(e,t){return f.a.createElement("li",{key:t},e)})),f.a.createElement("input",{type:"text",ref:function(t){e.hobby=t}}),f.a.createElement("button",{onClick:this.handleOnAddHobby},"添加爱好"))}}]),t}(f.a.Component),a.propTypes={name:y.a.string,age:y.a.string},a.defaultProps={name:"闫守康",age:"23"},l);t.default=C}});