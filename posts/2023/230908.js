let p = 
    {   id: 230908, year: 2023, month: 9, day: 8,
        menuText: "Toilet",
        tags: [
            tags.CLEAN_UP, tags.PROJECTS
        ],
        src: './posts/2023/230908.js'
    }

let slides_230908 = JSON.stringify([
    ['/images/2023/09/20230908_165912.jpg',''],
    ['/images/2023/09/20230908_170806.jpg',''],
    ['/images/2023/09/20230908_171200.jpg','Useable at least.'],
])

content.innerHTML = `\
    <h1>Toilet</h1>\
    <h5>Friday September 8 2023</h5>\
    <br>\
    <p>May as well have it useable.</p>\
    <br>\
    <p>Since there are two of us living here, there are times \
    when I'd like two toilets. This may not be exactly comfortable \
    to use seing it is out in the open, but at least I can clean \
    it up.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230908}'></div>
`