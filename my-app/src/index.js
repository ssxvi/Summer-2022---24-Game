import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css';
import './sakura.css';
import './index.css';


class Menu extends React.Component {
    render() {
      return (
        <div className="Menu">
            <button className = "Start"><h2>Welcome to 24!</h2><br></br></button>
        </div>
      );
    }
  }

  class Board extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        nums: Array(4).fill(null),
        input: '',
        guessResult: '',
      }

      this.generate()
    }

    
    generate(){
      const nums = this.state.nums.slice();
      for (let i = 0; i < 4; i++){
        this.state.nums[i] = Math.floor(Math.random()*8) + 1;
        this.setState({nums: nums,})
      }
    }


    guess(){

      let is24 = test24(this.state.nums);



      let res = '';
      if(eval?.(this.state.input) === 24){
      
        res = '24! YOU WIN';

      }
      
      if(test24(this.state.nums)){




      }

      this.setState({
        guessResult: res,
      })

      
    }

    renderCard(i){
      return(        
        <div className="Card">
          <h3>{this.state.nums[i]}</h3>    
          <br></br>
        </div>
      )
    }

  inputUpdate(event){
      const val = event.target.value;     
      this.setState({
        input: val,
      });
    }

    


    
    render() {
      return (
        <div>
          <Menu />
          <div className="Board">
            {this.renderCard(0)}
            {this.renderCard(1)}
            {this.renderCard(2)}
            {this.renderCard(3)}
          </div>

          <div className="Board">
            <input className = "Input" value = {this.state.input} onChange = {event => {this.inputUpdate(event)}}></input>
            <button onClick = {() => {this.guess()}}>Guess  </button>
          </div>

          <p>{this.state.guessResult}</p>
        </div>
      );
    }


  }

  
class Game extends React.Component {
render() {
    return (
    <div className="game">
          <div className="game-board">
            <Board 
            />
        </div>
    </div>
    );
}
}
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  //Checks to see if you can +, /, -, * the elements inside the array in order to reach 24
  var test24 = function(list){

    if(list.length == 1 && list[0] == 24) return true; 

    for(let i = 0; i < list.length; i++){
      for(let j = 0; j < list.length; j++){
        if(j != i) {

          //I am not smart enough to do this nicely in 1 line each
          let tList = list.slice();
          tList[i] = tList[i] + tList[j];
          tList.splice(j, 1);
          if(test24(tList)) return true;

          tList = list.slice();
          tList[i] = tList[i] - tList[j];
          tList.splice(j, 1);
          if(test24(tList)) return true;

          tList = list.slice();
          tList[i] = tList[i] * tList[j];
          tList.splice(j, 1);
          if(test24(tList)) return true;

          tList = list.slice();
          tList[i] = tList[i] / tList[j];
          tList.splice(j, 1);
          if(test24(tList)) return true;

        }
      }
    }
    return false;
  }


var checkExpression = function(str, list){
      //parses expression to make sure it's valid 
      let expression = str.slice();

      //removes each number and checks that they exist
      for (let i = 0; i < list.length; i++){
        let numIndex = toString(list[i]).indexOf();
        if( numIndex != -1){
          expression.splice(numIndex, 1);
        }
      }


}