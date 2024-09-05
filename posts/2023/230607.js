let slides_230607 = JSON.stringify([
    ['/images/2023/06/20230607_103608.jpg','She&#39;s only two months old.'],
    ['/images/2023/06/20230608_161926.jpg','Cute is an understatement.'],
    ['/images/2023/06/20230620_143110.jpg','It took a week or so, but she and June are getting along.'],
    ['/images/2023/06/20230801_140818.jpg','When you&#39;re that small, you can go anywhere.']
])

content.innerHTML = `\
    <h1>Yume!</h1>\
    <h5>Tuesday June 06 2023</h5>\
    <br>\
    <p>We brought home a new friend from Rescue Village.</p>\
    <br>\
    <p>It's been a few months since Henry passed away. June seems kind \
    of lonely and we got used to their being two cats. So, it seemed \
    like time to get another cat.</p>\
    <br>\
    <p>We went to Rescue Village which is only a few minutes from here. \
    I have to admit, I really wanted another tuxedo kitty. When we got \
    there, they had litteraly just put Yume in the display area a few minutes \
    before we got there. They had named her Daffy, but we didn't want to \
    stick with that name.</p>\
    <br>\
    <p>I like giving cats very long names so we ended up calling her Yume Nikki \
    Madotsuki Kikiyama.</p>\
    <br>\
    <p>Yume Nikki is a RPG game my son told me about. Madotsuki is the character \
    you play as and Kikiyama is the pseudonym of the developer.</p>\
    <br>\
    <div class='slides' data-sources='${slides_230607}'></div>
`