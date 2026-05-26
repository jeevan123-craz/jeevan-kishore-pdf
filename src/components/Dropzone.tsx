import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';
import type { Accept } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

interface DropzoneProps {
    onFilesAdded: (files: File[]) => void;
    accept?: Accept;
    multiple?: boolean;
    maxFiles?: number;
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
}

export const Dropzone = ({
    onFilesAdded,
    accept,
    multiple = true,
    maxFiles = 50,
    title = 'Drop files here',
    subtitle = 'or click to select files',
    icon = <FaCloudUploadAlt />
}: DropzoneProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onFilesAdded(acceptedFiles);
    }, [onFilesAdded]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: accept || {
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
                {icon}
            </div>
            <h3>{isDragActive ? 'Drop files here...' : title}</h3>
            <p>{subtitle}</p>
            <button className="dropzone-btn" type="button">
                Select Files
            </button>
        </div>
    );
};
