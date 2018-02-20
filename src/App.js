import React, { Component } from 'react'

// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import Power from '../build/contracts/Power.json'

import HelloWorld from './HelloWorld'
import AutoCompleteExampleSimple from './AutoCompleteExampleSimple'
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBarExampleIcon from './AppBarExampleIcon';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const powerContract = contract(Power)
    powerContract.setProvider(this.state.web3.currentProvider)

    powerContract.deployed().then(instance => {
      console.log(instance);
      instance.getProduction.call().then(production => {
        console.log(production);
        console.log(production.toString());
      })
      instance.getCurrent_usage.call().then(current_usage => {
        console.log(current_usage);
        console.log(current_usage.toString());
      })
      instance.getAverage_usage.call().then(average_usage => {
        console.log(average_usage);
        console.log(average_usage.toString());
      })
    })


  }

  render() {
    
    return (
      <div>
        <HelloWorld/>
        <MuiThemeProvider>
          <AppBarExampleIcon/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <AutoCompleteExampleSimple/>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
