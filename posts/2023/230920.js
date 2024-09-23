let slides_230920 = JSON.stringify([
    ['/images/2023/09/20230920_140342.jpg',''],
    ['/images/2023/09/20230920_140354.jpg',''],
    ['/images/2023/09/20230920_140421.jpg',''],
    ['/images/2023/09/20230920_140438.jpg',''],
    ['/images/2023/09/20230920_140446.jpg',''],
    ['/images/2023/09/20230920_140450.jpg',''],
    ['/images/2023/09/20230920_140453.jpg',''],
    ['/images/2023/09/20230920_140846.jpg',''],
    ['/images/2023/09/20230920_140901.jpg','']
])

content.innerHTML = `\
    <h1>Turkey Flock</h1>\
    <h5>Tuesday September 20 2023</h5>\
    <br>\
    <p>A flock passed through and had some dinner.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230920}'></div>
`