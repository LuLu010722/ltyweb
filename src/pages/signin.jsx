import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { Box } from '@material-ui/core'
import { AddCircleRounded, KeyboardArrowRight } from '@material-ui/icons'
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
    backgroundColor: theme.palette.grey[500],
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

export const SignInPage = () => {
  const classes = useStyles()

  const history = useHistory()
  const [id, setId] = useState(undefined)
  const [password, setPassword] = useState(undefined)

  const checkIdAndPassword = () => {
    const idRegex = /^[0-9A-Za-z]{4,10}$/
    const passwordRegex = /^[0-9]{6}$/
    if (!idRegex.test(id)) {
      Swal.fire({
        icon: 'error',
        title: 'ID不符合规则哟quq',
        timer: 1500,
        timerProgressBar: true,
      })
      return false
    }
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: 'error',
        title: '密码不符合规则哟quq',
        timer: 1500,
        timerProgressBar: true,
      })
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(hostPath + 'users')
      .then((res) => res.json())
      .then(async (res) => {
        const targetUser = res.find((user) => {
          return user.username === id
        })
        if (targetUser) {
          Swal.fire({
            icon: 'error',
            title: 'ID已经存在了哟quq',
            timer: 1500,
            timerProgressBar: true,
          })
        } else if (checkIdAndPassword()) {
          fetch(hostPath + 'users', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({ username: id, password }),
          })
          await Swal.fire({
            icon: 'succuess',
            title: '注册成功',
            timer: 1500,
            timerProgressBar: true,
          })
          history.push('/login')
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
              <AddCircleRounded color="secondary" className={classes.icon} />
              <Typography variant="h6" color="primary">
                注册
              </Typography>
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
