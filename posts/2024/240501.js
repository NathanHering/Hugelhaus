let slides_240501 = JSON.stringify([
    ['/images/2024/04/20240415_163239.jpg',''],
    ['/images/2024/05/20240501_140257.jpg','']
])

content.innerHTML = `\
    <h1>Fallen Tree</h1>\
    <h5>Wednesday May 1 2024</h5>\
    <br>\
    <p>This was dead for years. The base of the tree was pretty \
    rotten when I got a better look at it. It's not a surprise that \
    it fell.</p>\
    <br>\
    <div class='slides' data-sources='${slides_240501}'></div>
`