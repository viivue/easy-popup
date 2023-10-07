const showdown = require('showdown');
const converter = new showdown.Converter();

// options: https://github.com/showdownjs/showdown
converter.setOption('parseImgDimensions', true);
converter.setOption('simplifiedAutoLink', true);
converter.setOption('tables', true);
converter.setOption('tablesHeaderId', true);
converter.setOption('ghCompatibleHeaderId', true);
converter.setOption('ghCodeBlocks', true);
converter.setOption('tasklists', true);
converter.setOption('smartIndentationFix', true);
converter.setOption('strikethrough', true);
converter.setOption('simpleLineBreaks', true);
converter.setOption('ghMentions', true);
converter.setFlavor('github');

/**
 * Convert markdown string to HTML string
 * @param md
 * @returns {*}
 */
export default function toMarkdown(md){
    return converter.makeHtml(md);
}