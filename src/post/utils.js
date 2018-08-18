import _ from 'lodash';
import striptags from 'striptags';
import Remarkable from 'remarkable';

import { htmlCommentRegex, imageRegex } from './constants';

const remarkable = new Remarkable({ html: true });

function decodeEntities(body) {
  return body.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export const getImagesFromBody = (body) => {
  const image = [];

  const bodyWithoutComments = body.replace(htmlCommentRegex, '(html comment removed: $1)');

  bodyWithoutComments.replace(imageRegex, (img) => {
    if (_.filter(image, i => i.indexOf(img) !== -1).length === 0) {
      image.push(img);
    }
  });

  return image;
};

export const getBodyTextOnly = (body) => {
  let strippedTags = striptags(remarkable.render(striptags(decodeEntities(body))));
  strippedTags = strippedTags.replace(/(?:https?|ftp):\/\/[\S]+/g, '');

  if (!strippedTags.replace(/\s/g, '').length) {
    return null;
  }
  return strippedTags;
};
