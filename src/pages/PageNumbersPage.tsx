import { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { FileList } from '../components/FileList';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, addPageNumbers, downloadFile } from '../utils/pdfUtils';

interface PageNumbersPageProps {
    onBack: () => void;
}

export const PageNumbersPage = ({ onBack }: PageNumbersPageProps) => {
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left'>('bottom-center');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<Uint8Array | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesAdded = (newFiles: File[]) => {
        const pdfFiles = newFiles
            .filter(f => f.type === 'application/pdf')
            .map(fileToPDFFile);
        if (pdfFiles.length > 0) {
            setFiles([pdfFiles[0]]);
        }
    };

    const handleRemove = () => {
        setFiles([]);
    };

    const handleAddMore = () => {
        fileInputRef.current?.click();
    };

    const handleProcess = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        try {
            const numbered = await addPageNumbers(files[0].file, position);
            setResult(numbered);
        } catch (error) {
            console.error('Error adding page numbers:', error);
            alert('Error adding page numbers. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (result) {
            const baseName = files[0].name.replace('.pdf', '');
            downloadFile(result, `${baseName}_numbered.pdf`);
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
                <h1>Add Page Numbers</h1>
                <p>Add page numbers to your PDF document</p>
            </div>

            {!result ? (
                <>
                    {files.length === 0 ? (
                        <div className="dropzone-container">
                            <Dropzone
                                onFilesAdded={handleFilesAdded}
                                title="Drop your PDF here"
                                subtitle="Select a PDF file to add page numbers"
                                multiple={false}
                            />
                        </div>
                    ) : (
                        <div className="files-container">
                            <div style={{ marginBottom: '32px' }}>
                                <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Position</h3>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '16px',
                                    flexWrap: 'wrap'
                                }}>
                                    <button
                                        className={`btn ${position === 'bottom-left' ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => setPosition('bottom-left')}
                                    >
                                        Bottom Left
                                    </button>
                                    <button
                                        className={`btn ${position === 'bottom-center' ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => setPosition('bottom-center')}
                                    >
                                        Bottom Center
                                    </button>
                                    <button
                                        className={`btn ${position === 'bottom-right' ? 'btn-primary' : 'btn-outline'}`}
                                        onClick={() => setPosition('bottom-right')}
                                    >
                                        Bottom Right
                                    </button>
                                </div>
                            </div>
                            <FileList
                                files={files}
                                onRemove={() => handleRemove()}
                                onAddMore={handleAddMore}
                                processButtonText="Add Page Numbers"
                                onProcess={handleProcess}
                                isProcessing={isProcessing}
                            />
                        </div>
                    )}
                </>
            ) : (
                <ResultScreen
                    title="Page Numbers Added!"
                    message={`Your file (numbered.pdf) is ready for download.`}
                    onDownload={handleDownload}
                    onReset={handleStartOver}
                />
            )}

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf"
                onChange={(e) => {
                    if (e.target.files) {
                        handleFilesAdded(Array.from(e.target.files));
                    }
                }}
            />

            {isProcessing && <ProcessingOverlay message="Adding page numbers..." />}

            <Footer />
        </div>
    );
};
