(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{58:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a(0),s=a.n(c),r=a(29),o=a.n(r),i=a(10),l=a(11),h=a(13),d=a(12),u=(a(24),a(9)),b=a.n(u),j=a(18),p=a(26),f=a(16),O=a(7),x=a(6),m=a(14),v="http://"+window.location.host;function g(e,t){return k.apply(this,arguments)}function k(){return(k=Object(j.a)(b.a.mark((function e(t,a){var n,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(v,"/api/").concat(t),{method:"GET",mode:"cors"});case 2:return n=e.sent,e.next=5,n.text();case 5:c=e.sent,n.ok&&a("true"===c);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){console.log("Calling matrix API ".concat(e));var t=fetch("".concat(v,"/api/").concat(e),{method:"GET",mode:"cors"});console.log("Response",t.ok)}function C(){return(C=Object(j.a)(b.a.mark((function e(t){var a,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(v,"/api/version"),{method:"GET",mode:"cors"});case 2:return a=e.sent,e.next=5,a.text();case 5:n=e.sent,t(n);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var y=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleSwitch=function(e,t,a){var c=n.state[a];console.log("handle switch",c),c?(console.log("Turn off",t),w(t)):(console.log("Turn on",e),w(e)),n.setState((function(e){return Object(p.a)({},a,!e[a])}))},n.state={screen:!1,webboard:!1},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=Object(j.a)(b.a.mark((function e(){var t=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g("status",(function(e){t.setState({screen:e})}));case 2:return e.next=4,g("webboardstatus",(function(e){t.setState({webboard:e})}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(n.jsx)(f.a,{fluid:!0,children:Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsxs)(x.a,{children:[Object(n.jsx)(m.a.Switch,{id:"screen",label:"Screen On/Off",checked:this.state.screen,onChange:function(){return e.handleSwitch("screenon","screenoff","screen")}}),Object(n.jsx)(m.a.Switch,{id:"webboard",label:"Web Board On/Off",checked:this.state.webboard,onChange:function(){return e.handleSwitch("webboardon","webboardoff","webboard")}})]})})})}}]),a}(s.a.Component),S=a(20),N=a.p+"static/media/nhllogo.ba9e188b.jpeg",E=a.p+"static/media/mlb.c8036288.png",A=a.p+"static/media/ncaam.2b001451.png",T=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleSwitch=function(e,t,a){var c=n.state[a];console.log("handle switch",c),c?(console.log("Turn off",t),w(t)):(console.log("Turn on",e),w(e)),n.setState((function(e){return Object(p.a)({},a,!e[a])}))},n.state={enabled:!1,hideFavorite:!1,stickyFavorite:!1,stats:!1},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=Object(j.a)(b.a.mark((function e(){var t=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g("".concat(this.props.sport,"/status"),(function(e){t.setState({enabled:e})}));case 2:return e.next=4,g("".concat(this.props.sport,"/stats/status"),(function(e){t.setState({stats:e})}));case 4:return e.next=6,g("".concat(this.props.sport,"/favoritescorestatus"),(function(e){t.setState({hideFavorite:e})}));case 6:return e.next=8,g("".concat(this.props.sport,"/favoritestickystatus"),(function(e){t.setState({stickyFavorite:e})}));case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"logosrc",value:function(){return"nhl"==this.props.sport?N:"ncaam"==this.props.sport?A:E}},{key:"render",value:function(){var e=this;return Object(n.jsxs)(f.a,{fluid:!0,children:[Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(S.a,{src:this.logosrc(),style:{height:"100px",width:"auto"},fluid:!0})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"enabler",label:"Enable/Disable",checked:this.state.enabled,onChange:function(){return e.handleSwitch("".concat(e.props.sport,"/enable"),"".concat(e.props.sport,"/disable"),"enabled")}})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"stats",label:"Stats",checked:this.state.stats,onChange:function(){return e.handleSwitch("".concat(e.props.sport,"/stats/enable"),"".concat(e.props.sport,"/stats/disable"),"stats")}})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"favscore",label:"Hide Favorite Scores",checked:this.state.hideFavorite,onChange:function(){return e.handleSwitch("".concat(e.props.sport,"/hidefavoritescore"),"".concat(e.props.sport,"/showfavoritescore"),"hideFavorite")}})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"favscore",label:"Stick Favorite Live Games",checked:this.state.stickyFavorite,onChange:function(){return e.handleSwitch("".concat(e.props.sport,"/favoritesticky"),"".concat(e.props.sport,"/favoriteunstick"),"stickyFavorite")}})})})]})}}]),a}(s.a.Component),Q=a.p+"static/media/pga.f4df3969.png",I=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleSwitch=function(e,t,a){var c=n.state[a];console.log("handle switch",c),c?(console.log("Turn off",t),w(t)):(console.log("Turn on",e),w(e)),n.setState((function(e){return Object(p.a)({},a,!e[a])}))},n.state={stats:!1},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=Object(j.a)(b.a.mark((function e(){var t=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g("pga/stats/status",(function(e){t.setState({stats:e})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"logosrc",value:function(){return Q}},{key:"render",value:function(){var e=this;return Object(n.jsxs)(f.a,{fluid:!0,children:[Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(S.a,{src:this.logosrc(),style:{height:"100px",width:"auto"},fluid:!0})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"stats",label:"Enable/Disable",checked:this.state.stats,onChange:function(){return e.handleSwitch("pga/stats/enable","pga/stats/disable","stats")}})})})]})}}]),a}(s.a.Component),U=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleSwitch=function(e,t,a){var c=n.state[a];console.log("handle switch",c),c?(console.log("Turn off",t),w(t)):(console.log("Turn on",e),w(e)),n.setState((function(e){return Object(p.a)({},a,!e[a])}))},n.state={enabled:!1,memcache:!1,diskcache:!1},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=Object(j.a)(b.a.mark((function e(){var t=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g("img/status",(function(e){t.setState({enabled:e})}));case 2:return e.next=4,g("img/memcachestatus",(function(e){t.setState({memcache:e})}));case 4:return e.next=6,g("img/diskcachestatus",(function(e){t.setState({diskcache:e})}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(n.jsxs)(f.a,{fluid:!0,children:[Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(S.a,{src:"data:image/png;base64,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",style:{height:"100px",width:"auto"},fluid:!0})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"enabler",label:"Enable/Disable",checked:this.state.enabled,onChange:function(){return e.handleSwitch("img/enable","img/disable","enabled")}})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"mem",label:"Enable Memory Cache",checked:this.state.memcache,onChange:function(){return e.handleSwitch("img/enablememcache","img/disablememcache","memcache")}})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"disk",label:"Enable Disk Cache",checked:this.state.diskcache,onChange:function(){return e.handleSwitch("img/enablediskcache","img/disablediskcache","diskcache")}})})})]})}}]),a}(s.a.Component),L="http://"+window.location.host,G=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleSwitch=function(){n.state.disablerChecked?(console.log("disabling board"),n.callmatrix("disable")):(console.log("enabling board"),n.callmatrix("enable")),n.setState({disablerChecked:!n.state.disablerChecked})},n.state={disablerChecked:!1},n}return Object(l.a)(a,[{key:"callmatrix",value:function(e){console.log("Calling matrix Image Board /clock/".concat(e)),fetch("".concat(L,"/api/clock/").concat(e),{method:"GET",mode:"cors"})}},{key:"componentDidMount",value:function(){var e=Object(j.a)(b.a.mark((function e(){var t,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(L,"/api/clock/status"),{method:"GET",mode:"cors"});case 2:return t=e.sent,e.next=5,t.text();case 5:a=e.sent,t.ok&&("true"===a?(console.log("board is enabled",a),this.setState({disablerChecked:!0})):(console.log("board is disabled",a),this.setState({disablerChecked:!1})));case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(n.jsxs)(f.a,{fluid:!0,children:[Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(S.a,{src:"data:image/png;base64,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",style:{height:"100px",width:"auto"},fluid:!0})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"enabler",label:"Enable/Disable",checked:this.state.disablerChecked,onChange:this.handleSwitch})})})]})}}]),a}(s.a.Component),M="http://"+window.location.host,W=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={t:Date.now()},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;document.body.style.backgroundColor="black",this.interval=setInterval((function(){return e.setState({t:Date.now()})}),2e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval),fetch("".concat(M,"/api/imgcanvas/disable"),{method:"GET",mode:"cors"}),document.body.style.backgroundColor="white"}},{key:"render",value:function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("div",{style:{backgroundColor:"black"}}),Object(n.jsx)(f.a,{fluid:!0,children:Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(S.a,{src:"".concat(M,"/api/imgcanvas/board?").concat(this.state.t),style:{height:"auto",width:"auto"},name:this.state.t,fluid:!0})})})})]})}}]),a}(s.a.Component),H=a.p+"static/media/server.53a70363.png",X="http://"+window.location.host,D=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleSwitch=function(){n.state.disablerChecked?(console.log("disabling board"),n.callmatrix("disable")):(console.log("enabling board"),n.callmatrix("enable")),n.setState({disablerChecked:!n.state.disablerChecked})},n.state={disablerChecked:!1},n}return Object(l.a)(a,[{key:"callmatrix",value:function(e){console.log("Calling matrix Sys Board /clock/".concat(e)),fetch("".concat(X,"/api/sys/").concat(e),{method:"GET",mode:"cors"})}},{key:"componentDidMount",value:function(){var e=Object(j.a)(b.a.mark((function e(){var t,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(X,"/api/sys/status"),{method:"GET",mode:"cors"});case 2:return t=e.sent,e.next=5,t.text();case 5:a=e.sent,t.ok&&("true"===a?(console.log("board is enabled",a),this.setState({disablerChecked:!0})):(console.log("board is disabled",a),this.setState({disablerChecked:!1})));case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(n.jsxs)(f.a,{fluid:!0,children:[Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(S.a,{src:H,style:{height:"100px",width:"auto"},fluid:!0})})}),Object(n.jsx)(O.a,{className:"text-center",children:Object(n.jsx)(x.a,{children:Object(n.jsx)(m.a.Switch,{id:"enabler",label:"Enable/Disable",checked:this.state.disablerChecked,onChange:this.handleSwitch})})})]})}}]),a}(s.a.Component),J=a(30),K=a(23),q=a(21),V=a(8),Z=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={version:""},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;""===this.state.version&&(console.log("fetching version"),function(e){C.apply(this,arguments)}((function(t){e.setState({version:t})})))}},{key:"render",value:function(){return Object(n.jsx)(f.a,{fluid:!0,children:Object(n.jsxs)(J.a,{expand:"sm",bg:"dark",variant:"dark",hidden:"/board"===this.props.location.pathname,children:[Object(n.jsx)(J.a.Brand,{children:"SportsMatrix"}),Object(n.jsx)(J.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(n.jsxs)(J.a.Collapse,{id:"basic-navbar-nav",children:[Object(n.jsxs)(K.a,{className:"mr-auto",children:[Object(n.jsx)(K.a.Link,{as:q.b,to:"/",children:"Home"}),Object(n.jsx)(K.a.Link,{as:q.b,to:"/nhl",children:"NHL"}),Object(n.jsx)(K.a.Link,{as:q.b,to:"/mlb",children:"MLB"}),Object(n.jsx)(K.a.Link,{as:q.b,to:"/pga",children:"PGA"}),Object(n.jsx)(K.a.Link,{as:q.b,to:"/ncaam",children:"NCAA Men Basketball"}),Object(n.jsx)(K.a.Link,{as:q.b,to:"/img",children:"Image Board"}),Object(n.jsx)(K.a.Link,{as:q.b,to:"/clock",children:"Clock"}),Object(n.jsx)(K.a.Link,{as:q.b,to:"/sys",children:"System Info"}),Object(n.jsx)(K.a.Link,{as:q.b,to:"/board",children:"Live Board"})]}),Object(n.jsx)(J.a.Text,{children:this.state.version})]})]})})}}]),a}(s.a.Component),R=Object(V.e)(Z),F="http://"+window.location.host,Y=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"screenOn",value:function(){console.log("Turning screen on"),fetch("".concat(F,"/api/screenon"),{method:"GET",mode:"cors"})}},{key:"screenOff",value:function(){console.log("Turning screen off"),fetch("".concat(F,"/api/screenoff"),{method:"GET",mode:"cors"})}},{key:"render",value:function(){return Object(n.jsx)(n.Fragment,{children:Object(n.jsxs)(q.a,{children:[Object(n.jsx)(R,{}),Object(n.jsx)(V.a,{path:"/",exact:!0,component:y}),Object(n.jsx)(V.a,{path:"/nhl",render:function(){return Object(n.jsx)(T,{sport:"nhl"})}}),Object(n.jsx)(V.a,{path:"/mlb",render:function(){return Object(n.jsx)(T,{sport:"mlb"})}}),Object(n.jsx)(V.a,{path:"/pga",render:function(){return Object(n.jsx)(I,{})}}),Object(n.jsx)(V.a,{path:"/ncaam",render:function(){return Object(n.jsx)(T,{sport:"ncaam"})}}),Object(n.jsx)(V.a,{path:"/img",exact:!0,component:U}),Object(n.jsx)(V.a,{path:"/clock",exact:!0,component:G}),Object(n.jsx)(V.a,{path:"/sys",exact:!0,component:D}),Object(n.jsx)(V.a,{path:"/board",exact:!0,component:W})]})})}}]),a}(s.a.Component),B=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,60)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),s(e),r(e)}))};o.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(Y,{})}),document.getElementById("root")),B()}},[[58,1,2]]]);
//# sourceMappingURL=main.ce80497d.chunk.js.map