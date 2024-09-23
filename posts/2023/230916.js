let p = 
    {   id: 230916, year: 2023, month: 9, day: 16,
        menuText: "Hidding Cat",
        tags: [
            tags.ANIMALS, tags.LITTLE_MOMENTS
        ],
        src: './posts/2023/230916.js'
    }

let slides_230916 = JSON.stringify([
    ['/images/2023/09/20230916_075421.jpg','Hide and seek?'],
    ['/images/2023/09/20230916_075425.jpg','Hide and seek?']
])

content.innerHTML = `\
    <h1>Hidding Cat</h1>\
    <h5>Friday September 16 2023</h5>\
    <br>\
    <p>She found a way to get into the rafters. It took me \
    a few minutes of searching the house to find her.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230916}'></div>
`