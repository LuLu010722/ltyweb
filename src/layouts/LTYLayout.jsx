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
  Button,
} from '@material-ui/core'

import { SideBar } from '../containers/SideBar'
import { useState } from 'react'
import {
  CloseRounded,
  FormatListBulletedRounded,
  KeyboardArrowDown,
} from '@material-ui/icons'
import { useHistory } from 'react-router'

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
  avatarPopover: {
    marginTop: theme.spacing(2),
  },
  userPopover: {
    marginTop: theme.spacing(3),
  },
  usernameBox: {
    display: 'flex',
    cursor: 'pointer',
  },
}))

export const LTYLayout = ({ children, user }) => {
  const classes = useLTYLayoutStyles()
  const history = useHistory()
  const [sideBarExpand, setSideBarExpand] = useState(true)
  const [userAnchorEl, setUserAnchorEl] = useState(null)
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null)

  const handleAppBarIconClick = () => {
    setSideBarExpand(!sideBarExpand)
  }

  const handleAvatarClick = (e) => {
    setAvatarAnchorEl(e.currentTarget)
  }

  const handleAvatarClose = () => {
    setAvatarAnchorEl(null)
  }

  const handleUserClick = (e) => {
    setUserAnchorEl(e.currentTarget)
  }

  const handleUserClose = () => {
    setUserAnchorEl(null)
  }

  const handleLogout = () => {
    history.push('/')
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
          <Box className={classes.usernameBox} onClick={handleUserClick}>
            <Typography>{user.username}</Typography>
            <KeyboardArrowDown />
          </Box>
          <Popover
            className={classes.userPopover}
            open={!!userAnchorEl}
            anchorEl={userAnchorEl}
            onClose={handleUserClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box display="flex" flexDirection="column">
              <Button startIcon={<CloseRounded />} onClick={handleLogout}>
                退出
              </Button>
            </Box>
          </Popover>
          <Avatar
            src="avatar.png"
            className={classes.avatar}
            onClick={handleAvatarClick}
          />
          <Popover
            className={classes.avatarPopover}
            open={!!avatarAnchorEl}
            anchorEl={avatarAnchorEl}
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
            <Box display="flex" flexDirection="column">
              <Button>点赞</Button>
              <Button>收藏</Button>
              <Button>投币</Button>
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
