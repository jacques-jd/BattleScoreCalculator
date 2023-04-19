window.addEventListener("load", () => {
    document.querySelector("#hidden").style.display = "none";

    let buffTable = {};

    getBuffs().then(buffs => {
        buffTable = buffs;
        populateBuffTables(buffs);
    })

    let results = document.querySelector("#results");

    let piggy = {
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
    let chestBuffs = buffs.chestBuffs;
    let silverBuffs = buffs.silverBuffs;

    let allBuffs = [
        ...silverBuffs,
        ...chestBuffs
    ];
    
    allBuffs.sort((a, b) => a.clan.localeCompare(b.clan) || a.levelReq - b.levelReq);

    // there are 4 buff selects. They are all under .buffList, but they are also known as #buff1, #buff2, #buff3, #buff4
    // This will make sure each select has a list of all buffs available (both chest and silver buffs)
    let buffLists = document.querySelectorAll(".buffList");

    buffLists.forEach(buffList => {
        for(let buff of allBuffs) {
            let option = document.createElement("option");
            option.value = buff.id;
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
    let piggyStats = document.querySelector("#piggy")

    piggy.ap = parseFloat(form.ap.value);
    piggy.as = parseFloat(form.as.value);
    piggy.def = parseFloat(form.def.value);
    piggy.reg = parseFloat(form.reg.value);
    piggy.hp = parseFloat(form.hp.value);
    piggy.crit = parseFloat(form.crit.value);

    let statValues = [];
    let ul = document.createElement("ul");

    //dynamically creating a string while fetching the stats 
    for (let key in piggy) {
        let li = document.createElement("li");
        li.textContent = `${key.toUpperCase()}: ${piggy[key]}`;

        ul.appendChild(li);
    }
    
    //gonna clear out piggyStats first
    while(piggyStats.firstChild) {
        piggyStats.removeChild(piggyStats.firstChild);
    }

    //adding the stats
    piggyStats.appendChild(ul);
}

let calculatePiggyBattle = piggy => {
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

    return {atkScore: atkScore.toFixed(4), defScore: defScore.toFixed(4)};
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
    return {
        chestBuffs,
        silverBuffs
    }
}

let getSilverBuffs = () => {
    return fetch('./buffs/silverBuffs.json')
    .then((response) => response.json())
    .then((json) => { return json });
}