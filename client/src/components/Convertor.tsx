import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';


const Convertor = () => {
  const [image, setImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
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

      if (result && result["url"]){
        const url = "/" + result["url"];
        const blob = await fetch(url, {
          method: "GET",
        })
        .then((response) => response.blob())

        if (blob){
          const previewImage = URL.createObjectURL(blob);
          setPreview(previewImage);
        }


        const filename = result["url"].split("/").pop();
        const urlForDelete = "/api/delete/" + filename;
        await fetch(urlForDelete, {
          method: "GET",
        });
      }
      else if (result && result["message"]){
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
  }

  const handleOnClickForImage = () => {
    if (preview){
      const link = document.createElement("a");
      link.href = preview;
      link.download = "image.png";
      link.click();
    }
  }

  return (
    <>
        {preview ?
          <img src={preview} onClick={handleOnClickForImage}></img>
          :
          <input accept="image/png, image/jpeg" type="file" onChange={handleOnChangeForFile}></input>
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