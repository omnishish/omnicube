const SWIPE_THRESHOLD = 40;

let rx = 0, ry = 0;
let onFaceChange = null;

// Horizontal ring in order: 0=front → 1=right → 2=back → 3=left → 0
const H_RING = [0, 1, 2, 3];

const FACE_ORIENTATIONS = [
  [0,    0],   // 0: front
  [0,  -90],   // 1: right
  [0,  180],   // 2: back
  [0,   90],   // 3: left
  [90,   0],   // 4: top
  [-90,  0],   // 5: bottom
];

const cube  = document.getElementById('cube');
const scene = document.getElementById('scene');

function setTransition(on) {
  cube.style.transition = on
    ? 'transform 0.52s cubic-bezier(0.22, 0.61, 0.36, 1)'
    : 'none';
}

function apply(animate = true) {
  setTransition(animate);
  cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  if (onFaceChange) onFaceChange(currentFaceIdx());
}

export function currentFaceIdx() {
  const normX = ((rx % 360) + 360) % 360;
  const normY = ((ry % 360) + 360) % 360;
  if (normX >= 45  && normX < 135)  return 4; // top
  if (normX >= 225 && normX < 315)  return 5; // bottom
  if (normY >= 315 || normY < 45)   return 0; // front
  if (normY >= 225 && normY < 315)  return 1; // right
  if (normY >= 135 && normY < 225)  return 2; // back
  return 3;                                    // left
}

function hRingPos(faceIdx) {
  return H_RING.indexOf(faceIdx);
}

export function navigateToFace(faceIdx) {
  // Record the last side face before going to top or bottom, regardless of
  // whether the call comes from a swipe or a nav button tap.
  if (faceIdx === 4 || faceIdx === 5) {
    const cur = currentFaceIdx();
    if (hRingPos(cur) !== -1) {
      if (faceIdx === 4) hRingLastBeforeTop    = cur;
      else               hRingLastBeforeBottom = cur;
    }
  }

  const [targetRx, targetRy] = FACE_ORIENTATIONS[faceIdx];
  function nearest(current, target) {
    const diff = ((target - current) % 360 + 540) % 360 - 180;
    return current + diff;
  }
  rx = nearest(rx, targetRx);
  if (faceIdx !== 4 && faceIdx !== 5) {
    ry = nearest(ry, targetRy);
  }
  apply(true);
}

function swipeHorizontal(dir) {
  const cur = currentFaceIdx();
  const pos = hRingPos(cur);
  if (pos === -1) return; // top (4) or bottom (5) — horizontal banned
  const next = H_RING[(pos + dir + H_RING.length) % H_RING.length];
  navigateToFace(next);
}

let hRingLastBeforeTop    = 0;
let hRingLastBeforeBottom = 0;

function swipeVertical(dir) {
  const cur = currentFaceIdx();
  if (dir === -1) {
    // swipe up: side → top, or bottom → back to last side
    if (cur === 5) navigateToFace(hRingLastBeforeBottom);
    else if (hRingPos(cur) !== -1) navigateToFace(4);
  } else {
    // swipe down: side → bottom, or top → back to last side
    if (cur === 4) navigateToFace(hRingLastBeforeTop);
    else if (hRingPos(cur) !== -1) navigateToFace(5);
  }
}

export function init(callback) {
  onFaceChange = callback;
  apply(false);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  { e.preventDefault(); swipeHorizontal(-1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); swipeHorizontal(+1); }
  if (e.key === 'ArrowUp')    { e.preventDefault(); swipeVertical(-1); }
  if (e.key === 'ArrowDown')  { e.preventDefault(); swipeVertical(+1); }
});

let active = false, startX = 0, startY = 0, decided = false;

function onStart(x, y) {
  active = true; decided = false;
  startX = x; startY = y;
}

function onMove(x, y) {
  if (!active || decided) return;
  const dx = x - startX, dy = y - startY;
  if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;
  decided = true;
  if (Math.abs(dx) >= Math.abs(dy)) {
    swipeHorizontal(dx < 0 ? +1 : -1);
  } else {
    swipeVertical(dy < 0 ? -1 : +1);
  }
}

function onEnd() { active = false; decided = false; }

scene.addEventListener('mousedown',  e => onStart(e.clientX, e.clientY));
window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
window.addEventListener('mouseup',   () => onEnd());

scene.addEventListener('touchstart', e => { const t = e.touches[0]; onStart(t.clientX, t.clientY); }, { passive: true });
window.addEventListener('touchmove', e => { const t = e.touches[0]; onMove(t.clientX, t.clientY); }, { passive: true });
window.addEventListener('touchend',  () => onEnd());