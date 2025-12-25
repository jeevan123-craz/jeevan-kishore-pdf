import { FaFilePdf, FaTrash, FaGripVertical, FaPlus, FaImage } from 'react-icons/fa';
import type { PDFFile } from '../types';

interface FileListProps {
    files: PDFFile[];
    onRemove: (id: string) => void;
    onReorder?: (files: PDFFile[]) => void;
    onAddMore: () => void;
    processButtonText: string;
    onProcess: () => void;
    isProcessing?: boolean;
}

export const FileList = ({
    files,
    onRemove,
    onAddMore,
    processButtonText,
    onProcess,
    isProcessing = false
}: FileListProps) => {
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const isImageFile = (fileName: string): boolean => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
    };

    return (
        <div className="files-container">
            <div className="files-header">
                <h2>{files.length} file{files.length !== 1 ? 's' : ''} selected</h2>
                <button className="add-more-btn" onClick={onAddMore}>
                    <FaPlus />
                    Add more files
                </button>
            </div>

            <div className="files-list">
                {files.map((file) => (
                    <div key={file.id} className="file-item">
                        <div className="file-drag-handle">
                            <FaGripVertical />
                        </div>
                        <div className="file-icon">
                            {isImageFile(file.name) ? <FaImage /> : <FaFilePdf />}
                        </div>
                        <div className="file-info">
                            <div className="file-name">{file.name}</div>
                            <div className="file-size">{formatFileSize(file.size)}</div>
                        </div>
                        <div className="file-actions">
                            <button
                                className="file-action-btn"
                                onClick={() => onRemove(file.id)}
                                title="Remove file"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="process-btn"
                onClick={onProcess}
                disabled={files.length === 0 || isProcessing}
            >
                {isProcessing ? 'Processing...' : processButtonText}
            </button>
        </div>
    );
};
