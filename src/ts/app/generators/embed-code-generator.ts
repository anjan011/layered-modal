export class EmbedCodeGenerator {

    static fromYouTubeVideo(url: string, width: number = 560, height: number = 315): string | null {
        const match = url.match(
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]{11})/
        );

        if (!match) {
            return null; // Invalid YouTube URL
        }

        const videoId = match[1];

        return `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" allowfullscreen></iframe>`;
    }


}