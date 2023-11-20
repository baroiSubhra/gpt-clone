import Input from "@/components/Input/Input"
import Chats from "@/components/Chats/Chats"
import Share from "@/components/Icons/Share"
import FeedBackSection from "@/components/FeedBackSection/FeedBackSection"
import ViewSelector from "@/components/ViewSelector/ViewSelector"
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil';
import { chat, chatDetails } from "@/states/States"
import { getChatHistoryBasedOnId, postMessage } from "@/apis/api"
export default function Main() {
    const [details, setDetails] = useRecoilState(chatDetails);
    const path = usePathname().split("/")
    const pathId = path[path.length - 1]
    const [conversation, setConversation] = useRecoilState(chat);
    const fetchHistoryItems = async () => {
        const response = await getChatHistoryBasedOnId(pathId);
        const status = response.success
        if (status) {
            const data = response.response.data.data
            if (data.conversations.length > 0)
                setConversation([...conversation, ...data.conversations])
            setDetails(data)
        }
    }
    const initializeView = async () => {
        if (pathId) {
            fetchHistoryItems()
        }
    }
    const router = useRouter()
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
    useEffect(() => {
        initializeView();
        return () => {
            setConversation([])
        }
    }, []);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
    }
    return (
        <section className="chatSection mainArea">
            <ViewSelector />
            <div className="chatArea">
                <div>
                    <div className="inputContainer">
                        <div className="inputBox">
                            <Input label="" inputMessage={inputMessage} handleInputChange={handleInputChange} submitMessage={submitMessage} placeholder="Please enter Review" showUploadIcon={true} />
                        </div>

                        <div className="shareButton" onClick={copyToClipboard}>
                            <Share />
                        </div>
                    </div>
                    <div>
                        <FeedBackSection rating={details.rating} subjectiveFeedback={details.subjectiveFeedback} />
                    </div>
                </div>

                <div className="ChatContainer">
                    <Chats conversation={conversation} pathId={pathId} />
                </div>
            </div>
        </section>
    )
}
