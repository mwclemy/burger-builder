(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[4],{101:function(e,t,n){"use strict";n.r(t);var a=n(24),i=n(5),l=n(6),u=n(8),r=n(7),o=n(0),c=n.n(o),s=n(16),p=n(3),d=n(95),h=n(33),m=n(41),v=n(99),g=n.n(v),f=n(17),b=n(4),E=function(e){Object(u.a)(n,e);var t=Object(r.a)(n);function n(){var e;Object(i.a)(this,n);for(var l=arguments.length,u=new Array(l),r=0;r<l;r++)u[r]=arguments[r];return(e=t.call.apply(t,[this].concat(u))).state={controls:{email:{elementType:"input",elementConfig:{type:"email",placeholder:"Your Email"},value:"",validation:{required:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",placeholder:"Your Password"},value:"",validation:{required:!0,minLength:6},valid:!1,touched:!1}},isSignUp:!0},e.inputChangedHandler=function(t,n){var i=Object(b.b)(e.state.controls,Object(a.a)({},n,Object(b.b)(e.state.controls[n],{value:t.target.value,valid:Object(b.a)(e.state.controls[n].value,e.state.controls[n].validation),touched:!0})));e.setState({controls:i})},e.switchAuthModeHandler=function(){e.setState((function(e){return{isSignUp:!e.isSignUp}}))},e.submitHandler=function(t){t.preventDefault(),e.props.onAuth(e.state.controls.email.value,e.state.controls.password.value,e.state.isSignUp)},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.props.building||"/checkout"!==this.props.authRedirectPath||this.props.onAuthRedirectPath("/")}},{key:"render",value:function(){var e=this,t=[];for(var n in this.state.controls)t.push({id:n,config:this.state.controls[n]});var a=t.map((function(t){return c.a.createElement(d.a,{key:t.id,elementType:t.config.elementType,elementConfig:t.config.elementConfig,value:t.config.value,shouldValidate:t.config.validation,valid:t.config.valid,touched:t.config.touched,changed:function(n){return e.inputChangedHandler(n,t.id)}})}));this.props.loading&&(a=c.a.createElement(m.a,null));var i=null;this.props.error&&(i=c.a.createElement("p",null,this.props.error.message));var l=null;return this.props.isAuthenticated&&(l=c.a.createElement(p.a,{to:this.props.authRedirectPath})),c.a.createElement("div",{className:g.a.auth},l,i,c.a.createElement("form",{onSubmit:this.submitHandler},a,c.a.createElement(h.a,{btnType:"success"},"SUBMIT")),c.a.createElement(h.a,{btnType:"danger",clicked:this.switchAuthModeHandler},"SWITCH TO ",this.state.isSignUp?"SIGN IN":"SIGN UP"))}}]),n}(o.Component);t.default=Object(s.b)((function(e){return{loading:e.auth.loading,error:e.auth.error,isAuthenticated:null!==e.auth.token,building:e.burgerBuilder.building,authRedirectPath:e.auth.authRedirectPath}}),(function(e){return{onAuth:function(t,n,a){return e(f.b(t,n,a))},onAuthRedirectPath:function(t){return e(f.j(t))}}}))(E)},95:function(e,t,n){"use strict";var a=n(0),i=n.n(a),l=n(96),u=n.n(l);t.a=function(e){var t=null,n=[u.a.inputElement];switch(!e.valid&&e.shouldValidate&&e.touched&&n.push(u.a.invalid),e.elementType){case"input":t=i.a.createElement("input",Object.assign({className:n.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":t=i.a.createElement("textarea",Object.assign({className:n.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":t=i.a.createElement("select",{className:n.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map((function(e){return i.a.createElement("option",{value:e.value,key:e.value},e.displayValue)})));break;default:t=i.a.createElement("input",Object.assign({className:n.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return i.a.createElement("div",{className:u.a.input},i.a.createElement("label",null,e.label),t)}},96:function(e,t,n){e.exports={input:"input_input__LuMtH",label:"input_label__1QbaT",inputElement:"input_inputElement__nYoeg",invalid:"input_invalid__10w9F"}},99:function(e,t,n){e.exports={auth:"auth_auth__3CCe0",input:"auth_input__2NybL"}}}]);
//# sourceMappingURL=4.f6ae9803.chunk.js.map