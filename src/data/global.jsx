import {
  InsertEmoticonOutlined,
  InfoOutlined,
  FeedbackOutlined,
} from '@material-ui/icons'

export const hostPath = 'http://localhost:4000/'

export const menuList = [
  {
    text: '主页',
    icon: <InsertEmoticonOutlined />,
    path: '/index',
  },
  {
    text: '日记',
    icon: <InfoOutlined />,
    path: '/diary',
  },
  {
    text: '反馈',
    icon: <FeedbackOutlined />,
    path: '/feedback',
  },
]

export const textList = [
  {
    text: '标题',
  },
  {
    text: '状态',
  },
  {
    text: '描述',
  },
]

export const statusList = ['info', 'todo', 'bug']
