(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[5],{102:function(e,r,n){"use strict";n.r(r);var t=n(0),a=n.n(t),o=n(12),u=n(99),i=n.n(u),c=function(e){var r=[];for(var n in e.ingredients)r.push({name:n,amount:e.ingredients[n]});var t=r.map((function(e){return a.a.createElement("span",{key:e.name},e.name,"(",e.amount,")")}));return a.a.createElement("div",{className:i.a.order},a.a.createElement("p",null,"Ingredients: ",t),a.a.createElement("p",null,"Price: ",a.a.createElement("strong",null,"USD",e.price)))},l=n(40),d=n(41),s=n(17),m=n(13);r.default=Object(o.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,error:e.order.error,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(r,n){return e(m.e(r,n))}}}))(Object(d.a)((function(e){var r=e.token,n=e.userId,o=e.onFetchOrders,u=e.error,i=e.orders,d=e.loading;Object(t.useEffect)((function(){o(r,n)}),[r,n,o]);var s=u?a.a.createElement("p",null," Unable to retrieve orders!!"):a.a.createElement(l.a,null);return i&&(s=i.map((function(e){return a.a.createElement(c,{key:e.id,ingredients:e.ingredients,price:e.price})}))),d&&(s=a.a.createElement(l.a,null)),a.a.createElement("div",null,s)}),s.a))},99:function(e,r,n){e.exports={order:"order_order__2zviv"}}}]);
//# sourceMappingURL=5.d72b938b.chunk.js.map