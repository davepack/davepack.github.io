import React from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';

const Text = ({
  style,
  textStyle,
  type = 'p',
  headingLine = false,
  children,
  ...props
}) => {
  return (
    <RNText style={[styles.base, styles[type], style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: '2.25rem',
  },
  h2: {
    fontSize: '1.62671rem',
  },
  h3: {
    fontSize: '1.38316rem',
  },
  h4: {
    fontSize: '1.2rem',
  },
  h5: {
    fontSize: '1rem',
  },
  p: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
  },
  base: {
    lineHeight: '1.1',
    marginTop: 15,
    marginBottom: 5,
  },
});

export default Text;
