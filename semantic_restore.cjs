const fs = require('fs')
const path = require('path')

const semanticFixes = [
  { search: '\\u00E2\\u2122\\u00BB\\u00EF\\u00B8\\u008F', replace: '\\u267B\\uFE0F' }, // Recycle
  { search: '\\u00F0\\u0178\\u009B\\u00A1\\u00EF\\u00B8\\u008F', replace: '\\uD83D\\uDEE1\\uFE0F' }, // Shield
  { search: '\\u00F0\\u0178\\u009B\\u00A1', replace: '\\uD83D\\uDEE1' }, // Shield alt
  { search: '\\u00E2\\u0153\\u0085', replace: '\\u2705' }, // Check
  { search: '\\u00E2\\u00AD\\u0090', replace: '\\u2B50' }, // Star
  { search: '\\u00F0\\u0178\\u008C\\u00BF', replace: '\\uD83C\\uDF3F' }, // Herb
  { search: '\\u00F0\\u0178\\u201D\\u00B1', replace: '\\uD83D\\uDCF1' }, // Mobile
  { search: '\\u00F0\\u0178\\u2019\\u00B0', replace: '\\uD83D\\uDCB0' }, // Bag
  { search: '\\u00F0\\u0178\\u00A4\\u001D', replace: '\\uD83E\\uDD1D' }, // Handshake
  { search: '\\u00F0\\u0178\\u201D\\u0084', replace: '\\uD83D\\uDD04' }, // Refresh
  { search: '\\u00E2\\u2014\\u0086', replace: '\\u2605' }, // Star symbol black
  { search: '\\u00C2\\u00B7', replace: '\\u00B7' }, // Dot
  { search: '\\u00E2\\u20AC\\u201D', replace: '\\u2014' }, // Em dash
  { search: '\\u00E2\\u20AC\\u00A2', replace: '\\u2022' }, // Bullet
  { search: '\\u00E2\\u20AC\\u2122', replace: '\\u2019' }, // Smart quote
  { search: '\\u00E2\\u20AC\\u201C', replace: '\\u2013' }, // En dash
  { search: '\\u00E2\\u20AC\\u009D', replace: '\\u201D' }, // Smart double quote
  { search: '\\u00E2\\u20AC\\u0153', replace: '\\u201C' }, // Smart double quote open
  { search: '\\u00E2\\u2500\\u2500', replace: '\\u2500\\u2500' }, // Lines
]

function process(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir)
  items.forEach(item => {
    if (['node_modules', '.git', 'dist'].includes(item)) return
    const full = path.join(dir, item)
    if (fs.statSync(full).isDirectory()) {
      process(full)
    } else if (full.match(/\.(tsx|jsx|ts|js)$/)) {
      let content = fs.readFileSync(full, 'utf8')
      let original = content
      
      semanticFixes.forEach(f => {
        if (content.includes(f.search)) {
          content = content.split(f.search).join(f.replace)
        }
      })
      
      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8')
        console.log('Semantically Fixed: ' + full)
      }
    }
  })
}

process('.')
console.log('Semantic Restoration Done')
