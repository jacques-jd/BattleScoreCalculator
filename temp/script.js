const fs = require('fs');

// Nodejs script that scrapes these csv files into json files

let chestBuffs = `
,Buff,Tier 1,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
,C2,Uzi,Gunslinger,0,2%,2%,0%,0%,0%,0%,1
,C3,Spell Caster Wand,Magician,0,4%,0%,0%,0%,0%,0%,1
,C5,Ceremonial Baton,Strategist,0,2%,0%,0%,0%,2%,0%,1
,C1,Labrys,Warrior,0,2%,0%,2%,0%,0%,0%,1
,C4,Blazing Ball,Manga,0,2%,0%,0%,0%,0%,2%,1
,C6,Harmonica,Musician,0,2%,0%,0%,2%,0%,0%,1
,,,,,,,,,,,
,,,,,,,,,,,
,,Tier 2,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
,C8,Grenade,Gunslinger,0,4%,4%,0%,0%,0%,0%,1
,C9,Magic Crystal Ball,Magician,0,5%,0%,0%,1%,0%,0%,1
,C11,AI Glasses,Strategist,0,4%,0%,0%,0%,4%,0%,1
,C7,Bow and Arrow,Warrior,0,4%,0%,4%,0%,0%,0%,1
,C10,Punch Glove,Manga,0,4%,0%,0%,0%,0%,4%,1
,C12,Bongo,Musician,0,4%,0%,0%,4%,0%,0%,1
,,,,,,,,,,,
Chest Buffs (XC),,,,,,,,,,,
,,Tier 3,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
,XC2,Uzi Carbine,Gunslinger,0,20%,10%,0%,0%,0%,0%,15
6,XC2,Uzi Carbine,Gunslinger,0,10%,7%,0%,0%,0%,0%,15
,XC3,Epic Spell Wand,Magician,0,40%,0%,0%,0%,0%,0%,15
5,XC3,Epic Spell Wand,Magician,0,18%,0%,0%,0%,0%,0%,15
,XC5,Regal Baton,Strategist,0,20%,0%,0%,0%,20%,0%,15
4,XC5,Regal Baton,Strategist,0,20%,0%,0%,0%,20%,0%,15
,XC1,Noble Labrys,Warrior,0,20%,0%,20%,0%,0%,0%,15
2,XC1,Noble Labrys,Warrior,0,24%,0%,24%,0%,0%,0%,15
,XC4,Fire Ball,Manga,0,20%,0%,0%,0%,0%,20%,15
3,XC4,Fire Ball,Manga,0,20%,0%,0%,0%,0%,20%,15
,XC6,Echo Harmonica,Musician,0,20%,0%,0%,20%,0%,0%,15
1,XC6,Echo Harmonica,Musician,0,25%,0%,0%,25%,0%,0%,15
,,,,,,,,,,,
,,Tier 4,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
,XC8,Stun Grenade,Gunslinger,0,25%,15%,0%,0%,0%,0%,15
6,XC8,Stun Grenade,Gunslinger,0,15%,10%,0%,0%,0%,0%,15
,XC9,Diviner Crystal Ball,Magician,0,50%,0%,0%,6%,0%,0%,15
5,XC9,Diviner Crystal Ball,Magician,0,25%,0%,0%,6%,0%,0%,15
,XC11,Polarized AI Glasses,Strategist,0,25%,0%,0%,0%,25%,0%,15
4,XC11,Polarized AI Glasses,Strategist,0,25%,0%,0%,0%,25%,0%,15
,XC7,Reflex Bow and Arrow,Warrior,0,25%,0%,25%,0%,0%,0%,15
2,XC7,Reflex Bow and Arrow,Warrior,0,28%,0%,28%,0%,0%,0%,15
,XC10,Fire Punch Glove,Manga,0,25%,0%,0%,0%,0%,25%,15
3,XC10,Fire Punch Glove,Manga,0,25%,0%,0%,0%,0%,25%,15
,XC12,Funky Bongo,Musician,0,25%,0%,0%,25%,0%,0%,15
1,XC12,Funky Bongo,Musician,0,30%,0%,0%,30%,0%,0%,15
,,,,,,,,,,,
Chest Buffs (XXC),,,,,,,,,,,
,,Tier 5,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
,XXC2,Uzi Pro,Gunslinger,0,40%,30%,0%,0%,0%,0%,35
6,XXC2,Uzi Pro,Gunslinger,0,30%,30%,0%,0%,0%,0%,35
,XXC3,Elder Spell Wand,Magician,0,65%,0%,0%,0%,0%,0%,35
2,XXC3,Elder Spell Wand,Magician,0,60%,0%,0%,0%,0%,0%,35
,XXC5,Royal Scepter,Strategist,0,40%,0%,0%,0%,40%,0%,35
5,XXC5,Royal Scepter,Strategist,0,40%,0%,0%,0%,40%,0%,35
,XXC1,Merciless Labrys,Warrior,0,40%,0%,40%,0%,0%,0%,35
3,XXC1,Merciless Labrys,Warrior,0,55%,0%,55%,0%,0%,0%,35
,XXC4,Lightning Ball,Manga,0,40%,0%,0%,0%,0%,40%,35
4,XXC4,Lightning Ball,Manga,0,40%,0%,0%,0%,0%,40%,35
,XXC6,Bass Harmonica,Musician,0,40%,0%,0%,40%,0%,0%,35
1,XXC6,Bass Harmonica,Musician,0,60%,0%,0%,60%,0%,0%,35
,,,,,,,,,,,
,,Tier 6,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
,XXC8,Incendiary Grenade,Gunslinger,0,50%,35%,0%,0%,0%,0%,30
6,XXC8,Incendiary Grenade,Gunslinger,0,25%,15%,0%,0%,0%,0%,30
,XXC9,Oracle Crystal Ball,Magician,0,75%,0%,0%,15%,0%,0%,30
2,XXC9,Oracle Crystal Ball,Magician,0,40%,0%,0%,18%,0%,0%,30
,XXC11,Spy AI Glasses,Strategist,0,50%,0%,0%,0%,50%,0%,30
4,XXC11,Spy AI Glasses,Strategist,0,35%,0%,0%,0%,25%,0%,30
,XXC7,Longbow and Arrow,Warrior,0,50%,0%,50%,0%,0%,0%,30
5,XXC7,Longbow and Arrow,Warrior,0,30%,0%,30%,0%,0%,0%,30
,XXC10,Spike Punch Glove,Manga,0,50%,0%,0%,0%,0%,50%,30
1,XXC10,Spike Punch Glove,Manga,0,50%,0%,0%,0%,0%,50%,30
,XXC12,Party Bongo,Musician,0,50%,0%,0%,50%,0%,0%,30
3,XXC12,Party Bongo,Musician,0,35%,0%,0%,35%,0%,0%,30
`;

