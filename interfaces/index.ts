import { AppProps } from 'next/app'
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack'
import { ButtonProps } from 'antd/lib/button/button'

export interface PageProps extends AppProps {
  enqueueSnackbar: (
    message: SnackbarMessage,
    options?: OptionsObject,
  ) => SnackbarKey
  closeSnackbar: (key?: SnackbarKey) => void
}

export interface ContentButtonProps extends ButtonProps {
  text?: string
  visible?: boolean
  icon?: JSX.Element
}

export interface IFormData<T> {
  [key: string]: any
}

export interface ISidebarItem {
  title: string
  icon?: JSX.Element
  visible?: boolean
  path?: string
  children?: ISidebarItem[]
}
