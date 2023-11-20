import ChatBubble from "../ChatBubble/ChatBubble"

interface Props {
    conversation: any[];
    pathId:string
}
export default function Chats({ conversation,pathId }: Props) {
    const chatBubbles = conversation.map(el => {
        return <ChatBubble chatId={pathId} conversationId={el.id} isAiReply={el.isAiReply} message={el.message} isFeedbackNegative={el.isFeedbackNegative} key={el.id} />
    })
    return (
        <div>
            {chatBubbles}
        </div>
    )
}
