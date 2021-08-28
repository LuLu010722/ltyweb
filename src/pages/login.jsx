import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { Box } from '@material-ui/core'
import {
  KeyboardArrowRight,
  KeyboardArrowRightRounded,
  VerifiedUserRounded,
} from '@material-ui/icons'
import { useState } from 'react'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import { Divider } from '../components/Divider'
import { hostPath } from '../data/global'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: theme.palette.grey[500]
  },
  box: {
    width: 400,
    height: 400,
    position: 'absolute',
    left: '50%',
    top: '50%',
    margin: '-200px 0 0 -200px',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  typography: {
    flexGrow: 1,
  },
  textField: {
    marginTop: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}))

export const LoginPage = ({ setLogin, setUser }) => {
  const classes = useStyles()

  const history = useHistory()
  const [id, setId] = useState(undefined)
  const [password, setPassword] = useState(undefined)

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(hostPath + 'users')
      .then((res) => res.json())
      .then(async (res) => {
        const targetUser = res.find((user) => {
          return user.username === id && user.password === password
        })
        if (targetUser) {
          await Swal.fire({
            icon: 'success',
            title: '登录成功',
            timer: 1500,
            timerProgressBar: true,
          })
          setLogin(true)
          setUser(targetUser)
          history.push('/index')
        } else {
          Swal.fire({
            icon: 'error',
            title: '啊哦，ID或者密码错误了哟quq',
            timer: 1500,
            timerProgressBar: true,
          })
        }
      })
      .catch((reason) => {
        console.log(reason)
      })
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Container>
          <Divider />
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box display="flex" alignItems="center">
              <VerifiedUserRounded color="secondary" className={classes.icon} />
              <Typography
                className={classes.typography}
                variant="h6"
                color="primary"
              >
                登录
              </Typography>
              <Button
                endIcon={<KeyboardArrowRightRounded />}
                variant="contained"
                color="secondary"
                onClick={() => {
                  history.push('/signin')
                }}
                size="small"
              >
                注册
              </Button>
            </Box>
            <TextField
              className={classes.textField}
              label="ID"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                setId(e.target.value)
              }}
            />
            <TextField
              className={classes.textField}
              label="密码"
              fullWidth
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Box display="flex" flexDirection="row-reverse">
              <Button
                className={classes.button}
                focusRipple={false}
                variant="contained"
                color="primary"
                endIcon={<KeyboardArrowRight />}
                type="submit"
                size="small"
              >
                确定
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  )
}
