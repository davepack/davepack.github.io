import React from 'react';
import Link, { withPrefix } from 'gatsby-link';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ExLink, Projects, Section, Text } from '../components';

import { profile, skills, projects } from '../data';

let colors = {
  steelblue: 'steelblue',
  lightSteelBlue: '#a3c2db',
};

let SectionHeading = ({ children }) => (
  <View style={[styles.headingContainer]}>
    <View style={styles.headingLine} />
    <Text type="h2" style={{ marginBottom: 0, marginHorizontal: 20 }}>
      {children}
    </Text>
    <View style={styles.headingLine} />
  </View>
);

class IndexPage extends React.Component {
  state = {
    selectedTag: false,
  };

  pressSkillTag = selectedTag => {
    this.setState({ selectedTag });
  };

  render() {
    let { selectedTag } = this.state;
    let profilePicUri = withPrefix(`/images/${profile.profilePic}-small.jpg`);
    return (
      <Section>
        <View style={styles.topContainer}>
          <Image
            source={{ uri: profilePicUri }}
            style={styles.profilePic}
            className="profile-pic"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.blurbText}>{profile.blurb}</Text>
            <Text style={styles.linksText}>
              {profile.links.map(([to, title], i) => (
                <React.Fragment key={`links-${i}`}>
                  <ExLink to={to}>{title}</ExLink>
                  {i === profile.links.length - 1 ? '' : ' | '}
                </React.Fragment>
              ))}
            </Text>
          </View>
        </View>
        <View style={[styles.sectionContainer, styles.skillsSectionContainer]}>
          <SectionHeading>Skills</SectionHeading>
          <View style={{ alignItems: 'center', marginBottom: '1rem' }}>
            <Text>Click/tap a skill to see relevant projects.</Text>
          </View>
          <View style={styles.skillsContainer}>
            {Object.entries(skills).map(([tag, label], i) => {
              let backgroundColor = 'steelblue';
              let color = 'white';

              if (selectedTag === tag) {
                backgroundColor = 'whitesmoke';
                color = 'steelblue';
              }

              return (
                <TouchableOpacity
                  key={`tags-${i}-${tag}`}
                  style={[styles.skillContainer, { backgroundColor }]}
                  onPress={() => this.pressSkillTag(tag)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.skillText, { color }]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => this.pressSkillTag(false)}
            style={[
              styles.skillContainer,
              {
                alignSelf: 'center',
                backgroundColor: !selectedTag ? 'whitesmoke' : 'steelblue',
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}
          >
            <Text
              style={{
                color: !selectedTag ? 'steelblue' : 'white',
                marginTop: -2,
              }}
            >
              {'\u00d7 '}
            </Text>
            <Text style={{ color: !selectedTag ? 'steelblue' : 'white' }}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.sectionContainer, styles.projectsContainer]}>
          <SectionHeading>Projects</SectionHeading>
          <Projects projects={projects} selectedTag={selectedTag} />
        </View>
      </Section>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  headingLine: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: colors.lightSteelBlue,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  profilePic: {
    marginRight: 20,
    borderRadius: 40,
    width: 80,
    height: 80,
    boxShadow: '3px 3px 15px gray',
  },
  blurbText: {
    //
  },
  linksText: {
    marginTop: 15,
    fontWeight: '100',
  },
  sectionContainer: {
    marginBottom: 40,
  },
  skillsSectionContainer: {
    //
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skillContainer: {
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: 'steelblue',
    marginRight: 5,
    marginBottom: 5,
  },
  skillText: {
    color: 'white',
  },
  projectsContainer: {
    // borderWidth: 1,
    // borderColor: 'lightblue',
  },
  projectContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.lightSteelBlue,
  },
});

export default IndexPage;
