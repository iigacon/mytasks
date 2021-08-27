import axios from 'axios';
import {BaseURL, BaseURLLocal, EKYC_NATIONAL_CARD, OTP, VERIFY_OTP} from "./Config";
import Notiflix from "notiflix";

const PATH_TIMACARE = 'api/timacare'

export enum Status {
    ok,
    auth,
    error,
}

export class Api {

    private static instance: Api;
    private static token = '';
    private myAxios = axios.create({
        baseURL: BaseURLLocal,
        timeout: 1000,
        headers: {
            Accept: "application/json",
        }
    });
    private myAxiosForm = axios.create({
        baseURL: BaseURLLocal,
        timeout: 1000,
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: "application/json",
        }
    });

    changeAuth(token_change: string) {
        Api.token = token_change;
        this.myAxios = axios.create({
            baseURL: BaseURLLocal,
            timeout: 1000,
            headers: {
                Accept: "application/json",
                Authorization: 'Bearer ' + token_change
            },
        })

        this.myAxiosForm = axios.create({
            baseURL: BaseURLLocal,
            timeout: 10000,
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: "application/json",
                Authorization: 'Bearer ' + token_change
            },
        })
    }

    constructor() {

    }

    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api()
        }
        return Api.instance
    }

    myResponse = (response: any) => {
        switch (response.status) {
            case 200:
                if (response.data.meta.errorCode === 200) {
                    return {kind: Status.ok, data: response.data}
                } else {
                    Notiflix.Confirm.show('Thông báo', response.data.meta.errorMessage, 'Đồng ý');
                    return;
                }
            case 201:
                return {kind: Status.ok, data: response.data}
            case 401:
            case 402:
            case 403:
                return {kind: Status.auth, data: response.data}
            default:
                return {kind: Status.error, data: response.data}
        }
    }

    getOTP = async (params: any) => this.myResponse(await this.myAxios.get(PATH_TIMACARE, {params: {...{params: JSON.stringify(params)}, ...{path: OTP}}}))
    verifyOTP = async (params: any) => this.myResponse(await this.myAxios.post(PATH_TIMACARE, params, {params: {path: VERIFY_OTP}}))
    nationalCard = async (params: any, loanBriefId: number) => this.myResponse(await this.myAxiosForm.post(BaseURL+EKYC_NATIONAL_CARD, params, {
        params: {loanbriefId: loanBriefId},
        headers: {
            'Access-Control-Allow-Origin': true,
            Authorization: 'Bearer ' + Api.token,
            'Content-Type': 'multipart/form-data',
        }
    }))
}
