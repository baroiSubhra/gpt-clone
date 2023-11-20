interface Props {
    title: string;
    rating: number;
    description: string;
}

export default function FeedbackCard({ title, rating, description }: Props) {
    const hasFeedback = rating >= 0 && description.length > 0
    return (<div className="feedbackCard">
        <div className="feedbackCardTitle">{title}</div>

        <div className="feedbackCardRating">
            Rating - {rating}/5
        </div>

        <div className="feedbackCardDetails">
            {description}
        </div>
    </div>);
}
