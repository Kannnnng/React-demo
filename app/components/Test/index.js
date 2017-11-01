/**
 *
 * Test
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'

class Test extends React.PureComponent {
  static propTypes = {
    ...propTypes,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  state = {}

  render() {
    const {
      handleSubmit,
      form,
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <Field name='firstName' component='input' type='text' />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <Field name='lastName' component='input' type='text' />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <Field
            name='email'
            component='input'
            type='email'
            onChange={(event, value) => {
              console.log(value, 111)
              event.preventDefault()
            }}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'test',
})(Test)