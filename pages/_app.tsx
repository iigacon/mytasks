import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import { LocalizationProvider } from '@material-ui/pickers'
import {ConfigProvider, Grid} from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import {RecoilRoot} from "recoil";
import {ThemeProvider} from "@material-ui/styles";
import {Theme} from "../themes";
import {CssBaseline} from "@material-ui/core";
import { SnackbarProvider } from 'notistack'
import DateFnsUtils from "@date-io/date-fns";
import HomeCssBaseline from "../themes/HomeCssBaseline";
import Layout from '../layouts'
import AuthCssBaseline from "../themes/AuthCssBaseline";
import viLocale from 'date-fns/locale/vi'
import Head from "next/head";
import { Provider } from 'next-auth/client'
if (viVN.DatePicker) {
  viVN.DatePicker.lang.locale = 'vi'
}
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const screens = Grid.useBreakpoint()


  useEffect(() => {
    // Remove the server-side injected CSS.
    // eslint-disable-next-line no-undef
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  // const authLayout = ['/auth/login', '/auth/logout', '/redirect'].includes(
  //     router.pathname,
  // )

  return(
      <>
        <Head>
          <title>My Tasks</title>
          <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
              rel="stylesheet"
          />
        </Head>
        <RecoilRoot>
          <ThemeProvider theme={Theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <HomeCssBaseline/>
            <SnackbarProvider>
              <ConfigProvider locale={viVN}>
                <LocalizationProvider
                    dateAdapter={DateFnsUtils}
                    locale={viLocale}
                >
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </LocalizationProvider>
              </ConfigProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </RecoilRoot>
      </>

  )

  // return <Component {...pageProps} />
}
export default MyApp
