import SideBar from "@/views/SideBar/Sidebar"
import ChatArea from "@/views/ChatArea/ChatArea"
import FeedbackArea from "../FeedbackArea/FeedbackArea"

import { useRecoilState } from 'recoil';
import { isChatView } from "@/states/States"

export default function Main() {
    const [isChatViewActive, setisChatViewActive] = useRecoilState(isChatView);
    return (
        <main>
            <SideBar />
            {isChatViewActive ? <ChatArea /> : <FeedbackArea />}
        </main>
    )
}
