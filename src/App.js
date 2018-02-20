import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import getWeb3 from './utils/getWeb3';
import './App.css'
import {Grid, Divider, Switch, AppBar, IconButton, Toolbar, Typography} from 'material-ui';
import ColumnDisplay from './ColumnDisplay';
import RowDisplay from './RowDisplay';
import {LineChart, YAxis, XAxis, CartesianGrid, Line, ResponsiveContainer} from 'recharts'; 

const dataLineChart = [
  //data for Line Chart
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 1000, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 1908, amt: 2000},
    {name: 'Page E', uv: 4890, pv: 2800, amt: 2181},
    {name: 'Page F', uv: 3390, pv: 2800, amt: 2500},
    {name: 'Page G', uv: 4490, pv: 3300, amt: 2100},
  ];

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
      web3: null,
      dataLineChart: dataLineChart,
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
            <Grid container style={{height:'100%'}} alignItems={'center'}>
              <ResponsiveContainer width={'100%'} height={300} >
                <LineChart width={500} height={300} data={this.state.dataLineChart}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5"/> */}
                  <Line type="monotone" dataKey="uv" stroke="#EFFCF0" />
                  <Line type="monotone" dataKey="pv" stroke="#4C5760" />
                </LineChart>
              </ResponsiveContainer>
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
