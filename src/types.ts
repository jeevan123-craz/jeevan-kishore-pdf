export interface PDFFile {
    id: string;
    file: File;
    name: string;
    size: number;
    pages?: number;
}

export interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    category: 'organize' | 'optimize' | 'convert' | 'edit' | 'security';
}

export type ToolId =
    | 'merge'
    | 'split'
    | 'compress'
    | 'rotate'
    | 'add-page-numbers'
    | 'add-watermark'
    | 'pdf-to-jpg'
    | 'jpg-to-pdf'
    | 'organize'
    | 'unlock'
    | 'protect'
    | 'repair';

export interface ProcessingState {
    isProcessing: boolean;
    progress: number;
    message: string;
}
