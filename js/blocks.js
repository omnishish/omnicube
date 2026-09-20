import { FACES } from './faces.js';

const FACE_CLASS = ['face-front', 'face-right', 'face-back', 'face-left', 'face-top', 'face-bottom'];

function renderBlock(block) {
  const el = document.createElement('div');
  el.className = `block block-${block.type}`;
  el.style.gridColumn = `span ${block.span[0]}`;
  el.style.gridRow    = `span ${block.span[1]}`;

  const c = block.content;

  switch (block.type) {
    case 'header':
      el.innerHTML = `<span class="block-text-main">${c.text}</span>`;
      break;
    case 'link':
      if (c.url && c.url !== '#') el.setAttribute('data-href', c.url);
      el.innerHTML = `<span class="block-icon">${c.icon ?? '🔗'}</span><span class="block-text-main">${c.label}</span>`;
      break;
    case 'social':
      if (c.url && c.url !== '#') el.setAttribute('data-href', c.url);
      el.innerHTML = `<span class="block-icon">${c.icon}</span><span class="block-text-main">${c.label}</span>`;
      break;
    case 'text':
      el.innerHTML = `<span class="block-body">${c.body}</span>`;
      break;
    case 'image':
      el.innerHTML = `<span class="block-hero">${c.emoji}</span>${c.caption ? `<span class="block-caption">${c.caption}</span>` : ''}`;
      break;
    case 'embed':
      el.innerHTML = `<span class="block-icon">${c.icon}</span><span class="block-text-main">${c.label}</span><span class="block-sub">${c.provider}</span>`;
      break;
  }

  return el;
}

function renderGrid(container, face) {
  container.querySelectorAll('.block-grid').forEach(g => g.remove());
  const inner = document.createElement('div');
  inner.className = 'block-grid';
  inner.style.gridTemplateColumns = `repeat(${face.grid.cols}, 1fr)`;
  inner.style.gridTemplateRows    = `repeat(${face.grid.rows}, 1fr)`;
  face.blocks.forEach(block => inner.appendChild(renderBlock(block)));
  container.appendChild(inner);
}

export function renderAllFaces() {
  FACES.forEach(face => {
    const cls = FACE_CLASS[face.id];

    const cubeFace = document.querySelector(`.cube .${cls}`);
    if (cubeFace) renderGrid(cubeFace, face);

    const card = document.querySelector(`.face-card[data-face-idx="${face.id}"]`);
    if (card) renderGrid(card, face);
  });
}
