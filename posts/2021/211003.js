let carousel211003 = JSON.stringify([
    '/images/2021/10/20211003_111640.jpg',
    '/images/2021/10/20211003_112747.jpg'
])

content.innerHTML = `\
    <h1>Smoke 'em Out</h1>\
    <h5>Sunday October 3 2021</h5>\
    <br>\
    <p>There is a wasps nest in the burn pile.</p>\
    <br>\
    <p>I'd like to be able to mow the lawn, but first I should try to get rid of \
    the wasps. Since it was raining today, I wasn't going to mow anyway. So, I put 
    some cardboard on the burn pile and put the dogwood brush on top of that. I threw 
    a flare on it to get it burning.</p>\
    <br>\
    <div class='carousel' data-sources='${carousel211003}'>\
        <div class='controls'>\
            <div class='left'></div>\
            <div class='right'></div>\
        </div>\
        <img src='./images/2021/10/20211003_111640.jpg'/ >\
        <div class='caption'>The first time I've had a fire in the burn pile.</div>\
    </div>\
`