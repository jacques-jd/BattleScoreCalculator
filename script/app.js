let buffTable = [];

window.addEventListener("load", () => {
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

    let fillout = who => {
        if(who==="joe") {
            form.ap.value = 138.1681;
            form.as.value = 1.6561;
            form.def.value = 160.2064;
            form.reg.value = 32.55;
            form.hp.value = 2140.3867;
            form.crit.value = 31.5136;
            document.querySelector("#buff1").value = "XC8";
            document.querySelector("#buff2").value = "BX2";
            document.querySelector("#buff3").value = "XC10";
            document.querySelector("#buff4").value = "EX5";
        } else if (who === "jessie") {
            form.ap.value = 315.6892;
            form.as.value = 3.0303;
            form.def.value = 364.676;
            form.reg.value = 71.8089;
            form.hp.value = 4468.9877;
            form.crit.value = 57.9275;
            document.querySelector("#buff1").value = "XXB20";
            document.querySelector("#buff2").value = "XXBX2";
            document.querySelector("#buff3").value = "XXBX4";
            document.querySelector("#buff4").value = "EX5";
        }
    }

    document.querySelector("#joefill").addEventListener("click", e => {
        fillout("joe");
    });

    document.querySelector("#jessiefill").addEventListener("click", e => {
        fillout("jessie");
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
        attackPower: 1,
        attackSpeed: 1,
        defense: 1,
        regen: 1,
        hp: 1,
        critical: 1
    }

    for(let buff of piggy.buffs) {
        boost.attackPower *= 1 + buff.attackPower;
        boost.attackSpeed *= 1 + buff.attackSpeed;
        boost.defense *= 1 + buff.defense;
        boost.regen *= 1 + buff.regen;
        boost.hp *= 1 + buff.hp;
        boost.critical *= 1 + buff.critical;
    }

    piggy.ap = piggy.ap * boost.attackPower;
    piggy.as = piggy.as * boost.attackSpeed;
    piggy.def = piggy.def * boost.defense;
    piggy.reg = piggy.reg * boost.regen;
    piggy.hp = piggy.hp * boost.hp;
    piggy.crit = piggy.crit * boost.critical;

    let defScore = piggy.hp + (piggy.def * 3) + (piggy.reg * 10);
    let atkScore = 0;

    for (let i = 0; i < 10; i++) {
        let critMultiplier = 1 * Math.floor(piggy.crit / 100);
        let bonusCrit = 0.5 + 1 * Math.floor(piggy.crit / 100);
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
        li.className = "card";
        // https://piggy.gg/images/stats/attack_power.png

        let icons = {
            ap: "https://piggy.gg/images/stats/attack_power.png",
            as: "https://piggy.gg/images/stats/attack_speed.png",
            def: "https://piggy.gg/images/stats/defence.svg",
            reg: "https://piggy.gg/images/stats/regeneration.png",
            hp: "https://piggy.gg/images/stats/health_points.png",
            crit: "https://piggy.gg/images/stats/critical_rate.png"
        }

        li.innerHTML = `<img width=14 src="${icons[key]}" alt="${key.toUpperCase()}" />
            ${key.toUpperCase()}: <b>${piggy[key]}</b>` 
            + (
                oldPiggy[key] !== piggy[key] 
                ? ` (+${((piggy[key] / oldPiggy[key]) * 100 - 100).toFixed(2)}%)` 
                : ""
            );

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
    let results = document.querySelector("#results");
    let totalScore = parseFloat(scores.atkScore) + parseFloat(scores.defScore);

    let totalFormattedScore = totalScore > 1000000 ? (totalScore/1000000).toFixed(2) + "m" : (totalScore/1000).toFixed(2) + "k";

    results.innerHTML = `
    <h3>Total Score: ${totalFormattedScore}</h3>
    <p>Attack Score: <b>${scores.atkScore}</b></p>
    <p>Defense Score: <b>${scores.defScore}</b></p>`;
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
    return fetch('/buffs/silverBuffs.json')
    .then((response) => response.json())
    .then((json) => { return json });
}

let getExBuffs = () => {
    return fetch('/buffs/exBuffs.json')
    .then((response) => response.json())
    .then((json) => { return json });
}