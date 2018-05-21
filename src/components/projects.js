import React, { Component } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { ExLink, Image, Text } from './';

const CARDSIZE = 280;
const MARGIN = 19.2;
const DURATION = 200;
const MAXSIZE = 960;

// from https://davidwalsh.name/javascript-debounce-function
let debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

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

  console.log(projectIsOpen);

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

let projectStyles = {
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
};

export default class Projects extends Component {
  projectsContainerRef = null;
  projectRefs = [];

  constructor(props) {
    super(props);
    let visibleCards = [];
    let projectsLayout = props.projects.map((p, i) => {
      visibleCards.push(i);
      return {
        xW: null,
        yW: null,
        xP: null,
        yP: null,
        animatedSize: {
          width: new Animated.Value(CARDSIZE + 2 * MARGIN),
          height: new Animated.Value(CARDSIZE + 2 * MARGIN),
        },
        animatedPosition: {
          top: new Animated.Value(0),
          left: new Animated.Value(0),
        },
        cardPosition: {
          top: new Animated.Value(0),
          left: new Animated.Value(0),
        },
        cardSize: {
          width: new Animated.Value(CARDSIZE),
          height: new Animated.Value(CARDSIZE),
        },
        cardOpacity: new Animated.Value(1),
        genericValue: new Animated.Value(0),
        animatedStyle: {
          position: 'relative',
        },
        containerStyle: {
          zIndex: 0,
        },
        cardStyle: {
          boxShadow: '3px 3px 15px gray',
        },
      };
    });
    this.state = {
      visibleCards,
      projectIndex: null,
      projectsLayout,
      animatedValue: new Animated.Value(0),
    };
  }

  measureProject = (index, callback) => {
    let projectRef = this.projectRefs[index];
    if (projectRef) {
      projectRef.measureInWindow((xW, yW) => {
        let projectsLayout = [...this.state.projectsLayout];
        projectsLayout[index] = {
          ...projectsLayout[index],
          xW,
          yW,
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
      let {
        animatedSize,
        animatedPosition,
        cardPosition,
        cardSize,
        xW,
        yW,
        genericValue,
      } = projectsLayout[index];

      let toCardWidth =
        Math.min(MAXSIZE, window.innerHeight, window.innerWidth) - 2 * MARGIN;
      let toCardHeight = Math.min(MAXSIZE, window.innerHeight) - 2 * MARGIN;

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
          Animated.timing(cardPosition.top, {
            toValue: 0,
            duration,
          }),
          Animated.timing(cardPosition.left, {
            toValue: 0,
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
            toValue: -xW,
            duration,
          }),
          Animated.timing(animatedPosition.top, {
            toValue: -yW,
            duration,
          }),
          Animated.timing(genericValue, {
            toValue: 1,
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
      let {
        animatedSize,
        animatedPosition,
        cardSize,
        xW,
        yW,
        genericValue,
      } = projectsLayout[index];
      let toAnimatedSize = CARDSIZE + 2 * MARGIN;
      let toPosition = {
        top: 0,
        left: 0,
      };

      let duration = DURATION;
      Animated.sequence([
        Animated.parallel([
          Animated.timing(animatedPosition.left, {
            toValue: -xW,
            duration: 0,
          }),
          Animated.timing(animatedPosition.top, {
            toValue: -yW,
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
          Animated.timing(genericValue, {
            toValue: 0,
            duration,
          }),
          this.moveCards(this.state.visibleCards),
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
        this.setState({ projectIndex }, () => {
          this.openCard(index, () => {
            this.fixCardOpen(index);
          });
        });
      }
    });
  };

  onProjectLayout = index => ({
    nativeEvent: {
      layout: { x: xP, y: yP, width, height },
    },
  }) => {
    // console.log('on project layout');
    let projectsLayout = [...this.state.projectsLayout];

    projectsLayout[index] = {
      ...projectsLayout[index],
      xP,
      yP,
    };

    this.setState({ projectsLayout });
  };

  disappearCards = removeArr => {
    let removimationArr = [];

    removeArr.forEach(index => {
      let { cardOpacity } = this.state.projectsLayout[index];

      removimationArr.push(
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: DURATION,
        })
      );
    });

    return Animated.parallel(removimationArr);
  };

  appearCards = appearArr => {
    let appearimationArr = [];

    appearArr.forEach(index => {
      let { cardOpacity } = this.state.projectsLayout[index];

      appearimationArr.push(
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: DURATION,
        })
      );
    });

    return Animated.parallel(appearimationArr);
  };

  moveCards = moveArr => {
    let movimationArr = [];

    moveArr.forEach((index, newIndex) => {
      let { projectsLayout } = this.state;
      let { cardPosition, xP, yP } = projectsLayout[index];
      let { xP: newX, yP: newY } = projectsLayout[newIndex];

      let toTopValue = newY - yP;
      let toLeftValue = newX - xP;

      movimationArr.push(
        Animated.timing(cardPosition.top, {
          toValue: toTopValue,
          duration: DURATION,
        }),
        Animated.timing(cardPosition.left, {
          toValue: toLeftValue,
          duration: DURATION,
        })
      );
    });

    return Animated.parallel(movimationArr);
  };

  arrangeCards = selectedTag => {
    // animate card position in list
    let { projects } = this.props;
    let { visibleCards, projectsLayout } = this.state;

    let appearArr = [];
    let moveArr = [];
    let removeArr = [];

    projects.forEach(({ tags }, i) => {
      if (!selectedTag) {
        if (!visibleCards.includes(i)) {
          appearArr.push(i);
        }
        moveArr.push(i);
        return;
      }

      if (tags.includes(selectedTag)) {
        if (!visibleCards.includes(i)) {
          appearArr.push(i);
        }
        moveArr.push(i);
      } else {
        removeArr.push(i);
      }
    });

    Animated.parallel([
      this.disappearCards(removeArr),
      this.appearCards(appearArr),
      this.moveCards(moveArr),
    ]).start();

    this.setState({ visibleCards: moveArr });
  };

  componentWillReceiveProps({ selectedTag }) {
    this.arrangeCards(selectedTag);
  }

  render() {
    let { projects, skills } = this.props;
    let {
      animatedValue,
      projectsLayout,
      projectIndex,
      visibleCards,
    } = this.state;

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
            zIndex: projectIndex >= 0 ? 99 : 0,
            backgroundColor,
          }}
        />
        {projects.map((project, i) => {
          let projectIsOpen = projectIndex === i;
          return (
            <Project
              key={`project-${i}`}
              projectRef={c => (this.projectRefs[i] = c)}
              onProjectPress={this.onProjectPress(i)}
              onProjectLayout={debounce(this.onProjectLayout(i), 250)}
              projectLayout={projectsLayout[i]}
              project={project}
              disablePress={projectIsOpen || !visibleCards.includes(i)}
              skills={skills}
              projectIsOpen={projectIsOpen}
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
