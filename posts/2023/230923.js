let slides_230923 = JSON.stringify([
    ['/images/2023/09/20230923_171058.jpg','Well that&#39;s refreshing.']
])

content.innerHTML = `\
    <h1>A Little Sip</h1>\
    <h5>Saturday September 23 2023</h5>\
    <br>\
    <p>The best way to get a drink?</p>\
    <br>\
    <p>The faucet leaks a bit sometimes. And Yume loves to take \
    advantage when it does.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230923}'></div>
`