let slides_230922 = JSON.stringify([
    ['/images/2023/09/20230922_112000.jpg','Before I did much clearing.'],
    ['/images/2023/09/20230922_112002.jpg','Before I did much clearing.'],
    ['/images/2023/09/20230922_112004.jpg','Before I did much clearing.'],
    ['/images/2023/10/20231025_170654.jpg','Just getting a start on the first few sections of the fence.'],
    ['/images/2023/10/20231025_170658.jpg','Just getting a start on the first few sections of the fence.'],
    ['/images/2023/10/20231025_170701.jpg','Just getting a start on the first few sections of the fence.'],
    ['/images/2023/10/20231025_170803.jpg','Just getting a start on the first few sections of the fence.']
])

content.innerHTML = `\
    <h1>East Fence Clearing</h1>\
    <h5>Thursday September 22 2023</h5>\
    <br>\
    <p>Fence clearing is a big project.</p>\
    <br>\
    <p>This is the first area that I worked on as far as clearing \
    the fence line.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230922}'></div>
`