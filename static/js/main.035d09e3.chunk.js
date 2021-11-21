(this.webpackJsonptodo13v2=this.webpackJsonptodo13v2||[]).push([[0],{116:function(t,e,n){"use strict";n.r(e);var i,c,a=n(0),o=n.n(a),r=n(24),s=n.n(r),l=(n(90),n(91),n(13)),d=n(158),u=n(165),j=n(154),f=n(2),O=o.a.memo((function(t){console.log("AddItemForm called");var e=Object(a.useState)(""),n=Object(l.a)(e,2),i=n[0],c=n[1],o=Object(a.useState)(null),r=Object(l.a)(o,2),s=r[0],O=r[1],b=function(){""!==i.trim()?(t.addItem(i),c("")):O("Title is required")};return Object(f.jsxs)("div",{children:[Object(f.jsx)(d.a,{variant:"outlined",error:!!s,value:i,onChange:function(t){c(t.currentTarget.value)},onKeyPress:function(t){null!==s&&O(null),13===t.charCode&&b()},label:"Title",helperText:s}),Object(f.jsx)(u.a,{color:"primary",onClick:b,children:Object(f.jsx)(j.a,{})})]})})),b=o.a.memo((function(t){console.log("EditableSpan called");var e=Object(a.useState)(!1),n=Object(l.a)(e,2),i=n[0],c=n[1],o=Object(a.useState)(t.value),r=Object(l.a)(o,2),s=r[0],u=r[1];return i?Object(f.jsx)(d.a,{value:s,onChange:function(t){u(t.currentTarget.value)},autoFocus:!0,onBlur:function(){c(!1),t.onChange(s)}}):Object(f.jsx)("span",{onDoubleClick:function(){c(!0),u(t.value)},children:t.value})})),T=n(162),h=n(155),k=n(160),v=n(75),p=n.n(v).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"cf750a83-7c21-4e27-915c-0dade0a73893"}}),g=function(){return p.get("todo-lists")},I=function(t){return p.post("todo-lists",{title:t})},m=function(t){return p.delete("todo-lists/".concat(t))},C=function(t,e){return p.put("todo-lists/".concat(t),{title:e})},x=function(t){return p.get("todo-lists/".concat(t,"/tasks"))},S=function(t,e){return p.delete("todo-lists/".concat(t,"/tasks/").concat(e))},E=function(t,e){return p.post("todo-lists/".concat(t,"/tasks"),{title:e})},D=function(t,e,n){return p.put("todo-lists/".concat(t,"/tasks/").concat(e),n)};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(i||(i={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(c||(c={}));var A=o.a.memo((function(t){var e=Object(a.useCallback)((function(){return t.removeTask(t.task.id,t.todolistId)}),[t.task.id,t.todolistId]),n=Object(a.useCallback)((function(e){var n=e.currentTarget.checked;t.changeTaskStatus(t.task.id,n?i.Completed:i.New,t.todolistId)}),[t.task.id,t.todolistId]),c=Object(a.useCallback)((function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}),[t.task.id,t.todolistId]);return Object(f.jsxs)("div",{className:t.task.status===i.Completed?"is-done":"",children:[Object(f.jsx)(k.a,{checked:t.task.status===i.Completed,color:"primary",onChange:n}),Object(f.jsx)(b,{value:t.task.title,onChange:c}),Object(f.jsx)(u.a,{onClick:e,children:Object(f.jsx)(h.a,{})})]},t.task.id)})),y=n(27),L=n(5),w=n(14),F=n(16),N={},K=o.a.memo((function(t){var e=Object(y.b)();Object(a.useEffect)((function(){var n;e((n=t.id,function(t){x(n).then((function(e){t(function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}}(e.data.items,n))}))}))}),[]),console.log("Todolist called");var n=Object(a.useCallback)((function(e){t.addTask(e,t.id)}),[t.addTask,t.id]),c=Object(a.useCallback)((function(e){t.changeTodolistTitle(t.id,e)}),[t.id,t.changeTodolistTitle]),o=Object(a.useCallback)((function(){return t.changeFilter("all",t.id)}),[t.id,t.changeFilter]),r=Object(a.useCallback)((function(){return t.changeFilter("active",t.id)}),[t.id,t.changeFilter]),s=Object(a.useCallback)((function(){return t.changeFilter("completed",t.id)}),[t.id,t.changeFilter]),l=t.tasks;return"active"===t.filter&&(l=t.tasks.filter((function(t){return t.status===i.New}))),"completed"===t.filter&&(l=t.tasks.filter((function(t){return t.status===i.Completed}))),Object(f.jsxs)("div",{children:[Object(f.jsxs)("h3",{children:[Object(f.jsx)(b,{value:t.title,onChange:c}),Object(f.jsx)(u.a,{onClick:function(){t.removeTodolist(t.id)},children:Object(f.jsx)(h.a,{})})]}),Object(f.jsx)(O,{addItem:n}),Object(f.jsx)("div",{children:l.map((function(e){return Object(f.jsx)(A,{task:e,todolistId:t.id,removeTask:t.removeTask,changeTaskTitle:t.changeTaskTitle,changeTaskStatus:t.changeTaskStatus},e.id)}))}),Object(f.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(f.jsx)(T.a,{variant:"all"===t.filter?"outlined":"text",onClick:o,color:"inherit",children:"All"}),Object(f.jsx)(T.a,{variant:"active"===t.filter?"outlined":"text",onClick:r,color:"primary",children:"Active"}),Object(f.jsx)(T.a,{variant:"completed"===t.filter?"outlined":"text",onClick:s,color:"secondary",children:"Completed"})]})]})})),H=n(166),G=n(167),M=n(168),R=n(169),P=n(163),U=n(164),V=n(156),B=[],J=function(t){g().then((function(e){t({type:"SET-TODOS",todos:e.data})}))};var q=function(){var t=Object(y.c)((function(t){return t.todolists})),e=Object(y.c)((function(t){return t.tasks})),n=Object(y.b)();Object(a.useEffect)((function(){n(J)}),[]);var i=Object(a.useCallback)((function(t,e){n(function(t,e){return function(n){S(e,t).then((function(i){n(function(t,e){return{type:"REMOVE-TASK",taskId:t,todolistId:e}}(t,e))}))}}(t,e))}),[]),c=Object(a.useCallback)((function(t,e){n(function(t,e){return function(n){E(t,e).then((function(t){var e=t.data.data.item;n(function(t){return{type:"ADD-TASK",task:t}}(e))}))}}(e,t))}),[]),o=Object(a.useCallback)((function(t,e,i){n(function(t,e,n){return function(i,c){var a=c().tasks[e].find((function(e){return e.id===t}));a&&D(e,t,{title:a.title,startDate:a.startDate,priority:a.priority,description:a.description,deadline:a.deadline,status:n}).then((function(){i(function(t,e,n){return{type:"CHANGE-TASK-STATUS",status:e,todolistId:n,taskId:t}}(t,n,e))}))}}(t,i,e))}),[]),r=Object(a.useCallback)((function(t,e,i){n(function(t,e,n){return function(i,c){var a=c().tasks[e].find((function(e){return e.id===t}));a&&D(e,t,{title:n,startDate:a.startDate,priority:a.priority,description:a.description,deadline:a.deadline,status:a.status}).then((function(){i(function(t,e,n){return{type:"CHANGE-TASK-TITLE",title:e,todolistId:n,taskId:t}}(t,n,e))}))}}(t,i,e))}),[]),s=Object(a.useCallback)((function(t,e){var i={type:"CHANGE-TODOLIST-FILTER",id:e,filter:t};n(i)}),[]),l=Object(a.useCallback)((function(t){var e;n((e=t,function(t){m(e).then((function(n){t(function(t){return{type:"REMOVE-TODOLIST",id:t}}(e))}))}))}),[]),d=Object(a.useCallback)((function(t,e){n(function(t,e){return function(n,i){i().todolists.find((function(e){return e.id===t}))&&C(t,e).then((function(){n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}}(t,e))}))}}(t,e))}),[]),j=Object(a.useCallback)((function(t){n(function(t){return function(e){I(t).then((function(t){e({type:"ADD-TODOLIST",todolist:t.data.data.item})}))}}(t))}),[n]);return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)(H.a,{position:"static",children:Object(f.jsxs)(G.a,{children:[Object(f.jsx)(u.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(f.jsx)(V.a,{})}),Object(f.jsx)(M.a,{variant:"h6",children:"News"}),Object(f.jsx)(T.a,{color:"inherit",children:"Login"})]})}),Object(f.jsxs)(R.a,{fixed:!0,children:[Object(f.jsx)(P.a,{container:!0,style:{padding:"20px"},children:Object(f.jsx)(O,{addItem:j})}),Object(f.jsx)(P.a,{container:!0,spacing:3,children:t.map((function(t){var n=e[t.id];return Object(f.jsx)(P.a,{item:!0,children:Object(f.jsx)(U.a,{style:{padding:"10px"},children:Object(f.jsx)(K,{id:t.id,title:t.title,tasks:n,removeTask:i,changeFilter:s,addTask:c,changeTaskStatus:o,filter:t.filter,removeTodolist:l,changeTaskTitle:r,changeTodolistTitle:d})})},t.id)}))})]})]})},Y=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,170)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),i(t),c(t),a(t),o(t)}))},z=n(49),Q=n(76),W=Object(z.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":var n=Object(F.a)({},t),i=n[e.todolistId],c=i.filter((function(t){return t.id!==e.taskId}));return n[e.todolistId]=c,n;case"ADD-TASK":var a=Object(F.a)({},t),o=a[e.task.todoListId],r=[e.task].concat(Object(w.a)(o));return a[e.task.todoListId]=r,a;case"CHANGE-TASK-STATUS":var s=t[e.todolistId],l=s.map((function(t){return t.id===e.taskId?Object(F.a)(Object(F.a)({},t),{},{status:e.status}):t}));return t[e.todolistId]=l,Object(F.a)({},t);case"CHANGE-TASK-TITLE":var d=t[e.todolistId],u=d.map((function(t){return t.id===e.taskId?Object(F.a)(Object(F.a)({},t),{},{title:e.title}):t}));return t[e.todolistId]=u,Object(F.a)({},t);case"ADD-TODOLIST":return Object(F.a)(Object(F.a)({},t),{},Object(L.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var j=Object(F.a)({},t);return delete j[e.id],j;case"SET-TODOS":var f=Object(F.a)({},t);return e.todos.forEach((function(t){f[t.id]=[]})),f;case"SET-TASKS":var O=Object(F.a)({},t);return O[e.todolistId]=e.tasks,O;default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":var n=Object(F.a)(Object(F.a)({},e.todolist),{},{filter:"all"});return[n].concat(Object(w.a)(t));case"CHANGE-TODOLIST-TITLE":var i=t.find((function(t){return t.id===e.id}));return i&&(i.title=e.title),Object(w.a)(t);case"CHANGE-TODOLIST-FILTER":var c=t.find((function(t){return t.id===e.id}));return c&&(c.filter=e.filter),Object(w.a)(t);case"SET-TODOS":return e.todos.map((function(t){return Object(F.a)(Object(F.a)({},t),{},{filter:"all"})}));default:return t}}}),X=Object(z.c)(W,Object(z.a)(Q.a));window.store=X,s.a.render(Object(f.jsx)(o.a.StrictMode,{children:Object(f.jsx)(y.a,{store:X,children:Object(f.jsx)(q,{})})}),document.getElementById("root")),Y()},90:function(t,e,n){},91:function(t,e,n){}},[[116,1,2]]]);
//# sourceMappingURL=main.035d09e3.chunk.js.map