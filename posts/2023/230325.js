let slides_230325 = JSON.stringify([
    ['/images/2023/03/20230316_101529.jpg','This is the old water heater.'],
    ['/images/2023/03/20230325_095121.jpg','I positioned the new water heater where I wanted it.'],
    ['/images/2023/03/20230325_095922.jpg','Finish draining the old water heater.'],
    ['/images/2023/03/20230325_102557.jpg','Connect the new one up to the water lines.'],
    ['/images/2023/03/20230326_182846.jpg','Start to disassemble the old water heater.'],
    ['/images/2023/04/20230401_094834.jpg','Now with the old water heater removed.']
])

content.innerHTML = `\
    <h1>Water Heater Breakdown</h1>\
    <h5>Saturday March 25 2023</h5>\
    <br>\
    <p>Well that sucked.</p>\
    <br>\
    <p>Having just dealt with the pellet stove issues the water \
    heater also just broke down. This required a complete replacement \
    though.</p>\
    <br>\
    <p>Of course I knew that this was coming. I wanted to replace \
    the water heater anyway. The old one was on some makeshift wooden \
    stand; presumably to make it so they didn't need to extend the wire \
    that reached from the outlet to power it up.</p>\
    <br>\
    <p>It didn't die all at once though. First, the thermostat broke and \
    the water overheated which created too much pressure. It then sprung \
    a leak. After that we were able to use it for a few more weeks. We just \
    had to turn it off when not in use. That wasn't fun. Going into the cold \
    basement a couple hours before taking a shower to turn on the heater and \
    let it heat up the water. Then going back down to turn it off was kind \
    of a pain.</p>\
    <br>\
    <p>At least this gave me a chance to learn a bit about how to install \
    PEX piping. It was pretty easy and it also gave me a chance to move \
    the heater as I orginally intended.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230325}'></div>
`