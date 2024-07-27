let slides_230215 = JSON.stringify([
    ['/images/2023/02/20230215_143114.jpg','I covered the leach field lids with a tarp to kill the grass.'],
    ['/images/2023/02/20230215_143149.jpg','']
])

content.innerHTML = `\
    <h1>NE Front Yard</h1>\
    <h5>Wednseday Feb 15 2023</h5>\
    <br>\
    <p>This is really just the before pictures. I plan to do some work in\
    this part of the yard at some point.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230215}'></div>
`