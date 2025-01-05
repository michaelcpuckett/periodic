import { CustomElement } from "../types";
import { ExternalLinkIcon } from "./Icons";

export function Overview() {
  return (
    <div className="content">
      <div className="content__header__info">
        <div className="content__heading__container">
          <h1 className="content__heading" id="overview" tabIndex={-1}>
            ARIA Reference Guide
          </h1>
        </div>
      </div>
      <div className="content__details">
        <p>
          <abbr title="Accessible Rich Internet Applications">ARIA</abbr> is a
          set of HTML attributes that make web content more accessible to users
          of assistive technologies, such as screen readers and refreshable
          braille displays.
        </p>
        <p>
          This reference guide is based on the{" "}
          <a href="https://www.w3.org/TR/wai-aria-1.2/" target="_blank">
            WAI-ARIA 1.2{" "}
            <keep-together>
              Recommendation
              <ExternalLinkIcon />
            </keep-together>
          </a>
        </p>
        <p>
          This representation of ARIA roles is intended to be a reference for
          web developers and designers. This is not a substitute for the
          official documentation, but because it is paginated, it may be easier
          to navigate.
        </p>
        <p>
          The source code is availble on{" "}
          <a
            href="https://www.github.com/michaelcpuckett/aria-reference-guide"
            target="_blank"
          >
            GitHub
            <ExternalLinkIcon />
          </a>
        </p>
      </div>
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "keep-together": CustomElement;
    }
  }
}
