import { useState } from 'react'
import { useHistory } from 'react-router'

import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core'

import { menuList } from '../data/global'

const drawerWidth = 115
const collapseDrawerWidth = 55

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: (expand) => {
      return expand ? drawerWidth : collapseDrawerWidth
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'hidden',
  },
  listIcon: {
    width: collapseDrawerWidth,
    color: 'violet',
  },
  listText: {
    whiteSpace: 'nowrap',
    marginLeft: theme.spacing(-2),
  },
}))

export const SideBar = ({ expand }) => {
  const classes = useStyles(expand)
  const [selectNumber, setSelectNumber] = useState(undefined)
  const history = useHistory()

  return (
    <Drawer
      variant="permanent"
      classes={{ paper: classes.drawer }}
      className={classes.drawer}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {menuList.map((item, index) => {
            return (
              <ListItem
                button
                key={item.text}
                selected={selectNumber === index}
                onClick={() => {
                  setSelectNumber(index)
                  return history.push(item.path)
                }}
              >
                <ListItemIcon className={classes.listIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText className={classes.listText}>
                  {item.text}
                </ListItemText>
              </ListItem>
            )
          })}
        </List>
      </div>
    </Drawer>
  )
}
