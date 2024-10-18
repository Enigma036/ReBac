import { Button } from 'react-bootstrap'

interface ImagePreviewProps {
    preview: string | undefined;
}

const ListButtons = (preview: ImagePreviewProps) => {
    const handleOnClickForImage = () => {
        if (preview.preview){
            const link = document.createElement("a");
            link.href = preview.preview;
            link.download = "image.png";
            link.click();
        }
    }

    const handleOnClickForRefresh = () => {
        window.location.reload();
    }

    return (
        <div className="list-buttons">
            <Button variant="primary" onClick={handleOnClickForImage}>Download</Button>
            <Button variant="danger" onClick={handleOnClickForRefresh}>Start Over</Button>
        </div>
    )
}

export default ListButtons