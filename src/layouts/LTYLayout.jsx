import React from 'react'

import {
  Box,
  Popover,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Avatar,
  IconButton,
  List,
  ListItem,
  Container,
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
  popover: {
    marginTop: theme.spacing(2),
  },
  popoverContent: {
    margin: theme.spacing(1),
  },
}))

export const LTYLayout = ({ children }) => {
  const classes = useLTYLayoutStyles()
  const [sideBarExpand, setSideBarExpand] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleAppBarIconClick = () => {
    setSideBarExpand(!sideBarExpand)
  }

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleAvatarClose = () => {
    setAnchorEl(null)
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
          <Avatar
            src="avatar.png"
            className={classes.avatar}
            onClick={handleAvatarClick}
          />
          <Popover
            className={classes.popover}
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleAvatarClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box
              className={classes.popoverContent}
              display="flex"
              flexDirection="column"
            >
              <ListItem button>点赞</ListItem>
              <ListItem button>收藏</ListItem>
              <ListItem button>投币</ListItem>
            </Box>
          </Popover>
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
