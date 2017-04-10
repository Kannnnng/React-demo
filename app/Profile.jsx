import React from 'react'
import PropTypes from 'prop-types'

class Profile extends React.Component {
  render() {
    return (
      <div className="profile-component">
        <h1>我的名字叫做{this.props.name}</h1>
        <h1>我今年{this.props.age}岁了</h1>
      </div>
    )
  }
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
}

export default Profile
