function camelize(s) {
  return s.replace(/-./g, (x) => x[1].toUpperCase());
}

/*function kebabize(str) {
  console.log(str);
  return str
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");
}*/

/**Take a string of css that gets added to the dom
 * NOTE: cssString have to be formated in a way that selector is on one line,
 * rules are one line each, and last bracket is on own line
 */
export function updateDomStyle(styleTagId, cssString, elemetId) {
  let styleEl = document.getElementById(styleTagId);
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.type = "text/css";
    styleEl.id = styleTagId;
    document.head.appendChild(styleEl);
  }
  document.getElementById(elemetId).setAttribute(elemetId, "");
  //set attribute just to have it for later just to specify further
  //something like .editor > [id]{}
  styleEl.innerHTML = `#${elemetId} ${cssString}`;
}

export function generateJSONFromCSS(styleTagId, defaultObject) {
  // Get the style tag
  var styleTag = document.getElementById(styleTagId);
  if (styleTag) {
    // Get the CSS text
    var cssText = styleTag.innerHTML;
    // Split the CSS text into separate lines
    var cssLines = cssText.split("\n");
    var cssJSON = {};
    // Loop through each line of CSS(skip first and last)
    for (var i = 1; i < cssLines.length - 1; i++) {
      // Get the current line of CSS
      var cssLine = cssLines[i];
      cssLine = cssLine.replace(/ /g, "");
      // Split the line into separate parts
      var cssParts = cssLine.split(":");
      var propertiesObject = {};
      var valueParts = cssParts[1].replaceAll(";", "").split(/(\d+)/);
      console.log(valueParts);
      propertiesObject.val = valueParts[1];
      propertiesObject.unit = valueParts[2];
      cssJSON[camelize(cssParts[0].trim())] = propertiesObject;
    }
    return cssJSON;
  }
  return defaultObject;
}
