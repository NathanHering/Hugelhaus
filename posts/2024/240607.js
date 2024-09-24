let slides_240607 = JSON.stringify([
    ['/images/2024/06/20240607_121339.jpg','This will be where I store the firewood.'],
    ['/images/2024/06/20240607_121342.jpg','This will be where I store the firewood.'],
    ['/images/2024/06/20240607_121344.jpg','This will be where I store the firewood.'],
    ['/images/2024/07/20240719_205547.jpg','A first pile of wood.'],
    ['/images/2024/07/20240721_135044.jpg','A first pile of wood.'],
])

content.innerHTML = `\
    <h1>Raised Fir-pit Area</h1>\
    <h5>Friday June 7 2024</h5>\
    <br>\
    <p>Time to work on relaxing.</p>\
    <br>\
    <p>This is a part of the yard that needed some work, \
    but not as much hard work as the other projects. And in \
    this case, the end result is to have a place where I can \
    sit by a fire.</p>\
    <br>\
    <div class='slides' data-sources='${slides_240607}'></div>
`