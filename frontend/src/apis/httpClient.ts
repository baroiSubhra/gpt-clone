import axios from 'axios';

const getBaseUrl = () => {
    return 'http://localhost:3002'
};

let config = {
    baseURL: getBaseUrl(),
};
const httpClient = axios.create(config);

const get = async (url: string, params?: object) => {
    let response = {};
    try {
        response = await httpClient.get(url, {
            params,
        });
        response = { response: response, success: true };
    } catch (error) {
        response = { success: false, error };
    }
    return response;
};

const post = async (url: string, payload: any) => {
    let response = {};
    try {
        response = await httpClient.post(url, payload);
        if (response == "") {
            response = {
                success: true,
            };
        } else {
            response.success = true;
        }
        response.success = true;
    } catch (error) {
        response = { success: false, error };
    }
    return response;
};

const patch = async (url: string, payload: any) => {
    let response = {};
    try {
        response = await httpClient.patch(url, payload);
        response.success = true;
    } catch (error) {
        response = { success: false, error };
    }
    return response;
};

export { get, post, patch };