const specialDrinks = [
  {
    name: "Snow Bear Glow-Wine",
    buffDescription:
      "Increase Stamina Recovery by 532 for 2 hours. These effects are scaled based on your level.",
    description:
      "A hearty mulled wine enjoyed during the New Life Festival. This Nord drink is always served piping hot.	",
    duration: 120,
    notes: "New Life Festival",
    quality: 1,
    icon: "icon-food-snowbearglowwine.png"
    
  },
  {
    name: "Bergama Warning Fire",
    buffDescription:
      "Increase Max Stamina by 4575 and Health Recovery by 500 for 2 hours. These effects are scaled based on your level.",
    description:
      "A seasonal drink enjoyed during the New Life Festival. This Redguard drink is served piping hot, and sharpens the imbiber's wits rather than dulls them.",
    duration: 120,
    notes: "New Life Festival",
    quality: 2,
    icon: "icon-food-bergamawarningfire.png"
  },
  {
    name: "Betnikh Twice-Spiked Ale",
    buffDescription:
      "Increase Magicka Recovery and Health Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      'A seasonal drink enjoyed during the New Life Festival. This Orc ale is exceptionally foamy, which helps create "gastric affirmation."',
    duration: 120,
    notes: "New Life Festival",
    quality: 2,
    icon: "icon-food-betnikhtwicespikedale.png"
  },
  {
    name: 'Bowl of "Peeled Eyeballs"',
    buffDescription:
      "Increase Magicka Recovery and Health Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      "A bowl of peeled grapes and cold noodles in fruit broth. Tasty, and a laugh riot at coven parties!",
    duration: 120,
    notes: "Witches Festival",
    quality: 2,
    icon: "icon-food-bowlofpeeledeyeballs.png"
  },
  {
    name: "Ghastly Eye Bowl",
    buffDescription:
      "Increase Max Magicka by 4256 and Magicka Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      '"Eyeballs" and live worms in a chilled banana and fleshfly broth. Squirms inside all the way down!',
    duration: 120,
    notes: "Witches Festival",
    quality: 2,
    icon: "icon-food-ghastlyeyebowl.png"
  },
  {
    name: "Orzorga's Red Frothgar",
    buffDescription: "",
    description: "Ice-cold dredged berry mash, in the old Orcish style.",
    duration: 120,
    notes: "Orsinium",
    quality: 2,
    icon: "icon-food-tea05.png"
  },
  {
    name: "Dubious Camoran Throne",
    buffDescription:
      "Increase Stamina Recovery by 319 and Max Stamina by 3192 and Max Health by 3511 for 2 hours. These effects are scaled based on your level.",
    description:
      "A dessert cocktail of jagga, rotmeth, and sweetbread puree. Definitely Green Pact Compliant.",
    duration: 120,
    notes: "Jester's Festival",
    quality: 3,
    icon: "icon-food-dubiouscamoranthrone.png"
  },
  {
    name: "Spring-Loaded Infusion",
    buffDescription:
      "Increase Max Health by 3724, and Max Magicka and Stamina by 3458 for 2 hours.",
    description:
      "Brewed from potable liquids in the Clockwork City. Probably volatile, and quite eye-opening.",
    duration: 120,
    notes: "Clockwork City",
    quality: 3,
    icon: "icon-food-stolentin.png"
  },
  {
    name: "Witchmother's Party Punch",
    buffDescription:
      "Increase Magicka Recovery, Stamina Recovery, and Health Recovery by 319 for 2 hours. These effects are scaled based on your level.",
    description: "An ice-cold punch of fruit mash and rye alcohol.",
    duration: 120,
    notes: "Witches Festival",
    quality: 3,
    icon: "icon-food-witchmotherspartypunch.png"
  },
  {
    name: "Witchmother's Potent Brew",
    buffDescription:
      "Increase Max Magicka by 3192, Magicka Recovery by 319, and Max Health by 3511 for 2 hours. These effects are scaled based on your level.",
    description: "It smells… dangerous. Toxic. And those are definitely bones.",
    duration: 120,
    notes: "Witches Festival",
    quality: 3,
    icon: "icon-food-witchmotherspotentbrew.png"
  },
  {
    name: "Double Bloody Mara",
    buffDescription:
      "Increase Max Health by 5054 and Max Magicka by 4575 for 2 hours. If you are a vampire, the blood in this drink will also mildly sate you. These effects are scaled based on your level.",
    description:
      "It reeks of cold blood, herbs, spices, and alcohol. Down the hatch!",
    duration: 120,
    notes: "Witches Festival",
    quality: 4,
    icon: "icon-food-doublebloodymara.png"
  },
  {
    name: "Hissmir Fish-Eye Rye",
    buffDescription:
      "Increase Magicka and Stamina Recovery by 457 for 2 hours. This drink will also grant you insights into what manner of fish spawn in various bodies of water, as well as alertness for nearby fish activity. These effects are scaled based on your level.",
    description:
      "A seasonal beverage enjoyed during the New Life Festival. This Argonian drink has a terrible smell, which is why it should be imbibed only with plugged nostrils.",
    duration: 120,
    notes: "New Life Festival",
    quality: 4,
    icon: "icon-food-hissmirfisheyerye.png"
  }
];

