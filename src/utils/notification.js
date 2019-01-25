import { toast } from 'react-toastify';

const defaultOptions = {
  position: 'bottom-left',
  autoClose: 4000,
};

const messages = {};

const notify = (message, options) => {
  const { status, ...otherOptions } = options;
  switch (status) {
    case 'success':
      toast.success(message, ...otherOptions);
      break;
    case 'danger':
      toast.error(message, ...otherOptions);
      break;
    case 'warning':
      toast.warn(message, ...otherOptions);
      break;
    case 'primary':
    default:
      toast.info(message, ...otherOptions);
  }
};

const notifyWithoutRepeat = (message, options) => {
  if (!messages[message]) {
    notify(message, options);
  }
  messages[message] = true;
  setTimeout(() => delete messages[message], options.timeout);
};

export default {
  info: message => notifyWithoutRepeat(message, { ...defaultOptions, status: 'primary' }),
  success: message => notifyWithoutRepeat(message, { ...defaultOptions, status: 'success' }),
  danger: message => notifyWithoutRepeat(message, { ...defaultOptions, status: 'danger', autoClose: 5000 }),
  warning: message => notifyWithoutRepeat(message, { ...defaultOptions, status: 'warning' }),
};
