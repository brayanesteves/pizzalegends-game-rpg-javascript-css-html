class Person extends GameObject {

    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        // this.direction = "right";
        
        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
               "up": ["y", -1],
             "down": ["y",  1],
             "left": ["x", -1],
            "right": ["x",  1],
        };
    }

    update(state) {
        if(this.movingProgressRemaining > 0) {            
            this.updatePosition();
        } else {
            /**
             * @Before
             */
            // if(this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow)
            /**
             * @After
             */
            // More cases for starting to alk will come here.
            
            // Case: We're keyboard ready and have an arrow pressed.
            if(this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                         type:"walk",
                    direction:state.arrow,
                });
                /**
                 * Add funciton 'startBehavior' modified.
                 */
                // this.direction               = state.arrow;
                // console.log(state.map.isSpaceTaken(this.x, this.y, this.direction));
                //this.movingProgressRemaining = 16;
            }            
            this.updateSprite(state);
        }
    }

    startBehavior(state, behavior) {
        // Set character direction to whatever behavior has.
        this.direction = behavior.direction;
        if(behavior.type === "walk") {
            // Step here if space not free.
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }
            // Ready to walk!
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16;
        }
    }

    // <UPDATE POSITION> //
    updatePositionSingle() {
        if(this.movingProgressRemaining > 0) {
            const [property, change]      = this.directionUpdate[this.direction];
              this[property]             += change;
            this.movingProgressRemaining -= 1;
        }
    }
    updatePosition() {
        const [property, change]      = this.directionUpdate[this.direction];
          this[property]             += change;
        this.movingProgressRemaining -= 1;
    }
    // <.UPDATE POSITION> //

    // <UPDATE SPRITE> //
    updateSpriteSingle(state) {
        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation(`idle-${this.direction}`);
            return;
        }

        if(this.movingProgressRemaining > 0) {
            this.sprite.setAnimation(`walk-${this.direction}`);
        }
    }
    updateSprite() {
        if(this.movingProgressRemaining > 0) {
            this.sprite.setAnimation(`walk-${this.direction}`);
            return;
        }

        this.sprite.setAnimation(`idle-${this.direction}`);
    }
    // <.UPDATE SPRITE> //

}