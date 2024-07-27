let slides_230401 = JSON.stringify([
    ['/images/2023/04/20230401_094257.jpg',''],
    ['/images/2023/04/20230401_094302.jpg',''],
    ['/images/2023/04/20230401_094323.jpg','']
])

content.innerHTML = `\
    <h1>Snowdrop Flower</h1>\
    <h5>Monday April 1 2023</h5>\
    <br>\
    <p>Random flower in the yard.</p>\
    <br>\
    <p>I don't imagine the previous owners planted these here given this area\
    is kind of overun with thorns. So, I'm not sure how they got herre. Maybe\
    just a natural process I guess.</p>\
    <br>\
    <p>I'm considering digging up the bulbs and breaking them apart to spread\
    them around this part of the yard in the future.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230401}'></div>
`