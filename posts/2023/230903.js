let slides_230903 = JSON.stringify([
    ['/images/2023/04/20230401_094323.jpg','You can see the snow drop flowers just barely among the ground cover.'],
    ['/images/2023/09/20230903_102321.jpg','After removing some of the thorns.'],
    ['/images/2023/09/20230903_102326.jpg','At some point I will need to remove this tree.']
])

content.innerHTML = `\
    <h1>NW Yard Cleanup</h1>\
    <h5>Sunday September 03 2023</h5>\
    <br>\
    <p>A lot of thorns.</p>\
    <br>\
    <p>This part of the yard has a few mature thorn bushes/vines. I don't know\
    what they are called, but they are a huge pain to work with. They cling to\
    each other, other plants, and of course me as I get in there.</p>\
    <br>\
    <p>I plan on going further with this clean up project, but for now I just want\
    to keep the thorns from hitting my when I mow.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230903}'></div>
`