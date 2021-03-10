import Cookies from 'universal-cookie';
import path from 'path'
const cookies = new Cookies();
import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { JsxElement } from 'typescript';

// function auth(children): JSX.Element {
//   React.useEffect(() => {
//     console.log(window.location.hostname)
//   }, [])
//   const router = useRouter()
//   console.log()
//   const jwt = cookies.get("jwt")
//   if (!jwt) {
//     // const url = path.join(window.location.hostname, 'home')

//   }
//   return (<React.Fragment>
//     {children}
//   </React.Fragment>
//   )
// }

const auth = Component => props => {
  const router = useRouter()
  useEffect(() => {
    const jwt = cookies.get("jwt")
    if (!jwt) {
      const url = path.join(process.env.BASE_URL, 'login')
      router.push("login")
      return
    }
    console.log('heelo')
  }, []);
  return <Component {...props} />
}

export default auth

function auth1(children) {
  return class extends React.Component {
    render() {
      return (
        <React.Fragment>
          {children}
        </React.Fragment>
      )
    }
  }
}