# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Start of seeds file'

u1  = User.create(email: "peach@wdi.com", password: "test", name: "Peach")
u2  = User.create(email: "diego@wdi.com", password: "test", name: "Diego")
u3  = User.create(email: "luke@wdi.com", password: "test", name: "Luke")
u4  = User.create(email: "xander@wdi.com", password: "test", name: "Xander")
u5  = User.create(email: "jin@wdi.com", password: "test", name: "Jin")
u6  = User.create(email: "hen@wdi.com", password: "test", name: "Hen")
u7  = User.create(email: "petr@wdi.com", password: "test", name: "Petr")
u8  = User.create(email: "jared@wdi.com", password: "test", name: "Jared")
u9  = User.create(email: "kevin@wdi.com", password: "test", name: "Kevin")
u10 = User.create(email: "olivia@wdi.com", password: "test", name: "Olivia")
u11 = User.create(email: "hayley@wdi.com", password: "test", name: "Hayley")

pj1 = Project.create(name: "Project1")
pj2 = Project.create(name: "Project2")

pg1 = Page.create(title: "Page1", project: pj1, content: "Page1 Spare ribs chicken beef ribs doner sausage ham hock turducken ribeye swine. Chicken ball tip shankle, sausage shank filet mignon venison sirloin frankfurter leberkas ham. Chicken doner beef ribs tenderloin biltong kielbasa pork loin venison rump shank. Pork belly turducken pork loin pig, ground round venison chicken kielbasa ham hock shoulder tenderloin capicola shank.")
pg2 = Page.create(title: "Page2", project: pj1, content: "Page2 Ham shank alcatra filet mignon. Pork chop pancetta ham tenderloin venison ribeye boudin sirloin rump capicola. Turkey tail meatloaf, t-bone corned beef ground round frankfurter meatball pork loin ball tip. Tenderloin biltong chuck turkey pork kevin filet mignon boudin rump sausage andouille tongue porchetta.")
pg3 = Page.create(title: "Page3", project: pj1, content: "Page3 Pork loin turducken pig kielbasa, pancetta ham spare ribs. Tenderloin shank drumstick alcatra bresaola jowl, meatloaf turducken pastrami porchetta. Brisket hamburger tail alcatra leberkas jerky. Ham pastrami strip steak tail, filet mignon shankle biltong landjaeger pig salami.")
pg4 = Page.create(title: "Page4", project: pj2, content: "Page4 Cow kevin beef ball tip chicken venison meatloaf tail short ribs. Porchetta chuck pork tenderloin shankle rump salami sausage corned beef. Cupim sirloin short loin, tongue pork chop jowl bacon filet mignon tail ribeye porchetta pork. Tongue ham swine picanha fatback pancetta frankfurter. Meatball andouille pork belly chicken pig frankfurter pastrami short ribs ham biltong turducken kielbasa turkey bresaola burgdoggen. Pastrami pork chop jerky pork turducken, doner ham hock meatball shoulder sirloin capicola venison. Cupim corned beef pastrami porchetta bacon chicken.")
pg5 = Page.create(title: "Page5", project: pj2, content: "Page5 Cupim frankfurter shank tri-tip shoulder. Ham hock landjaeger bresaola t-bone, capicola ground round meatball burgdoggen shank. Chuck drumstick jerky cow boudin, rump doner andouille. Ham pig leberkas, t-bone tongue drumstick shankle meatball porchetta short loin landjaeger andouille shank capicola chuck. Tri-tip boudin capicola alcatra shoulder filet mignon meatball prosciutto rump tongue cow pork loin. Cupim frankfurter spare ribs kielbasa flank jowl fatback tri-tip venison short ribs ham hock.")

ht1 = Highlighter.create(name: "Highlighter1", color: "#c9deff", backgroundColor: "#05347f", project: pj1)
ht2 = Highlighter.create(name: "Highlighter2", color: "#ead188", backgroundColor: "#af3b3b", project: pj1)
ht3 = Highlighter.create(name: "Highlighter3", color: "#134201", backgroundColor: "#c9fcb5", project: pj2)

pj1.users << u1
pj1.users << u2
pj1.users << u3
pj1.users << u4
pj1.users << u5
pj1.users << u6
pj1.users << u7
pj1.users << u8
pj1.users << u9
pj1.users << u10
pj1.users << u11
pj2.users << u1
pj2.users << u2
pj2.users << u3
pj2.users << u5
pj2.users << u6
pj2.users << u8
pj2.users << u9

puts 'End of seeds file'
