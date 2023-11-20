import FeedbackCard from "@/components/FeedbackCard/FeedbackCard";
import Filter from "@/components/Filter/Filter"
import ViewSelector from "@/components/ViewSelector/ViewSelector"
import { useRecoilState } from 'recoil';
import { chatHistory } from "@/states/States"
export default function FeedbackArea() {
    const [history, setHistory] = useRecoilState(chatHistory);
    const feedbackCards = history.map(el => {
        const title = el.conversations[0].message
        const rating = el.rating
        const description = el.subjectiveFeedback
        return (<FeedbackCard title={title} rating={rating} description={description} key={el.id} />)
    })
    return (
        <div className="feedbackArea mainArea">
            <ViewSelector />
            <Filter />
            <div className="feedbackCardContainer">
                {feedbackCards}
            </div>
        </div>
    );
}
