import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      liked: 0,
      hobbies: ['read', 'play games'],
    }

    this.handleOnAddHobby = this.handleOnAddHobby.bind(this)
    this.handleOnClickliked = this.handleOnClickliked.bind(this)
  }

  handleOnAddHobby() {
    const hobby = this.state.hobbies
    if (this.hobby.value) {
      hobby.push(this.hobby.value)
    }
    this.setState({ hobbies: hobby }, () => {
      this.hobby.value = ''
    })
  }

  handleOnClickliked() {
    this.setState({ liked: this.state.liked + 1 })
  }

  render() {
    return (
      <div className={styles.profileComponent}>
        <h1>我的名字叫做{this.props.name}</h1>
        <h1>我今年{this.props.age}岁了</h1>
        <button onClick={this.handleOnClickliked}>给我点赞</button>
        <h2>获得的赞：{this.state.liked}</h2>
        <h2>我的爱好</h2>
        <ul>
          {this.state.hobbies.map((value, index) => <li key={index}>{value}</li>)}
        </ul>
        <input type="text" ref={(node) => { this.hobby = node }} />
        <button onClick={this.handleOnAddHobby}>添加爱好</button>
      </div>
    )
  }
}

Profile.propTypes = {
  name: PropTypes.string,
  age: PropTypes.string,
}

export default Profile
