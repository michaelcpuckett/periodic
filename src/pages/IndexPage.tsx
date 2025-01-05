import { IconDefinitions } from "../components/Icons";
import { MenuVisibilitySwitch } from "../components/MenuVisibilitySwitch";
import { Navigation } from "../components/Navigation";
import { Overview } from "../components/Overview";

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
        <div className="root">
          <header role="banner" className="top">
            <a href="/" className="page-heading">
              {pageTitle}
            </a>
            <MenuVisibilitySwitch />
          </header>
          <div className="middle">
            <div className="menu" id="nav">
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
