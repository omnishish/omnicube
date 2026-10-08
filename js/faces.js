export const FACES = [
  {
    id: 0,
    name: '1',
    navIcon: '🌐',
    grid: { cols: 2, rows: 3 },
    blocks: [
      {
        type: 'header',
        span: [2, 1],
        content: { text: 'Ivan Shishkin' }
      },
      {
        type: 'link',
        span: [1, 1],
        content: { label: 'Portfolio', icon: '🔗', url: '#' }
      },
      {
        type: 'link',
        span: [1, 1],
        content: { label: 'Blog', icon: '📝', url: '#' }
      },
      {
        type: 'social',
        span: [1, 1],
        content: { platform: 'github', label: 'GitHub', icon: '🐙', url: '#' }
      },
      {
        type: 'social',
        span: [1, 1],
        content: { platform: 'linkedin', label: 'LinkedIn', icon: '💼', url: '#' }
      },
    ]
  },
  {
    id: 1,
    name: '2',
    navIcon: '🔥',
    grid: { cols: 2, rows: 3 },
    blocks: [
      {
        type: 'image',
        span: [2, 2],
        content: { emoji: '🎨', caption: 'Latest project' }
      },
      {
        type: 'link',
        span: [1, 1],
        content: { label: 'Source', icon: '⬡', url: '#' }
      },
      {
        type: 'link',
        span: [1, 1],
        content: { label: 'Live demo', icon: '↗', url: '#' }
      },
    ]
  },
  {
    id: 2,
    name: '3',
    navIcon: '🔮',
    grid: { cols: 1, rows: 3 },
    blocks: [
      {
        type: 'header',
        span: [1, 1],
        content: { text: 'About' }
      },
      {
        type: 'text',
        span: [1, 1],
        content: { body: 'M.Sc. Informatik @ RWTH Aachen. Building tools for developers. Table tennis enthusiast 🏓' }
      },
      {
        type: 'link',
        span: [1, 1],
        content: { label: 'Contact me', icon: '✉', url: '#' }
      },
    ]
  },
  {
    id: 3,
    name: '4',
    navIcon: '🌿',
    grid: { cols: 2, rows: 2 },
    blocks: [
      {
        type: 'social',
        span: [1, 1],
        content: { platform: 'twitter', label: 'Twitter', icon: '🐦', url: '#' }
      },
      {
        type: 'social',
        span: [1, 1],
        content: { platform: 'instagram', label: 'Instagram', icon: '📸', url: '#' }
      },
      {
        type: 'embed',
        span: [1, 1],
        content: { provider: 'Spotify', icon: '🎵', label: 'Now playing' }
      },
      {
        type: 'link',
        span: [1, 1],
        content: { label: 'Email', icon: '📧', url: '#' }
      },
    ]
  },
  {
    id: 4,
    name: '5',
    navIcon: '✨',
    grid: { cols: 2, rows: 2 },
    blocks: [
      {
        type: 'link',
        span: [2, 1],
        content: { label: 'Resume / CV', icon: '📄', url: '#' }
      },
      {
        type: 'link',
        span: [1, 1],
        content: { label: 'RWTH', icon: '🎓', url: '#' }
      },
      {
        type: 'link',
        span: [1, 1],
        content: { label: 'Projects', icon: '⚡', url: '#' }
      },
    ]
  },
  {
    id: 5,
    name: '6',
    navIcon: '🌊',
    grid: { cols: 1, rows: 2 },
    blocks: [
      {
        type: 'text',
        span: [1, 1],
        content: { body: 'Open to Werkstudent & freelance opportunities in software engineering and AI.' }
      },
      {
        type: 'link',
        span: [1, 1],
        content: { label: 'Let\'s talk', icon: '💬', url: '#' }
      },
    ]
  },
];
