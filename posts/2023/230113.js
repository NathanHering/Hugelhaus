let slides_230113 = JSON.stringify([
    ['/images/2023/01/20230113_074654.jpg',''],
    ['/images/2023/01/20230113_074705.jpg','']
])

content.innerHTML = `\
    <h1>Winter</h1>\
    <h5>Friday January 13 2023</h5>\
    <br>\
    <p>A chilly Friday the 13th.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230113}'></div>
`