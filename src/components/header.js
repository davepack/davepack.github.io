import React from 'react';
import Link from 'gatsby-link';
import { StyleSheet, View } from 'react-native';
import { Text } from './';

const Header = ({ siteTitle, subtitle, location }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text type="h1" style={styles.titleText}>
        <Link
          to="/"
          style={{
            color: 'whitesmoke',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </Text>
      <Text type="h3" style={styles.subtitleText}>
        {subtitle}
      </Text>
      <Text type="h5" style={styles.locationText}>
        {location}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'steelblue',
    // marginBottom: '1.45rem',
  },
  titleContainer: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 960,
    paddingVertical: '1.45rem',
    paddingHorizontal: '1.0875rem',
  },
  titleText: {
    marginBottom: 0,
    fontWeight: '100',
    letterSpacing: 2,
  },
  subtitleText: {
    color: 'whitesmoke',
    fontWeight: '100',
    marginBottom: 0,
    letterSpacing: 1,
    // marginTop: 15,
  },
  locationText: {
    color: 'whitesmoke',
    fontWeight: '100',
    marginBottom: 0,
    marginTop: 5,
    letterSpacing: 1,
  },
});

export default Header;
