import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  abstractAriaRolesByType,
  allowedAriaRolesByHtmlElement,
  ariaRolesByCategory,
  ariaRolesWithPresentationalChildren,
  ariaToHtmlMapping,
  links,
  mappedAbstractAriaRolesToDescriptions,
  mappedAbstractAriaRolesToTitles,
  mappedAriaRolesToContentTypes,
  mappedAriaRolesToContextRoles,
  mappedAriaRolesToDescriptions,
  mappedAriaRolesToDisplayNames,
  mappedAriaRolesToNotes,
  mappedAriaTypesToTitles,
} from "../data";

import scripts from "./scripts";
import styles from "./styles";

const app = express();

function ARIAPeriodicTable() {
  const dialogElements: React.ReactNode[] = [];

  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
      <main>
        <h1 id="h1-title" className="page-title">
          &nbsp;Periodic&nbsp;Table&nbsp;of&nbsp;
          <wbr />
          ARIA&nbsp;Roles
        </h1>
        <span id="list-title" hidden>
          ARIA Roles by Type
        </span>
        <div
          role="list"
          className="periodic-table__root"
          aria-labelledby="list-title"
        >
          {Object.entries(abstractAriaRolesByType).map(
            ([type, abstractAriaRoles]) => {
              return (
                <div
                  role="listitem"
                  aria-labelledby={`periodic-table__type--${type}`}
                  className={`periodic-table__subgrid periodic-table__subgrid-area periodic-table__subgrid-area--${type}`}
                  key={type}
                >
                  <h2
                    className="periodic-table__subgrid-area-heading"
                    id={`periodic-table__type--${type}`}
                  >
                    {mappedAriaTypesToTitles[type] + " Roles"}
                  </h2>
                  <div className="periodic-table__subgrid periodic-table__subgrid-row">
                    {abstractAriaRoles.map((abstractAriaRole) => {
                      const ariaRoles =
                        ariaRolesByCategory[abstractAriaRole] || [];
                      const rolesWithPresentationalChildren = ariaRoles
                        .filter((role) =>
                          ariaRolesWithPresentationalChildren.includes(role)
                        )
                        .sort((a?: string, b?: string) =>
                          a?.localeCompare(b || "")
                        );
                      const rolesWithoutPresentationalChildren = ariaRoles
                        .filter(
                          (role) =>
                            !ariaRolesWithPresentationalChildren.includes(role)
                        )
                        .sort((a?: string, b?: string) =>
                          a?.localeCompare(b || "")
                        );

                      return [
                        ["", rolesWithoutPresentationalChildren],
                        [
                          " with Presentational Children",
                          rolesWithPresentationalChildren,
                        ],
                      ].map(([name, roles]) => {
                        const title =
                          mappedAbstractAriaRolesToTitles[abstractAriaRole] +
                          " Roles";
                        const description =
                          mappedAbstractAriaRolesToDescriptions[
                            abstractAriaRole
                          ];

                        if (!roles.length) {
                          return null;
                        }

                        return (
                          <div
                            key={abstractAriaRole}
                            className="periodic-table__subgrid periodic-table__subgrid-row"
                          >
                            <h3
                              id={`aria-abstract-role--${abstractAriaRole}`}
                              className="periodic-table__subgrid-heading"
                            >
                              {title}
                              {name}
                            </h3>
                            <div
                              role="list"
                              aria-labelledby={`aria-abstract-role--${abstractAriaRole}`}
                              className="periodic-table__subgrid periodic-table__subgrid-row"
                            >
                              {roles.map((role) => {
                                const displayName =
                                  mappedAriaRolesToDisplayNames[role] || role;

                                const roleTitle =
                                  mappedAriaRolesToDisplayNames[role] || role;
                                const abstractTitle =
                                  mappedAbstractAriaRolesToTitles[
                                    abstractAriaRole
                                  ];

                                let contentCategory = abstractTitle;

                                const mayBeInteractive =
                                  roleTitle.endsWith("*");
                                const id = `${role}${
                                  mayBeInteractive ? `-${type}` : ""
                                }`;

                                if (mayBeInteractive) {
                                  contentCategory = [];

                                  for (const [key, value] of Object.entries(
                                    ariaRolesByCategory
                                  )) {
                                    if (value.includes(role)) {
                                      contentCategory.push(
                                        mappedAbstractAriaRolesToTitles[key]
                                      );
                                    }
                                  }

                                  contentCategory = contentCategory
                                    .sort()
                                    .map((category) => `${category}*`)
                                    .join(", ");
                                }

                                dialogElements.push(
                                  <role-dialog data-role={id} key={role}>
                                    <dialog
                                      className={`aria-role__dialog aria-role__dialog--abstract-role-${abstractAriaRole}`}
                                      id={`${id}-dialog`}
                                      aria-labelledby={`aria-role__dialog-heading--${id}`}
                                    >
                                      <div className="aria-role__dialog-content">
                                        <close-dialog-button>
                                          <a
                                            href={`#aria-role__summary--${id}`}
                                            aria-label="Close Dialog"
                                          >
                                            &times;
                                          </a>
                                        </close-dialog-button>
                                        <div
                                          role="region"
                                          aria-label="Scrollable Dialog Content"
                                          tabIndex={-1}
                                        >
                                          <h1
                                            className="aria-role__dialog-heading"
                                            id={`aria-role__dialog-heading--${id}`}
                                            aria-label={`The ${role} role`}
                                            dangerouslySetInnerHTML={{
                                              __html: `The <code>${roleTitle}</code> role`,
                                            }}
                                          ></h1>
                                          <div className="aria-role__details">
                                            <table
                                              aria-labelledby={`aria-role__dialog-heading--${id}`}
                                              className="aria-role__table"
                                            >
                                              <tr className="aria-role__row">
                                                <th
                                                  className="aria-role__column-header"
                                                  scope="row"
                                                >
                                                  Description
                                                </th>
                                                <td className="aria-role__cell">
                                                  {mappedAriaRolesToDescriptions[
                                                    role
                                                  ] || "--"}
                                                </td>
                                              </tr>

                                              <tr className="aria-role__row">
                                                <th
                                                  className="aria-role__column-header"
                                                  scope="row"
                                                >
                                                  Content Category
                                                </th>
                                                <td className="aria-role__cell">
                                                  {contentCategory}
                                                </td>
                                              </tr>

                                              {mayBeInteractive && (
                                                <tr className="aria-role__row">
                                                  <th
                                                    className="aria-role__column-header"
                                                    scope="row"
                                                  >
                                                    *Note
                                                  </th>
                                                  <td className="aria-role__cell">
                                                    May be interactive or
                                                    non-interactive depending on
                                                    the context:{" "}
                                                    {mappedAriaRolesToNotes[
                                                      role
                                                    ] || ""}
                                                  </td>
                                                </tr>
                                              )}

                                              <tr className="aria-role__row">
                                                <th
                                                  className="aria-role__column-header"
                                                  scope="row"
                                                >
                                                  Category Description
                                                </th>
                                                <td className="aria-role__cell">
                                                  {description}
                                                </td>
                                              </tr>

                                              {mappedAriaRolesToContextRoles[
                                                role
                                              ] && (
                                                <tr className="aria-role__row">
                                                  <th
                                                    className="aria-role__column-header"
                                                    scope="row"
                                                  >
                                                    Required Context Roles
                                                  </th>
                                                  <td className="aria-role__cell">
                                                    <ul className="list">
                                                      {mappedAriaRolesToContextRoles[
                                                        role
                                                      ].map((contextRole) => (
                                                        <li key={contextRole}>
                                                          {contextRole}
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </td>
                                                </tr>
                                              )}

                                              <tr className="aria-role__row">
                                                <th
                                                  className="aria-role__column-header"
                                                  scope="row"
                                                >
                                                  HTML Elements with Implicit
                                                  ARIA Role
                                                </th>
                                                <td className="aria-role__cell">
                                                  <ul className="list">
                                                    {(
                                                      ariaToHtmlMapping[
                                                        role
                                                      ] || ["(None)"]
                                                    )
                                                      .sort()
                                                      .map((htmlElement) => (
                                                        <li key={htmlElement}>
                                                          {htmlElement}
                                                        </li>
                                                      ))}
                                                  </ul>
                                                </td>
                                              </tr>

                                              <tr className="aria-role__row">
                                                <th
                                                  className="aria-role__column-header"
                                                  scope="row"
                                                >
                                                  Allowed HTML Elements
                                                </th>
                                                <td className="aria-role__cell">
                                                  <ul className="list">
                                                    {Array.from(
                                                      new Set(
                                                        Object.entries(
                                                          allowedAriaRolesByHtmlElement
                                                        )
                                                          .filter(
                                                            ([_, roles]) =>
                                                              roles.includes(
                                                                role
                                                              )
                                                          )
                                                          .map(
                                                            ([tagName]) =>
                                                              tagName
                                                          )
                                                          .concat(
                                                            ariaToHtmlMapping[
                                                              role
                                                            ] || []
                                                          )
                                                      )
                                                    ).map((tagName) => (
                                                      <li key={tagName}>
                                                        {tagName}
                                                        {(
                                                          ariaToHtmlMapping[
                                                            role
                                                          ] || []
                                                        ).includes(tagName)
                                                          ? "(Role attribute unnecessary)"
                                                          : ""}
                                                      </li>
                                                    ))}
                                                    <li key="any">{`<div>, <span>, <p>, other elements that can receive any role`}</li>
                                                  </ul>
                                                </td>
                                              </tr>
                                              <tr className="aria-role__row">
                                                <th
                                                  className="aria-role__column-header"
                                                  scope="row"
                                                >
                                                  Specification Links
                                                </th>
                                                <td className="aria-role__cell">
                                                  <ul className="list">
                                                    {Object.entries(links).map(
                                                      ([name, link]) => (
                                                        <li key={link}>
                                                          <a href={link + role}>
                                                            {name}
                                                          </a>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                </td>
                                              </tr>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </dialog>
                                  </role-dialog>
                                );

                                return (
                                  <li
                                    key={role}
                                    aria-label={role}
                                    className={`
                                        aria-role
                                        aria-role--${
                                          type === "interactive"
                                            ? "interactive"
                                            : "non-interactive"
                                        }
                                        aria-role--abstract-role-${abstractAriaRole}
                                        ${
                                          ariaRolesWithPresentationalChildren.includes(
                                            role
                                          )
                                            ? "aria-role--only-phrasing-descendants"
                                            : ""
                                        }
                                        ${(
                                          mappedAriaRolesToContentTypes[role] ||
                                          []
                                        )
                                          .map(
                                            (contentType) =>
                                              `aria-role--content-type-${contentType}`
                                          )
                                          .join(" ")}
                                      `}
                                  >
                                    <expansion-button
                                      role="none"
                                      data-role={id}
                                    >
                                      <a
                                        href={`#${id}-dialog`}
                                        aria-haspopup="dialog"
                                        className="aria-role__summary"
                                        id={`aria-role__summary--${id}`}
                                        aria-expanded="false"
                                        aria-label={role}
                                        dangerouslySetInnerHTML={{
                                          __html: displayName,
                                        }}
                                      ></a>
                                    </expansion-button>
                                  </li>
                                );
                              })}
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </main>

      {dialogElements}

      <script
        dangerouslySetInnerHTML={{
          __html: scripts,
        }}
      ></script>
    </html>
  );
}

app.get("/", (req, res) => {
  const htmlResult = `<!doctype html>${ReactDOMServer.renderToString(
    <ARIAPeriodicTable />
  )}`;
  res.send(htmlResult);
});

app.listen(10101, () => {
  console.log("Running on 10101");
});

type CustomElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement> & {
    class?: string;
    tabindex?: string;
  },
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "expansion-button": CustomElement;
      "role-dialog": CustomElement;
      "close-dialog-button": CustomElement;
    }
  }
}
