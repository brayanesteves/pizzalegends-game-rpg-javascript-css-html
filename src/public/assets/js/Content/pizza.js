window.PizzaTypes = {
    normal:"normal",
     spicy:"spicy",
    veggie:"veggie",
     fungi:"fungi",
     chill:"chill",
};

window.Pizzas = {
    "s001": {
           name:"Slice Samurai",
           type:PizzaTypes.spicy,
            src:"./src/public/assets/img/png/characters/pizzas/s001.png",
           icon:"./src/public/assets/img/png/icons/spicy.png",
        actions:["saucyStatus", "clumsyStatus", "damage1"],
    },
    "v001": {
           name:"Call Me Kale",
           type:PizzaTypes.veggie,
            src:"./src/public/assets/img/png/characters/pizzas/v001.png",
           icon:"./src/public/assets/img/png/icons/veggie.png",
        actions:["damage1"],
    },
    "f001": {
           name:"Portobello Express",
           type:PizzaTypes.fungi,
            src:"./src/public/assets/img/png/characters/pizzas/f001.png",
           icon:"./src/public/assets/img/png/icons/fungi.png",
        actions:["damage1"],
    },
};