$(document).ready(function () {


    let tweetBae = [
        {
            date: '08 May 2018',
            text: 'It\'s the best social network i seen'
        },
        {
            date: '05 October 2017',
            text: 'Yeappy! I was hired at twitter!!!'
        },
        {
            date: '27 August 2017',
            text: 'My first steps in tweeting. Never mind'
        }
    ];

    tweetBae.forEach( function (tweet) {
        createTweet(tweet.date, tweet.text);
    });
    $('#postNewTweet').on('submit', function (e) {
        e.preventDefault();
        let  tweetText = $('#TweetText').val();


        createTweet(FormatDate(new Date()), tweetText);
        $('#TweetText').val('');
    });

});


function createTweet(date, text) {
    let $tweetBox = $('<div class="card tweet-card">');
    let $tweetDate = $('<div class="tweet-date"></div>').text(date);
    let $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>');
    let additionalClassName;
    if(text.length < 100) {
        additionalClassName = 'font-size-large';
    } else if (text.length > 150) {
        additionalClassName = 'font-size-small';
    } else {
        additionalClassName = 'font-size-normal';
    }

    $tweetText.addClass(additionalClassName);

    $tweetBox.append($tweetDate).append($tweetText);
    $('#tweetList').prepend($tweetBox);
    countTwets();
}

function FormatDate(date) {

    let months = ['January', 'February',
        'March', 'April',
        'May', 'June',
        'July', 'August',
        'September', 'October',
        'November', 'December'
    ];
    let day = date.getDate(),
    index = date.getMonth(),
    year = date.getFullYear();

    return `${day } ${months[index]} ${year}`;
}

function countTwets() {

    let tweetCounter = $('.tweet-card').length;
    $('#tweetCount').text(tweetCounter);
    return tweetCounter;
}

let wrapURLs = function (text, new_window) {
    let url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
    let target = (new_window === true || new_window == null) ? '_blank' : '';

    return text.replace(url_pattern, function (url) {
        let protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
        let href = protocol_pattern.test(url) ? url : 'http://' + url;
        return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
    });
};
