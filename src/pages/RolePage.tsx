import {
  allowedAriaRolesByHtmlElement,
  ariaRolesByAbstractRole,
  ariaRolesWithPresentationalChildren,
  ariaToHtmlMapping,
  htmlElementsToDisplayNames,
  links,
  mappedAbstractAriaRolesToDescriptions,
  mappedAbstractAriaRolesToTitles,
  mappedAbstractAriaRolesToUrls,
  mappedAriaRolesToAllowedDescendants,
  mappedAriaRolesToContentCategories,
  mappedAriaRolesToContextRoles,
  mappedAriaRolesToDescriptions,
  mappedAriaRolesToDisplayNames,
  mappedContentTypesToTitles,
  mappedContentTypesToUrls,
} from "../../data";
import { mappedContentTypesToDescriptions } from "../../data/mappedContentTypesToDescriptions";
import { ExternalLinkIcon, IconDefinitions } from "../components/Icons";
import { MenuVisibilitySwitch } from "../components/MenuVisibilitySwitch";
import { Navigation } from "../components/Navigation";
import { CustomElement } from "../types";

interface Tag {
  tagName: string;
  url: string;
  raw: string;
}

interface RolePageProps {
  role: string;
  abstractAriaRole: string;
}

export function RolePage({ role, abstractAriaRole }: RolePageProps) {
  const roleTitle = mappedAriaRolesToDisplayNames[role] || role;
  const pageTitle = "ARIA Reference Guide";

  const abstractAriaRoleTags = Object.entries(ariaRolesByAbstractRole)
    .filter(([, value]) => value.includes(role))
    .map(([key]) => key)
    .sort()
    .map((key) => ({
      tagName: mappedAbstractAriaRolesToTitles[key] || key,
      url: mappedAbstractAriaRolesToUrls[key] || "",
      raw: key,
    }));

  const contentCategories = mappedAriaRolesToContentCategories[role] || [];

  const filteredContentCategories = contentCategories.filter(
    (contentCategory: string) =>
      ["flow", "phrasing", "interactive"].includes(contentCategory)
  );

  if (
    filteredContentCategories.includes("flow") &&
    filteredContentCategories.includes("phrasing")
  ) {
    // All `phrasing` roles are also `flow` roles
    filteredContentCategories.splice(
      filteredContentCategories.indexOf("flow"),
      1
    );
  }

  const contentCategoryTags: Tag[] = filteredContentCategories
    .sort()
    .map((contentCategory: string) => ({
      tagName: mappedContentTypesToTitles[contentCategory] || contentCategory,
      url: mappedContentTypesToUrls[contentCategory] || "",
      raw: contentCategory,
    }));

  const allowedContent = mappedAriaRolesToAllowedDescendants[role] || ["N/A"];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{`The ${role} role - ${pageTitle}`}</title>
        <meta
          name="description"
          content={mappedAriaRolesToDescriptions[role]}
        />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="manifest" href="/manifest.json" />
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
              <Navigation role={role} />
            </div>
            <main className="main">
              <div
                className={`content content--is-aria-role-${role} content--abstract-role-${abstractAriaRole}`}
              >
                <div className="content__header">
                  <div className="content__header__info">
                    <div className="content__heading__container">
                      <h1
                        className="content__heading"
                        id={role}
                        aria-label={`The ${role} role`}
                        tabIndex={-1}
                        dangerouslySetInnerHTML={{
                          __html: `<span aria-hidden="true">The ${roleTitle} role</span>`,
                        }}
                      ></h1>
                    </div>
                    <div className="content__links">
                      {Object.entries(links).map(([name, link]) => (
                        <a key={link} href={link + role} target="_blank">
                          {name}
                          <ExternalLinkIcon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="content__details">
                  <div className="list--gap">
                    <card-item key="semantics">
                      <h2 id="h2--semantics">Semantics</h2>
                      <p className="info">
                        {mappedAriaRolesToDescriptions[role] || "--"}
                      </p>
                    </card-item>
                    {abstractAriaRoleTags.map(({ tagName, url, raw }) => (
                      <card-item
                        class="card--abstract-role"
                        key={"abstract-role-" + raw}
                      >
                        <h2 id={"h2--abstract-role-" + raw}>Abstract Role</h2>
                        <svg
                          fill="none"
                          aria-hidden="true"
                          viewBox="0 0 542 542"
                        >
                          <use href={`#icon--${raw}`}></use>
                        </svg>
                        <p className="term-dfn" role="paragraph">
                          <dfn className="info">{tagName}</dfn>
                          <span className="note">
                            {mappedAbstractAriaRolesToDescriptions[raw]}
                          </span>
                        </p>
                        {abstractAriaRoleTags.length > 1 && (
                          <>
                            <hr role="none" />
                            <p>
                              May be an interactive Widget or non-interactive
                              Structure, depending on the context.
                            </p>
                          </>
                        )}
                      </card-item>
                    ))}
                    {contentCategoryTags.map(({ tagName, raw, url }) => (
                      <card-item key="content-category">
                        <h2 id="h2--content-category">Content Category</h2>
                        <svg
                          fill="none"
                          aria-hidden="true"
                          viewBox="0 0 542 542"
                        >
                          <use href={`#icon--${raw}`}></use>
                        </svg>
                        <p className="term-dfn" role="paragraph">
                          <dfn className="info">{tagName} Content</dfn>
                          <span className="note">
                            {mappedContentTypesToDescriptions[raw]}
                          </span>
                        </p>
                      </card-item>
                    ))}
                    {!contentCategoryTags.length && (
                      <card-item key="content-category">
                        <h2 id="h2--content-category">Content Category</h2>
                        <svg
                          fill="none"
                          aria-hidden="true"
                          viewBox="0 0 542 542"
                        >
                          <use href="#icon--parent"></use>
                        </svg>
                        <p className="info">
                          Only Used with Specific Parent Roles
                        </p>
                        <p>
                          This role must be a direct descendant of one of the
                          following roles:
                        </p>
                        {mappedAriaRolesToContextRoles[role] && (
                          <ul className="list">
                            {mappedAriaRolesToContextRoles[role].map(
                              (contextRole: string) => (
                                <li key={contextRole}>{contextRole}</li>
                              )
                            )}
                          </ul>
                        )}
                      </card-item>
                    )}
                    {allowedContent.map((item) => {
                      const isArray = Array.isArray(item);

                      if (!isArray) {
                        throw new Error("Expected an array");
                      }

                      const [type, details] = item;
                      const description =
                        mappedContentTypesToDescriptions[type];

                      return (
                        <card-item key="allowed-descendants">
                          <h2 id="h2--allowed-descendants">
                            Allowed Descendants
                          </h2>
                          <svg
                            fill="none"
                            aria-hidden="true"
                            viewBox="0 0 542 542"
                          >
                            <use href="#icon--children"></use>
                          </svg>
                          <p className="info">
                            {type === "specific"
                              ? "Specific Guidance"
                              : `${mappedContentTypesToTitles[type]} Children Allowed`}
                          </p>
                          {details ? <p>{details}</p> : null}
                        </card-item>
                      );
                    })}
                    {ariaRolesWithPresentationalChildren.includes(role) && (
                      <card-item key="presentational-children">
                        <h2 id="h2--presentational-children">Note</h2>
                        <svg
                          fill="none"
                          aria-hidden="true"
                          viewBox="0 0 542 542"
                        >
                          <use href="#icon--warning"></use>
                        </svg>
                        <p className="info">Children Become Presentational</p>
                        <p className="note">
                          Browsers automatically apply the{" "}
                          <code>presentation</code> role to all descendant
                          elements, so their semantics are not conveyed to
                          assistive technologies.
                        </p>
                      </card-item>
                    )}
                    <card-item key="usage">
                      <h2 id="h2--usage">Usage</h2>
                      <svg fill="none" aria-hidden="true" viewBox="0 0 542 542">
                        <use href="#icon--html"></use>
                      </svg>
                      <p className="info">
                        Elements that can designate the role in HTML:
                      </p>
                      <ul className="list">
                        {Array.from(
                          new Set(
                            Object.entries(allowedAriaRolesByHtmlElement)
                              .filter(([_, roles]) => roles.includes(role))
                              .map(([elementName]) => elementName)
                              .concat(ariaToHtmlMapping[role] || [])
                          )
                        )
                          .sort((a) => {
                            if ((ariaToHtmlMapping[role] || []).includes(a)) {
                              return -1;
                            }

                            return 1;
                          })
                          .map((elementName) => (
                            <li key={elementName}>
                              <code>
                                {htmlElementsToDisplayNames[elementName] ||
                                  elementName}
                                {(ariaToHtmlMapping[role] || []).includes(
                                  elementName
                                )
                                  ? ""
                                  : `[role=${role}]`}
                              </code>
                            </li>
                          ))}
                        {contentCategories.includes("phrasing") ? (
                          <li key="span">
                            <code>span[role={role}]</code>
                          </li>
                        ) : (
                          <li key="div">
                            <code>div[role={role}]</code>
                          </li>
                        )}
                        <li key="custom-element">
                          <code>custom-element[role={role}]</code>
                        </li>
                      </ul>
                    </card-item>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <script src="/scripts.js"></script>
      </body>
    </html>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "card-item": CustomElement;
    }
  }
}
