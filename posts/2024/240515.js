let slides_240515 = JSON.stringify([
    ['/images/2024/05/20240515_183648.jpg',''],
    ['/images/2024/05/20240515_183649.jpg',''],
    ['/images/2024/05/20240515_183651.jpg',''],
    ['/images/2024/05/20240515_183807.jpg','']
])

content.innerHTML = `\
    <h1>Cat v Rabbit</h1>\
    <h5>Wednesday June 5 2024</h5>\
    <br>\
    <p>I just happened to spot this hunt.</p>\
    <br>\
    <p>The local stray cat that we take care of was lounging \
    in the back yard in the tall weed by the back door. When \
    along came a rabbit. It happened to notice and decided to \
    hunt. Spoiler alert, he did not catch the rabbit.</p>\
    <br>\
    <div class='slides' data-sources='${slides_240515}'></div>
`