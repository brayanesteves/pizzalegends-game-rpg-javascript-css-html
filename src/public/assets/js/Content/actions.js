window.Actions = {
    damage1: {
        name:"Whomp!",
        success: [
            // { type:"textMessageWelcome",      text:"Something happened!", },
            // { type: "textMessageSingle",      text:"{CASTER} uses {ACTION}", },
            { type:       "textMessage",      text:"{CASTER} uses Whomp!", },
            // { type: "animationSpecific", animation:"willBeDefinedHere", },
            { type:         "animation", animation:"spin", },
            { type:       "stateChange",    damage:10, },
        ],
    },
    saucyStatus: {
              name:"Tomato Squeeze",
        targetType:"friendly",
           success: [
            { type:"textMessage", text:"{CASTER} uses {ACTION}!", },
            { type:"stateChange", onCaster:true, status:{ type:"saucy", expiresIn:3, }, },
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
        targetType:"friendly",
           success: [
            { type:"textMessage", text:"{CASTER} uses {ACTION}!", },
            { type:  "animation", animation:"glop", color:"#dafd2a", },
            // { type:  "animation", animation:"glop", color:"red", },
            // { type:  "animation", animation:"glop", color:"#dafd2a", },
            { type:"stateChange", onCaster:true, status:{ type:"clumsy", expiresIn:3, }, },
            { type:"textMessage", text:"{TARGET} is slipping all around!", },
        ],
    },
};