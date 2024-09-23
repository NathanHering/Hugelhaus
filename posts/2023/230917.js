let slides_230917 = JSON.stringify([
    ['/images/2023/09/20230916_092814.jpg','What is that?'],
    ['/images/2023/09/20230916_092807.jpg','I found a treasure chest!'],
    ['/images/2023/09/20230916_092831.jpg','The previous owners were fans of pirates.'],
    ['/images/2023/09/20230916_092848.jpg','Nothing interesting inside.'],
])

content.innerHTML = `\
    <h1>Thar Be Treasure!</h1>\
    <h5>Friday September 16 2023</h5>\
    <br>\
    <p>I was removing more drywall when I stumbled upon this.</p>\
    <br>\
    <p>That section of the basement is a place I haven't done \
    much with. So, I thought I'd remove the drywall on the ceiling.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230917}'></div>
`