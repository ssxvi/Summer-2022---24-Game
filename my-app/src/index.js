import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom/client';
import './normalize.css';
import './sakura.css';
import './index.css';

//NEED TO EDIT AND CHANGE
class Menu extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        menu: false,
      }
    }
    
  buildHelp() {

  }

    render() {
      return (
        <div className="Menu">
            <button className = "Start">
              
              <h2>Welcome to the 24 Game!</h2><h5>Click here for help!</h5><br></br>
              
            </button>
        </div>
      );
    }
  }

  class Board extends React.Component {
    constructor(props){
      super(props);



      this.state = {
        nums: Array(4).fill(null),//List of cards
        input: '', //Text from input box
        guessResult: '', //Output
      }

      this.generate() //generates 4 numbers for boxes
    }

    
    generate(){
      const nums = this.state.nums.slice();//copies nums to local nums but idk if this works right now even
      for (let i = 0; i < 4; i++){
        this.state.nums[i] = Math.floor(Math.random()*8) + 1; //DOESNT USE SET STATE BUT ISNT WORKING GREAT RN, ONLY RUNS WHEN INSTANTIATING
      }
    }


    guess(){ //just checks is userinput is valid and matches the 24 statement

      let is24 = test24(this.state.nums);

      if( ((this.state.input).toLowerCase().includes("no")) ){
        if(is24){
          this.setState({guessResult: 'Incorrect! There is a solution',})
        } else {
          this.setState({guessResult: 'Correct! No solution', })
        }
        return;
      }

      if(!checkExpression(this.state.input, this.state.nums)){
        this.setState({guessResult: 'Input is invalid! Try again', })
        return;
      }

      if(eval?.(this.state.input) === 24){
      
        if(is24){

          this.setState({guessResult: 'Correct! You win!' , })

        } else {

          this.setState({guessResult: 'Incorrect! 24 Cannot be made', })

        }

        return;

      } else {
        this.setState({guessResult: 'Incorrect! Answer does not equal 24', })
        return;
      }
      
    }

    renderCard(i){ //card render function, bit easier to implement as funct rn but hopefully can make into class later
      return(        
        <div className="Card">
          <h3>{this.state.nums[i]}</h3>   
          <br></br>
        </div>
      )
    }

  inputUpdate(event){//changes input
      const val = event.target.value; //idk how target value really works, need to learn more about that    
      this.setState({
        input: val,
      });
    }

    numUpdate(){
      this.generate();
      let val = this.state.nums; //welp we shall see
      this.setState({
        nums: val,
      })
    }

    


    
    render() {
      return ( //dude i hate html comments, need to check why this.generate() isn't working in results
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
          <div className="Results">
            <br></br>
          <button onClick = {() => {this.numUpdate()}}>New Numbers!  </button>
            <br></br>
            <p>{this.state.guessResult}</p>
          </div>
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

      if(list.length == 1 && (list[0] <= 24.000001 || list[0] >= 23.9999999)) return true; //i tested this with the leetcode version and i fucking hate [3,3,8,8] i dont get it man like istg i spent a good half hour trying to solve it by hand before googling i was so stubborn for what it's just rounding omg

      for(let i = 0; i < list.length; i++){
        for(let j = 0; j < list.length; j++){
          if(j != i) {

            //I am not smart enough to do this nicely in 1 line each
            let tList = list.slice();//copies to tList
            tList[i] = tList[i] + tList[j]; //adds 2 random components together
            tList.splice(j, 1); //deletes of the components
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


    let re = new RegExp("(\\(*[1-9]\\)*[\\+\\-\\/\\*]\\)*){3}(\\(*[1-9]\\)*)");

    if(!re.test(expression)){
      return false;
    }

    //removes each number and checks that they exist

    for (let i = 0; i < list.length; i++){
      let numIndex = expression.indexOf((list[i]).toString());

      if( numIndex != -1){
        expression = expression.substring(0, numIndex) + expression.substring(numIndex + 1, expression.length)
      } else {
        return false;
      }
    }

    return true;
  }