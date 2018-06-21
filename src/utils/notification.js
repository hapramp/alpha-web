import UIKit from 'uikit';

const defaultOptions = {
  pos: 'bottom-left',
  timeout: 4000,
};

const messages = {};

const notifyWithoutRepeat = (message, options) => {
  if (!messages[message]) {
    UIKit.notification(message, options);
  }
  messages[message] = true;
  setTimeout(() => delete messages[message], options.timeout);
};

const notify = (message, options, repeat) => (
  repeat ? UIKit.notification(message, options) : notifyWithoutRepeat(message, options));

export default {
  info: (message, repeat = false) => notify(message, { ...defaultOptions, status: 'primary' }, repeat),
  success: (message, repeat = false) => notify(message, { ...defaultOptions, status: 'success' }, repeat),
  danger: (message, repeat = false) => notify(message, { ...defaultOptions, status: 'danger', timeout: 5000 }, repeat),
  warning: (message, repeat = false) => notify(message, { ...defaultOptions, status: 'warning' }, repeat),
};
