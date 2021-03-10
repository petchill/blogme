import '../styles/globals.less'
import {Cookies} from "../components/Cookies/Cookies"

function MyApp({ Component, pageProps }) {
  return (
    <Cookies>
      <Component {...pageProps} />
    </Cookies>
  )
}

export default MyApp
