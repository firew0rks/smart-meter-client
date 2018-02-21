import React, { Component } from 'react'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import Power from '../build/contracts/Power.json'

import AppBarExampleIcon from './AppBarExampleIcon';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'

import './App.css'
import {
  Grid, Divider, Switch, AppBar, IconButton, Toolbar, Typography, Drawer, List, ListItem,
  Button
} from 'material-ui';
import ColumnDisplay from './ColumnDisplay';
import RowDisplay from './RowDisplay';
import NavBar from './NavBar';

const styles = {
  divider: {
    backgroundColor: '#77B5B0',
    height: '10px'
  }
};

const drawerMenu = ['Hello', 'World'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null,
      drawerIsOpen: false,
      production: 0 + " kWH",
      efficiency: 0 + " %",
      current_usage: 0 + " kWH",
      average_usage: 0 + "kWH",
      amount_spent_this_month: "$" + 0,
      amount_saved_this_month: "$" + 0

    }
  }

  toggleDrawer() {
    this.setState({
      drawerIsOpen: !this.state.drawerIsOpen
    })
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

    const contract = require('truffle-contract')
    const powerContract = contract(Power)
    powerContract.setProvider(this.state.web3.currentProvider)

    powerContract.deployed().then(instance => {
      console.log(instance);
      instance.getProduction.call().then(data => {
        this.setState({
          production: data + " kWH"
        });
      })
      instance.getEfficiency.call().then(data => {
        this.setState({
          efficiency: data + " %"
        });
      })
      instance.getCurrent_usage.call().then(data => {
        this.setState({
          current_usage: data + " kWH"
        });
      })
      instance.getAverage_usage.call().then(data => {
        this.setState({
          average_usage: data + " kWH"
        });
      })
      instance.getAmount_spent_this_month.call().then(data => {
        this.setState({
          amount_spent_this_month: "$" + data
        });
      })
      instance.getAmount_saved_this_month.call().then(data => {
        this.setState({
          amount_saved_this_month: "$" + data
        });
      })
    })


  }

  render() {

    return <div>
      <NavBar toggleDrawer={() => this.toggleDrawer()}/>

      <Grid container style={{padding: 30, height: '100%', marginTop: 30}}>
        <Grid item xs={6} style={{paddingRight: 25}}>
          <Grid container direction={'column'}>
            <Grid item xs={12}>
              <Grid container direction={'row'}>
                <Grid item xs={5}>
                  <h1>DASHBOARD</h1>
                </Grid>
                <Grid item xs={4}>
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <b style={{fontSize: 40, color: '#DCEED1', marginRight: 10}}>7238</b>
                    <img src="/images/logo.png" style={{height: 40}}/>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div style={{backgroundColor: '#77B5B0', height: 40, width: 130, marginTop: 40, borderRadius: 20}}>
                    <div style={{backgroundColor: '#EFFCF0', height: 40, width: 70, marginTop: 40, borderRadius: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <b style={{fontSize: 12}}>SELLING</b>
                    </div>
                  </div>
              </Grid>
              </Grid>
            </Grid>

            <Divider style={styles.divider}/>

            <Grid item xs={12} style={{margin: '10px', height: '200px'}}>
              <Grid container style={{height: '100%'}} alignItems={'center'}>
                <Grid item xs={3}>
                  <i className="fas fa-sun fa-8x" style={{color: '#E2D58B'}}></i>
                </Grid>
                <Grid item xs={6}>
                    <ColumnDisplay label={'Production'} number={this.state.production}/>
                </Grid>
                <Grid item xs={3}>
                  <ColumnDisplay label={'Efficiency'} number={this.state.efficiency}/>
                </Grid>
              </Grid>

            </Grid>
            <Divider style={styles.divider}/>
            <Grid>
              GRAPH GOES HERE!
            </Grid>
          </Grid>
        </Grid>

        {/* Second column */}
        <Grid item xs={6} style={{paddingLeft: 25}}>
          <Grid container style={{height: 50}}/>
          <Grid container style={{height: 300}}>
            <Grid item xs={12}>
              <RowDisplay label={'Curent Usage'} text={this.state.current_usage}/>
            </Grid>
            <Grid item xs={12}>
              <RowDisplay label={'Average Usage'} text={'1,247 kWh'}/>
            </Grid>
          </Grid>
          <Grid container style={{height: 43}}/>

          <Divider style={Object.assign({}, styles.divider, {marginBottom: 20})}/>


          <Grid container>
            <Grid item xs={6} style={{borderRight: '10px solid #77B5B0'}}>
              <Grid container>
                <Grid item xs={12}>
                  PIE CHART GOES HERE
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>

              <Grid container direction={'column'} style={{padding: '20px 20px 20px 30px'}}>
                <Grid item xs={12}>
                  <ColumnDisplay label={'Amount Spent this month'} number={this.state.amount_spent_this_month} />
                </Grid>
                <Grid item xs={12}>
                  <ColumnDisplay label={'Amount saved this month'} number={this.state.amount_saved_this_month} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>

      <Drawer open={this.state.drawerIsOpen} anchor="right" classes={{root: {color: '#4C5760'}}}>
        <Button onClick={() => this.toggleDrawer()} style={{color: 'grey'}}>
          x
        </Button>

        <List style={{width: 400, color: '#EFFCF0'}}>
          {drawerMenu.map((item, i) => {
            return <ListItem button key={i}>
              {item}
            </ListItem>
          })}

        </List>
      </Drawer>
    </div>
  }
}

export default App
