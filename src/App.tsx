import { useState } from 'react';
import './index.css';
import { HomePage } from './pages/HomePage';
import { MergePage } from './pages/MergePage';
import { SplitPage } from './pages/SplitPage';
import { CompressPage } from './pages/CompressPage';
import { RotatePage } from './pages/RotatePage';
import { PageNumbersPage } from './pages/PageNumbersPage';
import { JpgToPdfPage } from './pages/JpgToPdfPage';
import { WatermarkPage } from './pages/WatermarkPage';
import { ProtectPage } from './pages/ProtectPage';
import { UnlockPage } from './pages/UnlockPage';
import { OrganizePage } from './pages/OrganizePage';
import { RepairPage } from './pages/RepairPage';
import { PdfToJpgPage } from './pages/PdfToJpgPage';
import type { ToolId } from './types';

function App() {
  const [currentTool, setCurrentTool] = useState<ToolId | null>(null);

  const handleSelectTool = (toolId: ToolId) => {
    setCurrentTool(toolId);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentTool(null);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (!currentTool) {
      return <HomePage onSelectTool={handleSelectTool} />;
    }

    switch (currentTool) {
      case 'merge':
        return <MergePage onBack={handleBack} />;
      case 'split':
        return <SplitPage onBack={handleBack} />;
      case 'compress':
        return <CompressPage onBack={handleBack} />;
      case 'rotate':
        return <RotatePage onBack={handleBack} />;
      case 'add-page-numbers':
        return <PageNumbersPage onBack={handleBack} />;
      case 'jpg-to-pdf':
        return <JpgToPdfPage onBack={handleBack} />;
      case 'add-watermark':
        return <WatermarkPage onBack={handleBack} />;
      case 'protect':
        return <ProtectPage onBack={handleBack} />;
      case 'unlock':
        return <UnlockPage onBack={handleBack} />;
      case 'organize':
        return <OrganizePage onBack={handleBack} />;
      case 'repair':
        return <RepairPage onBack={handleBack} />;
      case 'pdf-to-jpg':
        return <PdfToJpgPage onBack={handleBack} />;
      default:
        return <HomePage onSelectTool={handleSelectTool} />;
    }
  };

  return (
    <div className="app-root">
      {renderPage()}
    </div>
  );
}

export default App;
