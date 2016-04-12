/**
 * ULRP - Core Setup
 */

let ULRP = ((ULRP) => {
  "use strict";
  ULRP.W = {
    top: () => unsafeWindow.frames.topFrame.window,
    bottom: () => unsafeWindow.frames.bottomFrame.window,
    leftMenu: () => unsafeWindow.frames.bottomFrame.frames.menuFrame.window
  };
  return ULRP;
})({});
