import React from 'react'

import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Avatar,
  Box,
  IconButton,
} from '@material-ui/core'

import { FlexBox } from '../components/FlexBox'
import { SideBar } from '../containers/SideBar'
import { useState } from 'react'
import { FormatListBulletedRounded } from '@material-ui/icons'
import { useMemo } from 'react'

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
  },
}))

export const LTYLayout = ({ children }) => {
  const classes = useLTYLayoutStyles()
  const [sideBarExpand, setSideBarExpand] = useState(true)

  const memoExpand = useMemo(() => {
    return sideBarExpand
  })

  const handleAppBarIconClick = () => {
    setSideBarExpand(!sideBarExpand)
  }

  return (
    <FlexBox>
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
          <Typography>卢天宇</Typography>
          <Avatar src="avatar.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <SideBar expand={memoExpand} />
      <Box className={classes.page}>
        <Toolbar />
        {children}
      </Box>
    </FlexBox>
  )
}
