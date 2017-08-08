/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs')

const pageComponents = fs.readdirSync('app/components')
const pageContainers = fs.readdirSync('app/containers')

function componentExists(comp, target) {
  if (target === 'component') {
    return pageComponents.indexOf(comp) >= 0
  }
  return pageContainers.indexOf(comp) >= 0
}

module.exports = componentExists
