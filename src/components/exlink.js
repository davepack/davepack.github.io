import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './';

const ExLink = ({ to, children, ...props }) => {
  return (
    <Text style={styles.link}>
      <a href={to} target="blank">
        {children}
      </a>
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight: '100',
  },
});

export default ExLink;
