let slides_231104 = JSON.stringify([
    ['/images/2023/11/20231104_114415.jpg','caption'],
    ['/images/2023/11/20231104_114417.jpg','caption'],
    ['/images/2023/11/20231104_114425.jpg','caption'],
    ['/images/2023/11/20231104_114428.jpg','caption'],
    ['/images/2023/11/20231104_114440.jpg','caption']
])

content.innerHTML = `\
    <h1>Fungus Among Us</h1>\
    <h5>Saturday November 4 2023</h5>\
    <br>\
    <p>Maybe someone knows what these are?</p>\
    <br>\
    <p>I've found quite a few different mushrooms and fungus \
    growing around the yard. I don't know how to identify them. \
    I tried an image search on the internet, but nothing came of \
    it.</p>\
    <br>\
    <div class='slides' data-sources='${slides_231104}'></div>
`