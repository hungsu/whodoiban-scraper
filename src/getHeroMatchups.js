const axios = require('axios');
const cheerio = require('cheerio');

// https://www.dotabuff.com/heroes
// Array.prototype.slice.call(document.querySelectorAll('.name')).map(function(element){return element.innerText});
const heronames = [
    "Abaddon",
    "Alchemist",
    "Ancient Apparition",
    "Anti-Mage",
    "Arc Warden",
    "Axe",
    "Bane",
    "Batrider",
    "Beastmaster",
    "Bloodseeker",
    "Bounty Hunter",
    "Brewmaster",
    "Bristleback",
    "Broodmother",
    "Centaur Warrunner",
    "Chaos Knight",
    "Chen",
    "Clinkz",
    "Clockwerk",
    "Crystal Maiden",
    "Dark Seer",
    "Dark Willow",
    "Dazzle",
    "Death Prophet",
    "Disruptor",
    "Doom",
    "Dragon Knight",
    "Drow Ranger",
    "Earth Spirit",
    "Earthshaker",
    "Elder Titan",
    "Ember Spirit",
    "Enchantress",
    "Enigma",
    "Faceless Void",
    "Grimstroke",
    "Gyrocopter",
    "Huskar",
    "Invoker",
    "Io",
    "Jakiro",
    "Juggernaut",
    "Keeper of the Light",
    "Kunkka",
    "Legion Commander",
    "Leshrac",
    "Lich",
    "Lifestealer",
    "Lina",
    "Lion",
    "Lone Druid",
    "Luna",
    "Lycan",
    "Magnus",
    "Medusa",
    "Meepo",
    "Mirana",
    "Monkey King",
    "Morphling",
    "Naga Siren",
    "Nature's Prophet",
    "Necrophos",
    "Night Stalker",
    "Nyx Assassin",
    "Ogre Magi",
    "Omniknight",
    "Oracle",
    "Outworld Devourer",
    "Pangolier",
    "Phantom Assassin",
    "Phantom Lancer",
    "Phoenix",
    "Puck",
    "Pudge",
    "Pugna",
    "Queen of Pain",
    "Razor",
    "Riki",
    "Rubick",
    "Sand King",
    "Shadow Demon",
    "Shadow Fiend",
    "Shadow Shaman",
    "Silencer",
    "Skywrath Mage",
    "Slardar",
    "Slark",
    "Sniper",
    "Spectre",
    "Spirit Breaker",
    "Storm Spirit",
    "Sven",
    "Techies",
    "Templar Assassin",
    "Terrorblade",
    "Tidehunter",
    "Timbersaw",
    "Tinker",
    "Tiny",
    "Treant Protector",
    "Troll Warlord",
    "Tusk",
    "Underlord",
    "Undying",
    "Ursa",
    "Vengeful Spirit",
    "Venomancer",
    "Viper",
    "Visage",
    "Warlock",
    "Weaver",
    "Windranger",
    "Winter Wyvern",
    "Witch Doctor",
    "Wraith King",
    "Zeus"
]
const heroUrls = [
    "https://www.dotabuff.com/heroes/abaddon/counters",
    "https://www.dotabuff.com/heroes/alchemist/counters",
    "https://www.dotabuff.com/heroes/ancient-apparition/counters",
    "https://www.dotabuff.com/heroes/anti-mage/counters",
    "https://www.dotabuff.com/heroes/arc-warden/counters",
    "https://www.dotabuff.com/heroes/axe/counters",
    "https://www.dotabuff.com/heroes/bane/counters",
    "https://www.dotabuff.com/heroes/batrider/counters",
    "https://www.dotabuff.com/heroes/beastmaster/counters",
    "https://www.dotabuff.com/heroes/bloodseeker/counters",
    "https://www.dotabuff.com/heroes/bounty-hunter/counters",
    "https://www.dotabuff.com/heroes/brewmaster/counters",
    "https://www.dotabuff.com/heroes/bristleback/counters",
    "https://www.dotabuff.com/heroes/broodmother/counters",
    "https://www.dotabuff.com/heroes/centaur-warrunner/counters",
    "https://www.dotabuff.com/heroes/chaos-knight/counters",
    "https://www.dotabuff.com/heroes/chen/counters",
    "https://www.dotabuff.com/heroes/clinkz/counters",
    "https://www.dotabuff.com/heroes/clockwerk/counters",
    "https://www.dotabuff.com/heroes/crystal-maiden/counters",
    "https://www.dotabuff.com/heroes/dark-seer/counters",
    "https://www.dotabuff.com/heroes/dark-willow/counters",
    "https://www.dotabuff.com/heroes/dazzle/counters",
    "https://www.dotabuff.com/heroes/death-prophet/counters",
    "https://www.dotabuff.com/heroes/disruptor/counters",
    "https://www.dotabuff.com/heroes/doom/counters",
    "https://www.dotabuff.com/heroes/dragon-knight/counters",
    "https://www.dotabuff.com/heroes/drow-ranger/counters",
    "https://www.dotabuff.com/heroes/earth-spirit/counters",
    "https://www.dotabuff.com/heroes/earthshaker/counters",
    "https://www.dotabuff.com/heroes/elder-titan/counters",
    "https://www.dotabuff.com/heroes/ember-spirit/counters",
    "https://www.dotabuff.com/heroes/enchantress/counters",
    "https://www.dotabuff.com/heroes/enigma/counters",
    "https://www.dotabuff.com/heroes/faceless-void/counters",
    "https://www.dotabuff.com/heroes/grimstroke/counters",
    "https://www.dotabuff.com/heroes/gyrocopter/counters",
    "https://www.dotabuff.com/heroes/huskar/counters",
    "https://www.dotabuff.com/heroes/invoker/counters",
    "https://www.dotabuff.com/heroes/io/counters",
    "https://www.dotabuff.com/heroes/jakiro/counters",
    "https://www.dotabuff.com/heroes/juggernaut/counters",
    "https://www.dotabuff.com/heroes/keeper-of-the-light/counters",
    "https://www.dotabuff.com/heroes/kunkka/counters",
    "https://www.dotabuff.com/heroes/legion-commander/counters",
    "https://www.dotabuff.com/heroes/leshrac/counters",
    "https://www.dotabuff.com/heroes/lich/counters",
    "https://www.dotabuff.com/heroes/lifestealer/counters",
    "https://www.dotabuff.com/heroes/lina/counters",
    "https://www.dotabuff.com/heroes/lion/counters",
    "https://www.dotabuff.com/heroes/lone-druid/counters",
    "https://www.dotabuff.com/heroes/luna/counters",
    "https://www.dotabuff.com/heroes/lycan/counters",
    "https://www.dotabuff.com/heroes/magnus/counters",
    "https://www.dotabuff.com/heroes/medusa/counters",
    "https://www.dotabuff.com/heroes/meepo/counters",
    "https://www.dotabuff.com/heroes/mirana/counters",
    "https://www.dotabuff.com/heroes/monkey-king/counters",
    "https://www.dotabuff.com/heroes/morphling/counters",
    "https://www.dotabuff.com/heroes/naga-siren/counters",
    "https://www.dotabuff.com/heroes/natures-prophet/counters",
    "https://www.dotabuff.com/heroes/necrophos/counters",
    "https://www.dotabuff.com/heroes/night-stalker/counters",
    "https://www.dotabuff.com/heroes/nyx-assassin/counters",
    "https://www.dotabuff.com/heroes/ogre-magi/counters",
    "https://www.dotabuff.com/heroes/omniknight/counters",
    "https://www.dotabuff.com/heroes/oracle/counters",
    "https://www.dotabuff.com/heroes/outworld-devourer/counters",
    "https://www.dotabuff.com/heroes/pangolier/counters",
    "https://www.dotabuff.com/heroes/phantom-assassin/counters",
    "https://www.dotabuff.com/heroes/phantom-lancer/counters",
    "https://www.dotabuff.com/heroes/phoenix/counters",
    "https://www.dotabuff.com/heroes/puck/counters",
    "https://www.dotabuff.com/heroes/pudge/counters",
    "https://www.dotabuff.com/heroes/pugna/counters",
    "https://www.dotabuff.com/heroes/queen-of-pain/counters",
    "https://www.dotabuff.com/heroes/razor/counters",
    "https://www.dotabuff.com/heroes/riki/counters",
    "https://www.dotabuff.com/heroes/rubick/counters",
    "https://www.dotabuff.com/heroes/sand-king/counters",
    "https://www.dotabuff.com/heroes/shadow-demon/counters",
    "https://www.dotabuff.com/heroes/shadow-fiend/counters",
    "https://www.dotabuff.com/heroes/shadow-shaman/counters",
    "https://www.dotabuff.com/heroes/silencer/counters",
    "https://www.dotabuff.com/heroes/skywrath-mage/counters",
    "https://www.dotabuff.com/heroes/slardar/counters",
    "https://www.dotabuff.com/heroes/slark/counters",
    "https://www.dotabuff.com/heroes/sniper/counters",
    "https://www.dotabuff.com/heroes/spectre/counters",
    "https://www.dotabuff.com/heroes/spirit-breaker/counters",
    "https://www.dotabuff.com/heroes/storm-spirit/counters",
    "https://www.dotabuff.com/heroes/sven/counters",
    "https://www.dotabuff.com/heroes/techies/counters",
    "https://www.dotabuff.com/heroes/templar-assassin/counters",
    "https://www.dotabuff.com/heroes/terrorblade/counters",
    "https://www.dotabuff.com/heroes/tidehunter/counters",
    "https://www.dotabuff.com/heroes/timbersaw/counters",
    "https://www.dotabuff.com/heroes/tinker/counters",
    "https://www.dotabuff.com/heroes/tiny/counters",
    "https://www.dotabuff.com/heroes/treant-protector/counters",
    "https://www.dotabuff.com/heroes/troll-warlord/counters",
    "https://www.dotabuff.com/heroes/tusk/counters",
    "https://www.dotabuff.com/heroes/underlord/counters",
    "https://www.dotabuff.com/heroes/undying/counters",
    "https://www.dotabuff.com/heroes/ursa/counters",
    "https://www.dotabuff.com/heroes/vengeful-spirit/counters",
    "https://www.dotabuff.com/heroes/venomancer/counters",
    "https://www.dotabuff.com/heroes/viper/counters",
    "https://www.dotabuff.com/heroes/visage/counters",
    "https://www.dotabuff.com/heroes/warlock/counters",
    "https://www.dotabuff.com/heroes/weaver/counters",
    "https://www.dotabuff.com/heroes/windranger/counters",
    "https://www.dotabuff.com/heroes/winter-wyvern/counters",
    "https://www.dotabuff.com/heroes/witch-doctor/counters",
    "https://www.dotabuff.com/heroes/wraith-king/counters",
    "https://www.dotabuff.com/heroes/zeus/counters"
  ]
