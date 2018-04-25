import React from 'react';
import Link from 'gatsby-link';
import { Image, StyleSheet, View } from 'react-native';
import { ExLink, Section, Text } from '../components';

import { profile, projects } from '../data';
import profilePic from '../images/dave_profile.jpg';

const IndexPage = () => (
  <Section>
    <View style={styles.topContainer}>
      <Image
        source={profilePic}
        style={styles.profilePic}
        className="profile-pic"
        resizeMode
      />
      <Text>{profile.blurb}</Text>
    </View>
    <View style={styles.socialLinksContainer}>
      <Text>
        <ExLink
          to="https://www.linkedin.com/in/dpack/"
          style={{ textDecoration: 'none', color: 'lightsteelblue' }}
        >
          LinkedIn
        </ExLink>
        {' | '}
        <ExLink
          to="https://github.com/davepack"
          style={{ textDecoration: 'none', color: 'lightsteelblue' }}
        >
          GitHub
        </ExLink>
      </Text>
    </View>
  </Section>
);

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    height: 80,
    width: 80,
    marginRight: 20,
    borderRadius: 40,
    shadowColor: 'black',
    shadowOffset: {
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    // borderWidth: 1,
    // borderColor: 'pink',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default IndexPage;
