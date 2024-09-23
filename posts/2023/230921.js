let slides_230921 = JSON.stringify([
    ['/images/2023/09/20230921_170526.jpg','Now you see it.'],
    ['/images/2023/09/20230921_173322.jpg','Now you don&#39;t.']
])

content.innerHTML = `\
    <h1>NW Corner Fence Removal</h1>\
    <h5>Wednesday September 21 2023</h5>\
    <br>\
    <p>This corner doesn't have as thick of brush.</p>\
    <br>\
    <p>Like the other corner, the idea is to make it easier \
    for animals to come and go through the yard.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230921}'></div>
`