let promises = [];

const heroes = {}

const getHeroFromHtmlString = htmlString => {
    const $ = cheerio.load(htmlString)
    const winrateString = $('.header-content-secondary dl dd span').text()
    var advantage = parseFloat(winrateString.slice(0, 5)) - 50

    var heroRows = $('table.sortable tbody tr')

    var matchups = {}

    heroRows.each((i, element) => {
        var cells = $(element).find('td')

        // Takes form "/heroes/broodmother"
        var heroName = $(element).data('link-to').split('/').pop()

        matchups[heroName] = -parseFloat($(cells.get(2)).data('value')).toFixed(4)
    });

    const name = $('.image-hero.image-avatar').attr('alt')

    var hero = {
        name: name,
        advantage: advantage.toFixed(4),
        matchups: matchups
    }

    return (hero)
}

heroUrls.forEach((url, index) => {
    let heroname = url.split('/')[4]
    promises.push(axios.get(url)
        .then(response => {
            let hero = getHeroFromHtmlString(response.data)
            console.log(`${hero.name} fetched.`)
            heroes[heroname] = hero
        })
    )
})

const fs = require('fs');
Promise.all(promises)
    .then(() => {
        // console.log(heroes)

        // Fails if file doesn't exist
        fs.writeFile("./dist/heroes.json", JSON.stringify(heroes), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    })
