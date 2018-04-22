import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';

const Text = ({ style, type = 'p', children, ...props }) => {
  return (
    <RNText style={[styles.base, styles[type], style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '1.45rem',
  },
  h2: {
    fontSize: '1.62671rem',
    fontWeight: 'bold',
    marginBottom: '1.45rem',
  },
  p: {
    fontSize: 16,
  },
  base: {
    //
  },
});

export default Text;
