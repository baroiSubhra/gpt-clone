"use client";
import Link from 'next/link'
import { useCallback, useEffect } from "react";
import { useRecoilState } from 'recoil';
import { chatHistory } from "@/states/States"
import { getChatHistory } from "@/apis/api"
export default function Chathistory() {
    const [history, setHistory] = useRecoilState(chatHistory);
    const fetchHistoryItems = async () => {
        const response = await getChatHistory();
        const status = response.success
        const data = response.response.data.data
        if (status && data.length > 0) {
            setHistory(data)
        }
    }
    useEffect(() => {
        fetchHistoryItems();
    }, []);
    const historyElements = history.map(el => {
        const title = el.conversations[0].message
        return <Link href={`/chat/${el.id}`} key={el.id}><div className="historyElements">{title}</div></Link>
    })
    return (
        <div className="historyContainer">
            <div className="quickAccess">
                Quick Access
            </div>
            <div>
                {historyElements}
            </div>
        </div>
    );
}
