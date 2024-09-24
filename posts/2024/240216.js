let slides_240216 = JSON.stringify([
    ['/images/2024/02/20240216_190747.jpg',''],
    ['/images/2024/02/20240216_191025.jpg',''],
])

content.innerHTML = `\
    <h1>Plants</h1>\
    <h5>Friday February 16 2024</h5>\
    <br>\
    <p>Time to take cuttings.</p>\
    <br>\
    <p>Sometimes the plants need to be split or cut or \
    well, something. Here's that.</p>\
    <br>\
    <div class='slides' data-sources='${slides_240216}'></div>
`