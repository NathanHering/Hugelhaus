let slides_231220 = JSON.stringify([
    ['/images/2023/12/20231202_182541.jpg','The range top is cool and is a good perch.'],
    ['/images/2023/12/20231218_091122.jpg','Yume claiming the bed?'],
    ['/images/2024/02/20240201_145729.jpg','Well, she does seem to love it.'],
    ['/images/2024/02/20240217_014302.jpg','They both do.'],
    ['/images/2024/02/20240217_014801.jpg','Isn&#39;t June so beautiful?'],
    ['/images/2024/05/20240504_005935.jpg','One of the last times they shared the bed.'],
])

content.innerHTML = `\
    <h1>Cat Friends</h1>\
    <h5>December 2023 - May 2024</h5>\
    <br>\
    <p>Just some moments of June and Yume.</p>\
    <br>\
    <p>It's been interesting watching their relationship grow \
    and evolve. It only took about a week to aclimate Yume to her \
    new home, but it took longer for them to establish thier \
    roles so to speak. They're friens most of the time, but there \
    is some tension or territorial behavior on some level.</p>\
    <br>\
    <p>June used to sleep in my bed, then they both did, then at \
    some point June started to look at the bed like it was a place \
    to run away from. I really don't know how that happened.</p>\
    <br>\
    <div class='slides' data-sources='${slides_231220}'></div>
`