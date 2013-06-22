$(function () {
    function titleFunction(title) {

        $("#title").html("<h1>"+title+"</h1>");
    }
    function menuFunction(newitem, olditem, button) {
        $("#"+newitem).hide();
        $("#exit").hide();
        $("#" + button).click(function () {
            $("#" + olditem).hide();
            $("#" + newitem).show();
            $("#exit").show();
        });
        $("#exit").click(function () {
            $("#" + olditem).show();
            $("#" + newitem).hide();
            $("#exit").hide();
        });
    }
    function menu_itemFunction(menu_item, tag) {

        $("#menu").append("<li><button id=\"" + tag + "\">" + menu_item + "</button></li>");
    }

    menu_itemFunction("Play", "play");
    menu_itemFunction("Tutorial", "tutorial");
    menu_itemFunction("Load", "load");
    menu_itemFunction("Options", "options");
    menu_itemFunction("Gallery", "gallery");
    titleFunction("GameTemp");
    menuFunction("myCanvas", "menu", "play");
});