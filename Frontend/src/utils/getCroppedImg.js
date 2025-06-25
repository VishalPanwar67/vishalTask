export const getCroppedImg = (imageSrc, cropArea) => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Scale factor to correctly calculate the crop position
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            // Set the canvas width and height to the cropped area
            canvas.width = cropArea.width;
            canvas.height = cropArea.height;

            // Draw the cropped area onto the canvas
            ctx.drawImage(
                image,
                cropArea.x * scaleX, // Adjust x-coordinate based on scale
                cropArea.y * scaleY, // Adjust y-coordinate based on scale
                cropArea.width * scaleX, // Scale width
                cropArea.height * scaleY, // Scale height
                0,
                0,
                cropArea.width, // Width of the cropped area
                cropArea.height // Height of the cropped area
            );

            // Convert canvas to a Blob and resolve the promise
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob); // Resolves the blob (cropped image)
                } else {
                    reject(new Error("Canvas toBlob failed"));
                }
            }, "image/jpeg");
        };

        // Handle image load errors
        image.onerror = (error) => reject(error);
    });
};
