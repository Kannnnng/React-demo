import React from 'react'

const AsyncComponent = loadComponent => (
  class _AsyncComponent extends React.Component {
    state = {
      Component: null,
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return
      }

      loadComponent()
        .then(module => module.default)
        .then((Component) => {
          this.setState({ Component })
        })
        .catch((err) => {
          console.error('Cannot load component in <AsyncComponent />')  // eslint-disable-line
          throw err
        })
    }

    hasLoadedComponent() {
      return this.state.Component !== null
    }

    render() {
      const { Component } = this.state
      return (Component) ? <Component {...this.props} /> : null
    }
  }
)

export default AsyncComponent
