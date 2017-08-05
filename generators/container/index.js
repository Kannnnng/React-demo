/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true
      }

      return 'The name is required'
    },
  }, {
    type: 'list',
    name: 'component',
    message: 'Select a base component:',
    default: 'PureComponent',
    choices: () => ['PureComponent', 'Component'],
  }, {
    type: 'confirm',
    name: 'wantSCSS',
    default: true,
    message: 'Does it have scss file?',
  }],
  actions: (data) => {
    // Generate index.js
    const actions = [{
      type: 'add',
      path: '../../app/containers/{{properCase name}}/index.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    }]

    // If they want a SCSS file, add index.scss
    if (data.wantSCSS) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/index.scss',
        templateFile: './container/index.scss.hbs',
        abortOnFail: true,
      })
    }

    return actions
  },
}
