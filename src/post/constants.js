export const imageRegex = /https?:\/\/(?:[-a-zA-Z0-9._]*[-a-zA-Z0-9])(?::\d{2,5})?(?:[/?#](?:[^\s"'<>\][()]*[^\s"'<>\][().,])?(?:(?:\.(?:tiff?|jpe?g|gif|png|svg|ico)|ipfs\/[a-z\d]{40,})(\?.*?token=.*?)?))/gi;

export const htmlCommentRegex = /<!--([\s\S]+?)(-->|$)/g;

export const bodyFooterSeparator = '<div id="1ramp-footer" />';
export const oldAndroidFooter = '<hr><center><h4>\n<a href="https://1ramp.io"><img src="https://ipfs.busy.org/ipfs/QmTFN4mf55SRZkP8Ug7jXVP3sXAmH7sd35zMNwLFpgGqNU"/></a><br><a href="https://play.google.com/store/apps/details?id=com.hapramp">Try 1Ramp Android Now!</a>\n</h4></center>';

export default null;
