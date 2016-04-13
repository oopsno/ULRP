/**
 * Hack on bloody URP
 */

ULRP.Hack = (Hack => {
  "use strict";

  function genLeftMenuClick(context, click, router) {
    const HACKEDPREFIX = '__HACKED__';
    let originalClick = click.bind(context);
    let fn = function () {
      if (this.action && this.action.startsWith(HACKEDPREFIX)) {
        let routine = this.action.substr(HACKEDPREFIX.length);
        let mainFrame = unsafeWindow.frames.bottomFrame.frames.mainFrame;
        this.action = "0";
        originalClick();
        mainFrame.onload = () => router(routine, mainFrame);
      } else {
        originalClick();
      }
    };
    return fn.bind(context);
  }

  function genRouter(routines) {
    return (routine, ...w) => {
      let fn = routines[routine];
      if (fn) {
        console.log(`[ULRP::Hack::router] 开始处理${routine}`);
        fn(...w);
      } else {
        console.error(`[ULRP::Hack::router] 无法理解${routine}`);
      }
    }
  }

  function hackLeftMenuFrame(w) {
    w.array_other.push([[],
      ["042001", "GPA计算", ""],
      ["042001001", "根据官方算法计算", '/gradeLnAllAction.do?type=ln&oper=fainfo']]);
    let anchors = w.document.getElementsByTagName('a');
    if (anchors) {
      for (let i = 0; i < anchors.length; ++i) {
        let anchor = anchors[i];
        if (anchor.href.endsWith('gradeLnAllAction.do?type=ln&oper=fainfo')) {
          anchor.href = null;
          anchor.onclick = function () {
            let mainRef = window.open('../gradeLnAllAction.do?type=ln&oper=fainfo', 'mainFrame');
            mainRef.onload = function (event) {
              let html = event.innerHTML;
              event.innerHTML = ULRP.Logic.GPA.calc(html);
            }
          }
        }
      }
    }
    w.left_ = new w.Left_();
    w.left_.click = genLeftMenuClick(w.left_, w.left_.click, genRouter({
      'GPA::Calc': (w) => {
        console.log('GPA:Calc');
        let rawHTML = w.document.body.innerHTML;
        w.document.body.innerHTML = ULRP.Logic.GPA.calc(rawHTML);
      }
    }));
    w.body_onload();
  }

  function hackTopFrame(w) {
    w.array.push(['042', 'GPA计算']);
    w.arrayHref.push(['7', '__HACKED__GPA::Calc']);
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