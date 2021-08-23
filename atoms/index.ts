import { atom } from 'recoil'
import { UserModel } from 'services'

export const userInfoState = atom({
  key: 'userInfoState',
  default: {} as UserModel,
})

export const loadingState = atom({
  key: 'loadingState',
  default: false,
})
