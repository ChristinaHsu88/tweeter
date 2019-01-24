const characterLimit = 140;

function eventHandler() {
    var length = this.value.length; 
    var sibling = $(this).siblings('.counter').css("color", "black"); 
    var charactersRemaining = characterLimit - length;
    sibling.text(charactersRemaining); 
    if (charactersRemaining < 0) {
        $(this).siblings('.counter').css("color", "red");
    }
}

$('.text').on('input', eventHandler);


