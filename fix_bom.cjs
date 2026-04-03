const fs = require('fs')
const path = require('path')

function fixBom(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir)
  items.forEach(item => {
    if (['node_modules', '.git', 'dist'].includes(item)) return
    const full = path.join(dir, item)
    if (fs.statSync(full).isDirectory()) {
      fixBom(full)
    } else if (full.match(/\.(tsx|jsx|ts|js)$/)) {
      let content = fs.readFileSync(full, 'utf8')
      let original = content
      
      // Remove literal \uFEFF string at the very start
      if (content.startsWith('\\uFEFF')) {
        content = content.substring(6)
      }
      
      // Also remove any real BOMs just in case
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.substring(1)
      }

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8')
        console.log('Fixed BOM in: ' + full)
      }
    }
  })
}

fixBom('.')
console.log('BOM Fix Done')
