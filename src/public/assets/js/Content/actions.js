window.Actions = {
    damage1: {
        name: "Whomp!",
        success: [
            { type:"textMessageWelcome",      text:"Something happened!", },
            { type: "textMessageSingle",      text:"{CASTER} uses {ACTION}", },
            { type:       "textMessage",      text:"{CASTER} uses Whomp!", },
            { type: "animationSpecific", animation:"willBeDefinedHere", },
            { type:         "animation", animation:"spin", },
            { type:       "stateChange",    damage:10, },
        ],
    }
};