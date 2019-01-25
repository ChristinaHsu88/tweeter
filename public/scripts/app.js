/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  
$(function() {

$(".errorMsg").hide();
document.getElementById('mytext').select();

$("#compose").click(function() {
    $(".new-tweet").slideToggle();
    document.getElementById('mytext').select();
})

//update the tweets with new ones
const allTweet = $(".tweets");
function loadTweets() {
    $.ajax({
        method: "GET",
        url: "/tweets/"
    }).done(function(oneTweet) {
        allTweet.empty();
        renderTweets(oneTweet);
    })
}
loadTweets();


//once the submit button is being clicked. Set word limit condition.
$("#form").on("submit", function(event) {
    event.preventDefault();
    var wordCountNum = $(this).text();
    var wordCount = parseInt(wordCountNum);
    if (wordCount === 140) {
        $(".errorMsg").show();
    } else if (wordCount <= 0) {
        $(".errorMsg").show();
    } else {
        var convertedData = $(this).serialize();
        $.ajax({
            method: "POST",
            url: "/tweets/",
            data: convertedData 
        }).done(function() {
            $("#form").trigger("reset");
            $(".errorMsg").hide();
            loadTweets();
        })
    }
});


//function to create HTML
function createTweetElement(littleBird) {
    let $article = $('<article class="tweet">');
    let $header = $('<header>');
    let $picture = $(`<img class="pic" src=${littleBird.user.avatars.small}>`);
    let $nameSpan = $('<span class="name">').text(littleBird.user.name);
    let $hashtagSpan = $('<span class="hashtag">').text(littleBird.user.handle);
    let $p = $('<p class="tweets">').text(littleBird.content.text);
    let $footer = $('<footer>');
    //let $footerSpan = $('<span class="footer">').text(littleBird.created_at);
    $footerSpan = $(`<span data-livestamp="${littleBird.created_at / 1000}">`)
    let $footerLike = $('<button class="like">').text("♡");
    let $footerMov = $('<span class="direct">').text("⇄");
    let $footerflag = $('<span class="flag">').text("⚑");
    $header.append($picture);
    $header.append($nameSpan);
    $header.append($hashtagSpan);
    $article.append($header);
    $article.append($p);
    $footer.append($footerSpan);
    $footer.append($footerflag);
    $footer.append($footerMov);
    $footer.append($footerLike);
    $article.append($footer);

    return $article;
}

//rendering tweet with callback
function renderTweets(tweets) {
 for (var count in tweets) {
     var newTweet = createTweetElement(tweets[count]);
     $('#tweets').prepend(newTweet);
    }   
 }
renderTweets(); 
});

