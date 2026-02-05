export default {
  contact: {
    description: 'Return a list of my contact information.',
    list: [
      {
        type: 'info',
        label: 'Email:',
        content: '`ja4tin@hotmail.com`'
      },
      {
        type: 'info',
        label: 'Github:',
        content: '`https://github.com/ja4tin`'
      },
      {
        type: 'info',
        label: 'Twitter:',
        content: '`https://twitter.com/ja4tin`'
      },
      {
        type: 'info',
        label: 'Telegram:',
        content: '`https://t.me/ja4tin`'
      }
    ]
  },
  skill: {
    description: 'Return a list of my skills and my rating of them.',
    list: [
      { type: 'success', label: 'A', content: '· Python 60/100' },
      { type: 'success', label: 'A', content: '· HTML 60/100' },
      { type: 'success', label: 'A', content: '· CSS 60/100' },

      { type: 'warning', label: 'B', content: '· GO 40/100' },
      { type: 'warning', label: 'B', content: '· Shell 40/100' },

      { type: 'error', label: 'C', content: '· JAVASCRIPT 20/100' },

      { type: 'black', label: 'D', content: '· ELSE -999/100' }
    ]
  },

}
