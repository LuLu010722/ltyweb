import {
  InsertEmoticonOutlined,
  InfoOutlined,
  FeedbackOutlined,
} from '@material-ui/icons'

export const menuList = [
  {
    text: '个人主页',
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
  {
    text: '联系方式',
  },
]

export const statusList = ['info', 'todo', 'bug']
