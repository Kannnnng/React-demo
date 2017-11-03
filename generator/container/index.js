/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists')
const moment = require('moment')

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value, 'container') ? 'A container with this name already exists' : true
      }
      return 'The name is required'
    },
  }, {
    type: 'input',
    name: 'description',
    message: 'What is its function?',
    default: 'This is a container component',
  }, {
    type: 'input',
    name: 'author',
    message: 'What is its author?',
    default: 'Einskang',
  }, {
    type: 'input',
    name: 'organization',
    message: 'What is its organization?',
    default: 'HUST',
  }, {
    type: 'list',
    name: 'component',
    message: 'Select a base component:',
    default: 'Component',
    choices: () => ['Stateless Function', 'PureComponent', 'Component'],
  }, {
    type: 'confirm',
    name: 'wantSCSS',
    default: true,
    message: 'Does it have scss file?',
  }, {
    type: 'confirm',
    name: 'wantActions',
    default: true,
    message: 'Does it have actions file?',
  }, {
    type: 'confirm',
    name: 'wantReducer',
    default: true,
    message: 'Does it have reducer file?',
  }, {
    type: 'confirm',
    name: 'wantSources',
    default: true,
    message: 'Does it have sources file?',
  }, {
    type: 'confirm',
    name: 'wantSelectors',
    default: true,
    message: 'Does it have selectors file?',
  }],
  actions: (data) => {
    // Generate index.js
    let actions
    if (data.component === 'Stateless Function') {
      actions = [{
        type: 'add',
        path: '../app/containers/{{properCase name}}/index.js',
        templateFile: './container/stateless.js.hbs',
        abortOnFail: true,
      }]
    } else {
      actions = [{
        type: 'add',
        path: '../app/containers/{{properCase name}}/index.js',
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      }]
    }

    // If they want a SCSS file, add index.scss
    if (data.wantSCSS) {
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/styles.scss',
        templateFile: './container/styles.scss.hbs',
        abortOnFail: true,
      })
    }

    if (data.wantActions) {
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      })
    }

    if (data.wantReducer) {
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/reducer.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      })
    }

    if (data.wantSources) {
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/sources.js',
        templateFile: './container/sources.js.hbs',
        abortOnFail: true,
      })
    }

    if (data.wantSelectors) {
      actions.push({
        type: 'add',
        path: '../app/containers/{{properCase name}}/selector.js',
        templateFile: './container/selector.js.hbs',
        abortOnFail: true,
      })
    }

    /* add create time */
    data.date = moment().format('YYYY-MM-DD HH:mm:ss')

    return actions
  },
}
