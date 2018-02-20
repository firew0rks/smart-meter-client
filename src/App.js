import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';
import './App.css'
import {Grid, Divider, Switch, AppBar, IconButton, Toolbar, Typography} from 'material-ui';
import ColumnDisplay from './ColumnDisplay';
import RowDisplay from './RowDisplay';

const styles = {
  divider: {
    backgroundColor: '#77B5B0',
    height: '10px'
  }
};

class App extends Component {
  constructor(props) {
    super(props);

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
      });

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

    const contract = require('truffle-contract');
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance;

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return <div>
      <div style={{backgroundColor: '#4C5760', height: '60px', top: 0, position: 'fixed', width: '100%', zIndex: 100, left: 0}}/>
      <Grid container style={{padding: 30, height: '100%', marginTop: 30}}>
        <Grid item xs={6}>
          <Grid container direction={'column'}>
            <Grid item xs={12}>
              <h1>DASHBOARD</h1>
            </Grid>
            <Divider style={styles.divider}/>
            <Grid item xs={12} style={{margin: '10px', height: '200px'}}>
              <Grid container style={{height: '100%'}} alignItems={'center'}>
                <Grid item xs={3}>
                  <i className="fas fa-sun fa-8x" style={{color: '#E2D58B'}}></i>
                </Grid>
                <Grid item xs={6}>
                    <ColumnDisplay label={'Production'} number={'1,000 kWh'} />
                </Grid>
                <Grid item xs={3}>
                  <ColumnDisplay label={'Efficiency'} number={'29%'}/>
                </Grid>
              </Grid>

            </Grid>
            <Divider style={styles.divider}/>
            <Grid>
              GRAPH GOES HERE!
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <RowDisplay label={'Curent Usage'} text={'1,576 kWh'}/>
          <RowDisplay label={'Average Usage'} text={'1,247 kWh'}/>
        </Grid>
      </Grid>
    </div>
  }
}

export default App
