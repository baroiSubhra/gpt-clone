import Modal from '@/components/Modal/Modal';
import { openModal } from "@/components/Modal/Modal"
interface Props {
    rating: number;
    subjectiveFeedback: string;
}

export default function FeedBackSection({ rating, subjectiveFeedback }: Props) {
    const hasFeedback = rating > 0
    const toggleFeedbackSubmissionArea = () => {
        openModal("modal")
    }
    const feedback = !hasFeedback ? <div>
        Click <a onClick={toggleFeedbackSubmissionArea}>here</a> to submit feedback
    </div> : <div>
        {rating > 0 ? <span>This conversation was rated {rating} stars </span> : <></>}
        {subjectiveFeedback && subjectiveFeedback.length > 0 ? <span>with subjective feedback - {subjectiveFeedback}</span> : <></>}

    </div>
    return (
        <div>
            <div className="feedbackSection">
                {feedback}
            </div>
            <Modal />
        </div>
    )
}
