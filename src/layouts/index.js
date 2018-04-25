import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { View } from 'react-native';

import './index.css';
import { Header } from '../components';
import { profile } from '../data';

const Layout = ({ children, data }) => (
  <React.Fragment>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header
      siteTitle="Dave Pack"
      subtitle={profile.title}
      location={profile.location}
    />
    {children()}
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
