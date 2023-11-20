
import Input from "../Input/Input"
import FilledStar from "@/components/Icons/FilledStar"
import EmptyStar from "@/components/Icons/EmptyStar"
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { chat, chatDetails } from "@/states/States"
import { usePathname } from 'next/navigation'
import { sendFeedback } from "@/apis/api"

export const openModal = (id: string) => {
    const dialogElement = document.getElementById(id)
    dialogElement.showModal()
}

export const closeModal = (id: string) => {
    const dialogElement = document.getElementById(id)
    dialogElement.close()
}

export default function Modal({ props }: any) {
    const path = usePathname().split("/")
    const pathId = path[path.length - 1]
    const [details, setDetails] = useRecoilState(chatDetails);
    const [inputMessage, setInputMessage] = useState('');
    const handleInputChange = (event: any) => {
        setInputMessage(event.target.value)
    }
    const ratings = [1, 2, 3, 4, 5]
    const [rating, setRating] = useState(0);
    const ratingTriggered = (id: number) => {
        return () => {
            setRating(id)
        }
    }
    const closeLocalModal = () => {
        closeModal("modal")
    }

    const submitFeedback = (event: any) => {
        event.preventDefault()
        const payload = {
            chatId: pathId,
            rating,
            subjectiveFeedback: inputMessage
        }
        setInputMessage('')
        postRating(payload)
    }

    const postRating = async (payload: any) => {
        const response = await sendFeedback(payload)
        const status = response.success
        if (status) {
            const data = response.data.data
            if (data) {
                setDetails(data)
            }
        }
        closeLocalModal()
    }

    return (<dialog id="modal">
        <div className="close" onClick={closeLocalModal}>
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="icons">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </div>
        <h3 className="modalTitle">
            Please submit review
        </h3>
        <div className="reviewStars">
            {ratings.map(el => {
                return <div data-rating={el} key={el} onClick={ratingTriggered(el)}>
                    {el > rating ? <EmptyStar /> : <FilledStar />}

                </div>
            })}
        </div>
        <div className="reviewInput">
            <Input label="" inputMessage={inputMessage} handleInputChange={handleInputChange} submitMessage={submitFeedback} placeholder="Please enter Review" showUploadIcon={true} />
        </div>
    </dialog>)
}
