let slides_231101 = JSON.stringify([
    ['/images/2023/11/20231101_074002.jpg',''],
    ['/images/2023/11/20231101_074102.jpg',''],
    ['/images/2023/11/20231101_074104.jpg',''],
    ['/images/2023/11/20231101_074119.jpg',''],
    ['/images/2023/11/20231101_081451.jpg',''],
])

content.innerHTML = `\
    <h1>First Snow</h1>\
    <h5>Wednesday November 1 2023</h5>\
    <br>\
    <p>Not yet winter, but there's a nice layer of \
    snow covering the yard.</p>\
    <br>\
    <div class='slides' data-sources='${slides_231101}'></div>
`