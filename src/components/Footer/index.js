import React from 'react';

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

const Footer = () => (
  <div className="uk-background-muted uk-padding-small uk-panel uk-flex uk-flex-between">
    <p className="uk-text-small uk-text-meta uk-margin-remove uk-marign-right">
      <a href="https://getgosocial.app/" {...externalLinkProps}>GoSocial</a> | <a href="https://hapramp.com/asteria" {...externalLinkProps}>Asteria</a> | <a href="https://1ramp.io/" {...externalLinkProps}>1Ramp</a> from <a href="https://hapramp.com/" {...externalLinkProps}>Hapramp</a>.
    </p>
    <p className="uk-text-small uk-text-meta uk-margin-remove">
      &copy; Hapramp Studio Private Limited
    </p>
  </div>
);

export default Footer;
