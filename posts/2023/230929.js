let p = 
    {   id: 230929, year: 2023, month: 9, day: 29,
        menuText: "Late Summer Fire",
        tags: [
            tags.LITTLE_MOMENTS, tags.YARD
        ],
        src: './posts/2023/230929.js'
    }

let slides_230929 = JSON.stringify([
    ['/images/2023/09/20230929_182025.jpg',''],
    ['/images/2023/09/20230929_182031.jpg',''],
    ['/images/2023/09/20230929_182825.jpg',''],
    ['/images/2023/09/20230929_182829.jpg',''],
    ['/images/2023/09/20230929_182837.jpg',''],
])

content.innerHTML = `\
    <h1>Late Summer Fire</h1>\
    <h5>Thursday September 29 2023</h5>\
    <br>\
    <p>The trees look really lovely when the sunset's light \
    highlites them just at dusk.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230929}'></div>
`