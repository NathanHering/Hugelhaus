let slides_231023 = JSON.stringify([
    ['/images/2023/10/20231023_085748.jpg','A nice view of the yard with a little fog.'],
])

content.innerHTML = `\
    <h1>Haze</h1>\
    <h5>Sunday October 22 2023</h5>\
    <br>\
    <p>Just a nice view I thought I'd capture.</p>\
    <br>\
    <div class='slides' data-sources='${slides_231023}'></div>
`