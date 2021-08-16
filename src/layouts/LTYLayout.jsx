import React from 'react'

import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Avatar,
  Box,
} from '@material-ui/core'

import { FlexBox } from '../containers/FlexBox'
import { SideBar } from '../containers/SideBar'

const useLTYLayoutStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  topBarText: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
  },
  page: {
    width: '100%',
    padding: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  itemSelected: {
    backgroundColor: '#ddd',
  },
  avatar: {
    marginLeft: theme.spacing(2),
  },
}))

export const LTYLayout = ({ children }) => {
  const classes = useLTYLayoutStyles()

  return (
    <FlexBox>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.topBarText} gutterBottom>
            欢迎来到我的个人主页
          </Typography>
          <Typography>卢天宇</Typography>
          <Avatar src="avatar.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <SideBar />
      <Box className={classes.page}>
        <Toolbar />
        {children}
      </Box>
    </FlexBox>
  )
}
