import React from 'react';

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

const Footer = () => (
  <div className="uk-flex">
    <p className="uk-text-small uk-text-meta uk-padding-small uk-margin-remove uk-background-muted">
      <a href="https://getgosocial.app/" {...externalLinkProps}>GoSocial</a> | <a href="https://hapramp.com/asteria" {...externalLinkProps}>Asteria</a> | <a href="https://1ramp.io/" {...externalLinkProps}>1Ramp</a> from <a href="https://hapramp.com/" {...externalLinkProps}>Hapramp</a>.
    </p>
  </div>
);

export default Footer;
