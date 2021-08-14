import { Button, makeStyles, TextField, Typography } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import { LTYLayout } from '../layouts/LTYLayout'

const useTextFieldStyles = makeStyles((theme) => {
  return {
    text: {
      marginBottom: theme.spacing(2),
      display: 'block',
    },
  }
})

export const FeedbackPage = () => {
  const classes = useTextFieldStyles()
  const textList = [
    {
      text: '标题',
    },
    {
      text: '描述',
    },
    {
      text: '联系方式',
    },
  ]

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  return (
    <LTYLayout>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {textList.map((text, index) => {
          return (
            <TextField
              className={classes.text}
              variant="outlined"
              autoFocus={index === 0}
              fullWidth
              label={<Typography>{text.text}</Typography>}
            />
          )
        })}
        <Button
          endIcon={<KeyboardArrowRight />}
          type="submit"
          variant="contained"
          color="secondary"
        >
          提交
        </Button>
      </form>
    </LTYLayout>
  )
}
