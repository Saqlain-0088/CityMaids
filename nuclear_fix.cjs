const fs = require('fs')
const path = require('path')

function escapeNonAscii(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir)
  items.forEach(item => {
    if (['node_modules', '.git', 'dist'].includes(item)) return
    const full = path.join(dir, item)
    if (fs.statSync(full).isDirectory()) {
      escapeNonAscii(full)
    } else if (full.match(/\.(tsx|jsx|ts|js)$/)) {
      let content = fs.readFileSync(full, 'utf8')
      let original = content
      
      // Replace ANY non-ASCII character with its Unicode escape sequence
      // This is the most conservative and robust way to fix encoding issues.
      content = content.replace(/[^\x00-\x7F]/g, (c) => {
        const code = c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')
        return `\\u${code}`
      })
      
      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8')
        console.log('Escaped All Non-ASCII in: ' + full)
      }
    }
  })
}

escapeNonAscii('.')
console.log('Global Non-ASCII Escape Done')
