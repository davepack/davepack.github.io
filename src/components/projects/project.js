import React, { Component } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { ExLink, Image, Text } from '../';
import { CARDSIZE, MARGIN, MAXSIZE } from './';

const Project = ({
  project,
  onProjectPress,
  onProjectLayout,
  projectLayout,
  projectRef,
  disablePress,
  skills,
  projectIsOpen,
}) => {
  let { title, mainImage, blurb, tags, roles, links, timeFrame } = project;

  let {
    containerStyle,
    animatedPosition,
    animatedSize,
    animatedStyle,
    cardPosition,
    cardSize,
    cardOpacity,
    cardStyle,
    genericValue,
  } = projectLayout;

  let titleFontSize = genericValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['20px', '30px'],
  });

  return (
    <View
      ref={projectRef}
      onLayout={onProjectLayout}
      style={[
        styles.projectContainer,
        containerStyle,
        {
          height: CARDSIZE + 2 * MARGIN,
          width: CARDSIZE + 2 * MARGIN,
          // borderWidth: 2,
          // borderColor: 'purple',
        },
      ]}
    >
      <Animated.View
        style={[
          {
            height: animatedSize.height,
            width: animatedSize.width,
            top: animatedPosition.top,
            left: animatedPosition.left,
            padding: MARGIN,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 2,
            // borderColor: 'red',
          },
          animatedStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.projectCard,
            {
              width: cardSize.width,
              height: cardSize.height,
              opacity: cardOpacity,
              top: cardPosition.top,
              left: cardPosition.left,
              maxHeight: MAXSIZE,
              maxWidth: MAXSIZE,
            },
            cardStyle,
          ]}
        >
          <TouchableOpacity
            onPress={onProjectPress}
            activeOpacity={0.7}
            disabled={disablePress}
            style={{ height: '100%' }}
          >
            <Image
              fileName={mainImage}
              width={CARDSIZE}
              height={CARDSIZE}
              style={{ height: cardSize.width, width: cardSize.width }}
              resizeMode="cover"
            />
            <View style={styles.blurbContainer}>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{
                  overflow: projectIsOpen ? undefined : 'hidden',
                }}
              >
                <Animated.Text
                  // numberOfLines={1}
                  title={title}
                  style={{
                    lineHeight: '1.1',
                    fontSize: titleFontSize,
                    marginBottom: 15,
                    marginTop: 20,
                  }}
                >
                  {title}
                </Animated.Text>
                <Animated.Text style={{ lineHeight: '1.1', fontSize: 16 }}>
                  {blurb}
                </Animated.Text>
                <Animated.View
                  style={{
                    opacity: genericValue,
                    marginBottom: 15,
                    height: projectIsOpen ? undefined : 0,
                  }}
                >
                  <Text type="h4">Roles</Text>
                  <Text>{roles.join(', ')}</Text>
                  <Text type="h4">Skills</Text>
                  <Text>{tags.map(tag => skills[tag]).join(', ')}</Text>
                  <Text type="h4">Links</Text>
                  {links.map(({ title, url, desc }) => (
                    <React.Fragment key={url}>
                      <ExLink to={url}>{title}</ExLink>
                      {desc && <Text>{desc}</Text>}
                    </React.Fragment>
                  ))}
                  <Text />
                  <TouchableOpacity
                    onPress={onProjectPress}
                    disabled={!disablePress}
                    style={{ marginVertical: 20 }}
                  >
                    <Text>Close</Text>
                  </TouchableOpacity>
                </Animated.View>
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

let styles = StyleSheet.create({
  projectContainer: {
    //
  },
  projectCard: {
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
    height: '100%',
    // borderWidth: 2,
    // borderColor: 'pink',
  },
  titleText: {
    fontSize: '100%',
  },
  blurbContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
    backgroundColor: 'white',
    boxShadow: '1px 1px 5px gray',
  },
  scrollView: {
    paddingHorizontal: 20,
    boxSizing: 'border-box',
    // borderWidth: 3,
    // borderColor: 'lightblue',
    marginBottom: 15,
  },
});

export default Project;
