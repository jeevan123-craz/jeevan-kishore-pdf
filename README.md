# ILovePDF Clone & Multi-Tool 📄🎥

> **A comprehensive web-based suite for manipulating PDFs and Video files directly in your browser.**

This project is a powerful, client-side application inspired by ILovePDF. It provides an extensive collection of tools to merge, split, compress, and edit PDFs, as well as powerful video manipulation features—all without sending your sensitive files to a server. Processing is done securely right in your browser using WebAssembly.

## ✨ Features

### 📄 PDF Tools
- **Merge & Split:** Combine multiple PDFs into one or extract specific pages.
- **Compress & Repair:** Reduce PDF file size and attempt to repair corrupted files.
- **Organize & Rotate:** Reorder pages, delete pages, and rotate them as needed.
- **Convert:** Convert JPG to PDF or extract PDF pages to JPGs.
- **Secure:** Protect PDFs with passwords or unlock them.
- **Enhance:** Add watermarks and page numbers easily.

### 🎥 Video Tools
- **Video to Audio:** Extract high-quality audio tracks from video files.
- **Compress Video:** Reduce video file sizes efficiently.
- **Video to GIF:** Convert video clips into animated GIFs.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** CSS, React Icons
- **PDF Processing:** `pdf-lib`, `pdfjs-dist`
- **Video Processing:** `ffmpeg.wasm` (`@ffmpeg/ffmpeg`, `@ffmpeg/util`)
- **File Handling:** `react-dropzone`, `file-saver`, `jszip`
- **Backend/Analytics:** Firebase (for optional auth/stats)

## 🚀 Setup & Installation

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ilovepdf-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in your Firebase configuration if you wish to use Firebase features.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 🔒 Privacy First

By leveraging `pdf-lib` and `ffmpeg.wasm`, all heavy lifting is performed on the client side. Your files never leave your device, ensuring maximum privacy and security for your sensitive documents and media.

## 📜 License

This project is licensed under the MIT License.
