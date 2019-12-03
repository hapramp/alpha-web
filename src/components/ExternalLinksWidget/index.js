import React from 'react';

import styles from './styles.scss';

const links = [
  {
    text: '1Ramp.io',
    link: 'https://1ramp.io',
  },
  {
    text: 'About',
    link: 'https://1ramp.io/about',
  },
  // {
  //   text: 'Help',
  //   link: 'https://1ramp.io/faq.html',
  // },
  // {
  //   text: '#WeAreOne',
  //   link: 'https://1ramp.io/weareone.html',
  // },
  {
    text: 'Discord',
    link: 'https://discordapp.com/invite/c6N9kVM',
  },
  {
    text: 'Steemit',
    link: 'https://steemit.com/@the1ramp',
  },
  {
    text: 'GitHub',
    link: 'https://github.com/hapramp',
  },
  {
    text: 'Android App',
    link: 'https://play.google.com/store/apps/details?id=com.hapramp',
  },
  // {
  //   text: 'Terms',
  //   link: 'https://1ramp.io/terms.html',
  // },
];

export default () => (
  <div className={styles.container}>
    {
      links.map(link => (
        <a target="_blank" href={link.link} key={link.link}>{link.text}</a>
      ))
    }
  </div>
);
