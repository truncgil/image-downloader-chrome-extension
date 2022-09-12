


function button(href) {
    var button = '<a href="'+href+'" style="text-decoration:none;font-size:12px;position:relative;top:-30px;left:12px" class="" download><span class="" >⬇️</span></a>';
    return button;
}
var img = $("img");

img.each(function(){
    let bu = $(this);
    let url = bu.attr("src");
    let pos = bu.position();
    $(button(url)).insertAfter(bu);
})
