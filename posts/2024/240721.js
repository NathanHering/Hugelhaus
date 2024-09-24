let slides_240721 = JSON.stringify([
    ['/images/2024/07/20240721_134808.jpg',''],
    ['/images/2024/07/20240721_134815.jpg',''],
    ['/images/2024/07/20240721_134835.jpg',''],
    ['/images/2024/07/20240721_134836.jpg',''],
    ['/images/2024/07/20240721_134840.jpg',''],
    ['/images/2024/07/20240721_134852.jpg',''],
])

content.innerHTML = `\
    <h1>Under Fire</h1>\
    <h5>Sunday July 21 2024</h5>\
    <br>\
    <p>I guess the raised fire pit is a good place for a nap.</p>\
    <br>\
    <div class='slides' data-sources='${slides_240721}'></div>
`