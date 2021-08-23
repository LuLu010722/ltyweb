import {
  Typography,
  Dialog,
  DialogTitle,
  Button,
  List,
  ListItem,
} from '@material-ui/core'
import { useState } from 'react'

const SimpleDialog = (props) => {
  const { onClose, selectedValue, open } = props
  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set back account</DialogTitle>
      <List>
        <ListItem button onClick={() => handleListItemClick(1)}>
          <Typography>1</Typography>
        </ListItem>
        <ListItem button onClick={() => handleListItemClick(2)}>
          <Typography>2</Typography>
        </ListItem>
        <ListItem button onClick={() => handleListItemClick(3)}>
          <Typography>3</Typography>
        </ListItem>
      </List>
    </Dialog>
  )
}

export const InfoPage = () => {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(0)

  const handleClose = (value) => {
    setOpen(false)
    setSelectedValue(value)
  }
  return (
    <>
      <Typography>欢迎来到相关信息页面</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(!open)
        }}
      >
        123
      </Button>
      <SimpleDialog
        setSelectedValue={setSelectedValue}
        open={open}
        onClose={handleClose}
      />
      {!!selectedValue && <Typography variant="h3">I am clicked!</Typography>}
    </>
  )
}
