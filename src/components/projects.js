import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from './';

import { Image } from './';

const CARDSIZE = 280;
const MARGIN = 19.2;
const DURATION = 200;

const Project = ({
  project,
  onProjectPress,
  projectLayout,
  projectRef,
}) => {
  let {
    title,
    mainImage,
    blurb,
    tags,
    roles,
    links,
  } = project;
  
  let { containerStyle, animatedBackgroundColor, animatedPosition, animatedSize, animatedStyle, cardSize, cardStyle } = projectLayout;
  
  let backgroundColor = animatedBackgroundColor.interpolate({
    inputRange: [0,1],
    outputRange: ['rgba(105,105,105,0)','rgba(25, 25, 25, 0.9)'],
  });
  
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
            backgroundColor,
            padding: MARGIN,
            alignItems: 'center',
          },
          animatedStyle,
        ]}
      >
        <Animated.View style={[
            styles.projectCard,
            {
              width: cardSize.width,
              height: cardSize.height,
            },
            cardStyle,
          ]}
        >
          <TouchableOpacity
            onPress={onProjectPress}
            activeOpacity={0.7}
          >
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
    boxShadow: '3px 3px 15px gray',
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
      animatedBackgroundColor: new Animated.Value(0),
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
    }));
    this.state = {
      projectIndex: null,
      projectsLayout,
    };
  }

  measureProject = (index, callback) => {
    let projectRef = this.projectRefs[index];
    if (projectRef) {
      projectRef.measureInWindow((x, y) => {
        //if (index === 0) console.log(`x${x} y${y}`);
        //console.log('measure project');
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
    //console.log('open card');
    
    let projectsLayout = [
      ...this.state.projectsLayout,
    ];
    
    projectsLayout[index] = {
      ...projectsLayout[index],
      animatedStyle: { position: 'absolute' },
      containerStyle: { zIndex: 9999 },
    }
    
    this.setState(
      { projectsLayout },
      () => {
        let { animatedBackgroundColor, animatedSize, animatedPosition, cardSize, x, y } = projectsLayout[index];
        let toCardWidth = Math.min(window.innerHeight, window.innerWidth) - 2 * MARGIN;
        let toCardHeight = window.innerHeight - 2 * MARGIN;

        let duration = DURATION;
        Animated.sequence([
          Animated.parallel([
            Animated.timing(animatedBackgroundColor, {
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
          ])
        ]).start(callback);
      }
    );
  };

  closeCard = (index, callback) => {
    let projectsLayout = [
      ...this.state.projectsLayout,
    ];
    
    projectsLayout[index] = {
      ...projectsLayout[index],
      animatedStyle: {position: 'absolute'},
    };

    this.setState({projectsLayout}, () => {
      //console.log('close card');
      //console.log(projectsLayout);
      let { animatedBackgroundColor, animatedSize, animatedPosition, cardSize, x, y } = projectsLayout[index];
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
          Animated.timing(animatedBackgroundColor, {
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
    //console.log('fixCard');
    let projectsLayout = [
      ...this.state.projectsLayout,
    ];

    let width = Math.min(window.innerWidth,  window.innerHeight);
    let height = width;
    projectsLayout[index] = {
      ...projectsLayout[index],
      animatedStyle: {
        position: 'fixed',
/*        width,
        height,
        marginVertical: MARGIN,
        marginHorizontal: 'auto',
        top: 0,
        left: 0,*/
      },
    };

    this.setState({ projectsLayout }, () => {
      if (callback) callback();
    });
  };

  onProjectPress = index => () => {
    //console.log(`${index} pressed`);
    this.measureProject(index, () => {
      let { projectIndex: oldIndex } = this.state;
      let projectIndex = oldIndex === index ? null : index;
      
      //console.log(`${index} ${oldIndex} ${projectIndex}`); 

      if (oldIndex === index) {
        let projectsLayout = [
          ...this.state.projectsLayout,
        ];

        projectsLayout[index] = {
          ...projectsLayout[index],
          animatedStyle: { position: 'relative', top: 0, left: 0 },
          containerStyle: { zIndex: 0 },
        };

        this.closeCard(index, () => {
          this.setState({
            projectIndex,
            projectsLayout,
          });
        });
      } else {
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
    let { projectsLayout, projectIndex, cardStyle } = this.state;
    return (
      <View
        style={styles.projectsContainer}
        ref={c => (this.projectsContainerRef = c)}
      >
        {projects.map((project, i) => {
          //console.log(`render ${i}`)
          //console.log(projectsLayout[i]);
          //return (<View key={`project-${i}`}><Text>{project.title}</Text></View>);
          
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
    // borderWidth: 1,
    // borderColor: 'pink',
  },
});
