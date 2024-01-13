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

    init() {
        
        // console.log("Hello from the 'Overworld'.", this);
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();
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
            { who:"hero", type:"walk", direction:"down", },
            { who:"hero", type:"walk", direction:"down", },
            // { who:"hero", type:"walk", direction:"down", },
            // <.HERO> //

            // <NPC A> //
            { who:"npcA", type: "walk", direction:"left", },
            { who:"npcA", type: "walk", direction:"left", },
            { who:"npcA", type:"stand", direction:  "up", time:800, },
            // <.NPC A> //
        ]);

    }
}