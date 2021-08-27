import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../../styles/OTP.module.css'
import {useSession} from 'next-auth/client'
import React, {useEffect, useState} from "react";
import {Button, Row} from "antd";
import {Grid, TextField} from "@material-ui/core";
import {Api, Status} from "../../services";
import {useRouter} from "next/router";
import Notiflix from "notiflix";
import {useSetRecoilState} from "recoil";
import {token} from "../../atoms";
import {setCookie} from "nookies";

const Index: NextPage = () => {
    const router = useRouter()

    const [session, loading] = useSession();
    const [otp, setOTP] = useState('');

    const setToken = useSetRecoilState(token);

    const onChangeOTP = (event: { target: { name: any; value: any } }) => {
        const {target: {name, value}} = event;
        setOTP(value)
    }

    useEffect(() => {
        console.log(session)
    }, [])

    const submit = async () => {
        // Notiflix.Loading.init({ customSvgUrl:'https://erp.tima.vn/_next/image?url=%2Fimages%2Flogo.svg&w=64&q=75', svgSize:'80px', });
        Notiflix.Loading.standard('Đang tải...');
        const response = await Api.getInstance().verifyOTP({
            Phone: router.query?.phone,
            Otp: otp
        })
        Notiflix.Loading.remove()

        console.log(response)

        if(response?.kind===Status.ok){
                console.log(response.data.data)
                setToken(()=>response.data.data)

            setCookie(null, 'access_token', response.data.data, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })

            await router.push({
                pathname: '/ekyc',
            })
        }else{
            console.log('error')
        }
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Nhập mã OTP</title>
            </Head>
            <div className={styles.backdropHead}>
                <img
                    className={styles.circle}
                    src={'https://online.f88.vn/static/media/bgCircle.9678d7a7.svg'}/>
            </div>
            <div className={styles.card}>
                <p className={styles.textHead}>Nhập mã OTP từ sđt {router.query?.phone}</p>
                {/*<div className={styles.containerInput}>*/}
                    <TextField
                        fullWidth={true}
                        onChange={onChangeOTP}
                        className={styles.inputPhone}
                        // margin={'dense'}
                        id="phone" label="Mã OTP" variant="outlined"/>
                {/*</div>*/}

                <Button
                    onClick={submit}
                    className={styles.buttonRegister}
                ><p className={styles.textRegister}>Xác nhận</p></Button>
            </div>
            <img className={styles.wallCenter} src="https://online.f88.vn/static/media/otp.7fdd0ddf.svg" alt=""
                 data-rum="image-artwork"/>


        </div>
    )
}

export default Index
