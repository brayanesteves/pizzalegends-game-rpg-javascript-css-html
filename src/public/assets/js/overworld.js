class Overworld {

    constructor(config) {
        this.element = config.element;
        this.canvas  = this.element.querySelector(".game-canvas");
        this.ctx     = this.canvas.getContext("2d");
        this.map     = null;
    }

    startGameLoop() {

        const step = () => {

            // console.log("Stepping!");
            
            // Clear oof the canvas.
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Establish the camera 'person'.
            const cameraPerson = this.map.gameObjects.hero;

            // Update all objects.
            Object.values(this.map.gameObjects).forEach((object) => {
                // object.x += 1;
                object.update({
                    arrow:this.directionInput.direction,
                      map:this.map,
                });
            });

            // Draw Lower Layer.
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // Draw Game Objects.
            Object.values(this.map.gameObjects).sort((a, b) => {
                return a.y - b.y;
            }).forEach((object) => {
                object.sprite.draw(this.ctx, cameraPerson);
            });

            /**
             * @deprecated
             */
            /*Object.values(this.map.gameObjects).forEach((object) => {
                object.sprite.draw(this.ctx, cameraPerson);
            });*/

            /**
             * @deprecated
             */
            /*Object.values(this.map.gameObjects).forEach((object) => {
                // object.x += 1;
                object.update({
                    arrow:this.directionInput.direction,
                });
                object.sprite.draw(this.ctx, cameraPerson);
            });*/

            // Draw Upper Layer.
            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
                step();
            });
        };
        step();

    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            // Is there a person here to talk to?
            this.map.checkForActionCutscene();
        });
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", (e) => {
            if(e.detail.whoId === "hero") {
                // Her's position has changed.
                // console.log("NEW HERO POS!");
                this.map.checkForFootstepCutscene();
            }
        });
    }

    startMap(mapConfig) {
        this.map           = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();
    }

    init() {
        
        // console.log("Hello from the 'Overworld'.", this);
        // this.startMap(window.OverworldMaps.DemoRoom);
        this.startMap(window.OverworldMaps.Kitchen);

        this.bindActionInput();
        this.bindHeroPositionCheck();

        /**
         * 112, 96:true,
         * 112,112:true,
         * 128, 96:true,
         * 128,112:true
         */
        // console.log(this.map.walls);
        this.directionInput = new DirectionsInput();
        this.directionInput.init();
        // this.directionInput.direction; // "down"
        this.startGameLoop();

        this.map.startCutscene([

            // <HERO> //
            // { who:"hero", type:"walk", direction:"down", },
            // { who:"hero", type:"walk", direction:"down", },
            // { who:"hero", type:"walk", direction:"down", },
            // <.HERO> //
            
            // <NPC A> //
            // { who:"npcA", type: "walk", direction:"up", },
            // { who:"npcA", type: "walk", direction:"left", },
            // { who:"npcA", type: "walk", direction:"left", },
            // { who:"npcA", type: "walk", direction:"left", },
            // { who:"npcA", type:"stand", direction:  "up", time:800, },
            // <.NPC A> //

            // <HERO> //
            // { who:"hero", type:"stand", direction:"right", time:200, },
            // <.HERO> //

            // <CHANGE MAP> //
            { type:"changeMap", map:"DemoRoom" },
            // <.CHANGE MAP> //

            // <TEXT MESSAGE> //
            // { type:"textMessage", text:"WHY HELLO THERE!" },
            // { type:"textMessage", text:"This is the very first message!" },
            // <.TEXT MESSAGE> //

        ]);

    }
}