const specialFood = [
  {
    name: "Alcaire Festival Sword-Pie",
    buffDescription:
      "Increase Max Health by 5852 for 2 hours. These effects are scaled based on your level.",
    description:
      "A hearty meat pie enjoyed during the New Life Festival. This Breton meal is served with a miniature bone sword cooked inside. Recovering the sword is said to grant the luck of Magnus—and an occasional cracked tooth.",
    duration: 120,
    notes: "New Life Festival",
    quality: 1,
    icon: "icon-food-alcairefestivalswordpie.png"
  },
  {
    name: "Old Aldmeri Orphan Gruel",
    buffDescription:
      "Increase Max Magicka by 5320 for 2 hours. These effects are scaled based on your level.",
    description:
      "A porridge traditionally served during the New Life Festival. As porridge goes, this High Elf meal is surprisingly tasty",
    duration: 120,
    notes: "New Life Festival",
    quality: 1,
    icon: "icon-food-oldaldmeriorphangruel.png"
  },
  {
    name: "Princess' Delight",
    buffDescription:
      "Increase Max Magicka by 5320 for 2 hours. These effects are scaled based on your level. May also surprise and delight. (6s cooldown)",
    description:
      "A butterfly-shaped puff pastry stuffed with apples and... well, magic?",
    duration: 120,
    notes: "Jester's Festival",
    quality: 1,
    icon: "icon-food-princessdelight.png"
  },
  {
    name: "Rajhin's Sugar Claws",
    buffDescription:
      "Increase Max Stamina by 5320 for 2 hours. These effects are scaled based on your level.",
    description:
      "A mischievous dessert enjoyed during the New Life Festival. This Khajiit treat is more moon-sugar than pastry.",
    duration: 120,
    notes: "New Life Festival",
    quality: 1,
    icon: "icon-food-rajhinssugarclaws.png"
  },
  {
    name: "Sweet Sanguine Apples",
    buffDescription:
      "Increase Max Magicka by 5320 for 2 hours. These effects are scaled based on your level.",
    description:
      "Delicious and candy-coated treats to tempt one into mischief!",
    duration: 120,
    notes: "Witches Festival",
    quality: 1,
    icon: "icon-food-sweetsanguineapples.png"
  },
  {
    name: "Candied Jester's Coins",
    buffDescription:
      "Increase Max Stamina by 4256 and Magicka Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description: "Delightful confection coins for the famished numismatist.",
    duration: 120,
    notes: "Jester's Festival",
    quality: 2,
    icon: "icon-food-candiedjesterscoins.png"
  },
  {
    name: "Crisp and Crunchy Pumpkin Snack Skewer",
    buffDescription:
      "Increase Max Magicka and Max Stamina by 4256 for 2 hours. These effects are scaled based on your level.",
    description: "A lip-smacking skewer of roasted pumpkin and potato slices.",
    duration: 120,
    notes: "Witches Festival",
    quality: 2,
    icon: "icon-food-crispandcrunchypumpkinsnackskewer.png"
  },
  {
    name: "Crunchy Spider Skewer",
    buffDescription:
      "Increase Max Magicka by 4256 and Stamina Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      "Savoury spider eggs and centipedes glazed in a spicy acai sauce.",
    duration: 120,
    notes: "Witches Festival",
    quality: 2,
    icon: "icon-food-crunchyspiderskewer.png"
  },
  {
    name: "Deregulated Mushroom Stew",
    buffDescription:
      "Increase Health Recovery by 500 and Magicka Recovery by 457 for 2 hours.",
    description:
      "A piping hot stew of savoury truffles and fabricant flesh. Perfectly edible.",
    duration: 120,
    notes: "Clockwork City",
    quality: 2,
    icon: "icon-food-brownsoup.png"
  },
  {
    name: "Frosted Brains",
    buffDescription:
      "Increase Max Magicka by 4256 and Health Recovery by 425 for 2 hours. These effects are scaled based on your level.",
    description:
      "Candy-coated jellied brains on a convenient stick for eating on the go.",
    duration: 120,
    notes: "Witches Festival",
    quality: 2,
    icon: "icon-food-frostedbrains.png"
  },
  {
    name: 'Jagga-Drenched "Mud Ball"',
    buffDescription:
      "Increase Max Magicka and Max Stamina by 4575 for 2 hours. These effects are scaled based on your level.",
    description:
      "A seasonal dessert enjoyed during the New Life Festival. This Wood Elf treat is made with bone flour and senche-passed coffee beans. It is quite sticky.",
    duration: 120,
    notes: "New Life Festival",
    quality: 2,
    icon: "icon-food-jaggadrenchedmudball.png"
  },
  {
    name: "Lava Foot Soup-And-Saltrice",
    buffDescription:
      "Increase Max Stamina by 4575 and Stamina Recovery by 457 for 2 hours. These effects are scaled based on your level.",
    description:
      "A seasonal meal enjoyed during the New Life Festival. A good serving of this Dark Elf meal keeps the scrib on the surface of the broth.",
    duration: 120,
    notes: "New Life Festival",
    quality: 2,
    icon: "icon-food-lavafootsoupandsaltrice.png"
  },
  {
    name: "Orzorga's Blood Price Pie",
    buffDescription:
      "Increase Max Health by 5000 and Health Recovery by 500 for 2 hours.",
    description:
      "A pie of stewed blood and minced heart, among other things. Served cold.",
    duration: 120,
    notes: "Orsinium",
    quality: 2,
    icon: "icon-food-fruitpie.png"
  },
  {
    name: "Orzorga's Tripe Trifle Pocket",
    buffDescription:
      "Increase Max Health by 5000 and Stamina Recovery by 457 for 2 hours.",
    description:
      "A breaded pocket of minced gut and less appealing things, sweetened with beet sugar.",
    duration: 120,
    notes: "Orsinium",
    quality: 2,
    icon: "icon-food-crepe.png"
  },
  {
    name: "Artaeum Pickled Fish Bowl",
    buffDescription:
      "Increase Max Health by 5054 and Max Magicka by 4575 for 2 hours. These effects are scaled based on your level. Additionally, fish may be drawn to you.",
    description:
      "Mildly tart and mildly sweet, yet oddly delicious. And entirely raw.",
    duration: 120,
    notes: "Summerset",
    quality: 3,
    icon: "icon-food-artaeumpickledfishbowl.png"
  },
  {
    name: "Jewels of Misrule",
    buffDescription:
      "Increase Stamina and Magicka Recovery by 319 and Max Health by 3511 for 2 hours. These effects are scaled based on your level.",
    description: 'Candy "gems" to fill you with vim and energy.',
    duration: 120,
    notes: "Jester's Festival",
    quality: 3,
    icon: "icon-food-jewelsofmisrule.png"
  },
  {
    name: "Artaeum Takeaway Broth",
    buffDescription:
      "Increase Max Health by 3724 and Health Recovery by 351 and Max Stamina by 3458 and Stamina Recovery by 319 for 2 hours. These effects are scaled based on your level.",
    description:
      "A Broth of many different fish and mussels, boiled continuosly for a fortnight before being called ready. Hearty, if pungent.",
    duration: 120,
    notes: "Summerset",
    quality: 4,
    icon: "icon-food-brownchunkysoup.png"
  },
  {
    name: "Clockwork Citrus Filet",
    buffDescription:
      "Increase Max Health by 3724, Health Recovery by 351, Max Magicka by 3458 and Magicka Recovery by 319 for 2 hours.",
    description:
      "Fabricant flesh, perfectly seared and braised in local fruits. What passes for fruit, at least.",
    duration: 120,
    notes: "Clockwork City",
    quality: 4,
    icon: "icon-food-seafoodskillet.png"
  },
  {
    name: "Orzorga's Smoked Bear Haunch",
    buffDescription:
      "Increase Max Health by 3724, Health Recovery by 351 and Stamina and Magicka Recovery by 319",
    description:
      "Wrothgar's hearth-wives agree — the bear's haunch is just as tasty as its stuffed head.",
    duration: 120,
    notes: "Orsinium",
    quality: 4,
    icon: "icon-food-roastbeef.png"
  }
];

