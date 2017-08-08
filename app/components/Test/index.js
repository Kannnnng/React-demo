/**
 *
 * Test
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

export default class Test extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  state = {
    data: {
      a: 'test1',
      b: 123,
      c: true,
      d: [1, 2, 3],
      e: {
        f: 123,
        g: 'test2',
        h: [4, 5, 6],
      },
    },
  }

  handleOnClick = () => {
    const data = this.state.data
    data.b = 456
    this.setState({ data, test: 'test' })
  }

  render() {
    const {
      data,
    } = this.state
    return (
      <div>
        {JSON.stringify(data)}
        <button onClick={this.handleOnClick}>
          {'点我修改'}
        </button>
      </div>
    )
  }
}
