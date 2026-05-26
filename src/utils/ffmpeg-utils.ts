import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export const loadFFmpeg = async (onProgress?: (progress: number) => void): Promise<FFmpeg> => {
    if (ffmpeg) {
        return ffmpeg;
    }
    
    ffmpeg = new FFmpeg();
    
    if (onProgress) {
        ffmpeg.on('progress', ({ progress }) => {
            onProgress(Math.round(progress * 100));
        });
    }

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    return ffmpeg;
};

export const extractAudio = async (
    videoFile: File,
    onProgress: (progress: number) => void
): Promise<string> => {
    const ffmpeg = await loadFFmpeg(onProgress);
    const inputName = 'input-video.mp4';
    const outputName = 'output-audio.mp3';

    await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

    // Extract audio
    await ffmpeg.exec(['-i', inputName, '-vn', '-ar', '44100', '-ac', '2', '-b:a', '192k', outputName]);

    const data = await ffmpeg.readFile(outputName);
    const blob = new Blob([data as any], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);

    return url;
};

export const compressVideo = async (
    videoFile: File,
    onProgress: (progress: number) => void
): Promise<string> => {
    const ffmpeg = await loadFFmpeg(onProgress);
    const inputName = 'input-video.mp4';
    const outputName = 'compressed-video.mp4';

    await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

    // Compress video (CRF 28 is a good balance between size and quality)
    await ffmpeg.exec(['-i', inputName, '-vcodec', 'libx264', '-crf', '28', outputName]);

    const data = await ffmpeg.readFile(outputName);
    const blob = new Blob([data as any], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);

    return url;
};

export const convertToGif = async (
    videoFile: File,
    onProgress: (progress: number) => void
): Promise<string> => {
    const ffmpeg = await loadFFmpeg(onProgress);
    const inputName = 'input-video.mp4';
    const outputName = 'output.gif';

    await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

    // Convert to GIF (scale to 480px width, max 10fps for reasonable size)
    await ffmpeg.exec(['-i', inputName, '-vf', 'fps=10,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse', '-loop', '0', outputName]);

    const data = await ffmpeg.readFile(outputName);
    const blob = new Blob([data as any], { type: 'image/gif' });
    const url = URL.createObjectURL(blob);

    return url;
};
