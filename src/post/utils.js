import filter from 'lodash/filter';
import striptags from 'striptags';
import Remarkable from 'remarkable';
import sanitizeHtml from 'sanitize-html';

import htmlReady from '../lib/htmlReady';
import {
  htmlCommentRegex, imageRegex, latexRegex,
  dtubeImageRegex, rewriteRegex, oldAndroidFooter,
  bodyFooterSeparator,
} from './constants';
import sanitizeConfig from '../lib/sanitizeConfig';

const remarkable = new Remarkable({
  html: true,
  breaks: true,
  linkify: false,
  typographer: false,
  quotes: '“”‘’',
});

function decodeEntities(body) {
  return body.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export const removeFooter = (body) => {
  const newBody = body.replace(oldAndroidFooter, ''); // Remove old footer if there
  return newBody.split(bodyFooterSeparator)[0];
};

export const getImagesFromBody = (body) => {
  const image = [];

  const bodyWithoutFooter = removeFooter(body);
  const bodyWithoutComments = bodyWithoutFooter.replace(htmlCommentRegex, '');

  bodyWithoutComments.replace(imageRegex, (img) => {
    if (filter(image, i => i.indexOf(img) !== -1).length === 0) {
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

const addLatexSupport = body => body.replace(
  latexRegex,
  (match, p1) => `![${p1}](https://latex.codecogs.com/gif.latex?${encodeURI(p1)})`,
);

export const getCompleteHTML = (body) => {
  // Remove custom footer added by 1Ramp
  const withoutFooter = removeFooter(body);
  // Latex
  const HTMLWithLatex = addLatexSupport(withoutFooter);
  // Convert to  HTML
  const contentHTML = remarkable.render(HTMLWithLatex);
  // HTML Ready from Steem
  let parsedBody = htmlReady(contentHTML, { mutate: true, resolveIframe: true }).html;
  // Remove dtube image regex
  parsedBody = parsedBody.replace(dtubeImageRegex, '');
  // Other steem platform redirect fixes
  parsedBody = parsedBody.replace(rewriteRegex, (match, p1) => `"${p1 || '/'}"`);
  // Sanitize HTML
  parsedBody = sanitizeHtml(parsedBody, sanitizeConfig({ secureLinks: false }));
  return parsedBody;
};
