let slides_221030 = JSON.stringify([
    ['/images/2022/10/20221030_114146.jpg','From the NW corner facing east'],
    ['/images/2022/10/20221030_114150.jpg','From the NW corner facing southeast'],
    ['/images/2022/10/20221030_114154.jpg','From the NW corner facing south'],
    ['/images/2022/10/20221030_114231.jpg','From the SW corner facing north'],
    ['/images/2022/10/20221030_114235.jpg','From the SW corner facing northeast'],
    ['/images/2022/10/20221030_114238.jpg','From the SW corner facing east'],
    ['/images/2022/10/20221030_114350.jpg','From the SE corner facing west'],
    ['/images/2022/10/20221030_114353.jpg','From the SE corner facing northwest'],
    ['/images/2022/10/20221030_114356.jpg','From the SE corner facing north'],
    ['/images/2022/10/20221030_114454.jpg','From the NE corner facing south'],
    ['/images/2022/10/20221030_114459.jpg','From the NE corner facing southwest'],
    ['/images/2022/10/20221030_114503.jpg','From the NE corner facing west'],
])

content.innerHTML = `\
    <h1>Frontyard</h1>\
    <h5>Sunday October 30 2022</h5>\
    <br>\
    <p>Since I didn't take pictures of the front yard to compare with from the\
    previous year. I took these to compare with next year.</p>\
    <br>\
    <div class='slides' data-sources='${slides_221030}'></div>
`