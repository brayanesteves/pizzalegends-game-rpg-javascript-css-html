class BattleEvent {
    constructor(event, battle) {
        this.event  = event;
        this.battle = battle;
    }

    textMessage(resolve) {
        // console.log("A MESSAGE.");
        const text = this.event.text.replace("{CASTER}", this.event.caster?.name).replace("{TARGET}", this.event.target?.name).replace("{ACTION}", this.event.action?.name);
        const message = new TextMessage({
                  //text:this.event.text,
                  text,
            onComplete:() => {
                resolve();
            },
        });
        message.init(this.battle.element);
    }

    async stateChangeSingle(resolve) {
        const { caster, target, damage } = this.event;
        if(damage) {
            // Modify the target to have less 'HP'.
            target.update({
                hp:target.hp - damage,
            });

            // Start blinking.
            target.pizzaElement.classList.add("battle-damage-blink");
        }

        // Wait a little bit.
        await utils.wait(600);

        // Stop blinking.
        target.pizzaElement.classList.remove("battle-damage-blink");
        resolve();
    }

    async stateChange(resolve) {
        const { caster, target, damage, recover, status, action, } = this.event;
        let who = this.event.onCaster ? caster : target;
        // if(action.targetType === "friendly") {
        //     who = caster;
        // }

        if(damage) {
            // Modify the target to have less 'HP'.
            target.update({
                hp:target.hp - damage,
            });

            // Start blinking.
            target.pizzaElement.classList.add("battle-damage-blink");
        }

        if(recover) {
            
            let newHp = who.hp + recover;
            if(newHp > who.maxHp) {
                newHp = who.maxHp;
            }
            who.update({
                hp:newHp,
            });
        }

        if(status) {
            who.update({
                status:{...status},
            });
        }

        if(status === null) {
            who.update({
                status:null,
            });
        }

        // Wait a little bit.
        await utils.wait(600);

        // Stop blinking.
        target.pizzaElement.classList.remove("battle-damage-blink");
        resolve();
    }

    // <SUBMISSION: MENU> //
    submissionMenuSingle(resolve) {
        const menu = new SubmissionMenu({
                caster:this.event.caster,
                 enemy:this.event.enemy,
            onComplete:(submission) => {
                // 'submission' { what move to use, who to use it on }
                resolve(submission);
            },
        });
        menu.init(this.battle.element);
    }
    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
                caster:this.event.caster,
                 enemy:this.event.enemy,
                 items:this.battle.items,
            onComplete:(submission) => {
                // 'submission' { what move to use, who to use it on }
                resolve(submission);
            },
        });
        menu.init(this.battle.element);
    }
    // <SUBMISSION: MENU> //

    animation(resolve) {
        const fn = BattleAnimations[this.event.animation];
        fn(this.event, resolve);
    }

    init(resolve) {
        // console.log(this.event.type);
        this[this.event.type](resolve);
    }
}