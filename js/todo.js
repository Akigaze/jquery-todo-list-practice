$(document).ready(function () {

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
  function classChangeOfCheckBox() {
    $("input[type='checkbox']").click(function() {
      let $checked=$(this).prop("checked");
      if ($checked) {
        $(this).parent().addClass("checked");
      }else {
        $(this).parent().removeClass("checked");
      }
    });
  }

  classChangeOfCheckBox();
  $("li").attr("contenteditable",true);
  $("#button").click(function(){
    let $newItem=$(".input-text").val();
    let uuid=generateUUID();
    $("ol").append("<li id="+uuid+" class=''><input name='done-todo' type='checkbox' class='done-todo'> "+$newItem+" </li>");
    classChangeOfCheckBox();
  });

  $("a[data-filter='active']").click(function(){
    $("a[class='selected']").removeClass("selected");
    $(this).addClass("selected");
    $("ol>li:not(.checked)").css("display","");
    $(".checked").css("display","none");
  })

  $("a[data-filter='all']").click(function(){
    $("a[class='selected']").removeClass("selected");
    $(this).addClass("selected");
    $("li").css("display","");
  })


    $("a[data-filter='complete']").click(function(){
      $("a[class='selected']").removeClass("selected");
      $(this).addClass("selected");
      $(".checked").css("display","");
      $("ol>li:not(.checked)").css("display","none");
    })
});
