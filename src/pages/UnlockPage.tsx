import { useState } from 'react';
import { FaArrowLeft, FaUnlock } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, unlockPDF, downloadFile } from '../utils/pdfUtils';



import { useNavigate } from 'react-router-dom';

export const UnlockPage = () => {
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
            const resultData = await unlockPDF(files[0].file);
            downloadFile(resultData, `unlocked_${files[0].name}`);
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
                <h1>Unlock PDF</h1>
                <p>Remove password and security from your PDF</p>
            </section>

            {status === 'upload' && (
                <div className="dropzone-container">
                    {files.length === 0 ? (
                        <Dropzone onFilesAdded={handleFilesAdded} />
                    ) : (
                        <div className="files-container text-center">
                            <p className="mb-4">File: {files[0].name}</p>
                            <button className="process-btn" onClick={handleProcess}>
                                <FaUnlock /> Unlock PDF
                            </button>
                        </div>
                    )}
                </div>
            )}

            {status === 'processing' && <ProcessingOverlay message="Unlocking PDF..." />}
            {status === 'done' && (
                <ResultScreen
                    title="PDF Unlocked!"
                    onReset={() => { setFiles([]); setStatus('upload'); }}
                />
            )}
            <Footer />
        </div>
    );
};
