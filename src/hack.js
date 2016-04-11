/**
 * Hack on bloody URP
 */

ULRP.Hack = (Hack => {
  function hackTopFrame(w) {
    w.array.push(['014', 'GPA计算']);
    w.arrayHref.push(['7', '0']);
    w.body_onload();
  }

  Hack.hackTopFrame = hackTopFrame;

  return Hack;
})(ULRP.Hack || {});