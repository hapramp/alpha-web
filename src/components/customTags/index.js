import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import indexStyles from '../../index.scss';
import styles from './styles.scss';
import { getOtherTags } from '../../utils/communityUtils';

const CustomTags = props => (
  <div className={[this.props.className].join(' ')}>
    {getOtherTags(props.tags).map(tag => (
      <span className={['uk-margin-small-right', styles.tagText].join(' ')} key={tag}>
        <span className={indexStyles.secondaryText}>#</span>
        {tag}
      </span>))}
  </div>
);

CustomTags.propTypes = {
  tags: PropTypes.arrayOf({
    tag: PropTypes.string,
  }),
};

CustomTags.defaultProps = {
  tags: [],
};


const mapStateToProps = state => ({
  communities: state.communities,
});

export default connect(mapStateToProps)(CustomTags);
