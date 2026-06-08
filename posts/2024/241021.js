let slides_241021a = JSON.stringify([
    ['/images/2024/10/20241020_171147.jpg','NW corner of the frontyard.'],
    ['/images/2024/10/20241020_171149.jpg','NW corner of the frontyard.'],
    ['/images/2024/10/20241020_171201.jpg','From the NW corner facing east.'],
    ['/images/2024/10/20241020_171203.jpg','From the NW corner facing southeast.'],
    ['/images/2024/10/20241020_171206.jpg','From the NW corner facing south.'],
    ['/images/2024/10/20241020_171240.jpg','From the NW corner facing north.'],
    ['/images/2024/10/20241020_171243.jpg','From the NW corner facing northeast.'],
    ['/images/2024/10/20241020_171245.jpg','From the NW corner facing east.'],
    ['/images/2024/10/20241020_171331.jpg','From the SE corner facing west.'],
    ['/images/2024/10/20241020_171334.jpg','From the SE corner facing northwest.'],
    ['/images/2024/10/20241020_171336.jpg','From the SE corner facing north.'],
    ['/images/2024/10/20241020_171418.jpg','From the NE corner facing south.'],
    ['/images/2024/10/20241020_171420.jpg','From the NE corner facing southwest.'],
    ['/images/2024/10/20241020_171422.jpg','From the NE corner facing west.'],
])

content.innerHTML = `\
    <h1>Frontyard Update</h1>\
    <h5>Monday October 21 2024</h5>\
    <br>\
    <p>I haven't changed much in the frontyard this year.</p>\
    <br>\
    <div class='slides' data-sources='${slides_241021a}'></div>
`

