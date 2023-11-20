import { get, post, patch } from "./httpClient"

export const getChatHistory = async (): Promise<any> => {
    const url = "/history"
    return await get(url)
}

export const getChatHistoryBasedOnId = async (id: string): Promise<any> => {
    const url = `/chatHistory/${id}`
    return await get(url)
}

export const postMessage = async (payload: any): Promise<any> => {
    const url = `/message`
    return await post(url, payload)
}


export const patchMessage = async (payload: any): Promise<any> => {
    const url = `/message`
    return await patch(url, payload)
}

export const sendFeedback = async (payload: any): Promise<any> => {
    const url = `/feedback`
    return await post(url, payload)
}