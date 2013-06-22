$(function () {
    function titleFunction(title) {
        
        $("#title").html(title);
    }
    function menuFunction(newitem,olditem,button) {
        $(newitem).hide();
        $("#exit").hide();
        $(button).click(function () {
            $(olditem).hide();
            $(newitem).show();
            $("#exit").show();
        });
        $("#exit").click(function () {
            $(olditem).show();
            $(newitem).hide();
            $("#exit").hide();
        });
    }
    titleFunction( "<h1>GameTemp</h1>");
    menuFunction("#myCanvas", "#menu", "#test");
});