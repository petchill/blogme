import { observer, useObserver } from 'mobx-react-lite'
import { useState } from "react"
// import { useObserver } from "mobx-react"
import { Input, AutoComplete } from "antd";
import { UserOutlined } from "@ant-design/icons";
import '../../styles/Navbar.css'
import { NavbarService } from "../../services/NavbarService"
import { observable, action, makeAutoObservable } from "mobx";

function Header(props) {
  console.log(props.name)
  const [viewModel] = useState(new NavbarService())

  return (
    <div className="navbar">
      <span className="logoName">BlogMe</span>
      <AutoComplete
        className="searchBar"
        value={viewModel.searchValue}
        onChange={(v) => { viewModel.setSearchValue(v) }}
        options={viewModel.searchOptions}
      >
        <Input.Search size="large" placeholder="input here" />
      </AutoComplete>
      <a className="navTopic" href="">Home</a>
      <a className="navTopic" href="">Sign in</a>
      <a className="navTopic" href="">Sign up</a>
    </div>
  )
}

export default observer(Header);
