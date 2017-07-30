import React from 'react'
import PropTypes from 'prop-types'

function LoadingComponent(props) {
  if (props.isLoading) {
    // While our other component is loading...
    if (props.timedOut) {
      // In case we've timed out loading our other component.
      return <div>Loader timed out!</div>
    } else if (props.pastDelay) {
      // Display a loading screen after a set delay.
      return <div>Loading...</div>
    }
    // Don't flash "Loading..." when we don't need to.
    return null
  } else if (props.error) {
    // If we aren't loading, maybe
    return <div>Error! Component failed to load</div>
  }
  // This case shouldn't happen... but we'll return null anyways.
  return null
}

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.bool,
}

export default LoadingComponent
