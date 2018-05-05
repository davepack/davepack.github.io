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
    marginBottom: '1rem',
  },
  h2: {
    fontSize: '1.62671rem',
    marginBottom: '1rem',
  },
  h3: {
    fontSize: '1.38316rem',
    marginBottom: '1rem',
  },
  h4: {
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  h5: {
    fontSize: '0.85028rem',
    marginBottom: '1rem',
  },
  p: {
    fontSize: 16,
  },
  base: {
    lineHeight: '1.1',
  },
});

export default Text;
