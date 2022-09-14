import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css';
import './sakura.css';
import './index.css';


class Menu extends React.Component {
    constructor(props){
    super(props);

    }
    render() {
      return (
        <div className="Menu">
            <button className = "Start">'Start'</button>
        </div>
      );
    }
  }

  class Board extends React.Component {
    constructor(props){
    super(props);

    }

    generate(){



    }

    renderCard(i){
        return(        
            <Card value = {val}/>
        )
        }

    render() {
      return (
        <div className="Board">
            {this.renderCard(1)}
            {this.renderCard(2)}
            {this.renderCard(3)}
            {this.renderCard(4)}
        </div>
      );
    }
  }


  class Card extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        value: null,
    };


    }
    render() {
      return (
        <div className="Card">
          {this.value}    
        </div>
      );
    }
  }

  
class Game extends React.Component {
render() {
    return (
    <div className="game">
        <div className="game-board">
        <Menu />
        <Board />
        </div>
        <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
        </div>
    </div>
    );
}
}
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  