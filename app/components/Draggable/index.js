/**
 *
 * Draggable
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import lodash from 'lodash'
import findDOMNode from 'react-dom/lib/findDOMNode'
import DragDropContext from 'react-dnd/lib/DragDropContext'
import DragSource from 'react-dnd/lib/DragSource'
import DropTarget from 'react-dnd/lib/DropTarget'
import HTML5Backend from 'react-dnd-html5-backend'

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '0.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()  // eslint-disable-line

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      console.log('放到后面去啦')
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      console.log('放到前面去啦')
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  },
}

class _Card extends React.PureComponent {
  static propTypes = {
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    index: PropTypes.number,
    isDragging: PropTypes.bool,
    id: PropTypes.any,
    text: PropTypes.string,
    moveCard: PropTypes.func,
  }

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        {text}
      </div>,
    ))
  }
}

const Card = DropTarget('card', cardTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource('card', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(_Card))

class Draggable extends React.PureComponent {  // eslint-disable-line
  state = {
    cards: [{
      id: 1,
      text: 'Write a cool JS library',
    }, {
      id: 2,
      text: 'Make it generic enough',
    }, {
      id: 3,
      text: 'Write README',
    }, {
      id: 4,
      text: 'Create some examples',
    }, {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    }, {
      id: 6,
      text: '???',
    }, {
      id: 7,
      text: 'PROFIT',
    }],
  }

  handleOnMoveCard = (value1, value2) => {
    const cards = this.state.cards.concat([])
    const temp = cards[value1]
    cards[value1] = cards[value2]
    cards[value2] = temp
    this.setState({ cards })
  }

  render() {
    const {
      cards,
    } = this.state
    return (
      <div>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            moveCard={this.handleOnMoveCard}
          />
        ))}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Draggable)
