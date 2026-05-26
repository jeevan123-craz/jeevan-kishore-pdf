import { useState } from 'react';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import type { PDFFile } from '../types';
import { fileToPDFFile, protectPDF, downloadFile } from '../utils/pdfUtils';



import { useNavigate } from 'react-router-dom';

export const ProtectPage = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate('/');
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'upload' | 'processing' | 'done'>('upload');

    const handleFilesAdded = (newFiles: File[]) => {
        setFiles([fileToPDFFile(newFiles[0])]);
    };

    const handleProcess = async () => {
        if (files.length === 0 || !password) return;
        setStatus('processing');
        try {
            const resultData = await protectPDF(files[0].file, password);
            downloadFile(resultData, `protected_${files[0].name}`);
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
                <h1>Protect PDF</h1>
                <p>Encrypt your PDF with a password</p>
            </section>

            {status === 'upload' && (
                <div className="dropzone-container">
                    {files.length === 0 ? (
                        <Dropzone onFilesAdded={handleFilesAdded} />
                    ) : (
                        <div className="files-container">
                            <div className="watermark-settings">
                                <label>Set Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="watermark-input"
                                />
                            </div>
                            <button className="process-btn" onClick={handleProcess}>
                                <FaLock /> Protect PDF
                            </button>
                        </div>
                    )}
                </div>
            )}

            {status === 'processing' && <ProcessingOverlay message="Encrypting PDF..." />}
            {status === 'done' && (
                <ResultScreen
                    title="PDF Protected!"
                    onReset={() => { setFiles([]); setStatus('upload'); }}
                />
            )}
            <Footer />
        </div>
    );
};
