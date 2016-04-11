/**
 * ULRP - Core Setup
 */

let ULRP = ((ULRP) => {
  "use strict";
  ULRP.W = {
    top: unsafeWindow.frames.topFrame.window
  };
  ULRP.D = {
    top: unsafeWindow.frames.topFrame.window.document
  };
  ULRP.$ = {
    top: $(unsafeWindow.frames.topFrame.window.document)
  };
  ULRP.F = {
    top: unsafeWindow.frames.topFrame
  };
  return ULRP;
})({});
