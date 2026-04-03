const fs = require('fs')
const path = require('path')

function restoreEmojis(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir)
  items.forEach(item => {
    if (['node_modules', '.git', 'dist'].includes(item)) return
    const full = path.join(dir, item)
    if (fs.statSync(full).isDirectory()) {
      restoreEmojis(full)
    } else if (full.match(/\.(tsx|jsx|ts|js)$/)) {
      let content = fs.readFileSync(full, 'utf8')
      let original = content
      
      // Look for literal \uXXXX sequences in the file strings
      // We use a regex that matches the literal backslash followed by u and 4 or more hex digits
      content = content.replace(/\\u([0-9A-Fa-f]{4,8})/g, (match, hex) => {
        try {
          return String.fromCodePoint(parseInt(hex, 16))
        } catch (e) {
          return match // Keep it if it's not a valid code point
        }
      })

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8')
        console.log('Restored Emojis in: ' + full)
      }
    }
  })
}

restoreEmojis('.')
console.log('Emoji Restoration Done')
