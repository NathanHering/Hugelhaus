let slides_210821 = JSON.stringify([
    ['/images/2021/08/20210821_114014.jpg','Facing Southwest: The brush along the fence was thickest about half way down the hill.'],
    ['/images/2021/08/20210821_114016.jpg','Facing West: There was a fallen oak tree which had years of growth around it.'],
    ['/images/2021/08/20210821_114017.jpg','Facing Northwest: There is a cage completely covered in weeds here and behind it a fallen oak tree \
    with a whole lot of growth around it.'],
    ['/images/2021/08/20210821_114019.jpg','Facing Northwest: There is a huge amount of weeds all around a few trees at the back of the yard.'],
    ['/images/2021/08/20210821_114021.jpg','Facing North: The fence is completely hidden. There is a gate here and a large wooden crate-like object in front of it that is completely covered in years of growth.'],
    ['/images/2021/08/20210821_114022.jpg','Facing North: This fire pit was so overgrown that it was impossible to see just how much trash was burried in it.'],
    ['/images/2021/08/20210821_114024.jpg','Facing Northeast'],
    ['/images/2021/08/20210821_114025.jpg','Facing Northeast'],
    ['/images/2021/08/20210821_114027.jpg','Facing East'],
    ['/images/2021/08/20210821_114029.jpg','Facing Southeast'],
    ['/images/2021/08/20210821_114030.jpg','Facing Southeast'],
    ['/images/2021/08/20210821_114032.jpg','Facing South: You can barely see it, but in the shade on the hill are the lids to the septic tanks. These are difficult to mow around. It looks like the previous owner hit one of the lids at some point.'],
    ['/images/2021/08/20210821_114034.jpg','Facing South']
])

content.innerHTML = `\
    <h1>Back Yard Update</h1>\
    <h5>Saturday August 21 2021</h5>\
    <br>\
    <p>Here's what I'm starting with</p>\
    <br>\
    <p>I set out a few goals as far as yard work was concerned. I'll list \
    them below pictures. These are all taken from one position roughly in \
    the middle of the yard.</p>\
    <br>\
    <div class='slides' data-sources='${slides_210821}'></div>\
    <br>\
    <p>Here are the tasks I have on my list for the first year.</p><br>\
    <ul>\
    <li>Clear out some of the overgrowth by the fence to the west.</li><br>\
    <li>Remove the rusty cage and all the weeds etc around it.</li><br>\
    <li>Remove the fallen oak tree.</li><br>\
    <li>Clear out the weeds from around the trees at the north end of the yard.</li><br>\
    <li>Clear out the brush and crate by the gate.</li><br>\
    <li>Clean the burn pit and maybe build a landscaping stone wall around it.</li><br>\
    <li>Place mulch around the septic tank lids so I can start growing ground \
    cover in spring of 2023.</li><br>\
    <li>Remove the white fence by the garage.</li><br>\
    <li>Take down the satelite dishes.</li>\
    </ul>\
    <br>\
`