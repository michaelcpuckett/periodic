import { CustomElement } from "../types";

export function MenuVisibilitySwitch() {
  return (
    <menu-visibility-switch>
      <label
        className="switch"
        id="menu-visibility-switch-label"
        aria-label="Toggle Menu"
        role="none"
      >
        <input
          id="menu-visibility-switch"
          type="checkbox"
          className="visually-hidden"
          role="button"
          aria-expanded="false"
          aria-controls="nav"
        />
        <svg
          aria-hidden="true"
          data-if-unchecked
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use href="#icon--open-menu"></use>
        </svg>
        <svg
          aria-hidden="true"
          data-if-checked
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use href="#icon--close-menu"></use>
        </svg>
      </label>
    </menu-visibility-switch>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "menu-visibility-switch": CustomElement;
    }
  }
}
