let slides_230930 = JSON.stringify([
    ['/images/2023/09/20230911_160122.jpg','Burn most of the small branches.'],
    ['/images/2023/09/20230911_160233.jpg','Burn most of the small branches.'],
    ['/images/2023/09/20230911_160615.jpg','Burn most of the small branches.'],
    ['/images/2023/09/20230911_160749.jpg','Burn most of the small branches.'],
    ['/images/2023/09/20230929_170849.jpg','What&apos;s left of the tree.'],
    ['/images/2023/09/20230929_172938.jpg','Dig out around the stump.'],
    ['/images/2023/09/20230930_110709.jpg','Cut the easy stuff first.'],
    ['/images/2023/09/20230929_170855.jpg','Because of course there would be junk buried by the stump.'],
    ['/images/2023/09/20230929_172933.jpg','Because of course there would be junk buried by the stump.'],
    ['/images/2023/10/20231004_171811.jpg','Cut away the stump a bit at a time.'],
    ['/images/2023/10/20231005_171016.jpg','Cut away the stump a bit at a time.'],
    ['/images/2023/10/20231005_172509.jpg','Bury the stump.'],
    ['/images/2023/10/20231005_174343.jpg','Plant grass seed.'],
    ['/images/2023/10/20231020_104116.jpg','Not long before the grass starts to grow.'],
])

content.innerHTML = `\
    <h1>Tree Removal</h1>\
    <h5>Friday September 30 2023</h5>\
    <br>\
    <p>This little one was just in the way.</p>\
    <br>\
    <p>Every time I mow the yard, I have to circle around this one. \
    I wanted to make things a bit easier for myself. I also gave a \
    bunch of the branches to my niece. She was planning on using them \
    to create a kind of fence. I'm not sure if she ended up doing that \
    or not though.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230930}'></div>
`