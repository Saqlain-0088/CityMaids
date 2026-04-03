const fs = require('fs')
const path = require('path')

// Define the sequences as hex buffers to avoid any encoding ambiguity
const replacements = [
  {
    // ðŸ›¡ï¸ (F0 9F 9B A1 EF B8 8F)
    search: Buffer.from([0xC3, 0xB0, 0xC5, 0xB8, 0xE2, 0x80, 0xBA, 0xC2, 0xA1, 0xC3, 0xAF, 0xC2, 0xB8, 0xC2, 0x8F]),
    replace: '\\uD83D\\uDEE1\\uFE0F'
  },
  {
    // ðŸ›¡ (F0 9F 9B A1) without variation selector
    search: Buffer.from([0xC3, 0xB0, 0xC5, 0xB8, 0xE2, 0x80, 0xBA, 0xC2, 0xA1]),
    replace: '\\uD83D\\uDEE1'
  },
  {
     // âœ… (E2 9C 85)
     search: Buffer.from([0xC3, 0xA2, 0xC5, 0x93, 0xE2, 0x80, 0xB0]),
     replace: '\\u2705'
  },
  {
    // â­ (E2 AD 90)
    search: Buffer.from([0xC3, 0xA2, 0xC2, 0xAD, 0xC2, 0x90]),
    replace: '\\u2B50'
  },
  {
    // ðŸŒ¿ (F0 9F 8C BF)
    search: Buffer.from([0xC3, 0xB0, 0xC5, 0xB8, 0x01, 0x52, 0xC2, 0xBF]), // Wait, encoding varies
    // Let's use a more robust string search for common corrupted prefixes
    stringSearch: 'ðŸ›¡ï¸ ', replace: '\\uD83D\\uDEE1\\uFE0F'
  },
  { stringSearch: 'â­ ', replace: '\\u2B50' },
  { stringSearch: 'ðŸŒ¿', replace: '\\uD83C\\uDF3F' },
  { stringSearch: 'ðŸ“±', replace: '\\uD83D\\uDCF1' },
  { stringSearch: 'ðŸ’°', replace: '\\uD83D\\uDCB0' },
  { stringSearch: 'ðŸ¤ ', replace: '\\uD83E\\uDD1D' },
  { stringSearch: 'âœ…', replace: '\\u2705' },
  { stringSearch: 'â™»ï¸ ', replace: '\\u267B\\uFE0F' },
  { stringSearch: 'ðŸ”„', replace: '\\uD83D\\uDD04' },
  { stringSearch: 'ðŸ“', replace: '\\uD83D\\uDCC5' },
  { stringSearch: 'Â·', replace: '\\u00B7' },
  { stringSearch: 'â€”', replace: '\\u2014' },
  { stringSearch: 'â€¢', replace: '\\u2022' },
  { stringSearch: 'â€™', replace: '\\u2019' },
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
      let raw = fs.readFileSync(full)
      let changed = false
      
      // Try string replacement first (most common)
      let content = raw.toString('utf8')
      let originalContent = content
      
      replacements.forEach(r => {
        if (r.stringSearch && content.includes(r.stringSearch)) {
          content = content.split(r.stringSearch).join(r.replace)
          changed = true
        }
      })
      
      if (changed) {
        fs.writeFileSync(full, content, 'utf8')
        console.log('Fixed (String): ' + full)
      }
      
      // Then try raw buffer replacement for the tricky ones
      raw = fs.readFileSync(full)
      let currentRaw = raw
      replacements.forEach(r => {
        if (r.search) {
          let idx = currentRaw.indexOf(r.search)
          while (idx !== -1) {
            const part1 = currentRaw.slice(0, idx)
            const part2 = Buffer.from(r.replace, 'utf8')
            const part3 = currentRaw.slice(idx + r.search.length)
            currentRaw = Buffer.concat([part1, part2, part3])
            changed = true
            idx = currentRaw.indexOf(r.search, idx + part2.length)
          }
        }
      })
      
      if (changed && currentRaw !== raw) {
        fs.writeFileSync(full, currentRaw)
        console.log('Fixed (Buffer): ' + full)
      }
    }
  })
}

process('.')
console.log('Done')
