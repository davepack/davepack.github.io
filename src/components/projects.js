import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './';

import { Image } from './';

const CARDWIDTH = 280;
const MARGIN = 19.2;

const Project = ({
  title,
  mainImage,
  blurb,
  tags,
  roles,
  links,
  onProjectLayout,
  onProjectPress,
}) => {
  return (
    <View onLayout={onProjectLayout} style={styles.projectContainer}>
      <TouchableOpacity
        onPress={onProjectPress}
        activeOpacity={0.7}
        style={styles.projectCard}
      >
        <Image
          fileName={mainImage}
          width={CARDWIDTH}
          height={CARDWIDTH}
          resizeMode="cover"
        />
        <View style={styles.blurbContainer}>
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

let projectStyles = {
  projectContainer: {
    height: CARDWIDTH + 2 * MARGIN,
    width: CARDWIDTH + 2 * MARGIN,
    padding: MARGIN,
  },
  projectCard: {
    borderRadius: 30,
    'box-shadow': '3px 3px 15px gray',
    overflow: 'hidden',
    flex: 1,
  },
  blurbContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
    backgroundColor: 'white',
    padding: 20,
    'box-shadow': '1px 1px 5px gray',
  },
};

export default class Projects extends Component {
  onProjectLayout = index => ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }) => {
    //
  };

  onProjectPress = index => () => {
    //
  };

  render() {
    let { projects, selectedTag } = this.props;
    return (
      <View style={styles.projectsContainer}>
        {projects.map((project, i) => (
          <Project
            key={`project-${i}`}
            onProjectLayout={this.onProjectLayout(i)}
            onProjectPress={this.onProjectPress(i)}
            {...project}
          />
        ))}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  ...projectStyles,
  projectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: -MARGIN,
    // borderWidth: 1,
    // borderColor: 'pink',
  },
});
