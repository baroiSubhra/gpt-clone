import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"

export default function Main() {
    return (
        <main>
            <aside className="sideMenu">
                <Button label="New Chat" />
            </aside>
            <section className="chatSection">
                <div className="aiName">
                    Soul-1.0
                </div>
                <div>
                    <Input label="New Chat" placeholder="Message gpt" />
                </div>
            </section>
        </main>
    )
}
