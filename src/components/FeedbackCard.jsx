import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "#eee"
    },
  }
})

export const FeedbackCard = ({ feedback, handleDelete }) => {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.root} elevation={3}>
        <CardHeader
        avatar={<Avatar >{feedback.title[0]}</Avatar>}
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