const food = [
  {
    name: "Garlic-And-Pepper Venison Steak",
    duration: 35,
    type: "Meat",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6608,
    maxStamina: 0, 
    icon: "icon-food-steakskillet.png"
  },
  {
    name: "Lilmoth Garlic Hagfish",
    duration: 35,
    type: "Meat",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6608,
    maxStamina: 0, 
    icon: "icon-food-fishskillet.png"
  },
  {
    name: "Millet and Beef Stuffed Peppers",
    duration: 35,
    type: "Meat",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6608,
    maxStamina: 0, 
    icon: "icon-food-grilledvegetables.png"
  },
  {
    name: "Firsthold Fruit and Cheese Plate",
    duration: 35,
    type: "Fruit",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6048,
    maxStamina: 0, 
    icon: "icon-food-grilledapples.png"
  },
  {
    name: "Thrice-Baked Gorapple Pie",
    duration: 35,
    type: "Fruit",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6048,
    maxStamina: 0, 
    icon: "icon-food-fruitpie.png"
  },
  {
    name: "Tomato Garlic Chutney",
    duration: 35,
    type: "Fruit",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 6048,
    maxStamina: 0, 
    icon: "icon-food-jampot.png"
  },
  {
    name: "Bravil's Best Beet Risotto",
    duration: 35,
    type: "Vegetable",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 0,
    maxStamina: 5320, 
    icon: "icon-food-risotto.png"
  },
  {
    name: "Hearty Garlic Corn Chowder",
    duration: 35,
    type: "Vegetable",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 0,
    maxStamina: 6048, 
    icon: "icon-food-brownsoup.png"
  },
  {
    name: "Tenmar Millet-Carrot Couscous",
    duration: 35,
    type: "Vegetable",
    quality: 1,
    maxMagicka: 0,
    maxHealth: 0,
    maxStamina: 6048, 
    icon: "icon-food-friedrice.png"
  },
  {
    name: "Melon-Baked Parmesan Pork",
    duration: 60,
    type: "Savoury",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 5395,
    maxStamina: 0, 
    icon: "icon-food-roastbeef.png"
  },
  {
    name: "Mistral Banana-Bunny Hash",
    duration: 60,
    type: "Savoury",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 5395,
    maxStamina: 0, 
    icon: "icon-food-seafoodskillet.png"
  },
  {
    name: "Solitude Salmon-Millet Soup",
    duration: 60,
    type: "Savoury",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 5395,
    maxStamina: 0, 
    icon: "icon-food-redchunkysoup.png"
  },
  {
    name: "Braised Rabbit With Spring Vegetables",
    duration: 60,
    type: "Ragout",
    quality: 2,
    maxMagicka: 0,
    maxHealth: 5395,
    maxStamina: 4936, 
    icon: "icon-food-stew.png"
  },
  {
    name: "Garlic Cod With Potato Crust",
    duration: 60,
    type: "Ragout",
    quality: 2,
    maxMagicka: 0,
    maxHealth: 5395,
    maxStamina: 4936, 
    icon: "icon-food-grilledfish.png"
  },
  {
    name: "Sticky Pork and Radish Noodles",
    duration: 60,
    type: "Ragout",
    quality: 2,
    maxMagicka: 0,
    maxHealth: 5395,
    maxStamina: 4936, 
    icon: "icon-food-brownrice.png"
  },
  {
    name: "Chevre-Radish Salad With Pumpkin Seeds",
    duration: 60,
    type: "Entremet",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 0,
    maxStamina: 4936, 
    icon: "icon-food-salad04.png"
  },
  {
    name: "Grapes and AshYam Falafel",
    duration: 60,
    type: "Entremet",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 0,
    maxStamina: 4936,
    icon: "icon-food-seafoodskillet.png"
  },
  {
    name: "Late Hearthfire Vegetable Tart",
    duration: 60,
    type: "Entremet",
    quality: 2,
    maxMagicka: 4936,
    maxHealth: 0,
    maxStamina: 4936, 
    icon: "icon-food-greentart.png"
  },
  {
    name: "Capon Tomato-Beet Casserole",
    duration: 120,
    type: "Gourmet",
    quality: 3,
    maxMagicka: 4105,
    maxHealth: 4462,
    maxStamina: 4105, 
    icon: "icon-food-opentoppie.png"
  },
  {
    name: "Jugged Rabbit in Preserves",
    duration: 120,
    type: "Gourmet",
    quality: 3,
    maxMagicka: 4105,
    maxHealth: 4462,
    maxStamina: 4105, 
    icon: "icon-food-jampot.png"
  },
  {
    name: "Longfin Pasty With Melon Sauce",
    duration: 120,
    type: "Gourmet",
    quality: 3,
    maxMagicka: 4105,
    maxHealth: 4462,
    maxStamina: 4105, 
    icon: "icon-food-crepe.png"
  },
  {
    name: "Withered Tree Inn Venison Pot Roast",
    duration: 120,
    type: "Gourmet",
    quality: 3,
    maxMagicka: 4105,
    maxHealth: 4462,
    maxStamina: 4105, 
    icon: "icon-food-stewpot.png"
  }
];

