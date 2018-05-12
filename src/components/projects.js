import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './';

import { Image } from './';

const CARDSIZE = 280;
const MARGIN = 19.2;
const DURATION = 200;

const Project = ({ project, onProjectPress, projectLayout, projectRef }) => {
  let { title, mainImage, blurb, tags, roles, links } = project;

  let {
    containerStyle,
    animatedPosition,
    animatedSize,
    animatedStyle,
    cardSize,
    cardStyle,
  } = projectLayout;

  return (
    <View
      ref={projectRef}
      style={[
        styles.projectContainer,
        containerStyle,
        {
          height: CARDSIZE + 2 * MARGIN,
          width: CARDSIZE + 2 * MARGIN,
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
            },
            cardStyle,
          ]}
        >
          <TouchableOpacity onPress={onProjectPress} activeOpacity={0.7}>
            <Image
              fileName={mainImage}
              width={CARDSIZE}
              height={CARDSIZE}
              style={{ height: cardSize.width, width: cardSize.width }}
              resizeMode="cover"
            />
            <View style={styles.blurbContainer}>
              <Text>{title}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

let projectStyles = {
  projectContainer: {
    //
  },
  projectCard: {
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
    height: '100%',
  },
  blurbContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '65%',
    backgroundColor: 'white',
    padding: 20,
    boxShadow: '1px 1px 5px gray',
  },
};

export default class Projects extends Component {
  projectsContainerRef = null;
  projectRefs = [];

  constructor(props) {
    super(props);
    let projectsLayout = props.projects.map((p, i) => ({
      x: null,
      y: null,
      animatedSize: {
        width: new Animated.Value(CARDSIZE + 2 * MARGIN),
        height: new Animated.Value(CARDSIZE + 2 * MARGIN),
      },
      animatedPosition: {
        left: new Animated.Value(0),
        top: new Animated.Value(0),
      },
      cardSize: {
        width: new Animated.Value(CARDSIZE),
        height: new Animated.Value(CARDSIZE),
      },
      animatedStyle: {
        position: 'relative',
      },
      containerStyle: {
        zIndex: 0,
      },
      cardStyle: {
        boxShadow: '3px 3px 15px gray',
      },
    }));
    this.state = {
      projectIndex: null,
      projectsLayout,
      animatedValue: new Animated.Value(0),
    };
  }

  measureProject = (index, callback) => {
    let projectRef = this.projectRefs[index];
    if (projectRef) {
      projectRef.measureInWindow((x, y) => {
        let projectsLayout = [...this.state.projectsLayout];
        projectsLayout[index] = {
          ...projectsLayout[index],
          x,
          y,
        };

        this.setState({ projectsLayout }, callback);
      });
    }
  };

  openCard = (index, callback) => {
    let projectsLayout = [...this.state.projectsLayout];

    projectsLayout[index] = {
      ...projectsLayout[index],
      animatedStyle: { position: 'absolute' },
      containerStyle: { zIndex: 9999 },
      cardStyle: {
        boxShadow: 'unset',
      },
    };

    this.setState({ projectsLayout }, () => {
      let { animatedSize, animatedPosition, cardSize, x, y } = projectsLayout[
        index
      ];
      let toCardWidth =
        Math.min(window.innerHeight, window.innerWidth) - 2 * MARGIN;
      let toCardHeight = window.innerHeight - 2 * MARGIN;

      let duration = DURATION;
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration,
          }),
          Animated.timing(animatedSize.height, {
            toValue: window.innerHeight,
            duration,
          }),
          Animated.timing(animatedSize.width, {
            toValue: window.innerWidth,
            duration,
          }),
          Animated.timing(cardSize.width, {
            toValue: toCardWidth,
            duration,
          }),
          Animated.timing(cardSize.height, {
            toValue: toCardHeight,
            duration,
          }),
          Animated.timing(animatedPosition.left, {
            toValue: -x,
            duration,
          }),
          Animated.timing(animatedPosition.top, {
            toValue: -y,
            duration,
          }),
        ]),
        Animated.parallel([
          Animated.timing(animatedPosition.left, {
            toValue: 0,
            duration: 0,
          }),
          Animated.timing(animatedPosition.top, {
            toValue: 0,
            duration: 0,
          }),
        ]),
      ]).start(callback);
    });
  };

  closeCard = (index, callback) => {
    let projectsLayout = [...this.state.projectsLayout];

    projectsLayout[index] = {
      ...projectsLayout[index],
      animatedStyle: { position: 'absolute' },
      cardStyle: {
        boxShadow: '3px 3px 15px gray',
      },
    };

    this.setState({ projectsLayout }, () => {
      let { animatedSize, animatedPosition, cardSize, x, y } = projectsLayout[
        index
      ];
      let toAnimatedSize = CARDSIZE + 2 * MARGIN;
      let toPosition = {
        top: 0,
        left: 0,
      };

      let duration = DURATION;
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animatedPosition.left, {
            toValue: -x,
            duration: 0,
          }),
          Animated.timing(animatedPosition.top, {
            toValue: -y,
            duration: 0,
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.animatedValue, {
            toValue: 0,
            duration,
          }),
          Animated.timing(animatedSize.height, {
            toValue: toAnimatedSize,
            duration,
          }),
          Animated.timing(animatedSize.width, {
            toValue: toAnimatedSize,
            duration,
          }),
          Animated.timing(cardSize.width, {
            toValue: CARDSIZE,
            duration,
          }),
          Animated.timing(cardSize.height, {
            toValue: CARDSIZE,
            duration,
          }),
          Animated.timing(animatedPosition.left, {
            toValue: 0,
            duration,
          }),
          Animated.timing(animatedPosition.top, {
            toValue: 0,
            duration,
          }),
        ]),
      ]).start(callback);
    });
  };

  fixCardOpen = (index, callback) => {
    let projectsLayout = [...this.state.projectsLayout];

    let width = Math.min(window.innerWidth, window.innerHeight);
    let height = width;
    projectsLayout[index] = {
      ...projectsLayout[index],
      animatedStyle: {
        position: 'fixed',
      },
    };

    this.setState({ projectsLayout }, () => {
      if (callback) callback();
    });
  };

  onProjectPress = index => () => {
    this.measureProject(index, () => {
      let { projectIndex: oldIndex } = this.state;
      let projectIndex = oldIndex === index ? null : index;

      if (oldIndex === index) {
        // close card
        let projectsLayout = [...this.state.projectsLayout];

        projectsLayout[index] = {
          ...projectsLayout[index],
          animatedStyle: { position: 'relative', top: 0, left: 0 },
          containerStyle: { zIndex: 0 },
          cardStyle: { boxShadow: '3px 3px 15px gray' },
        };

        this.closeCard(index, () => {
          this.setState({
            projectIndex,
            projectsLayout,
          });
        });
      } else {
        // open card
        this.openCard(index, () => {
          this.fixCardOpen(index, () => {
            this.setState({ projectIndex });
          });
        });
      }
    });
  };

  componentWillReceiveProps({ selectedTag }) {
    // animate card position in list
  }

  render() {
    let { projects } = this.props;
    let { animatedValue, projectsLayout, projectIndex } = this.state;

    let backgroundColor = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(105,105,105,0)', 'rgba(25, 25, 25, 0.9)'],
    });

    let zIndex = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 99],
    });

    return (
      <View
        style={styles.projectsContainer}
        ref={c => (this.projectsContainerRef = c)}
      >
        <Animated.View
          pointerEvents="box-none"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex,
            backgroundColor,
          }}
        />
        {projects.map((project, i) => {
          return (
            <Project
              key={`project-${i}`}
              projectRef={c => (this.projectRefs[i] = c)}
              onProjectPress={this.onProjectPress(i)}
              projectLayout={projectsLayout[i]}
              project={project}
            />
          );
        })}
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
  },
});
