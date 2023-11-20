import Upload from "@/components/Icons/Upload"
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { chat } from "@/states/States"
import { postMessage } from "@/apis/api"
import { usePathname, useRouter } from 'next/navigation'

interface Props {
    label: string;
    placeholder: string;
    showUploadIcon: boolean
}

export default function Input({ label, placeholder, showUploadIcon }: Props) {
    const router = useRouter()
    const path = usePathname().split("/")
    const pathId = path[path.length - 1]
    const [conversation, setConversation] = useRecoilState(chat);
    const [inputMessage, setInputMessage] = useState('');
    const handleInputChange = (event: any) => {
        setInputMessage(event.target.value)
    }
    const submitMessage = async (event: any) => {
        event.preventDefault()
        const userConversation = {
            id: crypto.randomUUID(),
            isAiReply: false,
            message: inputMessage,
        }
        const payload = {
            chatId: pathId,
            ...userConversation
        }
        setInputMessage('')
        setConversation(prev => [...prev, userConversation])
        await sendMessage(payload);
    }

    const sendMessage = async (payload: any) => {
        const response = await postMessage(payload)
        const status = response.success
        if (status) {
            const data = response.data.data
            if (data) {
                setConversation(prev => [...prev, data])
            }
            if (pathId.length == 0) {
                const chatId = response.data.chatId
                router.push(`chat/${chatId}`)
            }
        }
    }


    return (

        <div className="input-wraper">
            <form onSubmit={submitMessage}>
                <input
                    type="inputType"
                    className="input-modifer"
                    placeholder={placeholder}
                    value={inputMessage}
                    onChange={handleInputChange}
                />
                <div className="input-icon-holder">
                    {showUploadIcon ? <Upload /> : <></>}

                </div>
            </form>

        </div>
    );
}
