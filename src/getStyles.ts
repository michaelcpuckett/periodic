import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import postcssNesting from "postcss-nesting";

function getCssFile(filePath: string) {
  return fs.readFileSync(path.resolve(filePath), "utf8");
}

export default async function getStyles() {
  const baseCss = getCssFile("./styles/base.css");
  const headerCss = getCssFile("./styles/header.css");
  const navCss = getCssFile("./styles/nav.css");
  const contentCss = getCssFile("./styles/content.css");

  const authoredStyles = `
    ${baseCss}
    ${headerCss}
    ${navCss}
    ${contentCss}
  `;

  const cssResult = await postcss([
    cssnano({
      preset: "default",
    }),
    autoprefixer,
    postcssNesting(),
  ])
    .process(authoredStyles, { from: "styles.css", to: "styles.css" })
    .then((result: postcss.Result) => {
      return result.css;
    });

  return cssResult;
}
