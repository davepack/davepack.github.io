export const profile = {
  name: {
    first: 'Dave',
    last: 'Pack',
  },
  title: 'Front End Engineer',
  location: 'Mountain View, CA',
  blurb:
    'I’m a big picture thinker. I love ideas and problem solving, learning about everything, finding connections and deep insights, thinking outside the box, and creating the future.',
  profilePic: 'dave_profile.jpg',
  links: [
    ['https://twitter.com/dave_pack', 'Twitter'],
    ['https://github.com/davepack', 'GitHub'],
    ['https://www.linkedin.com/in/dpack', 'LinkedIn'],
  ],
};

export const skills = {
  'react-native': 'React Native',
  react: 'React',
  javascript: 'JavaScript',
  'front-end': 'Front End',
  'open-source': 'Open Source',
  'api-design': 'API Design',
  'ui-design': 'UI Design',
  'mobile-design': 'Mobile Design',
  ux: 'UX',
  firebase: 'Firebase',
  'realm-db': 'Realm Mobile DB',
};

export const projects = [
  {
    title: 'Safe Area View for React Native',
    mainImage: 'SafeArea.jpg',
    blurb:
      'OSS React Native library for supporting Safe Area insets on iPhone X. Originally written for react-navigation, then extracted to its own library.',
    tags: [
      'react-native',
      'react',
      'javascript',
      'open-source',
      'api-design',
      'front-end',
      'mobile-design',
    ],
    roles: ['creator', 'active maintainer'],
    links: [
      [
        'https://github.com/react-community/react-native-safe-area-view',
        'GitHub',
      ],
    ],
  },
  {
    title: 'KnoWhy by Book of Mormon Central',
    mainImage: 'KnoWhy.jpg',
    blurb: 'Cross platform app written in React Native (JavaScript).',
    tags: [
      'react-native',
      'react',
      'javascript',
      'firebase',
      'realm-db',
      'front-end',
      'ui-design',
      'ux',
      'mobile-design',
    ],
    roles: ['designer', 'developer'],
    links: [['https://expo.io/@davepack/knowhy', 'Run app in Expo.']],
  },
];
