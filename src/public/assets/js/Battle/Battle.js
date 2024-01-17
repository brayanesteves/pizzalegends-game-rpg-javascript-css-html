class Battle {
    constructor() {
        this.combatants = {
            "player1": new Combatant({
                ...Pizzas.s001,
                  team:"player",
                    hp:30,
                 maxHp:50,
                    xp:75,
                 level: 1,
                 /**
                  * @example
                  */
                // status:{
                //          type:"clumsy",
                //     expiresIn:3,
                // },
                 maxXp:100,
                status:null,
            }, this),
            "enemy1": new Combatant({
                ...Pizzas.v001,
                  team:"enemy",
                    hp: 50,
                 maxHp: 50,
                    xp: 20,
                 maxXp:100,
                 level:  1,
            }, this),
            "enemy2": new Combatant({
                ...Pizzas.f001,
                  team:"enemy",
                    hp: 50,
                 maxHp: 50,
                    xp: 30,
                 maxXp:100,
                 level:  1,
            }, this),
        };

        this.activeCombatants = {
            player:"player1",
             enemy: "enemy1",
        };
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = `
            <div class="Battle_hero">
                <img src="${'./src/public/assets/img/png/characters/people/hero.png'}" id="hero-image" alt="Hero" />
            </div>

            <div class="Battle_enemy">
                <img src="${'./src/public/assets/img/png/characters/people/npc3.png'}" id="enemy-image" alt="Enemy" />
            </div>
        `;
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        Object.keys(this.combatants).forEach((key) => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element);
        });
    }
}