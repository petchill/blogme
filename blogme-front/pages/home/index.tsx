import { observer } from 'mobx-react-lite'
import "../../styles/Home.module.css"
import HeaderComponent from "../../components/Navbar/Navbar"
import { useEffect, useRef } from 'react'
import { Cookies } from '../../components/Cookies/Cookies'
import auth from "../../components/middlewares/auth"

function Home() {
  const firstElement = useRef<HTMLDivElement>(null)
  const homeContent = useRef<HTMLDivElement>(null)
  const backgroudWrapperTop = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scroll = window.pageYOffset
      // console.log(window.pageYOffset, firstElement.current.clientHeight)
      const firstOpacity = - scroll / (firstElement.current.clientHeight - 50) + 1
      console.log('firstOpa => ', firstOpacity)
      firstElement.current.style.opacity = firstOpacity.toString()
      firstElement.current.style.transform = `translateY(${scroll * 0.1}px)`
      homeContent.current.style.opacity = (scroll / firstElement.current.clientHeight).toString()
      backgroudWrapperTop.current.style.opacity = (scroll / firstElement.current.clientHeight).toString()
      backgroudWrapperTop.current.style.transform = `-translateY(${scroll * 0.1}px)`
      homeContent.current.style.transform = `-translateY(${scroll * 0.1}px)`
      // imageRef.current.style.opacity = "0"
      // firstElement.style.zIndex = "-1"
      // firstBox.setAttribute("style", `opacity:${- scroll / firstBoxHeight + 1}`)
    })
  })
  return (
    // <Cookies>
      <div className="homeMain">
        <HeaderComponent />
        <div className="first" ref={firstElement}>
          <div className="backgroundFirst"></div>
          <span className="centerText">BlogMe</span>
          <img src="/undraw_Taking_notes_re_bnaf.svg" alt="takingNote" ref={imageRef} />

        </div>
        <div className="backgroudWrapper" ref={backgroudWrapperTop}>
          <img src="/Vector 1.svg" className="backgroundLeft" />

        </div>

        <div className="homeContent" ref={homeContent}>
          <img src="/undraw_blogging_vpvv.svg" className="blogImage" />
          <div className="contentTextWrapper">
            <span className="contentHeader">BLOG</span>
            <span className="homeContentText">Create your Blog <br /> Join your neighbor's Blog</span>
            {/* <Link href="/blog"> */}
            <a className="blogButton" href="http://localhost:3000/blog">Go to blog</a>
            {/* </Link> */}
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
          <span className="contentHeader signHeader">Join us</span>
          <div className="signContainer">
            {/* <a href="">hello</a>
          <a href="">hello</a> */}
            <div className="signButtonContainer">
              <a className="signButton" href="">Sign in</a>
            </div>
            <div className="signButtonContainer">
              <a className="signButton" href="">Sign up</a>
            </div>
            {/* <div className="exam"></div> */}
            {/* <div className="wrap">
            <button className="button">Submit</button>
          </div> */}
          </div>
        </div>
        <div className="footer">
          <span className="contentHeader footerHeaderText">Contact me</span>
          <div className="contactList">
            <div className="contactContainer">
              <img className="contactLogo" src="/Facebook-f_Logo-Blue-Logo.wine.png" alt="facebookLogo" />
              <a href="https://www.facebook.com/petchill.songponn/">Petchill Songponn</a>
            </div>
            <div className="contactContainer">
              <img className="contactLogo" src="/Instagram-Logo.wine.png" alt="instagramLogo" />
              <a href="https://www.instagram.com/petchillsn/">PetchillSN</a>
            </div>
            <div className="contactContainer">
              <img className="contactLogo" src="/Gmail-Logo.wine.png" alt="gmailLogo" />
              <span>songpon111333@gmail.com</span>
            </div>
            <div className="contactContainer">
              <img className="contactLogo" src="/GitHub-Logo.wine.png" alt="githubLogo" />
              <a href="https://github.com/petchill">petchill</a>
            </div>
            <div className="contactContainer">
              <img className="contactLogo" src="/LinkedIn-Icon-Logo.wine.png" alt="linkedinLogo" />
              <a href="https://www.linkedin.com/in/songpon-ninwong">Petchill Songponn</a>
            </div>
          </div>
        </div>
      </div>
    // {/* </Cookies > */}
  )
}

export default auth(observer(Home))
