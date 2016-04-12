/**
 * Hack on bloody URP
 */

ULRP.Hack = (Hack => {
  "use strict";

  function hackLeftMenuFrame(w) {
    w.array_other.push([[],
      ["042001", "GPA计算", ""],
      ["042001001", "根据官方算法计算", '/gradeLnAllAction.do?type=ln&oper=fainfo']]);
    w.left_ = new w.Left_();
    w.body_onload();
  }

  function hackTopFrame(w) {
    w.array.push(['042', 'GPA计算']);
    w.arrayHref.push(['7', '0']);
    w.body_onload();
    let menu = w.parent.frames["bottomFrame"].frames["menuFrame"];
    menu.onload = () => hackLeftMenuFrame(menu);
  }

  Hack.hack = function (U) {
    U.W.top().onload = function () {
      return hackTopFrame(U.W.top());
    };
  };
  return Hack;
})(ULRP.Hack || {});