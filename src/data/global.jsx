import {
  InsertEmoticonOutlined,
  InfoOutlined,
  FeedbackOutlined,
} from '@material-ui/icons'

export const hostPath = 'http://localhost:4000/feedbacks/'

export const menuList = [
  {
    text: '主页',
    icon: <InsertEmoticonOutlined />,
    path: '/',
  },
  {
    text: '信息',
    icon: <InfoOutlined />,
    path: '/info',
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
