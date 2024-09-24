let slides_240223 = JSON.stringify([
    ['/images/2024/02/20240223_181302.jpg','With the canvas cover off, she felt welcome to explore.'],
    ['/images/2024/02/20240225_200909.jpg','The warming pad is a lovely thing to rest on.'],
    ['/images/2024/03/20240326_180008.jpg','Getting the Lamb&apos;s Ear started.'],
])

content.innerHTML = `\
    <h1>Update Seed Station</h1>\
    <h5>Friday February 23 2024</h5>\
    <br>\
    <p>Update Seed Station</p>\
    <br>\
    <p>The lights on the upper shelf went out. So, it's time \
    to replace them.</p>\
    <br>\
    <div class='slides' data-sources='${slides_240223}'></div>
`