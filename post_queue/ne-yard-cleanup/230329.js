// NOTE: Do not add the dot to the begining of the source paths
let slides_230303 = JSON.stringify([
    ['/images/2023/03/.jpg','']
])

content.innerHTML = `\
    <h1></h1>\
    <h5>dddd mmmm dd yyyy</h5>\
    <br>\
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lorem mauris.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230303}'></div>
`