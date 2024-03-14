import { mappedAbstractAriaRolesToBackgroundColors } from "../data";

export default `
  * {
    box-sizing: border-box;
  }

  :focus:not(:focus-visible) {
    outline: 0;
  }

  :focus-visible {
    outline: 4px dashed white;
  }

  :root {
    font-family: system-ui, sans-serif;

    @media screen {
      --background-color: #252525;
      height: 100%;
      color-scheme: dark;
    }

    @media print {
      --background-color: Canvas;
      color-scheme: light;
    }
  }

  body {
    @media screen {
      margin: 0;
      height: 100%;
    }
  }

  ul:where(:not(.list)) {
    @media screen {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }

  summary {
    @media screen {
      cursor: pointer;
      line-height: 1;
    }
  }

  tr {
    display: grid;
  }

  th {
    text-align: left;
  }

  .visually-hidden {
    @media screen {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
      white-space: nowrap;
    }
  }

  .container {
    @media screen and (max-width: 767px) {
      display: grid;
      grid-template-columns: 1rem 1fr 1rem;
      grid-template-rows: auto calc(3rem + 8px) 1rem 1fr;
      height: 100%;

      &:has(.nav__details[open]) {
        & nav {
          grid-row: 2 / 5;
          z-index: 1;
        }

        & dialog {
          height: 0;
          overflow: hidden;
        }
      }
    }

    @media screen and (min-width: 768px) {
      display: grid;
      grid-template-columns: 1rem 15rem 0 1fr 1rem;
      grid-template-rows: auto 1fr;
      column-gap: 1rem;
      row-gap: 1rem;
      position: relative;
      height: 100%;
    }

    @media screen and (min-width: 1112px) {
      column-gap: 0;
      grid-template-columns: 1fr 1rem 15rem 2rem 49.4rem 1rem 1fr;
    }
  }

  header {
    @media screen {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }

  h1 {
    @media screen {
      margin: 0;
      padding: 1rem;
      background-color: var(--background-color);
      font-size: 1rem;
      line-height: 1;
      font-weight: normal;
      letter-spacing: 0.1rem;
      text-transform: uppercase;
      text-align: center;
    }
  }

  nav {
    @media screen and (max-width: 767px) {
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
      overflow: auto;
      position: sticky;
      top: 3rem;
      background-color: black;
    }

    @media screen and (min-width: 768px) {
      position: fixed;
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      overflow: auto;
      height: calc(100% - 4rem);
      width: 15rem;
      padding-top: 2px;
    }

    @media screen and (min-width: 1112px) {
      grid-column: 3 / 4;
    }
  }

  .nav__details {
    display: flex;
    width: calc(100% - 8px);
    margin: auto;
    grid-column: 2 / 3;

    @media screen and (min-width: 768px) {
      display: contents;
    }
  }

  .nav__summary {
    border-radius: .5rem;
    display: flex;
    place-items: center;
    height: 3rem;
    line-height: 1;
    padding: 0 1rem;
    margin-top: 4px;
    background-color: white;
    color: black;

    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  dialog {
    position: static;
    min-height: 0;
    max-height: none;
    height: 100%;
    min-width: 0;
    max-width: none;
    width: 100%;
    border: 0;
    padding: 0;
    margin: 0;

    @media screen and (max-width: 767px) {
      grid-column: 2 / 3;
      grid-row: 4 / 5;
    }

    @media screen and (min-width: 768px) {
      grid-column: 4 / 5;
      grid-row: 2 / 3;
    }

    @media screen and (min-width: 1112px) {
      grid-column: 5 / 6;
    }
  }

  .dialog__heading {
    margin: 0;
  }

  .nav__list {
    display: grid;
    row-gap: 1rem;

    @media screen and (max-width: 767px) {
      margin: 1rem 0;
    }
  }
  
  ${Object.entries(mappedAbstractAriaRolesToBackgroundColors)
    .map(([abstractRole], index, { length }) => {
      return `
        .nav__list-item--${abstractRole} {
          --base-color: ${(index / length) * 360}deg;
          --lightest-color: hsla(var(--base-color), 60%, 95%, .875);
          --lighter-color: hsl(var(--base-color), 60%, 87.5%);
          --light-color: hsl(var(--base-color), 60%, 80%);
          --medium-color: hsla(var(--base-color), 60%, 50%, 0.25);
          --dark-color: hsl(var(--base-color), 60%, 20%);
          --darker-color: hsl(var(--base-color), 60%, 13.5%);
          --darkest-color: hsla(var(--base-color), 60%, 5%, .875);
        }
      `;
    })
    .join("")}

  .nav__list-item {
    display: block;
    color: white;
    background-color: var(--dark-color);
    border: 2px solid var(--light-color);
    border-radius: .5rem;
    margin: 0 2px;

    &:has(.nav__list-item__summary:hover):has(.nav__list-item__details:not([open])) {
      background: var(--light-color);
      border-color: transparent;

      & .nav__list-item__summary {
        color: black;
      }
    }
  }

  .nav__list-item__summary {
    padding: 1rem;
    border-radius: .5rem;
  }

  .nav__list-item__sublist {
    display: grid;
    row-gap: .75rem;
    padding: 0 .75rem .75rem;
  }

  .nav__list-item__sublist-item__link {
    display: block;
    color: white;
    padding: .75rem;
    background-color: var(--dark-color);
    border: 2px solid var(--light-color);
    border-radius: .5rem;
    word-break: break-word;

    &:hover {
      color: black;
      background-color: var(--light-color);
      border-color: var(--dark-color);
    }
  }
`;