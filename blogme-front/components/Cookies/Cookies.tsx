import React, { FunctionComponent } from 'react';
import {CookiesProvider} from "react-cookie"
import { useRouter } from 'next/router'

export function Cookies({ children }) {
  const router = useRouter()
  return (
    <CookiesProvider>
      { children}
    </CookiesProvider>
  )
}