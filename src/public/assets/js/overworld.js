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
                });
            });

            // Draw Lower Layer.
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // Draw Game Objects.
            Object.values(this.map.gameObjects).forEach((object) => {
                object.sprite.draw(this.ctx, cameraPerson);
            });

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
        this.directionInput = new DirectionsInput();
        this.directionInput.init();
        this.directionInput.direction; // "down"
        this.startGameLoop();

    }
}