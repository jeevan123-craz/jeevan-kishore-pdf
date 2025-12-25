import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import type { PDFFile } from '../types';

// Generate unique ID
export const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

// Format file size
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Merge PDFs
export const mergePDFs = async (files: PDFFile[]): Promise<Uint8Array> => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        const arrayBuffer = await file.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
    }

    return mergedPdf.save();
};

// Split PDF - extract each page as separate PDF
export const splitPDF = async (file: File): Promise<{ name: string; data: Uint8Array }[]> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pageCount = pdf.getPageCount();
    const results: { name: string; data: Uint8Array }[] = [];

    for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);
        const pdfBytes = await newPdf.save();
        const baseName = file.name.replace('.pdf', '');
        results.push({
            name: `${baseName}_page_${i + 1}.pdf`,
            data: pdfBytes
        });
    }

    return results;
};

// Rotate PDF pages
export const rotatePDF = async (file: File, degrees: number): Promise<Uint8Array> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();

    pages.forEach(page => {
        const currentRotation = page.getRotation().angle;
        page.setRotation({ type: 'degrees', angle: currentRotation + degrees } as any);
    });

    return pdf.save();
};

// Add page numbers to PDF
export const addPageNumbers = async (
    file: File,
    position: 'bottom-center' | 'bottom-right' | 'bottom-left' = 'bottom-center'
): Promise<Uint8Array> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const pages = pdf.getPages();
    const totalPages = pages.length;

    for (let i = 0; i < totalPages; i++) {
        const page = pages[i];
        const { width } = page.getSize();

        let x = width / 2;
        if (position === 'bottom-left') x = 50;
        if (position === 'bottom-right') x = width - 50;

        page.drawText(`${i + 1} / ${totalPages}`, {
            x,
            y: 30,
            size: 12
        });
    }

    return pdf.save();
};

// Compress PDF
export const compressPDF = async (file: File): Promise<Uint8Array> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);

    pdf.setTitle('');
    pdf.setAuthor('');
    pdf.setSubject('');
    pdf.setKeywords([]);
    pdf.setProducer('Jeevan Kishore');
    pdf.setCreator('Jeevan Kishore');

    return pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
    });
};

// Convert images to PDF
export const imagesToPDF = async (files: File[]): Promise<Uint8Array> => {
    const pdf = await PDFDocument.create();

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        let image;
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            image = await pdf.embedJpg(bytes);
        } else if (file.type === 'image/png') {
            image = await pdf.embedPng(bytes);
        } else {
            continue;
        }

        const page = pdf.addPage([image.width, image.height]);
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
        });
    }

    return pdf.save();
};

// Add Watermark to PDF
export const addWatermarkToPDF = async (file: File, text: string): Promise<Uint8Array> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const font = await pdf.embedFont(StandardFonts.HelveticaBold);
    const pages = pdf.getPages();

    pages.forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(text, {
            x: width / 2 - 150,
            y: height / 2,
            size: 50,
            font,
            color: rgb(0.5, 0.5, 0.5),
            opacity: 0.3,
            rotate: { type: 'degrees', angle: 45 } as any,
        });
    });

    return pdf.save();
};

// Protect PDF (Password)
export const protectPDF = async (file: File, password: string): Promise<Uint8Array> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);

    // Note: pdf-lib doesn't support native encryption yet. 
    // In a production app, we would use a more robust library like forge or a backend service.
    // For this clone, we'll implement a structural protection or add metadata.
    pdf.setSubject(`Protected with: ${password}`);

    return pdf.save();
};

// Unlock PDF (Remove Password - simulated for this clone)
export const unlockPDF = async (file: File): Promise<Uint8Array> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    pdf.setSubject('');
    return pdf.save();
};

// Organize PDF (Reorder pages)
export const organizePDF = async (file: File, newOrder: number[]): Promise<Uint8Array> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const organizedPdf = await PDFDocument.create();

    const pages = await organizedPdf.copyPages(pdf, newOrder);
    pages.forEach(page => organizedPdf.addPage(page));

    return organizedPdf.save();
};

// Create a ZIP file from multiple files
export const createZip = async (files: { name: string; data: Uint8Array }[]): Promise<Blob> => {
    const zip = new JSZip();

    files.forEach(file => {
        zip.file(file.name, file.data);
    });

    return zip.generateAsync({ type: 'blob' });
};

// Download file
export const downloadFile = (data: Uint8Array | Blob, filename: string): void => {
    if (data instanceof Blob) {
        saveAs(data, filename);
    } else {
        const blob = new Blob([data as any], { type: 'application/pdf' });
        saveAs(blob, filename);
    }
};

// Convert File to PDFFile
export const fileToPDFFile = (file: File): PDFFile => ({
    id: generateId(),
    file,
    name: file.name,
    size: file.size
});
