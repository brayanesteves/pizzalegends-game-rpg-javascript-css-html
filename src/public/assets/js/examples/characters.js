const x    = 5;
const y    = 6;

const shadow = new Image();
shadow.onload = () => {
    this.ctx.drawImage(
        shadow, 
        0,  // Left cut.
        0,  // Top cut.
        32, // Width of cut.
        32, // Height of cut.
        x * 16 - 8,
        y * 16 - 18,
        32,
        32
    );
};
shadow.src = "./src/public/assets/img/png/characters/shadow.png";

const hero = new Image();
hero.onload = () => {
        this.ctx.drawImage(
        hero, 
        0,  // Left cut.
        0,  // Top cut.
        32, // Width of cut.
        32, // Height of cut.
        x * 16 - 8,
        y * 16 - 18,
        32,
        32
    );
};
hero.src = "./src/public/assets/img/png/characters/people/hero.png";

const image  = new Image();
image.onload = () => {
this.ctx.drawImage(
    image, 
    0,  // Left cut.
    0,  // Top cut.
    );
};
image.src = `./src/public/assets/img/png/maps/DemoLower.png`;

// Place some game object!
const hero = new GameObject({
    x:5,
    y:6,
});

const npc1 = new GameObject({
      x:7,
      y:9,
    src:`./src/public/assets/img/png/characters/people/npc1.png`
});

setTimeout(() => {
    hero.sprite.draw(this.ctx);
    npc1.sprite.draw(this.ctx);
}, 200);