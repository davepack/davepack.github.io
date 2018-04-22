import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Section extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //
  },
  section: {
    // padding: 20,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 960,
    paddingVertical: '1.45rem',
    paddingHorizontal: '1.0875rem',
  },
});
