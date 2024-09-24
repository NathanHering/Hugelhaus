let slides_240311 = JSON.stringify([
    ['/images/2024/03/20240311_153858.jpg',''],
    ['/images/2024/03/20240311_154001.jpg',''],
    ['/images/2024/03/20240311_154007.jpg',''],
    ['/images/2024/03/20240311_154249.jpg',''],
])

content.innerHTML = `\
    <h1>Tom</h1>\
    <h5>Monday March 11 2024</h5>\
    <br>\
    <p>A lone turkey wandering around the house.</p>\
    <br>\
    <div class='slides' data-sources='${slides_240311}'></div>
`