import React, { Component } from 'react';
import ChatBox from './components/ChatBox';
import Comments from './components/Comments';


class App extends Component {
  render() {
    return (
      <div>
        <ChatBox/>
        <Comments/>
      </div>
    );
  }
}

export default App;
