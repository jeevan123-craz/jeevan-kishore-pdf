import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Dropzone } from '../components/Dropzone';
import { FileList } from '../components/FileList';
import { ProcessingOverlay } from '../components/ProcessingOverlay';
import { ResultScreen } from '../components/ResultScreen';
import { FaVideo } from 'react-icons/fa';
import { convertToGif } from '../utils/ffmpeg-utils';
import type { PDFFile, ProcessingState } from '../types';

export const VideoToGifPage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<PDFFile | null>(null);
    const [processing, setProcessing] = useState<ProcessingState>({
        isProcessing: false,
        progress: 0,
        message: ''
    });
    const [resultUrl, setResultUrl] = useState<string | null>(null);

    const handleBack = () => navigate('/');
    
    const handleFilesAdded = (files: File[]) => {
        if (files.length > 0) {
            setFile({ id: files[0].name, file: files[0], name: files[0].name, size: files[0].size });
        }
    };

    const handleRemoveFile = () => setFile(null);

    const handleConvert = async () => {
        if (!file) return;

        setProcessing({
            isProcessing: true,
            progress: 0,
            message: 'Initializing FFmpeg...'
        });

        try {
            const url = await convertToGif(file.file, (progress) => {
                setProcessing({
                    isProcessing: true,
                    progress: progress,
                    message: progress < 100 ? 'Converting to GIF...' : 'Finalizing...'
                });
            });

            setResultUrl(url);
        } catch (error) {
            console.error(error);
            alert('Failed to convert to GIF.');
        } finally {
            setProcessing({
                 isProcessing: false,
                 progress: 100,
                 message: 'Done'
            });
        }
    };

    const handleReset = () => {
        setFile(null);
        setResultUrl(null);
    };

    if (resultUrl) {
        return (
            <ResultScreen
                title="Converted to GIF!"
                message="Your GIF is ready."
                onDownload={() => {
                    const a = document.createElement('a');
                    a.href = resultUrl;
                    a.download = `animated-${file?.name.replace(/\.[^/.]+$/, '')}.gif`;
                    a.click();
                }}
                onReset={handleReset}
            />
        );
    }

    return (
        <div className="tool-page">
            <Header onLogoClick={handleBack} />
            <main className="tool-content">
                <div className="tool-header">
                    <h1>Video to GIF</h1>
                    <p>Convert your video into an animated GIF without uploading it to a server.</p>
                </div>
                {!file ? (
                    <Dropzone
                        onFilesAdded={handleFilesAdded}
                        accept={{ 'video/*': ['.mp4', '.avi', '.mov', '.webm', '.mkv'] }}
                        maxFiles={1}
                        icon={<FaVideo size={48} />}
                    />
                ) : (
                    <div className="workspace">
                        <FileList files={[file]} onRemove={handleRemoveFile} />
                        <div className="sidebar">
                            <div className="sidebar-header">
                                <h3>Conversion Options</h3>
                            </div>
                            <div className="sidebar-content">
                                <p className="help-text">Video will be converted to a high-quality GIF inside your browser.</p>
                            </div>
                            <div className="sidebar-footer">
                                <button className="btn btn-primary btn-large" onClick={handleConvert} disabled={processing.isProcessing}>
                                    Convert to GIF
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {processing.isProcessing && <ProcessingOverlay message={processing.message} subMessage="Please wait..." />}
            </main>
            <Footer />
        </div>
    );
};