let silverBuffs = `
Gunslinger,,,,,,,,,,
Buff,Name,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
B5,Shotgun,Gunslinger,0,1%,1%,0%,0%,0%,0%,1
B5,Shotgun,Gunslinger,0,1%,1%,0%,0%,0%,0%,1
B4,Gun - AKM,Gunslinger,0,3%,3%,0%,0%,0%,0%,15
B4,Gun - AKM,Gunslinger,0,2%,2%,0%,0%,0%,0%,15
B6,Sniper Rifle,Gunslinger,0,5%,5%,0%,0%,0%,0%,15
B6,Sniper Rifle,Gunslinger,0,5%,5%,0%,0%,0%,0%,15
XB5,Pistol,Gunslinger,0,10%,5%,0%,0%,0%,0%,15
XB5,Pistol,Gunslinger,0,10%,5%,0%,0%,0%,0%,15
XB4,Rare Gun - AKM,Gunslinger,0,15%,10%,0%,0%,0%,0%,15
XB4,Rare Gun - AKM,Gunslinger,0,8%,5%,0%,0%,0%,0%,15
B20,Time Bomb,Gunslinger,0,6%,6%,0%,0%,0%,0%,20
B20,Time Bomb,Gunslinger,0,6%,6%,0%,0%,0%,0%,20
BX2,Bazooka,Gunslinger,0,28%,26%,0%,0%,0%,0%,25
BX2,Bazooka,Gunslinger,0,18%,12%,0%,0%,0%,0%,25
XXB5,Automatic Handgun,Gunslinger,0,20%,15%,0%,0%,0%,0%,35
XXB5,Automatic Handgun,Gunslinger,0,20%,15%,0%,0%,0%,0%,35
XXB4,Epic Gun - AKM,Gunslinger,0,30%,25%,0%,0%,0%,0%,35
XXB4,Epic Gun - AKM,Gunslinger,0,28%,20%,0%,0%,0%,0%,35
XB6,Battle Sniper,Gunslinger,0,30%,25%,0%,0%,0%,0%,35
XB6,Battle Sniper,Gunslinger,0,25%,20%,0%,0%,0%,0%,35
XB20,Lithium Time Bomb,Gunslinger,0,35%,30%,0%,0%,0%,0%,35
XB20,Lithium Time Bomb,Gunslinger,0,28%,25%,0%,0%,0%,0%,35
XBX2,Super Bazooka,Gunslinger,0,50%,45%,0%,0%,0%,0%,45
XBX2,Super Bazooka,Gunslinger,0,35%,35%,0%,0%,0%,0%,45
XXB6,Marksman Sniper,Gunslinger,0,60%,40%,0%,0%,0%,0%,55
XXB6,Marksman Sniper,Gunslinger,0,40%,40%,0%,0%,0%,0%,55
XXB20,Digital Time Bomb,Gunslinger,0,70%,50%,0%,0%,0%,0%,55
XXB20,Digital Time Bomb,Gunslinger,0,45%,40%,0%,0%,0%,0%,55
XXBX2,Elite Bazooka,Gunslinger,0,90%,70%,0%,0%,0%,0%,65
XXBX2,Elite Bazooka,Gunslinger,0,50%,70%,0%,0%,0%,0%,65
,,,,,,,,,,
,,,,,,,,,,
Magician,,,,,,,,,,
Buff,Name,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
B7,Elixir,Magician,0,2%,0%,0%,0%,0%,0%,1
B7,Elixir,Magician,0,1%,0%,0%,0%,0%,0%,1
B8,Enchanted Tonic,Magician,0,3%,0%,0%,0%,0%,0%,5
B8,Enchanted Tonic,Magician,0,1%,0%,0%,0%,0%,0%,5
XB7,Strong Elixir,Magician,0,20%,0%,0%,0%,0%,0%,15
XB7,Strong Elixir,Magician,0,10%,0%,0%,0%,0%,0%,15
B9,Spell Book,Magician,0,7%,0%,0%,3%,0%,0%,15
B9,Spell Book,Magician,0,6%,0%,0%,3%,0%,0%,15
XB8,Magical Tonic,Magician,0,20%,0%,0%,0%,0%,0%,15
XB8,Magical Tonic,Magician,0,10%,0%,0%,0%,0%,0%,15
B21,Magic Ring,Magician,0,8%,0%,0%,5%,0%,0%,20
B21,Magic Ring,Magician,0,8%,0%,0%,5%,0%,0%,20
BX3,Broom,Magician,0,10%,0%,0%,10%,0%,0%,25
BX3,Broom,Magician,0,10%,0%,0%,10%,0%,0%,25
XXB7,Potent Elixir,Magician,0,40%,0%,0%,0%,0%,0%,35
XXB7,Potent Elixir,Magician,0,35%,0%,0%,0%,0%,0%,35
XXB8,Arcane Tonic,Magician,0,50%,0%,0%,0%,0%,0%,35
XXB8,Arcane Tonic,Magician,0,40%,0%,0%,0%,0%,0%,35
XB9,Druid Spell Book,Magician,0,50%,0%,0%,9%,0%,0%,35
XB9,Druid Spell Book,Magician,0,40%,0%,0%,12%,0%,0%,35
XB21,Coral Magic Ring,Magician,0,80%,0%,0%,10%,0%,0%,35
XB21,Coral Magic Ring,Magician,0,55%,0%,0%,12%,0%,0%,35
XBX3,Quirky Broom,Magician,0,75%,0%,0%,20%,0%,0%,45
XBX3,Quirky Broom,Magician,0,65%,0%,0%,15%,0%,0%,45
XXB9,Sorcerer Spell Book,Magician,0,100%,0%,0%,20%,0%,0%,55
XXB9,Sorcerer Spell Book,Magician,0,75%,0%,0%,20%,0%,0%,55
XXB21,Mythical Magic Ring,Magician,0,140%,0%,0%,20%,0%,0%,55
XXB21,Mythical Magic Ring,Magician,0,90%,0%,0%,25%,0%,0%,55
XXBX3,Lightningbolt Broom,Magician,0,140%,0%,0%,40%,0%,0%,65
XXBX3,Lightningbolt Broom,Magician,0,95%,0%,0%,30%,0%,0%,65
,,,,,,,,,,
,,,,,,,,,,
Manga,,,,,,,,,,
Buff,Name,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
B10,Shuriken,Manga,0,1%,0%,0%,0%,0%,1%,1
B10,Shuriken,Manga,0,1%,0%,0%,0%,0%,1%,1
B11,Pin,Manga,0,3%,0%,0%,0%,0%,3%,5
B11,Pin,Manga,0,3%,0%,0%,0%,0%,3%,5
XB10,Cross Shuriken,Manga,0,10%,0%,0%,0%,0%,10%,15
XB10,Cross Shuriken,Manga,0,10%,0%,0%,0%,0%,10%,15
B12,Ninja Sword,Manga,0,5%,0%,0%,0%,0%,5%,15
B12,Ninja Sword,Manga,0,5%,0%,0%,0%,0%,5%,15
XB11,Dagger,Manga,0,15%,0%,0%,0%,0%,15%,15
XB11,Dagger,Manga,0,15%,0%,0%,0%,0%,15%,15
B22,Nuclear Fusion,Manga,0,6%,0%,0%,0%,0%,6%,20
B22,Nuclear Fusion,Manga,0,6%,0%,0%,0%,0%,6%,20
BX4,Fan Book,Manga,0,8%,0%,0%,0%,0%,8%,25
BX4,Fan Book,Manga,0,8%,0%,0%,0%,0%,8%,25
XXB10,Eight Point Shuriken,Manga,0,20%,0%,0%,0%,0%,20%,35
XXB10,Eight Point Shuriken,Manga,0,20%,0%,0%,0%,0%,20%,35
XXB11,Bayonet,Manga,0,30%,0%,0%,0%,0%,30%,35
XXB11,Bayonet,Manga,0,30%,0%,0%,0%,0%,30%,35
XB12,Shadow Sword,Manga,0,30%,0%,0%,0%,0%,30%,35
XB12,Shadow Sword,Manga,0,30%,0%,0%,0%,0%,30%,35
XB22,Nuclear Fusion X,Manga,0,35%,0%,0%,0%,0%,35%,35
XB22,Nuclear Fusion X,Manga,0,35%,0%,0%,0%,0%,35%,35
XBX4,Special Fan Book,Manga,0,50%,0%,0%,0%,0%,50%,45
XBX4,Special Fan Book,Manga,0,50%,0%,0%,0%,0%,50%,45
XXB12,Samurai Sword,Manga,0,60%,0%,0%,0%,0%,60%,55
XXB12,Samurai Sword,Manga,0,60%,0%,0%,0%,0%,60%,55
XXB22,Nuclear Fusion Beta,Manga,0,70%,0%,0%,0%,0%,70%,55
XXB22,Nuclear Fusion Beta,Manga,0,70%,0%,0%,0%,0%,70%,55
XXBX4,Ultimate Fan Book,Manga,0,80%,0%,0%,0%,0%,80%,65
XXBX4,Ultimate Fan Book,Manga,0,80%,0%,0%,0%,0%,80%,65
,,,,,,,,,,
,,,,,,,,,,
Strategist,,,,,,,,,,
Buff,Name,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
B13,Chess Pieces ,Strategist,0,1%,0%,0%,0%,1%,0%,1
B13,Chess Pieces ,Strategist,0,1%,0%,0%,0%,1%,0%,1
B14,Magnifying Glass,Strategist,0,3%,0%,0%,0%,3%,0%,5
B14,Magnifying Glass,Strategist,0,3%,0%,0%,0%,3%,0%,5
XB13,Wood Chess Pieces,Strategist,0,10%,0%,0%,0%,10%,0%,15
XB13,Wood Chess Pieces,Strategist,0,10%,0%,0%,0%,10%,0%,15
B15,Puzzle Pieces,Strategist,0,5%,0%,0%,0%,5%,0%,15
B15,Puzzle Pieces,Strategist,0,5%,0%,0%,0%,5%,0%,15
XB14,Magnifying Glass X,Strategist,0,15%,0%,0%,0%,15%,0%,15
XB14,Magnifying Glass X,Strategist,0,15%,0%,0%,0%,15%,0%,15
B23,Smart Watch,Strategist,0,6%,0%,0%,0%,6%,0%,20
B23,Smart Watch,Strategist,0,6%,0%,0%,0%,6%,0%,20
BX5,Sextant,Strategist,0,8%,0%,0%,0%,8%,0%,25
BX5,Sextant,Strategist,0,8%,0%,0%,0%,8%,0%,25
XXB13,Gold Chess Pieces,Strategist,0,20%,0%,0%,0%,20%,0%,35
XXB13,Gold Chess Pieces,Strategist,0,20%,0%,0%,0%,20%,0%,35
XXB14,Magnifying Glass Z,Strategist,0,30%,0%,0%,0%,30%,0%,35
XXB14,Magnifying Glass Z,Strategist,0,30%,0%,0%,0%,30%,0%,35
XB15,Gen Zen Puzzle,Strategist,0,30%,0%,0%,0%,30%,0%,35
XB15,Gen Zen Puzzle,Strategist,0,30%,0%,0%,0%,30%,0%,35
XB23,Iris Smart Watch,Strategist,0,35%,0%,0%,0%,35%,0%,35
XB23,Iris Smart Watch,Strategist,0,35%,0%,0%,0%,35%,0%,35
XBX5,Vernier Sextant,Strategist,0,50%,0%,0%,0%,50%,0%,45
XBX5,Vernier Sextant,Strategist,0,50%,0%,0%,0%,50%,0%,45
XXB15,Impossible Puzzle,Strategist,0,60%,0%,0%,0%,60%,0%,55
XXB15,Impossible Puzzle,Strategist,0,60%,0%,0%,0%,60%,0%,55
XXB23,Techno Smart Watch,Strategist,0,70%,0%,0%,0%,70%,0%,55
XXB23,Techno Smart Watch,Strategist,0,70%,0%,0%,0%,70%,0%,55
XXBX5,Micrometer Sextant,Strategist,0,80%,0%,0%,0%,80%,0%,65
XXBX5,Micrometer Sextant,Strategist,0,80%,0%,0%,0%,80%,0%,65
,,,,,,,,,,
Warrior,,,,,,,,,,
Buff,Name,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
B1,Cannon,Warrior,0,1%,0%,1%,0%,0%,0%,1
B1,Cannon,Warrior,0,2%,0%,2%,0%,0%,0%,1
B2,Axe,Warrior,0,3%,0%,3%,0%,0%,0%,5
B2,Axe,Warrior,0,3%,0%,3%,0%,0%,0%,5
XB1,Super Cannon,Warrior,0,8%,0%,8%,0%,0%,0%,15
XB1,Super Cannon,Warrior,0,12%,0%,12%,0%,0%,0%,15
B3,Hammer,Warrior,0,5%,0%,5%,0%,0%,0%,15
B3,Hammer,Warrior,0,10%,0%,10%,0%,0%,0%,15
XB2,Power Axe,Warrior,0,15%,0%,15%,0%,0%,0%,15
XB2,Power Axe,Warrior,0,16%,0%,16%,0%,0%,0%,15
B19,Light Saber ,Warrior,0,6%,0%,6%,0%,0%,0%,20
B19,Light Saber ,Warrior,0,15%,0%,15%,0%,0%,0%,20
BX1,Taflon Knife,Warrior,0,8%,0%,8%,0%,0%,0%,25
BX1,Taflon Knife,Warrior,0,18%,0%,18%,0%,0%,0%,25
XXB1,Hybrid Cannon,Warrior,0,70%,0%,90%,0%,0%,0%,35
XXB1,Hybrid Cannon,Warrior,0,40%,0%,40%,0%,0%,0%,35
XXB2,Ultra Axe,Warrior,0,30%,0%,30%,0%,0%,0%,35
XXB2,Ultra Axe,Warrior,0,45%,0%,45%,0%,0%,0%,35
XB3,War Hammer,Warrior,0,30%,0%,30%,0%,0%,0%,35
XB3,War Hammer,Warrior,0,52%,0%,52%,0%,0%,0%,35
XB19,Green Light Saber,Warrior,0,20%,0%,35%,0%,0%,0%,35
XB19,Green Light Saber,Warrior,0,30%,0%,45%,0%,0%,0%,35
XBX1,Combat Knife,Warrior,0,25%,0%,50%,0%,0%,0%,45
XBX1,Combat Knife,Warrior,0,65%,0%,65%,0%,0%,0%,45
XXB3,Mjolnir,Warrior,0,60%,0%,60%,0%,0%,0%,55
XXB3,Mjolnir,Warrior,0,80%,0%,90%,0%,0%,0%,55
XXB19,Great Lightsaber,Warrior,0,60%,0%,70%,0%,0%,0%,55
XXB19,Great Lightsaber,Warrior,0,90%,0%,100%,0%,0%,0%,55
XXBX1,Hunting Knife,Warrior,0,70%,0%,90%,0%,0%,0%,65
XXBX1,Hunting Knife,Warrior,0,110%,0%,125%,0%,0%,0%,65
,,,,,,,,,,
,,,,,,,,,,
Musician,,,,,,,,,,
Buff,Name,Clan,Quantity,APower,ASpeed,Defense,Regen,HP,Critical,Level
B16,Mic,Musician,0,1%,0%,0%,1%,0%,0%,1
B16,Mic,Musician,0,2%,0%,0%,2%,0%,0%,1
B17,Trumpet,Musician,0,3%,0%,0%,3%,0%,0%,5
B17,Trumpet,Musician,0,5%,0%,0%,2%,0%,0%,5
XB16,Dynamic Mic,Musician,0,10%,0%,0%,10%,0%,0%,15
XB16,Dynamic Mic,Musician,0,12%,0%,0%,12%,0%,0%,15
B18,Speakers,Musician,0,5%,0%,0%,5%,0%,0%,15
B18,Speakers,Musician,0,5%,0%,0%,5%,0%,0%,15
XB17,Special Trumpet,Musician,0,15%,0%,0%,15%,0%,0%,15
XB17,Special Trumpet,Musician,0,16%,0%,0%,16%,0%,0%,15
B24,Harp,Musician,0,6%,0%,0%,6%,0%,0%,20
B24,Harp,Musician,0,8%,0%,0%,8%,0%,0%,20
BX6,Ukelele,Musician,0,8%,0%,0%,8%,0%,0%,25
BX6,Ukelele,Musician,0,12%,0%,0%,12%,0%,0%,25
XXB16,Condenser Mic,Musician,0,20,0%,0%,20,0%,0%,25
XXB16,Condenser Mic,Musician,0,40%,0%,0%,40%,0%,0%,35
XXB17,Elite Trumpet,Musician,0,30%,0%,0%,30%,0%,0%,35
XXB17,Elite Trumpet,Musician,0,45%,0%,0%,45%,0%,0%,35
XB18,Loud Speakers,Musician,0,30%,0%,0%,30%,0%,0%,35
XB18,Loud Speakers,Musician,0,50%,0%,0%,50%,0%,0%,35
XB24,Professional Harp,Musician,0,35%,0%,0%,35%,0%,0%,35
XB24,Professional Harp,Musician,0,55%,0%,0%,55%,0%,0%,35
XBX6,Banjo Ukelele,Musician,0,50%,0%,0%,50%,0%,0%,45
XBX6,Banjo Ukelele,Musician,0,70%,0%,0%,70%,0%,0%,45
XXB18,High-Range Speaker,Musician,0,60%,0%,0%,60%,0%,0%,55
XXB18,High-Range Speaker,Musician,0,80%,0%,0%,80%,0%,0%,55
XXB24,Soothing Harp,Musician,0,70%,0%,0%,70%,0%,0%,55
XXB24,Soothing Harp,Musician,0,90%,0%,0%,90%,0%,0%,55
XXBX6,Electric Ukelele,Musician,0,80%,0%,0%,80%,0%,0%,65
XXBX6,Electric Ukelele,Musician,0,100%,0%,0%,100%,0%,0%,65
`

