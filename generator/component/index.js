/**
 * Component Generator
 */

const componentExists = require('../utils/componentExists')

module.exports = {
  description: 'Add an unconnected component',
  prompts: [{
    type: 'list',
    name: 'type',
    message: 'Select the type of component',
    default: 'Stateless Function',
    choices: () => ['Stateless Function', 'ES6 Class (Pure)', 'ES6 Class'],
  }, {
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
    type: 'confirm',
    name: 'wantSCSS',
    default: true,
    message: 'Does it have scss file?',
  }],
  actions: (data) => {
    // Generate index.js
    let componentTemplate

    switch (data.type) {
      case 'ES6 Class': {
        componentTemplate = './component/es6.js.hbs'
        break
      }
      case 'ES6 Class (Pure)': {
        componentTemplate = './component/es6.pure.js.hbs'
        break
      }
      case 'Stateless Function': {
        componentTemplate = './component/stateless.js.hbs'
        break
      }
      default: {
        componentTemplate = './component/stateless.js.hbs'
      }
    }

    const actions = [{
      type: 'add',
      path: '../app/components/{{properCase name}}/index.js',
      templateFile: componentTemplate,
      abortOnFail: true,
    }]

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
