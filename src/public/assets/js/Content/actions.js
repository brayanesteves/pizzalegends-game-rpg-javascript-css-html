window.Actions = {
    damage1: {
               name:"Whomp!",
        description: "Pillowy punch of dough",
            success: [
            // { type:"textMessageWelcome",      text:"Something happened!", },
            // { type: "textMessageSingle",      text:"{CASTER} uses {ACTION}", },
            { type:       "textMessage",      text:"{CASTER} uses {ACTION}!", },
            // { type: "animationSpecific", animation:"willBeDefinedHere", },
            { type:         "animation", animation:"spin", },
            { type:       "stateChange",    damage:10, },
        ],
    },
    saucyStatus: {
              name:"Tomato Squeeze",
       description:"Applies the Saucy status.",
        targetType:"friendly",
           success: [
            { type:"textMessage", text:"{CASTER} uses {ACTION}!", },
            // { type:"stateChange", onCaster:true, status:{ type:"saucy", expiresIn:3, }, },
            { type:"stateChange", status:{ type:"saucy", expiresIn:3, }, },
        ],
    },
    /*saucyStatus2: {
        name: "Tomato Squeeze!!!!",
        success: [
            { type:"textMessage", text:"{CASTER} uses {ACTION}!", },
            { type:"stateChange", status:{ type:"saucy", expiresIn:10, }, },
        ],
    },*/
    clumsyStatus: {
               name:"Olive Oil",
        description:"Slippery mess of deliciousness",
         targetType:"friendly",
            success: [
            { type:"textMessage", text:"{CASTER} uses {ACTION}!", },
            { type:  "animation", animation:"glop", color:"#dafd2a", },
            // { type:  "animation", animation:"glop", color:"red", },
            // { type:  "animation", animation:"glop", color:"#dafd2a", },
            // { type:"stateChange", onCaster:true, status:{ type:"clumsy", expiresIn:3, }, },
            { type:"stateChange", status:{ type:"clumsy", expiresIn:3, }, },
            { type:"textMessage", text:"{TARGET} is slipping all around!", },
        ],
    },

    // <ITEMS> //
    item_recoverStatus: {
               name:"Heating Lamp.",
        description:"Feeling fresh and warm.",
         targetType:"friendly",
            success: [
            { type:"textMessage", text:"{CASTER} uses a {ACTION}!", },
            { type:"stateChange", status:null, },
            { type:"stateChange", text:"Feeling fresh!", },
        ],
    },
    item_recoverHp: {
               name:"Parmesan.",
         targetType:"friendly",
            success: [
            { type:"textMessage", text:"{CASTER} sprinkles on some {ACTION}!", },
            { type:"stateChange", recover:10, },
            { type:"stateChange", text:"{CASTER} recovers HP!", },
        ],
    },
    // <.ITEMS> //
};