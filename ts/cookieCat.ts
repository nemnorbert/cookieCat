const cookieCatElement = document.createElement('cookie-cat');
document.body.appendChild(cookieCatElement);

// WebComponent
class CookieCat extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:"open"});
        console.log("constructor");
    }

    connectedCallback() {
        console.log("elem létrehozva");

        // Style
        const style = document.createElement('style');
        style.textContent = `
            :host {
                all: initial;
                contain: content;
            }
            #toggle {
                position: fixed;
                cursor: pointer;
                left: 1em;
                bottom: 1em;
                background-color: red;
                border-radius: 50%;
                width: 50px;
                height: 50px;
            }
            #panel {
                display: none;
                flex-direction: column;
                position: fixed;
                left: 0;
                bottom: 0;
                z-index: 50;
                background-color: aquamarine;
                padding: 1em;
                text-align: center;
                row-gap: .5em;
            }
            #panel.show {
                display: flex;
            }
        `;

        // Content
        const toggle = document.createElement('div')
        const panel = document.createElement('div')
        const customBtn = document.createElement('b')
        const applyAllBtn = document.createElement('button');
        const applyNecBtn = document.createElement('button');

        toggle.id = 'toggle';
        panel.id = 'panel';
        customBtn.id = 'custom';
        applyAllBtn.id = 'applyAll';
        applyNecBtn.id = 'applyNec';

        panel.innerHTML = `<p>Ez a weboldal sütiket használ a működéshez</p>`;
        customBtn.textContent = 'Részletek';
        applyAllBtn.textContent = 'Összes elfogadása';
        applyNecBtn.textContent = 'Kötelezők elfogadása';

        panel.appendChild(customBtn);
        panel.appendChild(applyNecBtn);
        panel.appendChild(applyAllBtn);

        // Add to ShadowDOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(toggle);
        this.shadowRoot.appendChild(panel);

        // Add Event Listener
        applyAllBtn.addEventListener("click", this.applyAll.bind(this));
        applyNecBtn.addEventListener("click", this.applyNec.bind(this));
        customBtn.addEventListener("click", this.moreDetails.bind(this));
        toggle.addEventListener("click", () => {
            panel.classList.toggle("show");
        });
    }

    applyAll() {
        console.log('összes elfogadása');
    }

    applyNec() {
        console.log('kötelező elfogadása');
    }

    moreDetails() {
        console.log('részletek megnyitása');
    }
}

customElements.define('cookie-cat', CookieCat);