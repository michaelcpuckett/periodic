window.customElements.define(
  "menu-visibility-switch",
  class extends HTMLElement {
    connectedCallback() {
      new Promise(window.requestAnimationFrame).then(() => {
        const switchElement = this.querySelector("#menu-visibility-switch");

        switchElement.addEventListener("input", () => {
          switchElement.setAttribute(
            "aria-expanded",
            `${switchElement.checked}`
          );
        });

        switchElement.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            switchElement.checked = !switchElement.checked;
            switchElement.dispatchEvent(new Event("input"));
          }
        });
      });
    }
  }
);
