import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

interface DropzoneProps {
    onFilesAdded: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    title?: string;
    subtitle?: string;
}

export const Dropzone = ({
    onFilesAdded,
    // accept removed as it's not used currently
    multiple = true,
    maxFiles = 50,
    title = 'Drop PDF files here',
    subtitle = 'or click to select files'
}: DropzoneProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onFilesAdded(acceptedFiles);
    }, [onFilesAdded]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp']
        },
        multiple,
        maxFiles
    });

    return (
        <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''}`}
        >
            <input {...getInputProps()} />
            <div className="dropzone-icon">
                <FaCloudUploadAlt />
            </div>
            <h3>{isDragActive ? 'Drop files here...' : title}</h3>
            <p>{subtitle}</p>
            <button className="dropzone-btn" type="button">
                Select Files
            </button>
        </div>
    );
};
