class OverworldMap {

    constructor(config) {
        this.overworld         = null;
        this.gameObjects       = config.gameObjects;
        this.cutsceneSpace     = config.cutsceneSpace || {};
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

        // Reset NPCs to do their idle behavior.
        Object.values(this.gameObjects).forEach((object) => object.doBehaviorEvent(this));

    }

    checkForActionCutscene() {
        const hero       = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find((object) => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
        });
        // console.log({ match });
        if(!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events);
        }
    }

    checkForFootstepCutscene() {
        const hero  = this.gameObjects["hero"];
        const match = this.cutsceneSpace[`${hero.x},${hero.y}`];
        // console.log({ match });
        if(!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events);
        }
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
              talking:[
                {
                    events:[
                        {             type:"textMessage", text:"I'm busy...", faceHero:"npcA", },
                        {             type:"textMessage", text:"Go away!", },
                        { who:"hero", type:       "walk", direction:"up", },
                    ],
                },
                /*{
                    events:[
                        { type:"textMessage", text:"Somthing else here." },
                    ],
                },*/
              ],
            }),
            /*npcB:new Person({
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
            }),*/
            npcB:new Person({
                x:utils.withGrid(8),
                y:utils.withGrid(5),
              src:"./src/public/assets/img/png/characters/people/npc2.png",
            }),
        },
        walls: {
            // "16,16":true,
            [utils.asGridCoord(7, 6)]:true,
            [utils.asGridCoord(8, 6)]:true,
            [utils.asGridCoord(7, 7)]:true,
            [utils.asGridCoord(8, 7)]:true,
        },
        cutsceneSpace: {
            [utils.asGridCoord(7, 4)]: [
                {
                    events: [
                        { who:"npcB", type: "walk", direction:"left", },
                        { who:"npcB", type:"stand", direction:  "up", time:500, },
                        {             type:"textMessage", text:"You can't be in there!", },
                        { who:"npcB", type: "walk", direction:  "right", time:500, },

                        { who:"hero", type:"walk", direction:  "up", },
                        { who:"hero", type:"walk", direction:"left", },
                    ],
                }
            ],
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        { type:"changeMap", map:"Kitchen", },
                    ],
                }
            ],
        },
    },
    Kitchen: {
        lowerSrc:'./src/public/assets/img/png/maps/KitchenLower.png',
        upperSrc:'./src/public/assets/img/png/maps/KitchenUpper.png',
        gameObjects: {
            hero:new Person({
                // id:"hero",
                isPlayerControlled:true,
                                 x:utils.withGrid(3),
                                 y:utils.withGrid(5),
            }),            
            npcA:new Person({
                  x:utils.withGrid(9),
                  y:utils.withGrid(6),
                src:"./src/public/assets/img/png/characters/people/npc2.png",
                talking:[
                    {
                        events:[
                            { type:"textMessage", text:"You made it!", faceHero:"npcB", },
                        ],
                    },
                ],
            }),
            /*npcB:new Person({
                  x:utils.withGrid(10),
                  y:utils.withGrid(8),
                src:"./src/public/assets/img/png/characters/people/npc3.png",
            }),*/
        }
    }
};