class TextMessage {
    constructor({ text, onComplete }) {
        this.text       = text;
        this.onComplete = onComplete;
        this.element    = null;
    }

    createElement() {
        // Create the element.
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        /**
         * @deprecated
         */
        /*this.element.innerHTML = (`
            <p class="TextMessage_p">${this.text}</p>
            <button class="TextMessage_button">Next</button>
        `);*/

        this.element.innerHTML = (`
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
        `);

        // Iinit the typewritter effect.
        this.revealingText = new RevealingText({
            element:this.element.querySelector(".TextMessage_p"),
               text:this.text,
        });

        this.element.querySelector("button").addEventListener("click", () => {
            // Close the text message.
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", () => {
            // console.log("ENTER!!!");
            // this.actionListener.unbind();
            this.done();
        });
    }

    done() {
        if(this.revealingText.isDone) {
            this.element.remove();
            this.actionListener.unbind();
            this.onComplete();
        } else {
            this.revealingText.warpToDone();
        }
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }
}