let slides_230909 = JSON.stringify([
    ['/images/2023/09/20230909_133431.jpg','Four green and three red. (not all the red are pictured as you can tell.)'],
    ['/images/2023/09/20230909_133439.jpg','Added some rooting hormone.'],
    ['/images/2023/09/20230909_133435.jpg','Each gets its own pot.'],
    ['/images/2023/09/20230909_133903.jpg','The wire mesh helps keep them upright.']
])

content.innerHTML = `\
    <h1>Apple Tree Cuttings</h1>\
    <h5>Saturday September 9 2023</h5>\
    <br>\
    <p>Just as an experiment.</p>\
    <br>\
    <p>There were a few branches that needed to be pruned from \
    trees in my mom's yard. I decided to give growing trees from \
    cuttings a shot.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230909}'></div>
    <br>\
    <p>Spoiler alert, they didn't succeed.</p>\
    <br>\
`