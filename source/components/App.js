import React from 'react';
import EventEmmiter from 'events';
import Input from './Input';
import List from './List';

const emmiter = new EventEmmiter();

class App extends React.Component {
  render() {
    return (
      <div className="queue-app">
        <Input emmiter={emmiter} />
        <List emmiter={emmiter} />
      </div>
    );
  }
}

export default App;