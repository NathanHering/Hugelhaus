let slides_250311a = JSON.stringify([
    ['/images/2025/03/20250311_155521.jpg','Here it is after a little bit of work for a few minutes.'],
    ['/images/2025/03/20250312_121047.jpg','Day two; I worked on it a little more.'],
    ['/images/2025/03/20250312_133142.jpg','Day two; I worked on it a little more.'],
    ['/images/2025/03/20250313_110004.jpg','Day three; I finished it up.'],
    ['/images/2025/03/20250313_155233.jpg','Day three; I finished it up.'],
    ['/images/2025/03/20250313_155548.jpg','Day three; I finished it up.'],
])

let slides_250311b = JSON.stringify([
    ['/images/2025/03/20250313_155758.jpg',''],
])

content.innerHTML = `\
    <h1>Chunks of Stump</h1>\
    <h5>Tuesday March 11 2025</h5>\
    <br>\
    <p>It's got to go.</p>\
    <br>\
    <p>This stump by the gate at the middle of the north fence is going to take some work. My little electric chainsaw can only do so much in one session. So, I'll just keep at it a little at a time.</p>\
    <br>\
    <p>This was one of the worst spots that needed work in the yard. Not only was that stump an issue, but the ground formed a bit of a crater.</p>\
    <br>\
    <div class='slides' data-sources='${slides_250311a}'></div>
    <br>\
    <p>It'll make good firewood in the odds-and-ends category.</p>\
    <br>\
    <div class='slides' data-sources='${slides_250311b}'></div>
`

