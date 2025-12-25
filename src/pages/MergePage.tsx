import { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { FileList } from '../components/FileList';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, mergePDFs, downloadFile } from '../utils/pdfUtils';

interface MergePageProps {
    onBack: () => void;
}

export const MergePage = ({ onBack }: MergePageProps) => {
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<Uint8Array | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesAdded = (newFiles: File[]) => {
        const pdfFiles = newFiles
            .filter(f => f.type === 'application/pdf')
            .map(fileToPDFFile);
        setFiles(prev => [...prev, ...pdfFiles]);
    };

    const handleRemove = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleAddMore = () => {
        fileInputRef.current?.click();
    };

    const handleProcess = async () => {
        if (files.length < 2) {
            alert('Please add at least 2 PDF files to merge');
            return;
        }

        setIsProcessing(true);
        try {
            const merged = await mergePDFs(files);
            setResult(merged);
        } catch (error) {
            console.error('Error merging PDFs:', error);
            alert('Error merging PDFs. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (result) {
            downloadFile(result, 'merged.pdf');
        }
    };

    const handleStartOver = () => {
        setFiles([]);
        setResult(null);
    };

    return (
        <div className="tool-page">
            <Header onLogoClick={onBack} />

            <div className="tool-header">
                <button className="tool-back-btn" onClick={onBack}>
                    <FaArrowLeft /> Back to all tools
                </button>
                <h1>Merge PDF</h1>
                <p>Combine multiple PDF files into one document</p>
            </div>

            {!result ? (
                <>
                    {files.length === 0 ? (
                        <div className="dropzone-container">
                            <Dropzone
                                onFilesAdded={handleFilesAdded}
                                title="Drop PDF files here"
                                subtitle="Select multiple PDF files to merge"
                            />
                        </div>
                    ) : (
                        <FileList
                            files={files}
                            onRemove={handleRemove}
                            onAddMore={handleAddMore}
                            processButtonText={`Merge ${files.length} PDFs`}
                            onProcess={handleProcess}
                            isProcessing={isProcessing}
                        />
                    )}
                </>
            ) : (
                <ResultScreen
                    title="PDFs Merged Successfully!"
                    message={`Your merged file (merged.pdf) is ready for download.`}
                    onDownload={handleDownload}
                    onReset={handleStartOver}
                />
            )}

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf"
                multiple
                onChange={(e) => {
                    if (e.target.files) {
                        handleFilesAdded(Array.from(e.target.files));
                    }
                }}
            />

            {isProcessing && <ProcessingOverlay message="Merging your PDFs..." />}

            <Footer />
        </div>
    );
};
