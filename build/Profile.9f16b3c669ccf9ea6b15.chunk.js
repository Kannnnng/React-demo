webpackJsonp([5],{373:function(e,t){e.exports={profileComponent:"a0258"}},427:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(100),l=n.n(a),i=n(59),o=n.n(i),r=n(99),u=n.n(r),s=n(101),c=n.n(s),h=n(102),b=n.n(h),d=n(0),p=n.n(d),m=n(1),f=n.n(m),k=n(373),y=n.n(k),v=function(e){function t(e){o()(this,t);var n=c()(this,(t.__proto__||l()(t)).call(this,e));return n.handleOnAddHobby=function(){var e=n.state.hobbies;n.hobby.value&&e.push(n.hobby.value),n.setState({hobbies:e},function(){n.hobby.value=""})},n.handleOnClickliked=function(){n.setState({liked:n.state.liked+1})},n.state={liked:0,hobbies:["read","play games"]},n}return b()(t,e),u()(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.name,a=t.age,l=this.state,i=l.liked,o=l.hobbies;return p.a.createElement("div",{className:y.a.profileComponent},p.a.createElement("h1",null,"我的名字叫做",n),p.a.createElement("h1",null,"我今年",a,"岁了"),p.a.createElement("button",{onClick:this.handleOnClickliked},"给我点赞"),p.a.createElement("h2",null,"获得的赞：",i),p.a.createElement("h2",null,"我的爱好"),p.a.createElement("ul",null,o.map(function(e,t){return p.a.createElement("li",{key:t},e)})),p.a.createElement("input",{type:"text",ref:function(t){e.hobby=t}}),p.a.createElement("button",{onClick:this.handleOnAddHobby},"添加爱好"))}}]),t}(p.a.Component);v.propTypes={name:f.a.string,age:f.a.string},v.defaultProps={name:"闫守康",age:"23"},t.default=v}});