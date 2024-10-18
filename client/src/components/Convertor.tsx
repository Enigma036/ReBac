import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import ImagePreview from './ImagePreview';
import ReactLoading from 'react-loading';
import ListButtons from './ListButtons';


const Convertor = () => {
  const [image, setImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const [previewWithBackground, setPreviewWithBackground] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const formData = new FormData();

    if (typeof image === "undefined") return;

    const asyncFunction = async () => {
      formData.append("file", image);
      const result = await fetch("/api/removebg", {
        method: "POST",
        body: formData
      }).then(r => r.json())
        .catch(() => {
          setError("Error while converting the image");
        });

      if (result && result["url"]) {
        const url = "/" + result["url"];
        const blob = await fetch(url, {
          method: "GET",
        })
          .then((response) => response.blob())

        if (blob) {
          const previewImage = URL.createObjectURL(blob);
          setPreview(previewImage);
        }

        const filename = result["url"].split("/").pop();
        const urlForDelete = "/api/delete/" + filename;
        await fetch(urlForDelete, {
          method: "GET",
        });
      }
      else if (result && result["message"]) {
        setError(result["message"]);
      }
      else {
        setError("Error while converting the image");
      }
    }

    asyncFunction();
  }, [image]);

  const handleOnChangeForFile = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    setImage(target.files[0]);
    const blob = URL.createObjectURL(target.files[0]);
    setPreviewWithBackground(blob);
  }

  return (
    <>
      {(previewWithBackground && !preview) &&
        <div>
          <ReactLoading type={"bubbles"} color={"#dc3545"} height={100} width={100} className='react-loading' />
          <ImagePreview preview={previewWithBackground} />
        </div>
      }
      {preview &&
        <div>
          <ImagePreview preview={preview} />
          <ListButtons preview={preview} />
        </div>
      }
      {(!preview && !previewWithBackground) &&
        <div className='mb-3'>
          <input className='form-control' accept="image/png, image/jpeg" type="file" onChange={handleOnChangeForFile}></input>
        </div>
      }
      {error &&
        <Alert variant="danger">
          <h4>Error</h4>
          {error}
        </Alert>
      }
    </>
  )
}

export default Convertor