import { IconDefinitions } from "../components/Icons";
import { Navigation } from "../components/Navigation";
import { Overview } from "../components/Overview";
import { CustomElement } from "../types";

export function IndexPage() {
  const pageTitle = "ARIA Reference Guide";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="This representation of ARIA roles contains links to each role that will take you to a page with more information about the role."
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="/scripts.js"></script>
      </head>
      <body>
        <IconDefinitions />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :host {
                display: contents;
              }

              .root {
                display: grid;
                grid-template-rows: auto minmax(0px, 1fr) auto;
                height: 100%;
                container-name: root;
                container-type: size;
              }

              .top,
              .bottom {
                background: #ddd;
              }

              .top,
              .bottom {
                padding: 1rem;
                padding-left: calc(1rem + env(safe-area-inset-left));
                padding-right: calc(1rem + env(safe-area-inset-right));
              }

              .menu {
                padding: 1rem;
                padding-left: calc(1rem + env(safe-area-inset-left));
              }

              .main {
                padding: 1rem;
                padding-right: calc(1rem + env(safe-area-inset-right));
              }

              .top {
                padding-top: 1rem;
                padding-top: calc(1rem + env(safe-area-inset-top));
              }

              .bottom {
                padding-bottom: 1rem;
                padding-bottom: calc(1rem + env(safe-area-inset-bottom));
              }

              .top {
                touch-action: none;
                display: grid;

                @container (width <= 960px) {
                  grid-template-columns: minmax(0px, 1fr) auto;
                  align-items: center;
                  gap: 1rem;
                }
              }

              .middle {
                display: grid;
                height: 100%;

                @container (width <= 960px) {
                  grid-template-rows: 100%;
                }

                @container (width > 960px) {
                  grid-template-columns: 300px minmax(0px, 1fr);
                }
              }

              .menu,
              .main {
                display: grid;
                overflow-y: auto;
              }

              .main {
                container-name: main;
                container-type: size;
              }

              @container (width <= 960px) {
                :has(#menu-visibility-switch:not(:checked)) .menu {
                  display: none;
                }

                :has(#menu-visibility-switch:checked) .main {
                  display: none;
                }
              }

              #menu-visibility-switch:not(:checked) ~ [data-if-checked] {
                display: none;
              }

              #menu-visibility-switch:checked ~ [data-if-unchecked] {
                display: none;
              }

              @container (width > 960px) {
                .content {
                  width: 100%;
                  max-width: 860px;
                  margin-left: auto;
                  margin-right: auto;
                }
              }

              .bottom {
                touch-action: none;
              }

              .switch {
                padding: 1rem;
                cursor: pointer;
                border: 1px solid #ddd;
                background-color: deepskyblue;
                border-radius: 5px;
                text-align: center;
                display: flex;
                width: auto;
                aspect-ratio: 1;
                line-height: 1;

                &:focus-within {
                  outline: 4px dashed black;
                  outline-offset: 1px;
                }
              }

              @container (width > 960px) {
                #menu-visibility-switch-label {
                  display: none;
                }
              }

              menu-visibility-switch {
                display: contents;
              }

              .visually-hidden {
                clip: rect(0 0 0 0);
                clip-path: inset(50%);
                height: 1px;
                overflow: hidden;
                position: absolute;
                white-space: nowrap;
                width: 1px;
              }
            `,
          }}
        />
        <div className="root">
          <header role="banner" className="top">
            <a href="/" className="page-heading">
              {pageTitle}
            </a>
            <menu-visibility-switch>
              <label className="switch" id="menu-visibility-switch-label">
                <span className="visually-hidden">Toggle Menu</span>
                <input
                  id="menu-visibility-switch"
                  type="checkbox"
                  className="visually-hidden"
                  role="switch"
                />
                <svg
                  data-if-unchecked
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H20"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="#0F1729"
                  />
                </svg>
              </label>
            </menu-visibility-switch>
          </header>
          <div className="middle">
            <div className="menu">
              <Navigation />
            </div>
            <main className="main">
              <Overview />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "app-layout": CustomElement;
      "menu-visibility-switch": CustomElement;
    }
  }
}

declare module "react" {
  interface HTMLAttributes<T> {
    shadowrootmode?: string;
  }
}