function convertToJson(csv) {
    let processed = csv.split("\n");

    processed = processed.map((buff) => {
        buff = buff.split(",");

        if(buff[0] === '' || !isNaN(buff[0])) 
            buff.shift();

        buff = buff.map((value) => {
            if(value.endsWith("%")) {
                value = value.replace("%", "")
                value = parseInt(value) / 100;
            } 
            
            return value;
        });

        return buff;
    }).filter((buff) => !buff.includes("") && buff.length > 0 && !buff.includes("Clan"));

    let json =  [];

    processed.map((buff) => {
        json.push({
            id: buff[0],
            name: buff[1],
            clan: buff[2],
            attackPower: buff[4],
            attackSpeed: buff[5],
            defense: buff[6],
            regen: buff[7],
            hp: buff[8],
            critical: buff[9],
            levelReq: buff[10]
        });
    });

    json = json.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id == value.id
        ))
    );

    return json;
}

let jsonChestBuffs = convertToJson(chestBuffs);
let jsonSilverBuffs = convertToJson(silverBuffs);

fs.writeFile("buffs/chestBuffs.json", JSON.stringify(jsonChestBuffs), (err) => {
    if(err) throw err;
    console.log("Chest buffs saved!");
});

fs.writeFile("buffs/silverBuffs.json", JSON.stringify(jsonSilverBuffs), (err) => {
    if(err) throw err;
    console.log("Silver buffs saved!");
});



