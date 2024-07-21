// NOTE: Do not add the dot to the begining of the source paths
let slides_230830 = JSON.stringify([
    ['/images/2023/08/20230830_171150.jpg','Remove the posts from the vinyl sleeves.'],
    ['/images/2023/08/20230831_183510.jpg','Cut the posts to the desired length and sand them smooth.'],
    ['/images/2023/09/20230901_145803.jpg','Time to apply some weather proof stain.']
])

content.innerHTML = `\
    <h1>Light posts</h1>\
    <h5>Wednesday August 30 2023</h5>\
    <br>\
    <p>After I removed the vinyl fencing from the side of the house, I decided\
    to keep two of the posts. I'm thinking at some point in the future I can put\
    them at the end of the driveway. In the meantime, I may as well stain them.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230830}'></div>
`