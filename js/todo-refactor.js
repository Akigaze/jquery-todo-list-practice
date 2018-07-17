$(document).ready(function(){
    function generateUUID() {
        /*jshint bitwise:false */
        var i,
            random;
        var uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12
                ? 4
                : (i === 16
                    ? (random & 3 | 8)
                    : random)).toString(16);
        }
        return uuid;
    }

    const todoList=[];
    const filterStatus=["selected","no","no"];

    let basicContent=`<div>
    <input class='input-text' type='text' name='ListItem' data-com.agilebits.onepassword.user-edited='yes'>
    <div id='button' onclick='addTodo()'>Add</div>
    </div>
    <br><ol></ol>
    <div><ul id='filters'>
    <li><a href='#' data-filter='all' class='${filterStatus[0]}' onclick='selectAll()'>ALL</a></li>
    <li><a href='#' data-filter='active' class='${filterStatus[1]}' onclick='selectActive()'>Active</a></li>
    <li><a href='#' data-filter='complete' class='${filterStatus[2]}' onclick='selectComplete()'>Complete</a></li>
    </ul></div>`;


    window.addTodo=function(){
      const item=$(".input-text").val().trim();
      if (item==="") {
        return;
      }
      const id=generateUUID();
      const todo={
        id,
        item,
        status:"",
      }
      todoList.push(todo);
      render(todoList);
    }
    window.selectAll=function() {
      filterStatus.forEach(a=>a="no");
      filterStatus[0]="selected";
      render(todoList);
    }
    window.selectActive=function() {
      filterStatus.forEach(a=>a="no");
      filterStatus[1]="selected";
      const activelist=todoList.filter(todo=>todo.status==="");
      render(activelist);
    }
    window.selectComplete=function() {
      filterStatus.forEach(a=>a="no");
      filterStatus[2]="selected";
      const completelist=todoList.filter(todo=>todo.status==="checked");
      render(completelist);
    }
    window.complete=function(id) {

      // const $id=$(this).attr("id");
      const $id=id;
      const obj=todoList.find(todo=> todo.id===$id);
      if (obj.status=="") {
        obj.status="checked";
      }else {
        obj.status="";
      }
      render(todoList);
    }
    window.editItem=(event,id)=>{
      $(event.target).attr("contentEditable","true")
        .focus()
        .keyPress(function (event) {
            var keycode = event.keyCode;
            if (keycode == '13') {
                todoList.find(element => element.id === id).item = $(event.target).text();
                render(todoList);
            }
        })
    }


    function getTodoLis(list) {
      const liList=list.map(todo=>{
      return `<li id='${todo.id}' class='${todo.status}' ondblclick='editItem(event, "${todo.id}")'>
            <input name="done-todo"
            type="checkbox"
            class="done-todo"
            ${todo.status}
            onclick='complete("${todo.id}")'
            >
            ${todo.item}
         </li>`
      });
      return liList;
    }
    function fillContent(todos) {
      const liList=getTodoLis(todos)
      let olStr=`<ol> ${liList.join("")} </ol>`;
      const outStr=JSON.parse(JSON.stringify(basicContent)).replace("<ol></ol>",olStr);
      console.log(outStr);
      return outStr;
    }

    window.render=function(todos){
        $("#fancy").html(fillContent(todos));
    }


    window.editItem=(event,id)=>{
      $(event.target).attr("contentEditable","true")
        .focus()
        .keypress(function (event) {
            var keycode = event.keyCode;
            if (keycode == '13') {
                todoList.find(element => element.id === id).item = $(event.target).text();
                render(todoList);
            }
        })
    }
    render(todoList);

})
