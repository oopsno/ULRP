(function () {
  'use strict';
  unsafeWindow.frames.topFrame.onload = function () {
    ULRP.Hack.hackTopFrame(unsafeWindow.frames.topFrame.window);
  };
})();
