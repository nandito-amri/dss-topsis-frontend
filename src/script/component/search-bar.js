class SearchBar extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get value() {
        return this._shadowRoot.querySelector('#searchElement').value;
    }

    render() {
        this._shadowRoot.innerHTML = `
        <style>
            #searchElement {
                width: 320px;
                height: 32px;
                padding: 8px;
                margin-right: 4px;
                border: 2px solid #71C9CE;
                border-radius: 4px;
            }
            
            #searchButtonElement {
                height: 32px;
                width: 64px;
                border: 0;
                border-radius: 4px;
                background-color: #71C9CE;
                font-weight: 700;
                color: #F7FFFF;
            }
            
            #searchButtonElement:hover {
                background-color: #222831;
                color: #F7FFFF;
            }
            
            @media screen and (max-width: 800px){
                #searchElement {
                    width: 230px;
                }
            }
            
            @media screen and (max-width: 680px) {
                #searchButtonElement {
                    margin-bottom: 32px;
                }
            }
            
            @media screen and (max-width: 400px) {
                #searchElement {
                    width: 150px;
                }
            }
            
            @media screen and (max-width: 300px) {
                #searchButtonElement {
                    width: 150px;
                    margin-top: 12px;
                }
            }
        </style>

        <div id="search-container" class="search-container">
                <input placeholder="Search movie di sini..." id="searchElement" type="search">
                <button id="searchButtonElement" type="submit">Search</button>
        </div>
        `;

        this._shadowRoot.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);
    }
}

customElements.define('search-bar', SearchBar);