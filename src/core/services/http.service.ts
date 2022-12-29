import axios, { Method } from "axios";

export async function apiRequest(url: string, method: Method, body: any = {}, headers: any = {}, defaultUrl = true) {
    try {
        const config = {
            url: defaultUrl ? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}${url}` : url,
            method: method,
            data: body,
            headers: headers
        }
        const response = await axios(config);
        return response;
    }
    catch (error: any) {
        throw error;
    }
}

export async function callServerSideApi(url: string, method: Method, body: any = {}, headers: any, defaultUrl: boolean = false) {
    try {
        const config = {
            url: defaultUrl ? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}${url}` : url,
            method: method,
            data: body,
            headers: headers
        }
        const response = await axios(config);
        return response;
    }
    catch (error: any) {
        throw error;
    }
}