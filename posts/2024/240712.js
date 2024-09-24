let slides_240712 = JSON.stringify([
    ['/images/2024/07/20240712_114638.jpg',''],
    ['/images/2024/07/20240712_114643.jpg',''],
    ['/images/2024/07/20240712_114706.jpg','']
])

content.innerHTML = `\
    <h1>Cicada</h1>\
    <h5>Friday June 12 2024</h5>\
    <br>\
    <p>Wrong year!</p>\
    <br>\
    <p>This isn't the year that cicada are supposed to be emerging \
    from the ground. I'm not sure why this one is out. My guess is that \
    it was at the base of one of the many small trees I had to remove \
    when clearing the fence line. And that disrupted it maybe?</p>\
    <br>\
    <div class='slides' data-sources='${slides_240712}'></div>
`