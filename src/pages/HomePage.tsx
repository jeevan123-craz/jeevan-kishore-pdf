import { useNavigate } from 'react-router-dom';
import {
    FaObjectGroup,
    FaCut,
    FaCompress,
    FaSyncAlt,
    FaListOl,
    FaStamp,
    FaImage,
    FaFileImage,
    FaSortAmountDown,
    FaLock,
    FaUnlock,
    FaWrench,
    FaMusic,
    FaCompressArrowsAlt,
    FaVideo
} from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ToolCard } from '../components/ToolCard';
import type { ToolId } from '../types';

const tools = [
    {
        id: 'merge' as ToolId,
        name: 'Merge PDF',
        description: 'Combine multiple PDFs into one file',
        Icon: FaObjectGroup,
        category: 'pdf'
    },
    {
        id: 'split' as ToolId,
        name: 'Split PDF',
        description: 'Extract pages from your PDF',
        Icon: FaCut,
        category: 'pdf'
    },
    {
        id: 'compress' as ToolId,
        name: 'Compress PDF',
        description: 'Reduce PDF file size',
        Icon: FaCompress,
        category: 'pdf'
    },
    {
        id: 'rotate' as ToolId,
        name: 'Rotate PDF',
        description: 'Rotate PDF pages easily',
        Icon: FaSyncAlt,
        category: 'pdf'
    },
    {
        id: 'add-page-numbers' as ToolId,
        name: 'Add Page Numbers',
        description: 'Number your PDF pages',
        Icon: FaListOl,
        category: 'pdf'
    },
    {
        id: 'add-watermark' as ToolId,
        name: 'Add Watermark',
        description: 'Stamp text or image on PDF',
        Icon: FaStamp,
        category: 'pdf'
    },
    {
        id: 'jpg-to-pdf' as ToolId,
        name: 'JPG to PDF',
        description: 'Convert images to PDF',
        Icon: FaImage,
        category: 'pdf'
    },
    {
        id: 'pdf-to-jpg' as ToolId,
        name: 'PDF to JPG',
        description: 'Convert PDF pages to images',
        Icon: FaFileImage,
        category: 'pdf'
    },
    {
        id: 'organize' as ToolId,
        name: 'Organize PDF',
        description: 'Reorder and delete pages',
        Icon: FaSortAmountDown,
        category: 'pdf'
    },
    {
        id: 'protect' as ToolId,
        name: 'Protect PDF',
        description: 'Add password protection',
        Icon: FaLock,
        category: 'pdf'
    },
    {
        id: 'unlock' as ToolId,
        name: 'Unlock PDF',
        description: 'Remove PDF password',
        Icon: FaUnlock,
        category: 'pdf'
    },
    {
        id: 'repair' as ToolId,
        name: 'Repair PDF',
        description: 'Fix corrupted PDF files',
        Icon: FaWrench,
        category: 'pdf'
    },
    {
        id: 'video-to-audio' as ToolId,
        name: 'Extract Audio',
        description: 'Convert Video to MP3',
        Icon: FaMusic,
        category: 'video'
    },
    {
        id: 'compress-video' as ToolId,
        name: 'Compress Video',
        description: 'Reduce video file size',
        Icon: FaCompressArrowsAlt,
        category: 'video'
    },
    {
        id: 'video-to-gif' as ToolId,
        name: 'Video to GIF',
        description: 'Convert Video to GIF',
        Icon: FaVideo,
        category: 'video'
    }
];

const features = [
    {
        title: 'Fast Processing',
        description: 'All processing happens right in your browser. No file uploads to external servers, ensuring lightning-fast results.',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        title: 'Privacy First',
        description: 'Your files never leave your device. All operations are performed locally, keeping your sensitive documents and media completely private.',
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    {
        title: 'Free Forever',
        description: 'All our tools are free to use with no hidden fees, no registration required, and no watermarks on your output files.',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
];

export const HomePage = () => {
    const navigate = useNavigate();

    const handleSelectTool = (toolId: ToolId) => {
        navigate(`/${toolId}`);
        window.scrollTo(0, 0);
    };

    const pdfTools = tools.filter(t => t.category === 'pdf');
    const videoTools = tools.filter(t => t.category === 'video');

    return (
        <div>
            <Header />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Every Media & PDF tool you need, free online</h1>
                    <p>
                        Merge, split, compress, convert, rotate, and extract media with just a few clicks.
                        All tools are free, secure, and work directly in your browser.
                    </p>
                </div>
            </section>

            {/* PDF Tools Section */}
            <section className="tools-section" id="tools">
                <div className="section-header">
                    <h2 className="section-title">PDF Tools</h2>
                    <p className="section-subtitle">Select a tool to get started</p>
                </div>

                <div className="tools-grid stagger-children">
                    {pdfTools.map((tool) => (
                        <ToolCard
                            key={tool.id}
                            id={tool.id}
                            name={tool.name}
                            description={tool.description}
                            Icon={tool.Icon}
                            onClick={() => handleSelectTool(tool.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Video & Audio Tools Section */}
            <section className="tools-section" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                <div className="section-header">
                    <h2 className="section-title">Video & Audio Tools</h2>
                    <p className="section-subtitle">Powerful multimedia operations directly in your browser</p>
                </div>

                <div className="tools-grid stagger-children">
                    {videoTools.map((tool) => (
                        <ToolCard
                            key={tool.id}
                            id={tool.id}
                            name={tool.name}
                            description={tool.description}
                            Icon={tool.Icon}
                            onClick={() => handleSelectTool(tool.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section" id="features">
                <div className="features-container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose Us?</h2>
                        <p className="section-subtitle">The most powerful universal tools, made simple</p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div
                                    className="feature-icon"
                                    style={{ background: feature.gradient, color: 'white' }}
                                >
                                    {index === 0 && '⚡'}
                                    {index === 1 && '🔒'}
                                    {index === 2 && '💎'}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
