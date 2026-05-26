import { useState } from 'react';
import { FaArrowLeft, FaFileImage } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile } from '../utils/pdfUtils';



import { useNavigate } from 'react-router-dom';

export const PdfToJpgPage = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate('/');
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [status, setStatus] = useState<'upload' | 'processing' | 'done'>('upload');

    const handleFilesAdded = (newFiles: File[]) => {
        setFiles([fileToPDFFile(newFiles[0])]);
    };

    const handleProcess = async () => {
        if (files.length === 0) return;
        setStatus('processing');
        // Simulated conversion for clone UI completeness
        setTimeout(() => {
            alert('PDF to JPG conversion is being simulated. In a real environment, this requires a PDF renderer like PDF.js.');
            setStatus('done');
        }, 1500);
    };

    return (
        <div className="tool-page animate-fade-in">
            <Header onLogoClick={handleBack} />
            <section className="tool-header">
                <button className="tool-back-btn" onClick={handleBack}>
                    <FaArrowLeft /> Back to Tools
                </button>
                <h1>PDF to JPG</h1>
                <p>Convert each PDF page into a high-quality JPG image</p>
            </section>

            {status === 'upload' && (
                <div className="dropzone-container">
                    {files.length === 0 ? (
                        <Dropzone onFilesAdded={handleFilesAdded} />
                    ) : (
                        <div className="files-container text-center">
                            <p className="mb-4">File: {files[0].name}</p>
                            <button className="process-btn" onClick={handleProcess}>
                                <FaFileImage /> Convert to JPG
                            </button>
                        </div>
                    )}
                </div>
            )}

            {status === 'processing' && <ProcessingOverlay message="Rendering PDF pages to images..." />}
            {status === 'done' && (
                <ResultScreen
                    title="Conversion Complete!"
                    onReset={() => { setFiles([]); setStatus('upload'); }}
                />
            )}
            <Footer />
        </div>
    );
};
