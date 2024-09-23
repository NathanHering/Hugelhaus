let slides_231103 = JSON.stringify([
    ['/images/2023/11/20231103_114856.jpg','So cute!']
])

content.innerHTML = `\
    <h1>Tucked In</h1>\
    <h5>Friday November 3 2023</h5>\
    <br>\
    <p>She's always so lovely!</p>\
    <br>\
    <p>She was kind of under the covers already, so I thought \
    I'd tuck her in and she let me. What a sweetheart.</p>\
    <br>\
    <div class='slides' data-sources='${slides_231103}'></div>
`