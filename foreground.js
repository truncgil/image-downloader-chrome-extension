const whiteListUrl = chrome.runtime.getURL('whitelist.txt');
const blackListUrl = chrome.runtime.getURL('blacklist.txt');

let whiteList, blackList;

const selectorList = [
   
    '.ProductGridItem__itemOuter__5ow0w ProductGridItem__fixed__1w9d4',
    '.s-main-slot .s-result-item',
    '.a-carousel-card',
    '.a-list-item',
    
    '.vvp-item-tile'
];
const gratherThanPrice = 50;

const priceSelectorList = [
    '.a-price-whole',
    '#sns-base-price'
]

console.log("Whitelist Blacklist Active");
function listAdd(list, type) {
    $.each(list,function(e,productItem){

        $.each(selectorList, function(selectorIndex, selector){
            
            if(productItem.trim()!="") {
                /*
                var thisSelector = $(selector+":contains('"+productItem.trim()+"')");
             //   thisSelector.parent().find(selector).addClass(type);
                thisSelector.append("<div class='"+type+"'></div>");
                */
               var thisSelector = $(selector).filter(function () {
                    var text = $(this).text().trim().replace(" ","").toLowerCase();
                    return text.indexOf(productItem.trim().toLowerCase()) > -1;
                });
                thisSelector.append("<div class='"+type+"'></div>");
                thisSelector.parent().find(selector).addClass(type+"Parent");

                
                
              //  console.log(productItem + "=>" + type);
            }
            
        });
    });
}


$.each(selectorList, function(selectorIndex, selector){
    $(selector).each(function(thisSelectorIndex, thisSelector){

        //var thisPrice = $(this).children().find(".a-price-whole").text().replace(",","").trim();
        //console.log(thisPrice);
        
        $(this).addClass("gratherThanButton");
        $(this).append("<button>Check</button>");
        $(this).after().on("click",function(){
            var link = $(this).children().find("a").attr("href");
            console.log(link);
            var bu = $(this);
            $.get(link,function(d){
                var html = $($.parseHTML(d));
                console.log(html.find('.a-price-whole:eq(0)').text());
                var thisPrice = html.find('.a-price-whole:eq(0)').text().replace(",","");
                if(thisPrice>gratherThanPrice) {
        
                    bu.addClass("gratherThanButtonTrue");
                    
                    console.log(thisPrice + " büyüktür " + gratherThanPrice);
                } else {
                    console.log(thisPrice + " küçüktür " + gratherThanPrice);
                  //      $(this).addClass("gratherThanButtonFalse");
            
                }
            });
            
            
        });
        
    });
});






$.get(whiteListUrl, function(d){
    whiteList = d.split('\r\n')
    listAdd(whiteList,"whitelist");
});

$.get(blackListUrl, function(d){
    blackList = d.split('\r\n')
    listAdd(blackList,"blacklist");

});


