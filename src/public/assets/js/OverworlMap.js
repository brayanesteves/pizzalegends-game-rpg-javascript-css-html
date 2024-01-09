class OverworldMap {

    constructor(config) {
        this.gameObjects    = config.gameObjects;
        
        this.lowerImage     = new Image();
        this.lowerImage.src = config.lowerSrc;
        
        this.upperImage     = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }

}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc:'./src/public/assets/img/png/maps/DemoLower.png',
        upperSrc:'./src/public/assets/img/png/maps/DemoUpper.png',
        gameObjects: {
            hero:new GameObject({
                x:5,
                y:6,
            }),
            npc1:new GameObject({
                  x:7,
                  y:9,
                src:"./src/public/assets/img/png/characters/people/npc1.png"
            }),
        }
    },
    Kitchen: {
        lowerSrc:'./src/public/assets/img/png/maps/KitchenLower.png',
        upperSrc:'./src/public/assets/img/png/maps/KitchenUpper.png',
        gameObjects: {
            hero:new GameObject({
                x:3,
                y:5,
            }),            
            npcA:new GameObject({
                  x:9,
                  y:6,
                src:"./src/public/assets/img/png/characters/people/npc2.png"
            }),
            npcB:new GameObject({
                  x:10,
                  y:8,
                src:"./src/public/assets/img/png/characters/people/npc3.png"
            }),
        }
    }
};