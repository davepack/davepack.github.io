import React from 'react';
import { Image as RNImage } from 'react-native';
import { withPrefix } from 'gatsby-link';

const TINY = 200;
const SMALL = 400;
const MED = 800;

let Image = ({ fileName, width, height, style, ...props }) => {
  if (height <= TINY && width <= TINY) {
    fileName += '-tiny.jpg';
  } else if (height <= SMALL && width <= SMALL) {
    fileName += '-small.jpg';
  } else if (height <= MED && width <= MED) {
    fileName += '-medium.jpg';
  }

  let uri = withPrefix('/images/' + fileName);

  return (
    <RNImage source={{ uri }} style={[style, { height, width }]} {...props} />
  );
};

export default Image;
