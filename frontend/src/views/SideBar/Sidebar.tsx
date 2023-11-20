import Button from "@/components/Button/Button"
import Chathistory from "@/components/ChatHistory/Chathistory"
import ThemeChanger from "@/components/ThemeChanger/ThemeChanger"
import { useRouter } from 'next/navigation'
export default function Main() {
    const router = useRouter()
    const openNewChat = () => {
        router.push("/")
    }
    return (
        <aside className="sideMenu">
            <div className="sideMenuContent">
                <Button label="New Chat" onClick={openNewChat} />
                <Chathistory />
            </div>
            <ThemeChanger />
        </aside>
    )
}
