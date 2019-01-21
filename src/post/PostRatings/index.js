import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { take } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import ScrollBar from 'react-custom-scrollbars';

import Icon from '../../icons/Icon';
import RatingCard from './RatingCard';
import styles from './styles.scss';

const itemsPerPage = 20;
const parentSelector = () => document.getElementById('root');
const preventParentScroll = () => {
  document.body.style.overflow = 'hidden';
};
const enableParentScroll = () => {
  document.body.removeAttribute('style');
};
const noOp = () => { };

const PostRatings = ({
  ratings, showRatings, onClose, postValue,
}) => {
  const sortedRatings = ratings.sort((ratingA, ratingB) => ratingB.rshares - ratingA.rshares);
  let totalRshares = 1;
  if (showRatings) {
    totalRshares = sortedRatings.reduce((acc, curr) => acc + parseInt(curr.rshares, 10), 0);
  }
  const ratio = postValue / totalRshares;
  const [displayCount, changeDisplayCount] = useState(0);
  return (
    <Modal
      isOpen={showRatings}
      onAfterOpen={preventParentScroll}
      onRequestClose={onClose}
      onAfterClose={enableParentScroll}
      parentSelector={parentSelector}
      className={`uk-position-center ${styles.modalContainer}`}
      style={{
        overlay: {
          backgroundColor: 'rgba(242, 242, 242, 0.97)',
          zIndex: 1,
        },
        content: {
          boxShadow: '0 4px 12px rgba(0,0,0,.15)',
        },
      }}
    >
      <div className={styles.heading}>
        <span>Ratings</span>
        <span>
          <Icon name="cancel" type="outline" onClick={onClose} />
        </span>
      </div>
      <div className={`${styles.ratingContainer}`}>
        <ScrollBar autoHeight autoHeightMax="65vh">
          <InfiniteScroll
            pageStart={0}
            loadMore={() => changeDisplayCount(displayCount + itemsPerPage)}
            hasMore={displayCount < sortedRatings.length}
            useWindow={false}
            className={styles.ratingListContainer}
          >
            {
              take(sortedRatings, displayCount).map(rating => (
                <RatingCard
                  ratio={ratio}
                  ratingObject={rating}
                  key={rating.voter}
                />
              ))
            }
          </InfiniteScroll>
        </ScrollBar>
      </div>
    </Modal>
  );
};

PostRatings.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.bool),
  showRatings: PropTypes.bool,
  onClose: PropTypes.func,
  postValue: PropTypes.number,
};

PostRatings.defaultProps = {
  ratings: [],
  showRatings: false,
  onClose: noOp,
  postValue: 0.0,
};

export default PostRatings;
