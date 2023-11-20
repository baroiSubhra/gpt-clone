
import { useRecoilState } from 'recoil';
import { isChatView } from "@/states/States"
export default function Main() {
    const [isChatViewActive, setisChatViewActive] = useRecoilState(isChatView);
    const toggleisChatViewActive = () => {
        setisChatViewActive((prevState) => {
            return !prevState
        })
    }
    const makeChatViewActive = () => {
        if (!isChatViewActive) {
            toggleisChatViewActive()
        }
    }
    const makeFeedbackViewActive = () => {
        if (isChatViewActive) {
            toggleisChatViewActive()
        }
    }
    const chatsButtonClasses = isChatViewActive ? 'topNav topNavActive' : 'topNav'
    const feedbackButtonClasses = !isChatViewActive ? 'topNav topNavActive' : 'topNav '
    return (
        <div className="viewSelector">
            <div className={chatsButtonClasses} onClick={makeChatViewActive}>Chats</div>
            <div className={feedbackButtonClasses} onClick={makeFeedbackViewActive}>Feedbacks</div>
        </div>
    )
}
