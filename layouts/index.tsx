import { withSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { ISidebarItem, PageProps } from '../interfaces'
import {useRecoilValue} from "recoil";
import {loadingState, userInfoState} from "../atoms";
import {Grid, Layout} from "antd";
import {withAuth} from "../hooks/withAuth";
import {useRouter} from "next/router";

interface Props extends PageProps {
    children: JSX.Element
}
const Index: React.FC<Props> = ({ children }) => {
    const user = useRecoilValue(userInfoState)
    const isLoading = useRecoilValue(loadingState)
    const screens = Grid.useBreakpoint()
    const router = useRouter()
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [openKeys, setOpenKeys] = useState<string[] | undefined>([])


    return(
        <Layout
            style={{
                // marginLeft: !screens.md ? 0 : collapsed ? 80 : 200,
                // transition: 'all 0.2s',
            }}
        >
                <div className='site-layout-background'>{children}</div>
        </Layout>
    )
}
export default withAuth(Index)
