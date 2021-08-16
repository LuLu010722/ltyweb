import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}))

export const Divider = () => {
  const classes = useStyles()
  return <Box className={classes.root} />
}
