import * as React from 'react';
import './App.css';
import Step from './components/Step/index'
import FirstStep from './components/Step/firstStep'
import SecondStep from './components/Step/secondStep'
import ThirdStep from './components/Step/thirdStep'

const steps = [{
  text:'1',
  component: FirstStep,
  route: 'http://localhost:3000/first'
},{
  text:'2',
  component: SecondStep,
  route: 'http://localhost:3000/second'
},{
  text:'3',
  component: ThirdStep,
  route: 'http://localhost:3000/third'
}]

class App extends React.Component {
  render() {
    return <Step currentStep={1} steps={steps}/>
  }
}

export default App;
