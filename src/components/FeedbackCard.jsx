import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Delete, DeleteOutlined } from '@material-ui/icons'
import { Container } from 'postcss'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: 20,
    },
  }
})

export const FeedbackCard = ({ feedback, handleDelete }) => {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          title={feedback.title}
          action={
            <IconButton onClick={() => handleDelete(feedback.id)}>
              <DeleteOutlined />
            </IconButton>
          }
        />
        <CardContent>
          <Typography>{feedback.details}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
