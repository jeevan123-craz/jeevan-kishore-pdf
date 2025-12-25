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
    FaWrench
} from 'react-icons/fa';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ToolCard } from '../components/ToolCard';
import type { ToolId } from '../types';

interface HomePageProps {
    onSelectTool: (toolId: ToolId) => void;
}

const tools = [
    {
        id: 'merge' as ToolId,
        name: 'Merge PDF',
        description: 'Combine multiple PDFs into one file',
        Icon: FaObjectGroup
    },
    {
        id: 'split' as ToolId,
        name: 'Split PDF',
        description: 'Extract pages from your PDF',
        Icon: FaCut
    },
    {
        id: 'compress' as ToolId,
        name: 'Compress PDF',
        description: 'Reduce PDF file size',
        Icon: FaCompress
    },
    {
        id: 'rotate' as ToolId,
        name: 'Rotate PDF',
        description: 'Rotate PDF pages easily',
        Icon: FaSyncAlt
    },
    {
        id: 'add-page-numbers' as ToolId,
        name: 'Add Page Numbers',
        description: 'Number your PDF pages',
        Icon: FaListOl
    },
    {
        id: 'add-watermark' as ToolId,
        name: 'Add Watermark',
        description: 'Stamp text or image on PDF',
        Icon: FaStamp
    },
    {
        id: 'jpg-to-pdf' as ToolId,
        name: 'JPG to PDF',
        description: 'Convert images to PDF',
        Icon: FaImage
    },
    {
        id: 'pdf-to-jpg' as ToolId,
        name: 'PDF to JPG',
        description: 'Convert PDF pages to images',
        Icon: FaFileImage
    },
    {
        id: 'organize' as ToolId,
        name: 'Organize PDF',
        description: 'Reorder and delete pages',
        Icon: FaSortAmountDown
    },
    {
        id: 'protect' as ToolId,
        name: 'Protect PDF',
        description: 'Add password protection',
        Icon: FaLock
    },
    {
        id: 'unlock' as ToolId,
        name: 'Unlock PDF',
        description: 'Remove PDF password',
        Icon: FaUnlock
    },
    {
        id: 'repair' as ToolId,
        name: 'Repair PDF',
        description: 'Fix corrupted PDF files',
        Icon: FaWrench
    }
];

const features = [
    {
        title: 'Fast Processing',
        description: 'All PDF processing happens right in your browser. No file uploads to external servers, ensuring lightning-fast results.',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        title: 'Privacy First',
        description: 'Your files never leave your device. All operations are performed locally, keeping your sensitive documents completely private.',
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    {
        title: 'Free Forever',
        description: 'All our PDF tools are free to use with no hidden fees, no registration required, and no watermarks on your output files.',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
];

export const HomePage = ({ onSelectTool }: HomePageProps) => {
    return (
        <div>
            <Header />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Every PDF tool you need, free online</h1>
                    <p>
                        Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
                        All tools are free, secure, and work directly in your browser.
                    </p>
                </div>
            </section>

            {/* Tools Section */}
            <section className="tools-section" id="tools">
                <div className="section-header">
                    <h2 className="section-title">All PDF Tools</h2>
                    <p className="section-subtitle">Select a tool to get started</p>
                </div>

                <div className="tools-grid stagger-children">
                    {tools.map((tool) => (
                        <ToolCard
                            key={tool.id}
                            id={tool.id}
                            name={tool.name}
                            description={tool.description}
                            Icon={tool.Icon}
                            onClick={() => onSelectTool(tool.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section" id="features">
                <div className="features-container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose PDFTools?</h2>
                        <p className="section-subtitle">The most powerful PDF tools, made simple</p>
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
