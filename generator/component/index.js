/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add an unconnected component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Button',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value, 'component') ? 'A component with this name already exists' : true
      }
      return 'The name is required'
    },
  }, {
    type: 'list',
    name: 'component',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: () => ['Stateless Function', 'PureComponent', 'Component'],
  }, {
    type: 'confirm',
    name: 'wantSCSS',
    default: true,
    message: 'Does it have scss file?',
  }],
  actions: (data) => {
    // Generate index.js
    let actions

    if (data.component === 'Stateless Function') {
      actions = [{
        type: 'add',
        path: '../app/components/{{properCase name}}/index.js',
        templateFile: './component/stateless.js.hbs',
        abortOnFail: true,
      }]
    } else {
      actions = [{
        type: 'add',
        path: '../app/components/{{properCase name}}/index.js',
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      }]
    }

    // If they want a SCSS file
    if (data.wantSCSS) {
      actions.push({
        type: 'add',
        path: '../app/components/{{properCase name}}/styles.scss',
        templateFile: './component/styles.scss.hbs',
        abortOnFail: true,
      })
    }

    return actions
  },
}
