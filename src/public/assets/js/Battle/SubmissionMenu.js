class SubmissionMenu {
    constructor({ caster, enemy, onComplete, items, }) {
        this.caster     = caster;
        this.enemy      = enemy;
        this.onComplete = onComplete;

        let quantityMap = {};
        items.forEach((item) => {
            if(item.team === caster.team) {

                let existing = quantityMap[item.actionId];

                if(existing) {
                    existing.quantity += 1;
                } else {                    
                    quantityMap[item.actionId] = {
                          actionId:item.actionId,
                          quantity:1,
                        instanceId:item.instanceId,                  
                    };
                }
            }
        });
        this.items = Object.values(quantityMap);
        console.log(this.items);
    }

    getPages() {

        const backOption = {
                  label:"Go Back.",
            description:"Return to previous page.",
                handler:() => {
                this.keyboardMenu.setOptions(this.getPages().root);
            },
        };

        return {
            root:[
                {
                          label:"Attack",
                    description:"Choose an attack.",
                        handler:() => {
                        // Do something when chosen...
                        // console.log("GO TO ATTACKS PAGE.");
                        this.keyboardMenu.setOptions(this.getPages().attacks);
                    },
                    // right:() => {
                    //     return "Something";
                    // },
                },
                {
                          label:"Items",
                    description:"Choose an item.",
                       disabled:true,
                        handler:() => {
                        // Go to items page...
                        this.keyboardMenu.setOptions(this.getPages().items);
                    },
                },
                {
                    label:"Swap",
              description:"Change to another pizza.",
                  handler:() => {
                  // See pizza options.
              },
          },
            ],
            attacks:[
                ...this.caster.actions.map((key) => {
                    const action = Actions[key];
                    return {
                              label:action.name,
                        description:action.description,
                            handler:() => {
                                this.menuSubmit(action);
                        },
                    };
                }),
                /*{
                          label:"My first attack.",
                    description:"Does this...",
                        handler:() => {
                        // Submit this move.

                    },
                },*/
                backOption,
            ],
            items:[
                // Items will go here...
                ...this.items.map((item) => {
                    const action = Actions[item.actionId];
                    return {
                              label:action.name,
                        description:action.description,
                              right:()=> {
                                return `x${item.quantity}`;
                        },
                            handler:() => {
                                this.menuSubmit(action, item.instanceId);
                        },
                    };
                }),
                backOption,
            ],
        };
    }

    menuSubmit(action, instanceId = null) {

        this.keyboardMenu?.end();

        this.onComplete({
            action,
            target:action.targetType === "friendly" ? this.caster : this.enemy,
            instanceId,
        });

    }

    // <DECIDE> //
    decideSingle() {
        this.onComplete({
            action:Actions[this.caster.actions[0]],
            target:this.enemy,
        });
    }
    decide() {
        // TODO: Enemies should randomly 'decide' what to do...
        this.menuSubmit(Actions[this.caster.actions[0]]);
    }
    // <.DECIDE> //

    showMenu(container) {
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions(this.getPages().root);
    }

    init(container) {
        if(this.caster.isPlayerControlled) {
            // Show some UI.
            this.showMenu(container);
        } else {
            this.decide();
        }
    }
}