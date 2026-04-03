const fs = require('fs')
const path = require('path')

const corruptedReplacements = {
  'ðŸ›¡ï¸ ': '\\uD83D\\uDEE1\\uFE0F',
  'â­ ': '\\u2B50',
  'ðŸŒ¿': '\\uD83C\\uDF3F',
  'ðŸ“±': '\\uD83D\\uDCF1',
  'ðŸ’°': '\\uD83D\\uDCB0',
  'ðŸ¤ ': '\\uD83E\\uDD1D',
  'âœ…': '\\u2705',
  'â™»ï¸ ': '\\u267B\\uFE0F',
  'ðŸ”„': '\\uD83D\\uDD04',
  'â˜…': '\\u2605',
  'â€”': '\\u2014',
  'â€¢': '\\u2022',
  'â€™': '\\u2019',
  'Â·': '\\u00B7',
  'â–¾': '\\u25BE', 
  'ðŸ§¹': '\\uD83E\\uDDB9',
  'ðŸ“…': '\\uD83D\\uDCC5',
  'ðŸ“¦': '\\uD83D\\uDCE6',
  'ðŸ“': '\\uD83D\\uDCC5', // Fallback for the one the user mentioned
  'âœ ': '\\u200D', // Zero width joiner often gets corrupted
  'Ã': '\\u00C3',
}

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
      
      for (const [corrupted, fixed] of Object.entries(corruptedReplacements)) {
        if (content.includes(corrupted)) {
          const regex = new RegExp(corrupted, 'g')
          content = content.replace(regex, fixed)
        }
      }
      
      // Also look for any remaining UTF-8 characters and escape them for stability
      // (Optionally, but let's stick to the corrupted ones first to avoid over-fixing)

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8')
        console.log('Fixed corrupted symbols in: ' + full)
      }
    }
  })
}

process('.')
console.log('Done')
