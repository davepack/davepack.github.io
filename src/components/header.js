import React from 'react';
import Link from 'gatsby-link';
import { StyleSheet, View } from 'react-native';
import { Text } from './';

const Header = ({ siteTitle, subTitle }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text type="h1" style={styles.titleText}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
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
    fontWeight: 100,
  },
});

export default Header;
