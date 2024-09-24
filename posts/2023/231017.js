let slides_231017 = JSON.stringify([
    ['/images/2023/10/20231018_174122.jpg','From the NW corner facing east'],
    ['/images/2023/10/20231018_174125.jpg','From the NW corner facing southeast'],
    ['/images/2023/10/20231018_174127.jpg','From the NW corner facing south'],
    ['/images/2023/10/20231018_174154.jpg','From the SW corner facing north'],
    ['/images/2023/10/20231018_174156.jpg','From the SW corner facing northeast'],
    ['/images/2023/10/20231018_174158.jpg','From the SW corner facing east'],
    ['/images/2023/10/20231018_174247.jpg','From the SE corner facing west'],
    ['/images/2023/10/20231018_174249.jpg','From the SE corner facing northwest'],
    ['/images/2023/10/20231018_174251.jpg','From the SE corner facing north'],
    ['/images/2023/10/20231018_174334.jpg','From the NE corner facing south'],
    ['/images/2023/10/20231018_174336.jpg','From the NE corner facing southwest'],
    ['/images/2023/10/20231018_174339.jpg','From the NE corner facing west'],
])

content.innerHTML = `\
    <h1>Front Yard</h1>\
    <h5>Wednesday October 18 2023</h5>\
    <br>\
    <p>I didn't do very much in the front yard over the year. I did some \
    work under the pine tree, and I had some stumps removed by the ditch \
    near the utility pole.</p>\
    <br>\
    <div class='slides' data-sources='${slides_231017}'></div>
`