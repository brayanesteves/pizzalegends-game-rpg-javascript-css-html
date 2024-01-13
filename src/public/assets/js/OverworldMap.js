class OverworldMap {

    constructor(config) {
        this.gameObjects       = config.gameObjects;
        this.walls             = config.walls || {};
        
        this.lowerImage        = new Image();
        this.lowerImage.src    = config.lowerSrc;
        
        this.upperImage        = new Image();
        this.upperImage.src    = config.upperSrc;

        this.isCutscenePlaying = true;
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

    isSpaceTaken(currentX, currentY, direction) {
        const { x, y } = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    // <MOUNT: OBJECTS> //
    mountObjectsSingle() {
        Object.values(this.gameObjects).forEach((o) => {
            // TODO: Determine if this object should actually mount.
            o.mount(this);
        });
    }
    mountObjects() {
        Object.keys(this.gameObjects).forEach((key) => {
            let object    = this.gameObjects[key];
                object.id = key;
            // TODO: Determine if this object should actually mount.
            object.mount(this);
        });
    }
    // <.MOUNT: OBJECTS> //

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        // Start a loop of 'async' events 'await each one'.
        for(let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event:events[i],
                  map:this,
            });
            await eventHandler.init();
        }
        this.isCutscenePlaying = false;
    }
    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const { x, y } = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }

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
            // <EXAMPLE> //
            // npc1:new Person({
            //       x:utils.withGrid(7),
            //       y:utils.withGrid(9),
            //     src:"./src/public/assets/img/png/characters/people/npc1.png",
            // }),
            // <.EXAMPLE> //
            npcA:new Person({
                x:utils.withGrid(7),
                y:utils.withGrid(9),
              src:"./src/public/assets/img/png/characters/people/npc1.png",
              behaviorLoop:[
                // { type: "walk", direction: "left", },
                { type:"stand", direction: "left", time: 800, },
                { type:"stand", direction:   "up", time: 800, },
                { type:"stand", direction:"right", time:1200, },
                { type:"stand", direction:   "up", time: 300, },
              ],
            }),
            npcB:new Person({
                x:utils.withGrid(3),
                y:utils.withGrid(7),
              src:"./src/public/assets/img/png/characters/people/npc2.png",
              behaviorLoop:[
                { type: "walk", direction: "left", },
                { type:"stand", direction:   "up", time:800, },
                { type: "walk", direction:   "up", },
                { type: "walk", direction:"right", },
                { type: "walk", direction: "down", },
              ],
            }),
        },
        walls: {
            // "16,16":true,
            [utils.asGridCoord(7, 6)]:true,
            [utils.asGridCoord(8, 6)]:true,
            [utils.asGridCoord(7, 7)]:true,
            [utils.asGridCoord(8, 7)]:true,
        }
    },
    Kitchen: {
        lowerSrc:'./src/public/assets/img/png/maps/KitchenLower.png',
        upperSrc:'./src/public/assets/img/png/maps/KitchenUpper.png',
        gameObjects: {
            hero:new Person({
                // id:"hero",
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