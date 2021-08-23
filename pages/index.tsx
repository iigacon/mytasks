import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import {useSession} from 'next-auth/client'
import React, {useEffect} from "react";
import {Button, Row} from "antd";
import {Grid, TextField} from "@material-ui/core";

const Home: NextPage = () => {
    const [session, loading] = useSession();


    useEffect(() => {
        console.log(session)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Đăng nhập</title>
            </Head>
            <div className={styles.backdropHead}>
                <Image
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
            <Grid
                className={styles.gridContent}
                container
                  direction="row"
                justifyContent="center"
                alignItems="center"
                  // justifyContent="space-between"
            >
                <div className={styles.containerCharacter}>
                    <Image className={styles.character} src={'https://online.f88.vn/static/media/character.1f20143a.png'}/>
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
                                    <Image src="https://online.f88.vn/static/media/iconV.f510f56a.svg"
                                         alt=""/>
                                </div>
                                <p className={styles.textMoney}>5.000.000đ</p><span
                                className="jss152">Thời hạn: 6 tháng</span>
                            </div>
                            <div className={styles.option_1}>
                                <div className={styles.check}>
                                    <Image src="https://online.f88.vn/static/media/iconCommingSoon.8dc57c78.svg"
                                         alt=""/>
                                </div>
                                <p className={styles.textMoney}>3.000.000đ</p><span
                                className="jss152">Thời hạn: 6 tháng</span>
                            </div>

                        </Grid>
                        <div className={styles.containerInput}>
                            <TextField
                                className={styles.inputPhone}
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
            </Grid>
            <Image className={styles.wallCenter} src="https://online.f88.vn/static/media/artwork1.67f0e83d.png" alt=""
                 data-rum="image-artwork"/>


        </div>
    )
}

export default Home
