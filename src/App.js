import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
class App extends Component {
  constructor() {
    super(); // (2)

    this.state = { // (1)
      name: 0,group: 0,arr1:[],maxCourt:3
    };
    this.handleClick = this.handleClick.bind(this)
    this.nextBtn = this.nextBtn.bind(this)
    this.first = this.first.bind(this)
    this.second = this.second.bind(this)
    this.third = this.third.bind(this)

  }
  
  render() {
    const name = this.state.name;
    const group = this.state.group;
    const arr = this.state.arr1;
    const maxCourt = this.state.maxCourt;
    return (
      <div className="App" >
        <div className="container col-12 my-2">
          <div className="row">
            <div className="col-4">
            <button type="button" className="col-12 btn btn-primary" onClick={this.first}>1コート</button>
            </div>
            <div className="col-4">
            <button type="button" className="col-12 btn btn-primary" onClick={this.second}>2コート</button>
            </div>
            <div className="col-4">
            <button type="button" className="col-12 btn btn-primary" onClick={this.third}>3コート</button>
            </div>
          </div>
        </div>
        <div>
          コート上限設定（上のボタンでコート数を指定してね）：{maxCourt}
        </div>
        badmintonだよ〜〜人数を入れて登録を押してね
        <form>
          <label className="m-2">
            人数:
            <input type="number" className="m-2" name="name" id = "num"/>
          </label>
          <a  onClick={this.handleClick} className="m-1">登録</a>
        </form>
        <button type="button" class="btn btn-primary" onClick={this.nextBtn}>次の試合へ</button>
        <p >同じ色の人とペアを組んでね</p>
        

        {
          (function () {
            const random = [];
            const copiedArr = arr.slice(0, group*4); 
            const shuffledArray = copiedArr.sort((a, b) => 0.5 - Math.random());
            const list = [];
            var count = 0;
            for (let i = 1; i < group+1; i++) {

              list.push(<li className='fs-3' key={i + "ps"}>{i}コート</li>);
              for (let i = 0; i < 4; i++) {
                if (i < 2) {
                  list.push(<p key={count + "p"}><font className='fs-4' color="red">{shuffledArray[count]}</font></p>);
                }else{
                  list.push(<p key={count + "p"}><font className='fs-4' color="blue">{shuffledArray[count]}</font></p>);
                }
                
                count = count + 1
              }
              list.push(<div key={i + "div"}></div>);
            }
            
            
            return <ul className='example1'>{list}</ul>;
          }())
        }

      </div>
    );
  }


  handleClick() {
    let num = document.getElementById('num');
    const maxCourt = this.state.maxCourt
    this.setState({name: Number(num.value)});
    const length = Number(num.value);
    const arr1 = Array.from({length}, (_, i) => i+1);
    console.log(arr1);
    this.setState({arr1: arr1});
    var group = Math.floor(length /4);
    if(group > maxCourt){
      group = maxCourt;
    }
    this.setState({group: group});
  }
  
  nextBtn(){
    var arr = this.state.arr1;
    var name = this.state.name;
    var group = this.state.group;
    
    const shiftRight = (arr) => {
      const last = arr[arr.length - 1];
      for (let i = arr.length - 1; i > 0; i--) {
        arr[i] = arr[i - 1];
      }
      arr[0] = last;
      return arr;
    };
    console.log(arr)
    var changeNum = name - (group * 4);

    
    this.setState({arr1: shiftRight(arr)});
    for(let i = 1; i < changeNum; i++){
      var arr = this.state.arr1;
      this.setState({arr1: shiftRight(arr)});
    }
  }

  first(){
    this.setState({maxCourt: 1});
  }
  second(){
    this.setState({maxCourt: 2});
  }
  third(){
    this.setState({maxCourt: 3});
  }
}

export default App;
