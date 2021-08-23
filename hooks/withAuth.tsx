import { userInfoState } from 'atoms'
import Loading from 'components/Loading'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { EnumUserModelRole, UserModel } from '../services'
import axios, { AxiosRequestConfig } from 'axios'
import { serviceOptions } from 'services/serviceOptions'
import { request } from 'https'
import { alertError } from 'utils'

export const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter()
    const { access_token } = parseCookies(null)

    const [user, setUser] = useRecoilState<UserModel>(userInfoState)

    useEffect(() => {
      if (!access_token) window.location.href = 'https://sso.tima.vn'
      else {
        const userTokenData = jwt.decode(access_token, {
          json: true,
        })
        if (userTokenData) {
          const currentTime = new Date().getTime() / 1000
          if (currentTime > userTokenData?.exp)
            window.location.href = 'https://sso.tima.vn'

          const notAllowRoles = [EnumUserModelRole.Guest]

          if (notAllowRoles.includes(userTokenData?.role)) {
            alert(
              'Tài khoản chưa được cấp quyền! Vui lòng liên hệ Hotline: 0969 542 333 được được cấp quyền!',
            )
            window.location.href = 'https://sso.tima.vn'
          } else {
            setUser(userTokenData as UserModel)

            if (
              userTokenData?.role === EnumUserModelRole.User &&
              router.pathname !== '/user/checkin' &&
              router.pathname !== '/user/[id]'
            ) {
              router.push('/user/checkin')
            }

            const axiosConfig: AxiosRequestConfig = {
              baseURL:
                process.env.NEXT_PUBLIC_API_URL ||
                'http://128.199.75.164:4000/',
              timeout: 60000, // 1 phút
            }

            if (access_token) {
              axiosConfig.headers = {
                Authorization: `Bearer ${access_token}`,
                'Access-Control-Allow-Origin': '*',
              }
            }
            axios.interceptors.response.use(
              response => response,
              error => {
                // alertError(error)
                console.log("Error", error);

                return Promise.reject(error)
              },
            )

            serviceOptions.axios = axios.create(axiosConfig)
          }
        }
      }
    }, [router.pathname])

    if (!user?.id) return <Loading absoluted />

    return <WrappedComponent {...props} />
  }
}
