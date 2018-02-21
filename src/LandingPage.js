import React, { Component } from 'react'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import Power from '../build/contracts/Power.json'
import SwitchLabels from './SwitchLabels'
import AppBarExampleIcon from './AppBarExampleIcon'

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

const drawerMenu = ['View Transaction History ', 'My Solar', 'Exchange Marketplace', 'Account Settings', 'Leaderboard', 'Log Out'];

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerIsOpen: false,
    }
  }

  toggleDrawer() {
    this.setState({
      drawerIsOpen: !this.state.drawerIsOpen
    })
  }



  render() {

    return <div>
      <NavBar toggleDrawer={() => this.toggleDrawer()}/>

    <Grid container style={{padding: 30, height: 700, justifyContent: 'center', marginTop: 30}}>
        <Grid container direction={'row'} style={{
            justifyContent: 'center', 
            marginTop:130, 
            padding: '10px 5px 5px 20px', 
            width: '100%', 
            height:350,
            color: '#DCEED1', 
            fontSize: 95,
            fontFamily: "Roboto", 
            fontWeight: 'bold'
            }}>
                <Grid item>
                    <img src="/images/logo.png" style={{height: 200}}/>
                </Grid>

                <Grid item > 
                <Grid>
                    <b style={{color: '#DCEED1'}}>POWER</b>
                </Grid>
                <Grid>
                    <b style={{color: '#DCEED1'}}>CHAIN</b>
                </Grid>
                </Grid>
        </Grid>
        <Grid container direction={'row'} style={{
            justifyContent: 'center', 
            marginTop:0, 
            padding: '10px 5px 5px 20px', 
            width: '100%', 
            color: '#DCEED1', 
            fontSize: 95,
            fontFamily: "Roboto", 
            fontWeight: 'bold'
            }}>
            <Grid item > 
                <Grid>
                    <b style={{color: '#DCEED1'}}>VIEW MY POWER CHAIN</b>
                </Grid>
            </Grid>
        </Grid>
    </Grid>

        {/* <Grid item xs={12} style={{justifyContent: 'center', paddingRight: 25, marginTop: 300}}>
          {/* <Grid container direction={'column'}> */}
            {/* <Grid item xs={12}>
              <h1>DASHBOARD</h1>
            </Grid> */}
          {/* </Grid> */}

            {/* <Grid container direction={'row'}> */}
            {/* <Grid item xs={12}>
                <h2>CLICKME</h2> */}

                {/*</Grid>
                <Grid item xs={4}>
                  
                </Grid>
                <Grid item xs={3} >
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
                    <b style={{fontSize: 40, color: '#DCEED1', marginRight: 10 }}>7238</b>
                    <img src="/images/logo.png" style={{height: 40}}/>
                  </div> */}

            {/* </Grid>
            </Grid> */} 
            
    {/* </Grid>
    </Grid> */}
            

      <Drawer open={this.state.drawerIsOpen} anchor="right" classes={{root: {color: '#4C5760'}}}>
        <Button onClick={() => this.toggleDrawer()} style={{color: 'grey'}}>
          Menu
        </Button>

        <List style={{width: 400, color: '#FFFFFF', backgroundColor: '#737E87', fontSize: 20, marginRight: 10, fontFamily: "Roboto", fontWeight: 'bold'}}>

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

export default LandingPage
