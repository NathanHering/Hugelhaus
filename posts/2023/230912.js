let slides_230912 = JSON.stringify([
    ['/images/2023/09/20230908_172755.jpg',''],
    ['/images/2023/09/20230908_173431.jpg',''],
    ['/images/2023/09/20230910_104434.jpg','What does RAP mean? I think R is for road, and the AP is for appron. Not sure though.'],
    ['/images/2023/09/20230911_102741.jpg',''],
    ['/images/2023/09/20230914_165054.jpg','They replaced my mailbox post for free too.'],
])

content.innerHTML = `\
    <h1>Road Paving</h1>\
    <h5>Monday September 12 2023</h5>\
    <br>\
    <p>There are pros and cons to this paving.</p>\
    <br>\
    <p>One one hand, it\'s nice to have the road smoothly \
    paved. However, the gravel they put on the shoulder of the \
    road made my ditch much harder to mow.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230912}'></div>
`