import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useSession} from 'next-auth/client'
import React, {useEffect, useState} from "react";
import {Button} from "antd";
import {Grid, TextField} from "@material-ui/core";
import {Api, Status} from "../services";
import {useRouter} from "next/router";
import Notiflix from "notiflix";


const Home: NextPage = () => {
    const router = useRouter()

    const [session, loading] = useSession();
    const [phone, setPhone] = useState('');

    const onChangePhone = (event: { target: { name: any; value: any } })=>{
        const { target: { name, value } } = event;
        setPhone(value)
    }

    useEffect(() => {
        console.log(session)
    }, [])


    const submit = async ()=>{
        // Notiflix.Loading.init({ customSvgUrl:'https://erp.tima.vn/_next/image?url=%2Fimages%2Flogo.svg&w=64&q=75', svgSize:'80px', });
        Notiflix.Loading.standard('Đang tải...');
        const response = await Api.getInstance().getOTP({phone})
        Notiflix.Loading.remove()
        if(response?.kind===Status.ok){
            await router.push({
                pathname: '/otp',
                query: { phone: phone },
            })
        }else{
            console.log('error')
            Notiflix.Confirm.show( 'Thông báo', 'Có lỗi xảy ra. Vui lòng thử lại!', 'Đồng ý' );
        }
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Đăng nhập</title>
            </Head>
            <div className={styles.backdropHead}>
                <img
                    className={styles.circle}
                    src={'https://online.f88.vn/static/media/bgCircle.9678d7a7.svg'}/>
            </div>
            <div className={styles.containerSlogan}>
            <div className={styles.slogan}>
                <p className={styles.textBrand}>Tima Online</p>
                <p className={styles.textSlogan}>Ứng dụng hỗ trợ tài chính trực tuyến đầu tiên đối với<br/>sản phẩm cho
                    vay có tài sản đảm bảo</p>
            </div>
            </div>

                <div className={styles.containerCharacter}>
                    <img className={styles.character} src={'https://online.f88.vn/static/media/character.1f20143a.png'}/>
                </div>
                <div className={styles.card}>
                    <div>
                        <p className={styles.textHead}>LỰA CHỌN GÓI VAY ĐĂNG KÝ XE MÁY</p>
                        <Grid container
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center">
                            <div className={styles.option_1}>
                                <div className={styles.checked}>
                                    <img src="https://online.f88.vn/static/media/iconV.f510f56a.svg"
                                         alt=""/>
                                </div>
                                <p className={styles.textMoney}>5.000.000đ</p><span
                                className="jss152">Thời hạn: 6 tháng</span>
                            </div>
                            <div className={styles.option_1}>
                                <div className={styles.check}>
                                    <img src="https://online.f88.vn/static/media/iconCommingSoon.8dc57c78.svg"
                                         alt=""/>
                                </div>
                                <p className={styles.textMoney}>3.000.000đ</p><span
                                className="jss152">Thời hạn: 6 tháng</span>
                            </div>

                        </Grid>
                        <div className={styles.containerInput}>
                            <TextField
                                onChange={onChangePhone}
                                className={styles.inputPhone}
                                inputProps={{ inputMode: 'numeric' }}
                                // margin={'dense'}
                                id="phone" label="Số điện thoại" variant="outlined"/>
                        </div>
                        {/*<Button*/}
                        {/*    disableElevation*/}
                        {/*    fullWidth*/}
                        {/*    // color="primary"*/}
                        {/*    className={styles.buttonRegister}*/}
                        {/*    variant="contained"><p className={styles.textRegister}>Vay ngay</p></Button>*/}
                        <Button
                            onClick={submit}
                            className={styles.buttonRegister}
                        ><p className={styles.textRegister}>Vay ngay</p></Button>
                    </div>

                    <div className={styles.textTerm}>Bằng việc nhấn vào nút &quot;Vay ngay&quot;
                        bạn đồng ý các <a className="jss173">điều kiện và điều khoản sử dụng ứng dụng</a> từ Tima
                    </div>
                    <div className={styles.textTerm}>Thời hạn tối đa và tối thiểu của
                        khoản vay là 6 tháng. Lãi suất trong hạn tính theo năm tối đa là 13.2%/ năm.
                    </div>
                </div>

            <div className={styles.formRegister}>
                {/*{*/}
                {/*    formRegister()*/}
                {/*}*/}
            </div>
            <img className={styles.wallCenter} src="https://online.f88.vn/static/media/artwork1.67f0e83d.png" alt=""
                 data-rum="image-artwork"/>


        </div>
    )
}

export default Home