const drinks = [
  {
    name: "Colovian Ginger Beer",
    duration: 35,
    type: "Alcohol",
    quality: 1,
    magickaRec: 0,
    healthRec: 660,
    staminaRec: 0,
    icon: "icon-food-beer03.png"
  },
  {
    name: "Kragenmoor Zinger Mazte",
    duration: 35,
    type: "Alcohol",
    quality: 1,
    magickaRec: 0,
    healthRec: 660,
    staminaRec: 0,
    icon: "icon-food-redbottle.png"
  },
  {
    name: "Markarth Mead",
    duration: 35,
    type: "Alcohol",
    quality: 1,
    magickaRec: 0,
    healthRec: 660,
    staminaRec: 0,
    icon: "icon-food-brownbottle.png"
  },
  {
    name: "Heart's Day Rose Tea",
    duration: 35,
    type: "Tea",
    quality: 1,
    magickaRec: 604,
    healthRec: 0,
    staminaRec: 0,
    icon: "icon-food-tea06.png"
  },
  {
    name: "Muthsera's Remorse",
    duration: 35,
    type: "Tea",
    quality: 1,
    magickaRec: 604,
    healthRec: 0,
    staminaRec: 0,
    icon: "icon-food-tea05.png"
  },
  {
    name: "Soothing Bard's-Throat Tea",
    duration: 35,
    type: "Tea",
    quality: 1,
    magickaRec: 604,
    healthRec: 0,
    staminaRec: 0,
    icon: "icon-food-tea03.png"
  },
  {
    name: "Fredas Night Infusion",
    duration: 35,
    type: "Tonic",
    quality: 1,
    magickaRec: 0,
    healthRec: 0,
    staminaRec: 604,
    icon: "icon-food-spiritsblue.png"
  },
  {
    name: "Hagraven's Tonic",
    duration: 35,
    type: "Tonic",
    quality: 1,
    magickaRec: 0,
    healthRec: 0,
    staminaRec: 604,
    icon: "icon-food-chai.png"
  },
  {
    name: "Old Hegathe Lemon Kaveh",
    duration: 35,
    type: "Tonic",
    quality: 1,
    magickaRec: 0,
    healthRec: 0,
    staminaRec: 604,
    icon: "icon-food-blacktea.png"
  },
  {
    name: "Bravil Bitter Barley Beer",
    duration: 60,
    type: "Liqueur",
    quality: 2,
    magickaRec: 493,
    healthRec: 539,
    staminaRec: 0,
    icon: "icon-food-beer01.png"
  },
  {
    name: "Dragontail Blended Whisky",
    duration: 60,
    type: "Liqueur",
    quality: 2,
    magickaRec: 493,
    healthRec: 539,
    staminaRec: 0,
    icon: "icon-food-spirits.png"
  },
  {
    name: "Port Hunding Pinot Noir",
    duration: 60,
    type: "Liqueur",
    quality: 2,
    magickaRec: 493,
    healthRec: 539,
    staminaRec: 0,
    icon: "icon-food-beer.png"
  },
  {
    name: "Camlorn Sweet Brown Ale",
    duration: 60,
    type: "Tincture",
    quality: 2,
    magickaRec: 0,
    healthRec: 539,
    staminaRec: 493,
    icon: "icon-food-wine.png"
  },
  {
    name: "Flowing Bowl Green Port",
    duration: 60,
    type: "Tincture",
    quality: 2,
    magickaRec: 0,
    healthRec: 539,
    staminaRec: 493,
    icon: "icon-food-spiritsgreen.png"
  },
  {
    name: "Wide-Eye Double Rye",
    duration: 60,
    type: "Tincture",
    quality: 2,
    magickaRec: 0,
    healthRec: 539,
    staminaRec: 493,
    icon: "icon-food-pigsmilk.png"
  },
  {
    name: "Cloudrest Clarified Coffee",
    duration: 60,
    type: "Cordial",
    quality: 2,
    magickaRec: 493,
    healthRec: 0,
    staminaRec: 493,
    icon: "icon-food-jug.png"
  },
  {
    name: "Honest Lassie Honey Tea",
    duration: 60,
    type: "Cordial",
    quality: 2,
    magickaRec: 493,
    healthRec: 0,
    staminaRec: 493,
    icon: "icon-food-tea04.png"
  },
  {
    name: "Rosy Disposition Tonic",
    duration: 60,
    type: "Cordial",
    quality: 2,
    magickaRec: 493,
    healthRec: 0,
    staminaRec: 493,
    icon: "icon-food-profundity.png"
  },
  {
    name: "Lusty Argonian Maid Mazte",
    duration: 120,
    type: "Distillate",
    quality: 3,
    magickaRec: 410,
    healthRec: 446,
    staminaRec: 410,
    icon: "icon-food-jug.png"
  },
  {
    name: "Senche-Tiger Single Malt",
    duration: 120,
    type: "Distillate",
    quality: 3,
    magickaRec: 410,
    healthRec: 446,
    staminaRec: 410,
    icon: "icon-food-spirits.png"
  },
  {
    name: "Velothi View Vintage Malbec",
    duration: 120,
    type: "Distillate",
    quality: 3,
    magickaRec: 410,
    healthRec: 446,
    staminaRec: 410,
    icon: "icon-food-redbottle.png"
  },
  {
    name: "Orcrest Agony Pale Ale",
    duration: 120,
    type: "Distillate",
    quality: 3,
    magickaRec: 410,
    healthRec: 446,
    staminaRec: 410,
    icon: "icon-food-beer03.png"
  }
];

