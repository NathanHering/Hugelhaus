let slides_220815 = JSON.stringify([
    ['/images/2022/08/20220815_112328.jpg',''],
    ['/images/2022/08/20220815_112640.jpg',''],
    ['/images/2022/08/20220815_112647.jpg',''],
    ['/images/2022/08/20220815_112854.jpg',''],
    ['/images/2022/08/20220815_112900.jpg',''],
    ['/images/2022/08/20220815_112914.jpg',''],
    ['/images/2022/08/20220815_112957.jpg',''],
    ['/images/2022/08/20220815_113013.jpg','']
])

content.innerHTML = `\
    <h1>Turkey Flock</h1>\
    <h5>Monday August 15 2022</h5>\
    <br>\
    <p>I like seeing wild animals in the yard.</p>\
    <br>\
    <p>I plan on removing some of the fence to allow animals to \
    more easily access the yard. The deer that were grazing here \
    last February made me think I needed to do that.</p>\
    <br>\
    <div class='slides' data-sources='${slides_220815}'></div>
`