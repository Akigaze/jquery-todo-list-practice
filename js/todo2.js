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
    const filterStatus=[];

    let bas=`<div>
    <input class='input-text' type='text' name='ListItem' data-com.agilebits.onepassword.user-edited='yes'>
    <div id='button' onclick=${addTodo}>Add</div>
    </div>
    <br><ol></ol>
    <div><ul id='filters'>
    <li><a href='#' data-filter='all' class='selected' onclick=${selectAll}>ALL</a></li>
    <li><a href='#' data-filter='active' class='' onclick=${selectActive}>Active</a></li>
    <li><a href='#' data-filter='complete' class='' onclick=${selectComplete}>Complete</a></li>
    </ul></div>`;
    function render(){
        $("#fancy").html()
    }


})



