class Overworld {

    constructor(config) {
        this.element = config.element;
        this.canvas  = this.element.querySelector(".game-canvas");
        this.ctx     = this.canvas.getContext("2d");
    }

    init() {

        console.log("Hello from the 'Overworld'.", this);
        const image  = new Image();
        image.onload = () => {
            this.ctx.drawImage(
                image, 
                0,  // Left cut.
                0,  // Top cut.
            );
        };
        image.src = "/src/public/assets/img/png/maps/DemoLower.png";

        // Place some game object!
        const hero = new GameObject({
            x:5,
            y:6,
        });

        const npc1 = new GameObject({
              x:7,
              y:9,
            src:"/src/public/assets/img/png/characters/people/npc1.png"
        });

        setTimeout(() => {
            hero.sprite.draw(this.ctx);
            npc1.sprite.draw(this.ctx);
        }, 200);

    }
}