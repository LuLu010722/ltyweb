import { Link } from 'react-router-dom'

export const IndexPage = () => {
  return (
    <>
      <h1>我的信息</h1>
      <ul>
        <li>姓名:卢天宇</li>
        <li>性别:男</li>
        <li>地址:上海</li>
        <li>
          主页:<Link to="feedback">lulu010722</Link>
        </li>
      </ul>
      <h1>我的爱好</h1>
      <h1>联系我</h1>
    </>
  )
}
