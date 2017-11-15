import React from 'react';
import Navigation from './navigation';
import Home from './home';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default App;