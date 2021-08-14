import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { InfoOutlined, InsertEmoticonOutlined } from '@material-ui/icons'

const drawerWidth = 200

const useLTYLayoutStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    page: {
      backgroundColor: '#ddd',
      width: '100%',
      padding: theme.spacing(2),
    },
    drawer: {
      width: drawerWidth,
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    item: {
      '&: hover': {
        backgroundColor: '#ddd',
      },
    },
    topBarText: {
      flexGrow: 1,
    },
    itemSelected: {
      backgroundColor: '#ddd',
    },
  }
})

export const LTYLayout: React.FC = ({ children }) => {
  const classes = useLTYLayoutStyles()
  const history = useHistory()
  const location = useLocation()

  const menuList = [
    {
      text: 'index',
      icon: <InsertEmoticonOutlined />,
      path: '/',
    },
    {
      text: 'info',
      icon: <InfoOutlined />,
      path: '/info',
    },
  ]

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.topBarText}>Hello world</Typography>
          <Typography>LTY</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant="permanent"
        classes={{ paper: classes.drawer }}
        className={classes.drawer}
      >
        <div>
          <Typography variant="h5">Hello!</Typography>
        </div>
        <List>
          {menuList.map((item) => {
            return (
              <ListItem
                className={`${
                  location.pathname == item.path
                    ? classes.itemSelected
                    : undefined
                } ${classes.item}`}
                button
                key={item.text}
                onClick={() => {
                  return history.push(item.path)
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}
