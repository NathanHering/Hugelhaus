let p = 
    {   id: 231023, year: 2023, month: 10, day: 23,
        menuText: "Kitchen Aid",
        tags: [
            tags.KITCHEN
        ],
        src: './posts/2023/231023.js'
    }

let slides_231023 = JSON.stringify([
    ['/images/2023/10/20231023_182535.jpg','']
])

content.innerHTML = `\
    <h1>Kitchen Aid</h1>\
    <h5>Monday October 23 2023</h5>\
    <br>\
    <p>I just thought I'd record the day I got this \
    appliance so I'd know in the future how long I've \
    owned it.</p>\
    <br>\
    <div class='slides' data-sources='${slides_231023}'></div>
`