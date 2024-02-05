// @ts-ignore
class SonicVibe extends HTMLElement {
    constructor() {
        super();
        this.src = "";
        console.log({ this: this });
    }
    connectedCallback() {
        this.src = this.getAttribute("src") || this.src;
        // Additional initialization or rendering logic here
    }
}
export default SonicVibe;
//# sourceMappingURL=SonicVibe.js.map