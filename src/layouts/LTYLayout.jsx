import React from 'react'

import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Avatar,
  Box,
  Popper,
  IconButton,
  Fade,
} from '@material-ui/core'

import { SideBar } from '../containers/SideBar'
import { useState } from 'react'
import { FormatListBulletedRounded } from '@material-ui/icons'

const useLTYLayoutStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarText: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
  appBarIcon: {
    marginLeft: -19,
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
    '& :hover': {
      cursor: 'pointer',
    },
  },
}))

export const LTYLayout = ({ children }) => {
  const classes = useLTYLayoutStyles()
  const [sideBarExpand, setSideBarExpand] = useState(true)

  const handleAppBarIconClick = () => {
    setSideBarExpand(!sideBarExpand)
  }

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.appBarIcon}
            onClick={handleAppBarIconClick}
          >
            <FormatListBulletedRounded style={{ color: '#fff' }} />
          </IconButton>
          <Typography className={classes.appBarText}>
            欢迎来到我的个人主页
          </Typography>
          <Typography>LuLu010722</Typography>
          <Avatar src="avatar.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <SideBar expand={sideBarExpand} />
      <Box className={classes.page}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
