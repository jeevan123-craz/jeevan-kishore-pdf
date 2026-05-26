import { useState, useRef } from 'react';
import { FaArrowLeft, FaUndo, FaRedo } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { FileList } from '../components/FileList';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, rotatePDF, downloadFile } from '../utils/pdfUtils';



import { useNavigate } from 'react-router-dom';

export const RotatePage = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate('/');
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [rotation, setRotation] = useState(90);
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
            const rotated = await rotatePDF(files[0].file, rotation);
            setResult(rotated);
        } catch (error) {
            console.error('Error rotating PDF:', error);
            alert('Error rotating PDF. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (result) {
            const baseName = files[0].name.replace('.pdf', '');
            downloadFile(result, `${baseName}_rotated.pdf`);
        }
    };

    const handleStartOver = () => {
        setFiles([]);
        setResult(null);
        setRotation(90);
    };

    return (
        <div className="tool-page">
            <Header onLogoClick={handleBack} />

            <div className="tool-header">
                <button className="tool-back-btn" onClick={handleBack}>
                    <FaArrowLeft /> Back to all tools
                </button>
                <h1>Rotate PDF</h1>
                <p>Rotate all pages in your PDF document</p>
            </div>

            {!result ? (
                <>
                    {files.length === 0 ? (
                        <div className="dropzone-container">
                            <Dropzone
                                onFilesAdded={handleFilesAdded}
                                title="Drop your PDF here"
                                subtitle="Select a PDF file to rotate"
                                multiple={false}
                            />
                        </div>
                    ) : (
                        <div className="files-container">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '16px',
                                marginBottom: '32px',
                                flexWrap: 'wrap'
                            }}>
                                <button
                                    className={`btn ${rotation === -90 ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setRotation(-90)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <FaUndo /> Rotate Left (90°)
                                </button>
                                <button
                                    className={`btn ${rotation === 90 ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setRotation(90)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <FaRedo /> Rotate Right (90°)
                                </button>
                                <button
                                    className={`btn ${rotation === 180 ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setRotation(180)}
                                >
                                    Rotate 180°
                                </button>
                            </div>
                            <FileList
                                files={files}
                                onRemove={() => handleRemove()}
                                onAddMore={handleAddMore}
                                processButtonText={`Rotate PDF ${rotation}°`}
                                onProcess={handleProcess}
                                isProcessing={isProcessing}
                            />
                        </div>
                    )}
                </>
            ) : (
                <ResultScreen
                    title="PDF Rotated Successfully!"
                    message={`Your file (rotated.pdf) is ready for download.`}
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

            {isProcessing && <ProcessingOverlay message="Rotating your PDF..." />}

            <Footer />
        </div>
    );
};
