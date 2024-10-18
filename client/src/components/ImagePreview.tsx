interface ImagePreviewProps {
    preview: string | undefined;
}

const ImagePreview = (preview: ImagePreviewProps) => {

    return (
        <div>
            <div className="align-center">
                <h2>Preview</h2>
            </div>
            <div className="image-container">
                <img src={preview.preview} alt="Preview" />
            </div>
        </div>
    )
}

export default ImagePreview;