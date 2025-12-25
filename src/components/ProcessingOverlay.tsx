interface ProcessingOverlayProps {
    message?: string;
    subMessage?: string;
}

export const ProcessingOverlay = ({
    message = 'Processing your files...',
    subMessage = 'Please wait while we work on your PDFs'
}: ProcessingOverlayProps) => {
    return (
        <div className="processing-overlay">
            <div className="processing-content">
                <div className="processing-spinner" />
                <h3>{message}</h3>
                <p>{subMessage}</p>
            </div>
        </div>
    );
};
