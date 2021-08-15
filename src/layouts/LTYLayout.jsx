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
  Avatar,
} from '@material-ui/core'
import {
  FeedbackOutlined,
  InfoOutlined,
  InsertEmoticonOutlined,
} from '@material-ui/icons'

const drawerWidth = 200
const menuList = [
  {
    text: '个人主页',
    icon: <InsertEmoticonOutlined />,
    path: '/',
  },
  {
    text: '信息',
    icon: <InfoOutlined />,
    path: '/info',
  },
  {
    text: '反馈',
    icon: <FeedbackOutlined />,
    path: '/feedback',
  },
]

const useLTYLayoutStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    page: {
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
    avatar: {
      marginLeft: theme.spacing(2),
    },
    listIcon: {
      marginRight: theme.spacing(-2),
    },
  }
})

export const LTYLayout = ({ children }) => {
  const classes = useLTYLayoutStyles()
  const history = useHistory()
  const location = useLocation()

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.topBarText}>
            欢迎来到我的个人主页
          </Typography>
          <Typography>卢天宇</Typography>
          <Avatar src="avatar.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant="permanent"
        classes={{ paper: classes.drawer }}
        className={classes.drawer}
      >
        <div>
          <Typography variant="h6" align="center">
            切换页面
          </Typography>
        </div>
        <List>
          {menuList.map((item) => {
            return (
              <ListItem
                className={
                  location.pathname === item.path
                    ? classes.itemSelected
                    : undefined
                }
                button
                key={item.text}
                onClick={() => {
                  return history.push(item.path)
                }}
              >
                <ListItemIcon className={classes.listIcon}>
                  {item.icon}
                </ListItemIcon>
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
