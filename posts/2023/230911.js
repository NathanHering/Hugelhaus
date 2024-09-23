let slides_230911 = JSON.stringify([
    ['/images/2023/09/20230911_140807.jpg','Set up a small raised garden bed frame.'],
    ['/images/2023/09/20230911_140812.jpg','Set up a small raised garden bed frame.'],
    ['/images/2023/09/20230911_141050.jpg','Add 11 cubic feet of soil and compost.'],
    ['/images/2023/09/20230911_141054.jpg','Add 11 cubic feet of soil and compost.'],
    ['/images/2023/09/20230911_141247.jpg','Add 11 cubic feet of soil and compost.'],
    ['/images/2023/09/20230911_141611.jpg','Add 11 cubic feet of soil and compost.'],
    ['/images/2023/09/20230911_141926.jpg','Add 11 cubic feet of soil and compost.'],
    ['/images/2023/09/20230911_141930.jpg','Add 11 cubic feet of soil and compost.'],
    ['/images/2023/09/20230911_142145.jpg','That kind of overfilled it a bit.'],
    ['/images/2023/09/20230911_142148.jpg','That kind of overfilled it a bit.'],
    ['/images/2023/09/20230913_161407.jpg','I had to do something with the strawberries.'],
    ['/images/2023/09/20230913_161436.jpg','A lot of them were dying.'],
    ['/images/2023/09/20230913_161721.jpg','I have no real plan of how to arrange them.'],
    ['/images/2023/09/20230913_163112.jpg','One tiny strawberry.'],
    ['/images/2023/09/20230913_163146.jpg','Lay them out before planting.'],
    ['/images/2023/09/20230913_163149.jpg','Lay them out before planting.'],
    ['/images/2023/09/20230913_163844.jpg','Now they are all planted.'],
])

content.innerHTML = `\
    <h1>Strawberry Patch</h1>\
    <h5>Sunday September 11 2023</h5>\
    <br>\
    <p>It was kind of a last ditch effort.</p>\
    <br>\
    <p>I started growing these indoors quite a bit earlier \
    this year. I didn't really have a plan for where to put \
    them once I discovered that the soild is really packed clay \
    all around the septic tank lids. I was hoping to put them \
    there initially. So, this is what I decided to do with them \
    instead of throwing them all away.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230911}'></div>
`