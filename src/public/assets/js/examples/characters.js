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
shadow.src = "/src/public/assets/img/png/characters/shadow.png";

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
hero.src = "/src/public/assets/img/png/characters/people/hero.png";