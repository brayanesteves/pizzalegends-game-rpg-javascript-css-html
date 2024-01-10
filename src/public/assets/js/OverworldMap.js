class OverworldMap {

    constructor(config) {
        this.gameObjects    = config.gameObjects;
        
        this.lowerImage     = new Image();
        this.lowerImage.src = config.lowerSrc;
        
        this.upperImage     = new Image();
        this.upperImage.src = config.upperSrc;
    }

    // <IMAGE: LOWER> //
    drawLowerImageSingle(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    // <.IMAGE: LOWER> //

    // <IMAGE: UPPER> //
    drawUpperImageSingle(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    // <.IMAGE: UPPER> //

}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc:'./src/public/assets/img/png/maps/DemoLower.png',
        upperSrc:'./src/public/assets/img/png/maps/DemoUpper.png',
        gameObjects: {
            hero:new Person({
                isPlayerControlled:true,
                                 x:utils.withGrid(5),
                                 y:utils.withGrid(6),
            }),
            npc1:new Person({
                  x:utils.withGrid(7),
                  y:utils.withGrid(9),
                src:"./src/public/assets/img/png/characters/people/npc1.png"
            }),
        }
    },
    Kitchen: {
        lowerSrc:'./src/public/assets/img/png/maps/KitchenLower.png',
        upperSrc:'./src/public/assets/img/png/maps/KitchenUpper.png',
        gameObjects: {
            hero:new Person({
                x:3,
                y:5,
            }),            
            npcA:new Person({
                  x:9,
                  y:6,
                src:"./src/public/assets/img/png/characters/people/npc2.png"
            }),
            npcB:new Person({
                  x:10,
                  y:8,
                src:"./src/public/assets/img/png/characters/people/npc3.png"
            }),
        }
    }
};