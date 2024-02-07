class SubmissionMenu {
    constructor({ caster, enemy, onComplete, }) {
        this.caster     = caster;
        this.enemy      = enemy;
        this.onComplete = onComplete;
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
                backOption,
            ],
        };
    }

    menuSubmit(action, instanceId = null) {

        this.keyboardMenu?.end();

        this.onComplete({
            action,
            target:action.targetType === "friendly" ? this.caster : this.enemy,
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