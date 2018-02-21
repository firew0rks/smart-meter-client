import React, { Component } from 'react'
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
            marginTop:150, 
            padding: '10px 5px 5px 20px', 
            width: '100%', 
            height:250,
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
            {/* <Button label="Default" /> */}
            <Button
                label="Choose an Image"
                labelPosition="before"
                style={styles.uploadButton}
                containerElement="label"
                >
                <input type="file" style={styles.uploadInput} />
            </Button>
            {/* <Button
                label="Label before"
                labelPosition="before"
                primary={true}
                {/* icon={<ActionAndroid />} */}
            {/*/> */}
            {/* <Button
                href="https://github.com/callemall/material-ui"
                target="_blank"
                label="GitHub Link"
                secondary={true}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
            /> */}
                
                {/* <Button disabled href="/" className={button}>
                VIEW MY POWER CHAIN (Link disabled)
                </Button> */}
                {/* <Grid>
                    <b style={{color: '#DCEED1'}}>VIEW MY POWER CHAIN</b>
                </Grid> */}
            </Grid>
        </Grid>
    </Grid>
            
    {/* DRAWER */}
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
