const fs = require('fs')
const path = require('path')

const artifactFixes = [
  { search: 'ðŸ›¡ï¸ ', replace: '🛡️' },
  { search: 'âœ…', replace: '✅' },
  { search: 'â­ ', replace: '⭐' },
  { search: 'ðŸŒ¿', replace: '🌿' },
  { search: 'ðŸ“±', replace: '📱' },
  { search: 'ðŸ’°', replace: '💰' },
  { search: 'ðŸ¤ ', replace: '🤝' },
  { search: 'â™»ï¸ ', replace: '♻️' },
  { search: 'ðŸ”„', replace: '🔄' },
  { search: 'ðŸ“', replace: '📅' },
  { search: 'ðŸ§¹', replace: '🧹' },
  { search: 'ðŸ“…', replace: '📅' },
  { search: 'ðŸ“¦', replace: '📦' },
  { search: 'â˜…', replace: '★' },
  { search: 'â”€', replace: '─' },
  { search: 'Â·', replace: '·' },
  { search: 'â€”', replace: '—' },
  { search: 'â€¢', replace: '•' },
  { search: 'â€™', replace: '’' },
  { search: 'â€“', replace: '–' },
  { search: 'Â©', replace: '©' },
]

function fixArtifacts(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir)
  items.forEach(item => {
    if (['node_modules', '.git', 'dist'].includes(item)) return
    const full = path.join(dir, item)
    if (fs.statSync(full).isDirectory()) {
      fixArtifacts(full)
    } else if (full.match(/\.(tsx|jsx|ts|js)$/)) {
      let content = fs.readFileSync(full, 'utf8')
      let original = content
      
      artifactFixes.forEach(f => {
        if (content.includes(f.search)) {
          content = content.split(f.search).join(f.replace)
        }
      })
      
      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8')
        console.log('Fixed Artifacts in: ' + full)
      }
    }
  })
}

fixArtifacts('.')
console.log('Artifact Fix Done')
