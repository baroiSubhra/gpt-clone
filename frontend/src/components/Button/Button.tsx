interface Props {
    label: string;
    onClick(): any
}

export default function Button({ label, onClick }: Props) {
    return <button className="btn" onClick={onClick}>{label}</button>;
}
