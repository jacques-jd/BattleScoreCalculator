let buffTable = [];

window.addEventListener("load", () => {
    document.querySelector("#hidden").style.display = "none";

    getBuffs().then(buffs => {
        buffTable = buffs;
        populateBuffTables(buffs);
    });

    let results = document.querySelector("#results");

    let piggy = {
        buffs: [],
        ap: 0,
        as: 0,
        def: 0,
        reg: 0,
        hp: 0,
        crit: 0
    };

    let form = {
        ap: document.querySelector("#ap"),
        as: document.querySelector("#as"),
        def: document.querySelector("#def"),
        reg: document.querySelector("#reg"),
        hp: document.querySelector("#hp"),
        crit: document.querySelector("#crit")
    };

    document.querySelector("#fillOut").addEventListener("click", e => {
        form.ap.value = 138.1681;
        form.as.value = 1.6561;
        form.def.value = 160.2064;
        form.reg.value = 32.55;
        form.hp.value = 2140.3867;
        form.crit.value = 31.5136;
    });

    document.querySelector("#submit").addEventListener("click", e => {
        if(!validateFormValues(form)) {
            results.innerText = "Form is not filled out completely with positive numerical values.";
            return;
        }

        savePiggyStats(piggy, form);

        let scores = calculatePiggyBattle(piggy);

        displayResults(scores);
    });

});

let populateBuffTables = buffs => {
    //this will populate the select form with all the buffs

    buffs.unshift({
        id: "none", 
        name: "None", 
        clan: "None",
        attackPower: 0,
        attackSpeed: 0,
        defense: 0,
        regen: 0,
        hp: 0,
        critical: 0,
        levelReq: 0
    });

    // there are 4 buff selects. They are all under .buffList, but they are also known as #buff1, #buff2, #buff3, #buff4
    // This will make sure each select has a list of all buffs available (both chest and silver buffs)
    let buffLists = document.querySelectorAll(".buffList");

    buffLists.forEach(buffList => {
        for(let buff of buffs) {
            let option = document.createElement("option");
            option.value = buff.id;

            if(buff.id === "none") 
                option.textContent = "None";
            else
                option.textContent = `[ ${buff.clan} ] ${buff.id} - ${buff.name}`;

            buffList.appendChild(option);
        }
    });
}

let validateFormValues = form => {
    for (let key in form) {
        if (form[key].value === "") {
            return false;
        }

        if (form[key].value < 0) {
            return false;
        }

        if (!isNaN(form[key])) {
            return false;
        }
    }

    return true;
}

let savePiggyStats = (piggy, form) => {
    piggy.buffs = [];

    let buffLists = document.querySelectorAll(".buffList");

    for(let buffList of buffLists) {
        let buff = buffList.value;
        let buffObj = buffTable.find(b => b.id === buff);
        piggy.buffs.push(buffObj);
    }

    piggy.ap = parseFloat(form.ap.value);
    piggy.as = parseFloat(form.as.value);
    piggy.def = parseFloat(form.def.value);
    piggy.reg = parseFloat(form.reg.value);
    piggy.hp = parseFloat(form.hp.value);
    piggy.crit = parseFloat(form.crit.value);
}

let calculatePiggyBattle = piggy => {
    //before doing calculations, we need to add the buffs to the piggy stats
    oldPiggy = {...piggy};

    boost = {
        attackPower: 0,
        attackSpeed: 0,
        defense: 0,
        regen: 0,
        hp: 0,
        critical: 0
    }

    for(let buff of piggy.buffs) {
        boost.attackPower += buff.attackPower;
        boost.attackSpeed += buff.attackSpeed;
        boost.defense += buff.defense;
        boost.regen += buff.regen;
        boost.hp += buff.hp;
        boost.critical += buff.critical;
    }

    piggy.ap += piggy.ap *= boost.attackPower;
    piggy.as += piggy.as *= boost.attackSpeed;
    piggy.def += piggy.def *= boost.defense;
    piggy.reg += piggy.reg *= boost.regen;
    piggy.hp += piggy.hp *= boost.hp;
    piggy.crit += piggy.crit *= boost.critical;

    let defScore = piggy.hp + (piggy.def * 3) + (piggy.reg * 10);
    let atkScore = 0;

    for (let i = 0; i < 10; i++) {
        let critMultiplier = 0.5 * Math.floor(piggy.crit / 100);
        let bonusCrit = 0.5 + 0.5 * Math.floor(piggy.crit / 100);
        let finalCritMultiplier = 1 + critMultiplier;

        // gets the last 2 digits of the crit
        let critChance = piggy.crit % 100;

        // if the random number is less than or equal to the crit chance, then add bonus crit to final crit multiplier
        if (Math.random() * 100 <= critChance) {
            finalCritMultiplier += bonusCrit;
        }

        atkScore += ((piggy.ap * piggy.as) * finalCritMultiplier);
    }

    displayCalculatedPiggyStats(oldPiggy, piggy);

    return {atkScore: atkScore.toFixed(4), defScore: defScore.toFixed(4)};
}

let displayCalculatedPiggyStats = (oldPiggy, piggy) => {
    let piggyStats = document.querySelector("#piggy");

    let ul = document.createElement("ul");

    //dynamically creating a string while fetching the stats 
    for (let key in piggy) {
        if(key === "buffs") continue;

        let li = document.createElement("li");
        li.innerHTML = `${key.toUpperCase()}: <b>${piggy[key]}</b>` + (oldPiggy[key] !== piggy[key] ? ` (+${((piggy[key] / oldPiggy[key]) * 100 - 100).toFixed(2)}%)` : "");

        ul.appendChild(li);
    }
    
    //gonna clear out piggyStats first
    while(piggyStats.firstChild) {
        piggyStats.removeChild(piggyStats.firstChild);
    }

    //adding the stats
    piggyStats.appendChild(ul);
}

let displayResults = scores => { 
    document.querySelector("#hidden").style.display = "block";
    let results = document.querySelector("#results");
    let totalScore = parseFloat(scores.atkScore) + parseFloat(scores.defScore);
    results.innerHTML = `<p>Attack Score: <b>${scores.atkScore}</b></p>
    <p>Defense Score: <b>${scores.defScore}</b></p>
    <p>Total Score: <b>${totalScore}</b></p>`;
}

let getChestBuffs = () => {
    return fetch('./buffs/chestBuffs.json')
    .then((response) => response.json())
    .then((json) => { return json });
}

let getBuffs = async () => {
    let chestBuffs = await getChestBuffs();
    let silverBuffs = await getSilverBuffs();
    let exBuffs = await getExBuffs();

    return [
        ...chestBuffs,
        ...silverBuffs,
        ...exBuffs,
    ].sort((a, b) => a.clan.localeCompare(b.clan) || a.levelReq - b.levelReq);
}

let getSilverBuffs = () => {
    return fetch('./buffs/silverBuffs.json')
    .then((response) => response.json())
    .then((json) => { return json });
}

let getExBuffs = () => {
    return fetch('./buffs/exBuffs.json')
    .then((response) => response.json())
    .then((json) => { return json });
}