const getDrinkBuffDescription = (
  healthRec: number,
  magickaRec: number,
  staminaRec: number
) => {
  if (healthRec > 0 && magickaRec > 0 && staminaRec > 0) {
    return `Increase Health Recovery by ${healthRec}, Magicka Recovery by ${magickaRec} and Stamina Recovery by ${staminaRec}.`;
  } else if (healthRec > 0 && magickaRec > 0) {
    return `Increase Health Recovery by ${healthRec} and Magicka Recovery by ${magickaRec}.`;
  } else if (healthRec > 0 && staminaRec > 0) {
    return `Increase Health Recovery by ${healthRec} and Stamina Recovery by ${staminaRec}.`;
  } else if (healthRec > 0) {
    return `Increase Health Recovery by ${healthRec}.`;
  } else if (magickaRec > 0 && staminaRec > 0) {
    return `Increase Magicka Recovery by ${magickaRec} and Stamina Recovery by ${staminaRec}.`;
  } else if (magickaRec > 0) {
    return `Increase Magicka Recovery by ${magickaRec}.`;
  } else {
    return `Increase Stamina Recovery by ${staminaRec}.`;
  }
};

const getFoodBuffDescription = (
  maxHealth: number,
  maxMagicka: number,
  maxStamina: number
) => {
  if (maxHealth > 0 && maxMagicka > 0 && maxStamina > 0) {
    return `Increase Health Recovery by ${maxHealth}, Magicka Recovery by ${maxMagicka} and Stamina Recovery by ${maxStamina}.`;
  } else if (maxHealth > 0 && maxMagicka > 0) {
    return `Increase Health Recovery by ${maxHealth} and Magicka Recovery by ${maxMagicka}.`;
  } else if (maxHealth > 0 && maxStamina > 0) {
    return `Increase Health Recovery by ${maxHealth} and Stamina Recovery by ${maxStamina}.`;
  } else if (maxHealth > 0) {
    return `Increase Health Recovery by ${maxHealth}.`;
  } else if (maxMagicka > 0 && maxStamina > 0) {
    return `Increase Magicka Recovery by ${maxMagicka} and Stamina Recovery by ${maxStamina}.`;
  } else if (maxMagicka > 0) {
    return `Increase Magicka Recovery by ${maxMagicka}.`;
  } else {
    return `Increase Stamina Recovery by ${maxStamina}.`;
  }
};

const convertedSpecialDrinks = specialDrinks.map(specialDrink => ({
  ...specialDrink,
  buffType: "drink"
}));

const convertedSpecialFood = specialFood.map(food => ({
  ...food,
  buffType: "food"
}));

const convertedDrinks = drinks.map(drink => ({
  name: drink.name,
  buffDescription: getDrinkBuffDescription(
    drink.healthRec,
    drink.magickaRec,
    drink.staminaRec
  ),
  description: "",
  buffType: "drink",
  duration: drink.duration,
  notes: "",
  quality: drink.quality,
  type: drink.type
}));
const convertedFood = food.map(food => ({
  name: food.name,
  buffDescription: getFoodBuffDescription(
    food.maxHealth,
    food.maxMagicka,
    food.maxStamina
  ),
  description: "",
  buffType: "food",
  duration: food.duration,
  notes: "",
  quality: food.quality,
  type: food.type
}));

export const allBuffs = [
  ...convertedSpecialDrinks,
  ...convertedSpecialFood,
  ...convertedFood,
  ...convertedDrinks
];
