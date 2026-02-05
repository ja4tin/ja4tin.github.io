import { ContactLink } from '../types/userConfig';

export const USER_CONFIG = {
  AVATAR_URL:
    'avatar.jpeg',
  NAME: 'Ja4tin Ye',
  JOB_TITLE: 'Ja4tin',
  BIO: [
    '👨‍💻 An Unprofessional Engineer',
    '✨ Still Learning',
    '🤖 AI Coding',
  ],
  WECHAT_ID: 'Ja4tin_',

  CONTACT_LINKS: [
    {
      type: 'github',
      url: 'https://github.com/ja4tin',
      icon: 'fab fa-github',
      text: 'GitHub',
    },
    {
      type: 'email',
      url: 'mailto:ja4tin@hotmail.com',
      icon: 'fas fa-envelope',
      text: '邮箱',
    },
    {
      type: 'website',
      url: 'https://ja4tin.com',
      icon: 'fas fa-globe',
      text: '个人网站',
    },
    {
      type: 'twitter',
      url: 'https://x.com/ja4tin',
      icon: 'fab fa-twitter',
      text: 'X',
    },
    {
      type: 'wechat',
      icon: 'fab fa-weixin',
      text: '微信',
      url: 'https://ja4tin.com/',
    },
  ] as ContactLink[],
} as const;


