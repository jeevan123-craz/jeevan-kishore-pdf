import { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { FileList } from '../components/FileList';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, imagesToPDF, downloadFile } from '../utils/pdfUtils';



import { useNavigate } from 'react-router-dom';

export const JpgToPdfPage = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate('/');
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<Uint8Array | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesAdded = (newFiles: File[]) => {
        const imageFiles = newFiles
            .filter(f => f.type.startsWith('image/'))
            .map(fileToPDFFile);
        setFiles(prev => [...prev, ...imageFiles]);
    };

    const handleRemove = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleAddMore = () => {
        fileInputRef.current?.click();
    };

    const handleProcess = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        try {
            const pdf = await imagesToPDF(files.map(f => f.file));
            setResult(pdf);
        } catch (error) {
            console.error('Error converting images:', error);
            alert('Error converting images. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (result) {
            downloadFile(result, 'images_converted.pdf');
        }
    };

    const handleStartOver = () => {
        setFiles([]);
        setResult(null);
    };

    return (
        <div className="tool-page">
            <Header onLogoClick={handleBack} />

            <div className="tool-header">
                <button className="tool-back-btn" onClick={handleBack}>
                    <FaArrowLeft /> Back to all tools
                </button>
                <h1>JPG to PDF</h1>
                <p>Convert your images to a PDF document</p>
            </div>

            {!result ? (
                <>
                    {files.length === 0 ? (
                        <div className="dropzone-container">
                            <Dropzone
                                onFilesAdded={handleFilesAdded}
                                title="Drop images here"
                                subtitle="Select JPG, PNG or other image files"
                            />
                        </div>
                    ) : (
                        <FileList
                            files={files}
                            onRemove={handleRemove}
                            onAddMore={handleAddMore}
                            processButtonText={`Convert ${files.length} image${files.length > 1 ? 's' : ''} to PDF`}
                            onProcess={handleProcess}
                            isProcessing={isProcessing}
                        />
                    )}
                </>
            ) : (
                <ResultScreen
                    title="Images Converted!"
                    message="Your images have been converted to a PDF document."
                    onDownload={handleDownload}
                    onReset={handleStartOver}
                />
            )}

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                multiple
                onChange={(e) => {
                    if (e.target.files) {
                        handleFilesAdded(Array.from(e.target.files));
                    }
                }}
            />

            {isProcessing && <ProcessingOverlay message="Converting images to PDF..." />}

            <Footer />
        </div>
    );
};
