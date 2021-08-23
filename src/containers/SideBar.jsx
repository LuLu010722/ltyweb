import { useLocation, useHistory } from 'react-router'

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

const drawerWidth = 200
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
  },
}))

export const SideBar = ({ expand }) => {
  const classes = useStyles(expand)
  const history = useHistory()
  const location = useLocation()

  return (
    <Drawer
      variant="permanent"
      classes={{ paper: classes.drawer }}
      className={classes.drawer}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {menuList.map((item) => {
            return (
              <ListItem
                className={
                  location.pathname === item.path ? classes.itemSelected : null
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
