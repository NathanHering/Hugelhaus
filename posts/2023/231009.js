let slides_231009 = JSON.stringify([
    ['/images/2023/10/20231009_140024.jpg','The stump grinder is remotely opperated.'],
    ['/images/2023/10/20231009_143645.jpg','A lot of wood chips are left behind.'],
    ['/images/2023/10/20231009_143650.jpg','He managed not to hit the planter.'],
    ['/images/2023/10/20231010_112350.jpg','After I raked it smooth.']
])

content.innerHTML = `\
    <h1>Stump Removal</h1>\
    <h5>Monday October 9 2023</h5>\
    <br>\
    <p>This will make mowing easier, eventually.</p>\
    <br>\
    <p>Once the stump was ground down, I had to get in there and \
    smooth it out. It'll take a while before I'm going to be able to \
    plant grass.</p>\
    <br>\
    <div class='slides' data-sources='${slides_231009}'></div>
`