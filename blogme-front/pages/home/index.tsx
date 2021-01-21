// import styles from "../../styles/Home2.module.less";
import "../../styles/Home.css"
import HeaderComponent from "../../components/Navbar/Navbar"
import { Button } from "antd"

export default function Home() {
  return (
    <div className="homeMain">
      <HeaderComponent name="petch" />
      <div className="first">
        <span className="centerText">BlogMe</span>
        <img src="/undraw_Taking_notes_re_bnaf.svg" alt="takingNote" />

      </div>
      <div className="backgroudWrapper">
        <img src="/Vector 1.svg" className="backgroundLeft" />

      </div>

      <div className="homeContent">
        <img src="/undraw_blogging_vpvv.svg" className="blogImage" />
        <div className="contentTextWrapper">
          <span className="contentHeader">BLOG</span>
          <span className="homeContentText">Create your Blog <br /> Join your neighbor's Blog</span>
          <a href="">Go to blog</a>
        </div>
      </div>
      <div className="homeContent">
        <div className="contentTextWrapper">
          <span className="contentHeader">CHAT</span>
          <span className="homeContentText">Chat with you friends</span>
        </div>
        <img src="/undraw_Chatting_re_j55r.svg" className="chatImage" />
      </div>
      <div className="backgroudWrapper">
        <img src="/Vector 2.svg" className="backgroundRight" />
      </div>
      <div className="signWrapper">
        <span className="signHeader">Join us</span>
        <div>
          <a href="">sign in</a>
          <a href="">sign up</a>

        </div>
      </div>
      <div className="footer">
        <span className="signHeader">Contact me</span>
      </div>
    </div>
  )
}