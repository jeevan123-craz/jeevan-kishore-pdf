import { useState } from 'react';
import { FaArrowLeft, FaWrench } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, compressPDF, downloadFile } from '../utils/pdfUtils';

interface RepairPageProps {
    onBack: () => void;
}

export const RepairPage = ({ onBack }: RepairPageProps) => {
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [status, setStatus] = useState<'upload' | 'processing' | 'done'>('upload');

    const handleFilesAdded = (newFiles: File[]) => {
        setFiles([fileToPDFFile(newFiles[0])]);
    };

    const handleProcess = async () => {
        if (files.length === 0) return;
        setStatus('processing');
        try {
            // Simulated repair using structural re-saving (same as basic compression)
            const resultData = await compressPDF(files[0].file);
            downloadFile(resultData, `repaired_${files[0].name}`);
            setStatus('done');
        } catch (error) {
            console.error(error);
            setStatus('upload');
        }
    };

    return (
        <div className="tool-page animate-fade-in">
            <Header onLogoClick={onBack} />
            <section className="tool-header">
                <button className="tool-back-btn" onClick={onBack}>
                    <FaArrowLeft /> Back to Tools
                </button>
                <h1>Repair PDF</h1>
                <p>Fix corrupted or structurally broken PDF files</p>
            </section>

            {status === 'upload' && (
                <div className="dropzone-container">
                    {files.length === 0 ? (
                        <Dropzone onFilesAdded={handleFilesAdded} />
                    ) : (
                        <div className="files-container text-center">
                            <p className="mb-4">File: {files[0].name}</p>
                            <button className="process-btn" onClick={handleProcess}>
                                <FaWrench /> Repair PDF
                            </button>
                        </div>
                    )}
                </div>
            )}

            {status === 'processing' && <ProcessingOverlay message="Repairing file structure..." />}
            {status === 'done' && (
                <ResultScreen
                    title="PDF Repaired!"
                    onReset={() => { setFiles([]); setStatus('upload'); }}
                />
            )}
            <Footer />
        </div>
    );
};
