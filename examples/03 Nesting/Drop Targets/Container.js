import React from 'react';
import Dustbin from './Dustbin';
import DustbinAlt from './DustbinAlt';
import Box from './Box';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import ItemTypes from './ItemTypes';

@DragDropContext(HTML5Backend)
export default class Container {
  render() {
    return (
      <div>
        <div style={{ overflow: 'normal', clear: 'both', margin: '-1rem', position: 'relative', width: 600, height: 300 }}>

          <Dustbin frame={{left: 0, top: 0, width: 500, height: 250}}>
            <Dustbin frame={{left: 50, top: 50, width: 150, height: 150}}>
              <DustbinAlt frame={{left: 50, top: 0, width: 50, height: 50}}/>
            </Dustbin>
            <Dustbin frame={{left: 175, top: 75, width: 150, height: 150}}>
            </Dustbin>
          </Dustbin>

        </div>

        <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
          <Box />
        </div>
      </div>
    );
  }
}