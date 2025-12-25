import { FaCheck, FaDownload, FaRedo } from 'react-icons/fa';

interface ResultScreenProps {
    title?: string;
    message?: string;
    onDownload?: () => void;
    onReset: () => void;
}

export const ResultScreen = ({
    title = 'Success!',
    message = 'Your task has been completed and your file is ready.',
    onDownload,
    onReset
}: ResultScreenProps) => {
    return (
        <div className="result-container animate-scale-in">
            <div className="result-icon">
                <FaCheck />
            </div>
            <h2>{title}</h2>
            <p>{message}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                {onDownload && (
                    <button className="download-btn" onClick={onDownload}>
                        <FaDownload /> Download File
                    </button>
                )}
                <button className="add-more-btn" style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={onReset}>
                    <FaRedo /> Start Over
                </button>
            </div>
        </div>
    );
};
