import animatedGalleryPreview from '../assets/animated_gallery.gif';
import folioSpacePreview from '../assets/folio_space.gif';
import homepagePreview from '../assets/homepage.gif';
import termFolioGif from '../assets/term_folio.gif';
import thinkingPreview from '../assets/wechat.png';
import invoicePreview from '../assets/invoice.gif';
import { Project } from '../types/project';
import { SLIDE_IDS } from './slideIds';

export const projectsData: Project[] = [
  {
    id: SLIDE_IDS.HOMEPAGE,
    name: 'HomePage',
    title: 'HomePage',
    preview: homepagePreview,
    position: { x: 1200, y: 800, z: 200, rotateY: 30 },
    description:
      'A modern and elegant personal homepage with fluid animation background, responsive design and smooth page transitions',
    tech: ['WebGL', 'Blogging', 'Web', 'Homepage'],
    links: [
      { type: 'demo', url: 'https://ja4tin.com', text: 'Live Demo' },
      {
        type: 'code',
        url: 'https://github.com/Ja4tin/HomePage',
        text: 'Github',
        githubRepo: 'Ja4tin/HomePage',
      },
    ],
    layout: 'reverse',
  },
  {
    id: SLIDE_IDS.INVOICE,
    name: 'Invoice',
    title: 'Invoice',
    preview: invoicePreview,
    position: { x: -1200, y: -800, z: 200, rotateY: -30 },
    description:
      '一款纯客户端、隐私优先的 React 报销排版工具。',
    tech: ['React', 'Invoice Tool', 'Web', 'Vibe Coding'],
    links: [
      { type: 'demo', url: 'https://invoice.ja4tin.com', text: 'Live Demo' },
      {
        type: 'code',
        url: 'https://github.com/Ja4tin/EasyInvoice',
        text: 'Github',
        githubRepo: 'Ja4tin/EasyInvoice',
      },
    ],
    layout: 'standard',
  },
  {
    id: SLIDE_IDS.GALLERY,
    name: 'AnimatedGallery',
    title: 'AnimatedGallery',
    preview: animatedGalleryPreview,
    position: { x: 0, y: 1500, z: 400, rotateY: 90 },
    description: 'A beautiful and modern photo gallery application',
    tech: ['BlurHash', 'Blogging', 'Web', 'Gallery'],
    links: [
      {
        type: 'demo',
        url: 'https://ja4tin.com/Gallery',
        text: 'Live Demo',
      },
      {
        type: 'code',
        url: 'https://github.com/Ja4tin/Gallery',
        text: 'Github',
        githubRepo: 'Ja4tin/Gallery',
      },
    ],
    layout: 'reverse',
  },
  {
    id: SLIDE_IDS.TERMFOLIO,
    name: 'TermFolio',
    title: 'TermFolio',
    preview: termFolioGif,
    position: { x: -1060, y: 1060, z: 600, rotateY: 135 },
    description: 'An elegant terminal-style portfolio component for developers',
    tech: ['Terminal UI', 'Blogging', 'Web'],
    links: [
      { type: 'demo', url: 'https://ja4tin.com/about/', text: 'Live Demo' },
      {
        type: 'code',
        url: 'https://github.com/Ja4tin/TermFolio',
        text: 'Github',
        githubRepo: 'Ja4tin/TermFolio',
      },
    ],
    layout: 'standard',
  },
  {
    id: SLIDE_IDS.THINKING,
    name: 'ThinkingValue',
    title: 'ThinkingValue',
    preview: thinkingPreview,
    position: { x: -1500, y: 0, z: 800, rotateY: 180 },
    description:
      '我们每天都会接收到过载的信息，然而明月与砾同囊，其中的优质信息往往会被淹没。[思考的价值] 由此而来。',
    tech: ['Discussion', 'Knowledge', 'Sharing'],
    links: [
      {
        type: 'demo',
        url: 'https://thinking.ja4tin.com/',
        text: 'Learn More',
      },
    ],
    layout: 'reverse',
  },
  {
    id: SLIDE_IDS.PROJECTS,
    name: 'FolioSpace',
    title: 'FolioSpace',
    preview: folioSpacePreview,
    position: { x: 1060, y: -1060, z: 1400, rotateY: 315 },
    description:
      'A modern and elegant personal portfolio website with smooth animations and responsive design',
    tech: ['Blogging', 'Web', 'Portfolio'],
    links: [
      {
        type: 'demo',
        url: 'https://ja4tin.com/projects',
        text: 'Live Demo',
      },
      {
        type: 'code',
        url: 'https://github.com/Ja4tin/projects',
        text: 'Github',
        githubRepo: 'Ja4tin/projects',
      },
    ],
    layout: 'standard',
  },
];

export const mapData = [
  {
    id: SLIDE_IDS.TITLE,
    name: 'Introduction',
    icon: 'fas fa-home',
  },

  {
    id: SLIDE_IDS.INVOICE,
    name: 'Invoice',
    icon: 'fas fa-file',
  },
  {
    id: SLIDE_IDS.HOMEPAGE,
    name: 'HomePage',
    icon: 'fas fa-home',
  },
  {
    id: SLIDE_IDS.GALLERY,
    name: 'AnimatedGallery',
    icon: 'fas fa-images',
  },
  {
    id: SLIDE_IDS.TERMFOLIO,
    name: 'TermFolio',
    icon: 'fas fa-terminal',
  },
  {
    id: SLIDE_IDS.THINKING,
    name: 'ThinkingValue',
    icon: 'fas fa-brain',
  },
  {
    id: SLIDE_IDS.PROJECTS,
    name: 'Projects',
    icon: 'fas fa-layer-group',
  },
  {
    id: SLIDE_IDS.OVERVIEW,
    name: 'Overview',
    icon: 'fas fa-th-large',
  },
];
