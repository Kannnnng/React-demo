/**
 * Route Generator
 */
const fs = require('fs')
const componentExists = require('../utils/componentExists')

function reducerExists(comp) {
  try {
    fs.accessSync(`app/containers/${comp}/reducer.js`, fs.F_OK)
    return true
  } catch (e) {
    return false
  }
}

// function sagasExists(comp) {
//   try {
//     fs.accessSync(`app/containers/${comp}/sagas.js`, fs.F_OK)
//     return true
//   } catch (e) {
//     return false
//   }
// }

function trimTemplateFile(template) {
  // Loads the template file and trims the whitespace and then returns the content as a string.
  return fs.readFileSync(`generator/route/${template}`, 'utf8').replace(/\s*$/, '')
}

module.exports = {
  description: 'Add a route',
  prompts: [{
    type: 'input',
    name: 'container',
    message: 'Which container should the route show?',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? true : `"${value}" doesn't exist.`
      }

      return 'The path is required'
    },
  }, {
    type: 'input',
    name: 'path',
    message: 'Enter the path of the route.',
    default: '/home/:id',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }

      return 'path is required'
    },
  }],

  // Add the route to the routes.js file above the error route
  // TODO smarter route adding
  actions: (data) => {
    const actions = [
      {
        type: 'modify',
        path: '../../app/routes.js',
        pattern: /(\nconst routes)/g,
        template: trimTemplateFile('route.1.hbs'),
      },
      {
        type: 'modify',
        path: '../../app/routes.js',
        pattern: /(^\s*<\/div>)/g,
        template: trimTemplateFile('route.2.hbs'),
      },
    ]

    if (reducerExists(data.container)) {
      actions.push({
        type: 'modify',
        path: '../../app/reducers.js',
        pattern: /(\nconst reducers)/g,
        template: trimTemplateFile('reducer.1.hbs'),
      })
      actions.push({
        type: 'modify',
        path: '../../app/reducers.js',
        pattern: /(,\n\})/g,
        template: trimTemplateFile('reducer.2.hbs'),
      })
    }

    return actions
  },
}
