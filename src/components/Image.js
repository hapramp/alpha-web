import React from 'react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';

const Image = ({
  src, alt, lazyLoadProps, steemitImagesConfig,
  ...props
}) => {
  let actualUrl = src;
  if (steemitImagesConfig.enabled) {
    const resolution = steemitImagesConfig.resolution ? steemitImagesConfig.resolution : '600x800';
    actualUrl = `https://steemitimages.com/${resolution}/${src}`;
  }
  return (
    <LazyLoad {...lazyLoadProps}>
      <img src={actualUrl} alt={alt} {...props} />
    </LazyLoad>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  lazyLoadProps: PropTypes.shape({}),
  steemitImagesConfig: PropTypes.shape({
    enabled: PropTypes.bool,
    resolution: PropTypes.string,
  }),
};

Image.defaultProps = {
  alt: '',
  lazyLoadProps: {},
  steemitImagesConfig: {
    enabled: false,
    resolution: '',
  },
};

export default Image;
