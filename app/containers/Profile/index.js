import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.scss'

class Profile extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    age: PropTypes.string,
  }

  static defaultProps = {
    name: '闫守康',
    age: '23',
  }

  constructor(props) {
    super(props)

    this.state = {
      liked: 0,
      hobbies: ['read', 'play games'],
    }
  }

  handleOnAddHobby = () => {
    const hobby = this.state.hobbies
    if (this.hobby.value) {
      hobby.push(this.hobby.value)
    }
    this.setState({ hobbies: hobby }, () => {
      this.hobby.value = ''
    })
  }

  handleOnClickliked = () => {
    this.setState({ liked: this.state.liked + 1 })
  }

  render() {
    const {
      name,
      age,
    } = this.props

    const {
      liked,
      hobbies,
    } = this.state

    return (
      <div className={styles.profileComponent}>
        <h1>我的名字叫做{name}</h1>
        <h1>我今年{age}岁了</h1>
        <button onClick={this.handleOnClickliked}>给我点赞</button>
        <h2>获得的赞：{liked}</h2>
        <h2>我的爱好</h2>
        <ul>
          {hobbies.map((value, index) => <li key={index}>{value}</li>)}
        </ul>
        <input type="text" ref={(node) => { this.hobby = node }} />
        <button onClick={this.handleOnAddHobby}>添加爱好</button>
      </div>
    )
  }
}

export default Profile
