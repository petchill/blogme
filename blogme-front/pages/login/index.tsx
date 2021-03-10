import { observer } from 'mobx-react-lite'
import HeaderComponent from "../../components/Navbar/Navbar"
import { LoginService } from "../../services/LoginService"
import "../../styles/Login.css"
import { Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react'

function Login(props) {
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const [viewModel] = useState(new LoginService())
  const { cookie } = props;

  function handleLogin() {

    console.log('email input ', emailInput.current)
    console.log('test')
    viewModel.sendLogin()
    console.log(process.env.API_URL)
  }
  return (
    <div className="loginMain">
      <HeaderComponent />
      <div className="mainContent">
        <img className="loginPageImage" src="/undraw_Co_workers_re_1i6i.svg" />
        <div className="loginForm">
          <h1 className="loginHeader">Sign In</h1>
          <div className="loginInputWrap">
            <Input value={viewModel.email} onChange={(e) => viewModel.setEmail(e.target.value)} className="loginInput" placeholder="email" prefix={<UserOutlined />} />
            <Input.Password value={viewModel.password} onChange={(e) => viewModel.setPassword(e.target.value)} className="loginInput" placeholder="password" prefix={<LockOutlined />} />
          </div>
          <a className="loginButton" onClick={() => handleLogin()}>Sign In</a>
        </div>
      </div>
    </div>
  )
}

export default observer(Login)
