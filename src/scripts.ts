export default `
  customElements.define('expansion-button', class extends HTMLElement {
    constructor() {
      super();

      const dialogElement = window.document.querySelector(\`role-dialog[data-role=\${this.getAttribute('data-role')}]\`);

      if (!dialogElement) {
        throw new Error('No dialog element found');
      }

      this.dialogElement = dialogElement;

      const buttonElement = this.querySelector('a');

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      this.buttonElement = buttonElement;

      window.addEventListener('hashchange', this.handleHashChange);
      this.buttonElement.addEventListener('click', this.handleButtonClick);
    }

    handleButtonClick = (event) => {
      event.preventDefault();
      window.history.pushState({}, '', '#' + this.dialogElement.getAttribute('data-role'));
      window.dispatchEvent(new Event('hashchange'));
    }

    handleHashChange = (event) => {
      if (window.location.hash === '#' + this.dialogElement.getAttribute('data-role')) {
        this.dialogElement.openDialog();
      } else {
        this.dialogElement.closeDialog();
      }
    }
  });

  customElements.define('close-dialog-button', class extends HTMLElement {
    constructor() {
      super();

      const buttonElement = this.querySelector('a');

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      buttonElement.addEventListener('click', (event) => {
        event.preventDefault();
        window.history.pushState({}, '', window.location.pathname);
        window.dispatchEvent(new Event('hashchange'));
      });
    }
  });

  customElements.define('role-dialog', class extends HTMLElement {
    constructor() {
      super();

      const dialogElement = this.querySelector('dialog');

      if (!dialogElement) {
        throw new Error('No dialog element found');
      }

      this.dialogElement = dialogElement;

      const buttonElement = window.document.querySelector(\`expansion-button[data-role=\${this.getAttribute('data-role')}]\`);

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      this.buttonElement = buttonElement;
    }

    connectedCallback() {
      if (window.location.hash === '#' + this.getAttribute('data-role')) {
        this.openDialog();
      }
    }
    
    openDialog = () => {
      const openDialogElements = Array.from(window.document.querySelectorAll('dialog[open]'));

      for (const openDialogElement of openDialogElements) {
        openDialogElement.close();
      }

      if (matchMedia('(min-width: 1024px)').matches) {
        this.dialogElement.show();
      } else {
        this.dialogElement.showModal();
      }

      this.buttonElement.setAttribute('aria-expanded', 'true');
    }

    closeDialog = () => {
      if (!this.dialogElement.open) {
        return;
      }

      this.buttonElement.setAttribute('aria-expanded', 'false');

      this.dialogElement.close();
    }
  });
`;
