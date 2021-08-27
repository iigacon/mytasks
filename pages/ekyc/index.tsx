import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/EKYC.module.css'
import {Button, Divider, Steps, Upload} from 'antd';
import React, {useRef, useState} from "react";
import 'antd/dist/antd.css';
import {UploadOutlined} from "@ant-design/icons/lib";
import {Grid, Button as MButton, SvgIcon} from "@material-ui/core";
import axios from "axios";
import {Api} from "../../services";
import {parseCookies} from "nookies";
import Notiflix from "notiflix";
import {useRouter} from "next/router";
import Webcam from "react-webcam";

const {Step} = Steps;

const Home: NextPage = () => {
    const router = useRouter()

    const webcamRef = React.useRef(null);

    const [currentStep, setCurrentStep] = useState(1);

    const [defaultFileList, setDefaultFileList] = useState([]);
    const [progress, setProgress] = useState(0);

    const [fileFront, setFileFront] = useState('');
    const [fileBack, setFileBack] = useState('');

    const [urlFront, setUrlFront] = useState('');
    const [urlBack, setUrlBack] = useState('');

    const [urlSelfie, setUrlSelfie] = useState('');
    const [fileSelfie, setFileSelfie] = useState('');

    const {access_token} = parseCookies(null)


    const handleCaptureBack = ({target}: any) => {
        setFileBack(target.files[0])
        setUrlBack(URL.createObjectURL(target.files[0]))
    };

    const handleCaptureFront = ({target}: any) => {
        setFileFront(target.files[0])
        setUrlFront(URL.createObjectURL(target.files[0]))
    };

    const handleCaptureSelfie = ({target}: any) => {
        setFileSelfie(target.files[0])
        setUrlSelfie(URL.createObjectURL(target.files[0]))
    };

    const submit_step_0 = async () => {
        Notiflix.Loading.standard('Đang tải...');
        const formData = new FormData();
        formData.append('image', fileFront)
        const response = await Api.getInstance().nationalCard(formData, 1040353)
        console.log(response)
        if (response?.data?.meta?.errorCode === 200) {
        } else {
            Notiflix.Notify.failure(response?.data?.meta?.errorMessage);
            return
        }
        Notiflix.Loading.remove()

        const formData2 = new FormData();
        formData2.append('image', fileBack)
        const response2 = await Api.getInstance().nationalCard(formData2, 1040353)
        console.log(response)
        if (response2?.data?.meta?.errorCode === 200) {
        } else {
            Notiflix.Notify.failure(response2?.data?.meta?.errorMessage);
            return
        }
        Notiflix.Loading.remove()

        setCurrentStep(1)
    }

    const submit_step_1 = async () => {
        // Notiflix.Loading.standard('Đang tải...');
        // const formData = new FormData();
        // formData.append('image', fileFront)
        // const response = await Api.getInstance().nationalCard(formData, 1040353)
        // console.log(response)
        // if (response?.data?.meta?.errorCode === 200) {
        // } else {
        //     Notiflix.Notify.failure(response?.data?.meta?.errorMessage);
        //     return
        // }
        // Notiflix.Loading.remove()
        //
        // const formData2 = new FormData();
        // formData2.append('image', fileBack)
        // const response2 = await Api.getInstance().nationalCard(formData2, 1040353)
        // console.log(response)
        // if (response2?.data?.meta?.errorCode === 200) {
        // } else {
        //     Notiflix.Notify.failure(response2?.data?.meta?.errorMessage);
        //     return
        // }
        // Notiflix.Loading.remove()

        setCurrentStep(2)
    }


    const step_1 = () => {
        return (
            <>
                <p className={styles.textHead}>Upload hình ảnh CMND/CCCD</p>
                <Divider/>
                <div className="flex items-stretch">
                    <div className="flex flex-1 flex-col justify-center">
                        <p className={styles.textNormal}>Mặt trước</p>
                        <Button
                            className={"self-center"}
                            // className={styles.buttonInputFile}
                            icon={<UploadOutlined/>}>Tải ảnh lên
                            <input
                                accept="image/*"
                                className={styles.inputFile}
                                id="icon-button-file"
                                type="file"
                                capture="environment"
                                // hidden
                                onChange={handleCaptureFront}
                            />
                        </Button>
                        <img src={urlFront} className={styles.nationalView}/>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                        <p className={styles.textNormal}>Mặt sau</p>
                        <Button
                            className={"self-center"}
                            // className={styles.buttonInputFile}
                            icon={<UploadOutlined/>}>Tải ảnh lên
                            <input
                                accept="image/*"
                                className={styles.inputFile}
                                id="icon-button-file"
                                type="file"
                                capture="environment"
                                // hidden
                                onChange={handleCaptureBack}
                            />
                        </Button>
                        <img src={urlBack} className={styles.nationalView}/>
                    </div>
                </div>
                <MButton
                    onClick={submit_step_0}
                    className={styles.buttonRegister}
                ><p className={styles.textRegister}>Xác nhận</p></MButton>
            </>
        )
    }

    const step_2 = ()=>{
        return(
            <>
                <p className={styles.textHead}>Upload hình ảnh Selfie</p>
                <Divider/>
                <div className="flex items-stretch">
                    <div className="flex flex-1 flex-col justify-center">
                        <p className={styles.textNormal}>Ảnh Selfie</p>
                        <Button
                            className={"self-center"}
                            // className={styles.buttonInputFile}
                            icon={<UploadOutlined/>}>Tải ảnh lên
                            <input
                                accept="image/*"
                                className={styles.inputFile}
                                id="icon-button-file"
                                type="file"
                                capture="environment"
                                // hidden
                                onChange={handleCaptureSelfie}
                            />
                        </Button>
                        <img src={urlSelfie} className={styles.nationalView}/>
                    </div>
                </div>
                <MButton
                    onClick={submit_step_1}
                    className={styles.buttonRegister}
                ><p className={styles.textRegister}>Xác nhận</p></MButton>
            </>
        )
    }

    const step_3 = ()=>{
        return(
            <>
                <Webcam
                    // audio={false}
                    // height={720}
                    // ref={webcamRef}
                    // // screenshotFormat="image/jpeg"
                    // width={1280}
                    // videoConstraints={{ width: 1280,
                    //     height: 720,
                    //     // facingMode: { exact: "environment" },
                    //     facingMode: "user"
                    // }}
                />
            </>
        )
    }


    const step_4 = ()=>{
        return(
            <>
                <Webcam
                    // audio={false}
                    // height={720}
                    // ref={webcamRef}
                    // // screenshotFormat="image/jpeg"
                    // width={1280}
                    // videoConstraints={{ width: 1280,
                    //     height: 720,
                    //     // facingMode: { exact: "environment" },
                    //     facingMode: "user"
                    // }}
                />
            </>
        )
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>eKYC</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.card}>
                <img className={styles.logo} src={'https://care.tima.vn/images/logo-tima.png'}/>
                <div className={styles.containStep}>
                    <Steps
                        size="small" current={currentStep} status="error">
                        <Step title={''} description=""/>
                        <Step title={''} description=""/>
                        <Step title={''} description=""/>
                        <Step title={''} description=""/>
                    </Steps>
                </div>

                {
                    currentStep ===0?
                        step_1():
                        currentStep ===1?  step_2():
                        currentStep ===2?  step_3(): step_4()
                }
            </div>
        </div>
    )
}

export default Home
