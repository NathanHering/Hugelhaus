let slides_230329 = JSON.stringify([
    ['/images/2023/03/20230329_191845.jpg',''],
    ['/images/2023/03/20230329_191848.jpg','']
])

content.innerHTML = `\
    <h1>Tiny Snow People</h1>\
    <h5>Wednesday March 29 2023</h5>\
    <br>\
    <p>I remember building snow men.</p>\
    <br>\
    <p>After a trip to the store or some other errand, the\
    car had some snow built up. My son decided to make a couplt\
    little figures for fun.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230329}'></div>
`