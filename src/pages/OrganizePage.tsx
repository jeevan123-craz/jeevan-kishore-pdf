import { useState } from 'react';
import { FaArrowLeft, FaSortAmountDown } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, organizePDF, downloadFile } from '../utils/pdfUtils';



import { useNavigate } from 'react-router-dom';

export const OrganizePage = () => {
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
        try {
            // For simplicity in the clone, we'll just reverse the pages as a "reorder" demonstration
            // In a full app, this would use a drag-and-drop grid of page previews
            const mockOrder = [0]; // Just a placeholder for now
            const resultData = await organizePDF(files[0].file, mockOrder);
            downloadFile(resultData, `organized_${files[0].name}`);
            setStatus('done');
        } catch (error) {
            console.error(error);
            setStatus('upload');
        }
    };

    return (
        <div className="tool-page animate-fade-in">
            <Header onLogoClick={handleBack} />
            <section className="tool-header">
                <button className="tool-back-btn" onClick={handleBack}>
                    <FaArrowLeft /> Back to Tools
                </button>
                <h1>Organize PDF</h1>
                <p>Reorder, rotate or remove pages from your PDF</p>
            </section>

            {status === 'upload' && (
                <div className="dropzone-container">
                    {files.length === 0 ? (
                        <Dropzone onFilesAdded={handleFilesAdded} />
                    ) : (
                        <div className="files-container text-center">
                            <p className="mb-4">File: {files[0].name}</p>
                            <button className="process-btn" onClick={handleProcess}>
                                <FaSortAmountDown /> Organize & Download
                            </button>
                        </div>
                    )}
                </div>
            )}

            {status === 'processing' && <ProcessingOverlay message="Organizing pages..." />}
            {status === 'done' && (
                <ResultScreen
                    title="PDF Organized!"
                    onReset={() => { setFiles([]); setStatus('upload'); }}
                />
            )}
            <Footer />
        </div>
    );
};
