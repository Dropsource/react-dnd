import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';

function getStyle(backgroundColor) {
  return {
    color: 'white',
    backgroundColor: backgroundColor,
    textAlign: 'center',
    position: 'absolute',
    fontSize: '1rem'
  };
}

const boxTarget = {
  drop(props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return;
    }

    component.setState({
      hasDropped: true,
      hasDroppedOnChild: hasDroppedOnChild
    });
  }
};

@DropTarget(ItemTypes.BOX_ALT, boxTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
)
export default class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false
    };
  }

  render() {
    const { isOver, isOverCurrent, isDragging, connectDropTarget, frame } = this.props;
    const { hasDropped, hasDroppedOnChild } = this.state;

    let backgroundColor = 'rgba(0, 0, 0, .5)';

    if (isOverCurrent) {
      backgroundColor = 'darkgreen';
    } else if (isDragging) {
      backgroundColor = 'darkkhaki';
    }

    let styles = getStyle(backgroundColor);

    styles.width = frame.width;
    styles.height = frame.height;
    styles.left = frame.left;
    styles.top = frame.top;

    return connectDropTarget(
        <div style={styles}>
          {hasDropped &&
          <span>dropped {hasDroppedOnChild && ' on child'}</span>
          }

          <div>
            {this.props.children}
          </div>
        </div>
    );
  }
}