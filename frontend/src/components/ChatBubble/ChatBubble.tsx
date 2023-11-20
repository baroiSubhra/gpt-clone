import { useState, useEffect } from 'react';
import Thumsup from "@/components/Icons/Thumsup"
import Thumsdown from "@/components/Icons/Thumsdown"
import { patchMessage } from "@/apis/api"

interface Props {
    chatId: string;
    isAiReply: boolean;
    message: string;
    isFeedbackNegative?: boolean;
    conversationId: string
}


export default function ChatBubble({ chatId, conversationId, isAiReply, message, isFeedbackNegative }: Props) {
    const [feeback, setFeeback] = useState(isFeedbackNegative);
    const bubbleClasses = isAiReply ? "chatBubbleCard green" : "chatBubbleCard coral";
    const updateFeedback = async (feeback: any) => {
        const payload = {
            chatId,
            conversationId,
            feedBack: feeback
        }
        const response = await patchMessage(payload)
        const status = response.success
        if (status) {
            const data = response.data.data
            setFeeback(data)
        }
    }
    const submitPositiveFeedback = () => {
        updateFeedback(true)
    }
    const submitNegativeFeedback = () => {
        updateFeedback(false)
    }
    const feedbackSection = <>
        {feeback == null ? <div className="feedbackButtonsContainer">
            <div onClick={submitPositiveFeedback}>
                <Thumsup />
            </div>
            <div onClick={submitNegativeFeedback}>
                <Thumsdown />
            </div>

        </div> : feeback == true ? <div className='feebackButtons'><Thumsup /></div> : <div className='feebackButtons'><Thumsdown /></div>}
    </>

    return (
        <div className="chatBubbleContainer">
            <div className="chatBubble">
                <div className={bubbleClasses}></div>
                <div className="chatMessage"> {message}</div>
            </div>
            {isAiReply ? feedbackSection : <></>}
        </div>

    )
}
