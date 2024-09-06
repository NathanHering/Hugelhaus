let slides_000000 = JSON.stringify([
    ['/images/2023/06/.jpg','caption']
])

content.innerHTML = `\
    <h1>Title</h1>\
    <h5>dddd mmm dd yyyy</h5>\
    <br>\
    <p>Intro</p>\
    <br>\
    <p>Content</p>\
    <br>\
    <div class='slides' data-sources='${slides_000000}'></div>
`