let slides_240620 = JSON.stringify([
    ['/images/2024/06/20240620_171819.jpg',''],
    ['/images/2024/06/20240620_171828.jpg',''],
    ['/images/2024/06/20240620_194151.jpg','']
])

content.innerHTML = `\
    <h1>Turtle Nest</h1>\
    <h5>Thursday June 20 2024</h5>\
    <br>\
    <p>Another attempt.</p>\
    <br>\
    <p>A while ago, I spotted a turtle laying eggs in the yard. \
    That didn't seem to work out. I don't think any of the eggs \
    hatched. Here we have a second find. This time I actually \
    saw the turtle laying the eggs.</p>\
    <br>\
    <div class='slides' data-sources='${slides_240620}'></div>
`