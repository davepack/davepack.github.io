export const profile = {
  name: {
    first: 'Dave',
    last: 'Pack',
  },
  title: 'Front End Engineer',
  location: 'Mountain View, CA',
  blurb:
    'Strong front-end engineer, experience building mobile apps with React Native and web apps with React. Comfortable in the back-end working on the server, databases, or API design.\n\nI’m a big picture thinker. I love ideas and problem solving, learning about everything, finding connections and deep insights, and thinking outside the box.',
  status:
    'Currently looking for jobs in or near Mountain View, open to commuting to SF or San Jose.',
  ideals: [
    'Work on an interdisciplinary team.',
    'Collaborate in designing and implementing new products and features.',
    'Contribute meaningfully to product strategy, design, and development.',
    'Grow my current skills, learn new skills, mentor and teach others.',
    'Give back through open source contribution.',
  ],
  goals: [
    {
      title: '1 year',
      blurb: 'Give my first conference talk.',
    },
    {
      title: '3 years',
      blurb: 'Cofound a successfully funded startup.',
    },
    {
      title: '5 years',
      blurb: 'Speak in 5 different countries.',
    },
    {
      title: '10 years',
      blurb: 'Live in a tiny house and travel the world.',
    },
  ],
  profilePic: 'Profile-square',
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
  'react-native-web': 'react-native-web',
  animation: 'Animation',
  'web-development': 'Web Development',
  'mobile-development': 'Mobile Development',
};

export const projects = [
  {
    title: 'Personal Portfolio (this website)',
    mainImage: 'Portfolio',
    blurb:
      'My personal site for showcasing my work and skills. Built with Gatsby static site generator and react-native-web.',
    tags: [
      'react-native-web',
      'react-native',
      'react',
      'javascript',
      'ui-design',
      'animation',
      'front-end',
      'web-development',
    ],
    roles: ['creator', 'designer', 'developer'],
    links: [
      {
        title: 'Source code',
        url: 'https://github.com/davepack/davepack.github.io/tree/source',
      },
      {
        title: 'React Native Web project',
        url: 'https://github.com/necolas/react-native-web',
      },
    ],
    timeFrame: [[2018, 4], [2018, 5]],
  },
  {
    title: 'SafeAreaView for React Native',
    mainImage: 'SafeArea-square',
    blurb:
      'Library for supporting Safe Area insets on iPhone X. Originally written for react-navigation.',
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
      {
        title: 'Project source on GitHub',
        url: 'https://github.com/react-community/react-native-safe-area-view',
      },
    ],
    timeFrame: [[2017, 8], [2017, 11]],
  },
  {
    title: 'KnoWhy by Book of Mormon Central',
    mainImage: 'KnoWhy-square',
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
      'mobile-development',
    ],
    roles: ['designer', 'developer'],
    links: [
      {
        title: 'Run the app on your phone',
        url: 'https://expo.io/@davepack/knowhy',
        desc:
          'I modified the code to run in Expo, though it runs a bit slower than it originally did.',
      },
    ],
    timeFrame: [[2016, 4], [2017, 6]],
  },
];
