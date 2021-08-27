import {token, userInfoState} from '../atoms'
import Loading from '../components/Loading'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import axios, { AxiosRequestConfig } from 'axios'
import {Api} from "../services";

export const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter()
    const { access_token } = parseCookies(null)

    const [user, setUser] = useRecoilState(userInfoState)

    const pathNotLogin =[
      '/',
      '/otp',
      '/login',
      '/ekyc',
    ]

    useEffect(() => {
      console.log('access_token', access_token)
      if (!access_token  && !pathNotLogin.includes(router.pathname) ) window.location.href = '/'
      else {
        const userTokenData = jwt.decode(access_token, {
          json: true,
        })
        console.log(userTokenData)
        if (userTokenData) {
          const currentTime = new Date().getTime() / 1000
          if (currentTime > userTokenData?.exp)
            window.location.href = '/'

          Api.getInstance().changeAuth(access_token)
        }
      }
    }, [router.pathname])

    return <WrappedComponent {...props} />
  }
}
