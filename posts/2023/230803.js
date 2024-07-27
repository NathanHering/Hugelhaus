let slides_230803a = JSON.stringify([
    ['/images/2023/02/20230215_142943.jpg','There was a shrub/tree a few feet from the fence. It was mostly cut down at this point.'],
    ['/images/2023/02/20230215_143009.jpg','There was a shrub/tree a few feet from the fence. It was mostly cut down at this point.']
])

let slides_230803b = JSON.stringify([
    ['/images/2023/08/20230803_112223.jpg','A few bags of dirt at a time.'],
    ['/images/2023/08/20230803_112247.jpg','A few bags of dirt at a time.'],
    ['/images/2023/08/20230805_113434.jpg','Then plant some grass.'],
    ['/images/2023/08/20230813_115957.jpg','Then plant some grass.'],
    ['/images/2023/08/20230828_181629.jpg','Then plant some grass.']
])

content.innerHTML = `\
    <h1>South Fence Cleanup</h1>\
    <h5>Monday August 28 2023</h5>\
    <br>\
    <p>Starting small...</p>\
    <br>\
    <p>This is the first of many fence cleanup projects. I plan on\
    clearing all the brush around the fence in the entire back yard. \
    There may be a few trees that I will keep that are close to the \
    fence. However, for the most part I want to clear it all and plant \
    grass or ground cover.</p>\
    <br>\
    <p>It may not look like it, but this area was a nuisance to mow\
    around. </p>\
    <br>\
    <div class='slides' data-sources='${slides_230803a}'></div>
    <br>\
    <p>I spread the work out over a couple of weeks. First I cut the \
    shrub/tree down. Then I had to hack away at the stump with an axe \
    until I got it down low enough to mow over. Then I could fill in a \
    few low spots with some dirt and finally plant grass.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230803b}'></div>
`