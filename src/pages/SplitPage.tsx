import { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { FileList } from '../components/FileList';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, splitPDF, createZip, downloadFile } from '../utils/pdfUtils';



import { useNavigate } from 'react-router-dom';

export const SplitPage = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate('/');
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<Blob | null>(null);
    const [pageCount, setPageCount] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesAdded = (newFiles: File[]) => {
        const pdfFiles = newFiles
            .filter(f => f.type === 'application/pdf')
            .map(fileToPDFFile);
        // Only keep the first file for split
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
            const splitPages = await splitPDF(files[0].file);
            setPageCount(splitPages.length);
            const zipBlob = await createZip(splitPages);
            setResult(zipBlob);
        } catch (error) {
            console.error('Error splitting PDF:', error);
            alert('Error splitting PDF. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (result) {
            downloadFile(result, 'split_pages.zip');
        }
    };

    const handleStartOver = () => {
        setFiles([]);
        setResult(null);
        setPageCount(0);
    };

    return (
        <div className="tool-page">
            <Header onLogoClick={handleBack} />

            <div className="tool-header">
                <button className="tool-back-btn" onClick={handleBack}>
                    <FaArrowLeft /> Back to all tools
                </button>
                <h1>Split PDF</h1>
                <p>Extract pages from your PDF into separate files</p>
            </div>

            {!result ? (
                <>
                    {files.length === 0 ? (
                        <div className="dropzone-container">
                            <Dropzone
                                onFilesAdded={handleFilesAdded}
                                title="Drop your PDF here"
                                subtitle="Select a PDF file to split into pages"
                                multiple={false}
                            />
                        </div>
                    ) : (
                        <FileList
                            files={files}
                            onRemove={() => handleRemove()}
                            onAddMore={handleAddMore}
                            processButtonText="Split PDF"
                            onProcess={handleProcess}
                            isProcessing={isProcessing}
                        />
                    )}
                </>
            ) : (
                <ResultScreen
                    title="PDF Split Successfully!"
                    message={`Extracted ${pageCount} pages into a ZIP archive.`}
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

            {isProcessing && <ProcessingOverlay message="Splitting your PDF..." />}

            <Footer />
        </div>
    );
};
