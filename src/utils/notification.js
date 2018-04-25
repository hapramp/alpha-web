import UIKit from 'uikit';

const defaultOptions = {
	pos: 'bottom-left',
	timeout: 4000,
}

export default {
	info: message => UIKit.notification(message, {...defaultOptions, status: 'primary'}),
	success: message => UIKit.notification(message, {...defaultOptions, status: 'success'}),
	danger: message => UIKit.notification(message, {...defaultOptions, status: 'danger', timeout: 5000}),
	warning: message => UIKit.notification(message, {...defaultOptions, status: 'warning'}),
}
