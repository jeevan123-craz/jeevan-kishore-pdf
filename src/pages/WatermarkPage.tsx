import { useState } from 'react';
import { FaArrowLeft, FaStamp } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, addWatermarkToPDF, downloadFile } from '../utils/pdfUtils';



import { useNavigate } from 'react-router-dom';

export const WatermarkPage = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate('/');
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [watermarkText, setWatermarkText] = useState('Jeevan Kishore');
    const [status, setStatus] = useState<'upload' | 'processing' | 'done'>('upload');

    const handleFilesAdded = (newFiles: File[]) => {
        setFiles([fileToPDFFile(newFiles[0])]);
    };

    const handleProcess = async () => {
        if (files.length === 0) return;
        setStatus('processing');
        try {
            const resultData = await addWatermarkToPDF(files[0].file, watermarkText);
            downloadFile(resultData, `watermarked_${files[0].name}`);
            setStatus('done');
        } catch (error) {
            console.error(error);
            alert('Error adding watermark');
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
                <h1>Add Watermark</h1>
                <p>Add text overlay to your PDF document</p>
            </section>

            {status === 'upload' && (
                <div className="dropzone-container">
                    {files.length === 0 ? (
                        <Dropzone onFilesAdded={handleFilesAdded} />
                    ) : (
                        <div className="files-container">
                            <div className="watermark-settings">
                                <label>Watermark Text</label>
                                <input
                                    type="text"
                                    value={watermarkText}
                                    onChange={(e) => setWatermarkText(e.target.value)}
                                    className="watermark-input"
                                />
                            </div>
                            <button className="process-btn" onClick={handleProcess}>
                                <FaStamp /> Add Watermark to PDF
                            </button>
                        </div>
                    )}
                </div>
            )}

            {status === 'processing' && (
                <ProcessingOverlay message="Adding watermark..." />
            )}

            {status === 'done' && (
                <ResultScreen
                    title="Watermark Added!"
                    message="Your document has been watermarked successfully."
                    onReset={() => {
                        setFiles([]);
                        setStatus('upload');
                    }}
                />
            )}

            <Footer />
        </div>
    );
};
