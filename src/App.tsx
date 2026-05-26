import { Routes, Route } from 'react-router-dom';
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
import { ExtractAudioPage } from './pages/ExtractAudioPage';
import { CompressVideoPage } from './pages/CompressVideoPage';
import { VideoToGifPage } from './pages/VideoToGifPage';

function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/merge" element={<MergePage />} />
        <Route path="/split" element={<SplitPage />} />
        <Route path="/compress" element={<CompressPage />} />
        <Route path="/rotate" element={<RotatePage />} />
        <Route path="/add-page-numbers" element={<PageNumbersPage />} />
        <Route path="/jpg-to-pdf" element={<JpgToPdfPage />} />
        <Route path="/add-watermark" element={<WatermarkPage />} />
        <Route path="/protect" element={<ProtectPage />} />
        <Route path="/unlock" element={<UnlockPage />} />
        <Route path="/organize" element={<OrganizePage />} />
        <Route path="/repair" element={<RepairPage />} />
        <Route path="/pdf-to-jpg" element={<PdfToJpgPage />} />
        <Route path="/video-to-audio" element={<ExtractAudioPage />} />
        <Route path="/compress-video" element={<CompressVideoPage />} />
        <Route path="/video-to-gif" element={<VideoToGifPage />} />
      </Routes>
    </div>
  );
}

export default App;
