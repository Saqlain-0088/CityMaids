const fs = require('fs')
const path = require('path')

const replacements = [
  // Double-encoded Emojis & Symbols
  { stringSearch: 'ðŸ›¡ï¸ ', replace: '\\uD83D\\uDEE1\\uFE0F' },
  { stringSearch: 'âœ…', replace: '\\u2705' },
  { stringSearch: 'â­ ', replace: '\\u2B50' },
  { stringSearch: 'ðŸŒ¿', replace: '\\uD83C\\uDF3F' },
  { stringSearch: 'ðŸ“±', replace: '\\uD83D\\uDCF1' },
  { stringSearch: 'ðŸ’°', replace: '\\uD83D\\uDCB0' },
  { stringSearch: 'ðŸ¤ ', replace: '\\uD83E\\uDD1D' },
  { stringSearch: 'â™»ï¸ ', replace: '\\u267B\\uFE0F' },
  { stringSearch: 'ðŸ”„', replace: '\\uD83D\\uDD04' },
  { stringSearch: 'ðŸ“', replace: '\\uD83D\\uDCC5' },
  { stringSearch: 'ðŸ§¹', replace: '\\uD83E\\uDDB9' },
  { stringSearch: 'ðŸ“…', replace: '\\uD83D\\uDCC5' },
  { stringSearch: 'ðŸ“¦', replace: '\\uD83D\\uDCE6' },
  { stringSearch: 'â˜…', replace: '\\u2605' },
  
  // Box drawing characters
  { stringSearch: 'â”€', replace: '\\u2500' },
  
  // Punctuation & Others
  { stringSearch: 'Â·', replace: '\\u00B7' },
  { stringSearch: 'â€”', replace: '\\u2014' },
  { stringSearch: 'â€¢', replace: '\\u2022' },
  { stringSearch: 'â€™', replace: '\\u2019' },
  { stringSearch: 'â€“', replace: '\\u2013' },
  { stringSearch: 'Â©', replace: '\\u00A9' },
  { stringSearch: 'â€', replace: '\\u201D' }, // part of smart double quote
  { stringSearch: 'â€œ', replace: '\\u201C' },
  
  // Specific corrupted snippets from the user's files
  { stringSearch: 'Ã°ÂŸÂ“', replace: '\\uD83D\\uDCC5' },
  { stringSearch: 'ðŸ📅', replace: '\\uD83D\\uDCC5' },
]

function process(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir)
  items.forEach(item => {
    if (['node_modules', '.git', 'dist'].includes(item)) return
    const full = path.join(dir, item)
    if (fs.statSync(full).isDirectory()) {
      process(full)
    } else if (full.match(/\.(tsx|jsx|ts|js|php|html|css)$/)) {
      let content = fs.readFileSync(full, 'utf8')
      let original = content
      
      replacements.forEach(r => {
        if (content.includes(r.stringSearch)) {
          // Use split/join to replace all without regex escaping issues
          content = content.split(r.stringSearch).join(r.replace)
        }
      })
      
      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8')
        console.log('Fixed: ' + full)
      }
    }
  })
}

process('.')
console.log('Final Polish Done')
