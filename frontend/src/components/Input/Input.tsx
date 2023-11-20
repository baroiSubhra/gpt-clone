import Upload from "@/components/Icons/Upload"

interface Props {
    label: string;
    placeholder: string;
    showUploadIcon: boolean;
    inputMessage: string;
    handleInputChange(): any;
    submitMessage(): any
}

export default function Input({ label, placeholder, showUploadIcon, inputMessage, handleInputChange, submitMessage }: Props) {
    return (
        <div className="input-wraper">
            <form onSubmit={submitMessage}>
                <input
                    type="inputType"
                    className="input-modifer"
                    placeholder={placeholder}
                    value={inputMessage}
                    onChange={handleInputChange}
                />
                <div className="input-icon-holder">
                    {showUploadIcon ? <Upload /> : <></>}

                </div>
            </form>

        </div>
    );
}
