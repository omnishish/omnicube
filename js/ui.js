import { navigateToFace, init, currentFaceIdx } from './cube.js';
import { renderAllFaces } from './blocks.js';
import { FACES } from './faces.js';

const allFaceBtns = document.querySelectorAll('[data-face-idx]');
const faceListEl  = document.getElementById('face-list');
const sceneEl     = document.getElementById('scene');
const btnCube     = document.getElementById('btn-cube');
const btnList     = document.getElementById('btn-list');
const nameEl      = document.getElementById('active-face-name');

const arrowUp    = document.getElementById('arrow-up');
const arrowDown  = document.getElementById('arrow-down');
const arrowLeft  = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');

function setArrow(el, visible) {
  el.classList.toggle('visible', visible);
}

function updateArrows(idx) {
  const isTop    = idx === 4;
  const isBottom = idx === 5;
  const isSide   = !isTop && !isBottom;
  setArrow(arrowUp, isTop);
  setArrow(arrowDown, isBottom);
  // setArrow(arrowLeft, isSide);
  // setArrow(arrowRight, isSide);
}

function renderNavIcons() {
  document.querySelectorAll('[data-face-idx]').forEach(btn => {
    const idx  = +btn.dataset.faceIdx;
    const face = FACES[idx];
    if (!face) return;
    btn.textContent   = face.navIcon || '●';
    btn.ariaLabel     = face.name;
  });
}

function updateUI(idx) {
  allFaceBtns.forEach(b => b.classList.toggle('active', +b.dataset.faceIdx === idx));
  nameEl.textContent = FACES[idx].name;
  updateArrows(idx);
}

/**
 * Set card sizes to exactly match the cube, add top/bottom padding so the
 * first and last cards can be scrolled to vertical center, then instantly
 * scroll the active card into the center of the viewport.
 */
function openList() {
  const cards    = Array.from(faceListEl.querySelectorAll('.face-card'));
  // getBoundingClientRect on the scene element gives the exact rendered size
  // including any browser rounding — identical to what the cube faces use.
  const cubeSize = Math.round(sceneEl.getBoundingClientRect().width);
  const wrapperH = faceListEl.offsetHeight;      // visible height of the list area
  const gap      = 10;

  // Size every card to match the cube face exactly
  cards.forEach(card => {
    card.style.width  = `${cubeSize}px`;
    card.style.height = `${cubeSize}px`;
  });

  // Padding so first/last card can sit at the center of the wrapper
  const pad = (wrapperH - cubeSize) / 2;
  faceListEl.style.paddingTop    = `${pad}px`;
  faceListEl.style.paddingBottom = `${pad}px`;

  // Force reflow so offsetTop is accurate after size/padding changes
  void faceListEl.offsetHeight;

  // Find active card and scroll it to center — instant, before fade-in
  const activeIdx  = currentFaceIdx();
  const activeCard = cards.find(c => +c.dataset.faceIdx === activeIdx);
  if (activeCard) {
    // offsetTop of card is relative to faceListEl (its offsetParent)
    // Subtract pad so the card lands at the vertical center of the wrapper
    faceListEl.scrollTop = activeCard.offsetTop - pad;
  }
}

/**
 * Smooth-scroll the card for `faceIdx` to the vertical center of the list.
 * Reads padding from the live style so it works whether openList() has run or not.
 */
function scrollToCard(faceIdx) {
  const cards = Array.from(faceListEl.querySelectorAll('.face-card'));
  const card  = cards.find(c => +c.dataset.faceIdx === faceIdx);
  if (!card) return;
  const pad = parseFloat(faceListEl.style.paddingTop) || 0;
  faceListEl.scrollTo({ top: card.offsetTop - pad, behavior: 'smooth' });
}

function isListVisible() {
  return faceListEl.classList.contains('visible');
}

allFaceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = +btn.dataset.faceIdx;
    navigateToFace(idx);
    if (isListVisible()) scrollToCard(idx);
  });
});

const navArrows = document.getElementById('nav-arrows');

btnCube.addEventListener('click', () => {
  sceneEl.classList.remove('hidden');
  faceListEl.classList.remove('visible');
  navArrows.style.display = '';
  btnCube.classList.add('active');
  btnList.classList.remove('active');
});

btnList.addEventListener('click', () => {
  openList();
  sceneEl.classList.add('hidden');
  faceListEl.classList.add('visible');
  navArrows.style.display = 'none';
  btnList.classList.add('active');
  btnCube.classList.remove('active');
});

// On scroll in list view: find which card is closest to center and update UI
faceListEl.addEventListener('scroll', () => {
  const cards   = Array.from(faceListEl.querySelectorAll('.face-card'));
  const centerY = faceListEl.scrollTop + faceListEl.offsetHeight / 2;

  let closest = cards[0];
  let minDist = Infinity;
  cards.forEach(card => {
    const cardCenter = card.offsetTop + card.offsetHeight / 2;
    const dist = Math.abs(cardCenter - centerY);
    if (dist < minDist) { minDist = dist; closest = card; }
  });

  const idx = +closest.dataset.faceIdx;
  updateUI(idx);
  // Also sync the cube so switching back to cube view shows the right face
  navigateToFace(idx);
});

renderAllFaces();
renderNavIcons();
init(updateUI);