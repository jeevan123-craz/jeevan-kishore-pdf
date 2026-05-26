import { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { FileList } from '../components/FileList';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, compressPDF, downloadFile, formatFileSize } from '../utils/pdfUtils';



import { useNavigate } from 'react-router-dom';

export const CompressPage = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate('/');
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<{ data: Uint8Array; originalSize: number } | null>(null);
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
            const originalSize = files[0].size;
            const compressed = await compressPDF(files[0].file);
            setResult({ data: compressed, originalSize });
        } catch (error) {
            console.error('Error compressing PDF:', error);
            alert('Error compressing PDF. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (result) {
            const baseName = files[0].name.replace('.pdf', '');
            downloadFile(result.data, `${baseName}_compressed.pdf`);
        }
    };

    const handleStartOver = () => {
        setFiles([]);
        setResult(null);
    };

    const getSavingsPercentage = () => {
        if (!result) return 0;
        const savings = ((result.originalSize - result.data.length) / result.originalSize) * 100;
        return Math.max(0, savings).toFixed(1);
    };

    return (
        <div className="tool-page">
            <Header onLogoClick={handleBack} />

            <div className="tool-header">
                <button className="tool-back-btn" onClick={handleBack}>
                    <FaArrowLeft /> Back to all tools
                </button>
                <h1>Compress PDF</h1>
                <p>Reduce the size of your PDF files</p>
            </div>

            {!result ? (
                <>
                    {files.length === 0 ? (
                        <div className="dropzone-container">
                            <Dropzone
                                onFilesAdded={handleFilesAdded}
                                title="Drop your PDF here"
                                subtitle="Select a PDF file to compress"
                                multiple={false}
                            />
                        </div>
                    ) : (
                        <FileList
                            files={files}
                            onRemove={() => handleRemove()}
                            onAddMore={handleAddMore}
                            processButtonText="Compress PDF"
                            onProcess={handleProcess}
                            isProcessing={isProcessing}
                        />
                    )}
                </>
            ) : (
                <ResultScreen
                    title="PDF Compressed Successfully!"
                    message={`Your file is ${getSavingsPercentage()}% smaller. New size: ${formatFileSize(result.data.length)}`}
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

            {isProcessing && <ProcessingOverlay message="Compressing your PDF..." />}

            <Footer />
        </div>
    );
};
