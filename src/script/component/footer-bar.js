class FooterBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
        <style>
            footer {
                height: 45px;
                background-color: #11A2B6;
                display: flex;
                align-items: center;
            }
            
            footer p {
                margin: auto;
                font-size: 0.9em;
                font-weight: 700;
                color: #CBF1F5;
            }
        </style>

        <footer>
            <p>Belajar Fundamental Front-End Web Development &#169; Dicoding Academy</p>
        </footer>
        `;
    }
}

customElements.define('footer-bar', FooterBar);