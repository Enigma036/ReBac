import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';


const Convertor = () => {
  const [image, setImage] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    const formData = new FormData();

    if (typeof image === "undefined") return;

    const asyncFunction = async () => {
      formData.append("file", image);
      const result = await fetch("http://127.0.0.1:5100/api/removebg", {
        method: "POST",
        body: formData
      }).then(r => r.json())
      .catch(() => {
        console.log("error");
      });

      if (result["url"]){
        const url = "http://127.0.0.1:5100/" + result["url"];
        const blob = await fetch(url, {
          method: "GET",
        })
        .then((response) => response.blob())

        if (blob){
          const previewImage = URL.createObjectURL(blob);
          setPreview(previewImage);
        }
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

  return (
    <>
        {preview ?
          <img src={preview}></img>
          :
          <input accept="image/png, image/jpeg" type="file" onChange={handleOnChangeForFile}></input>
        }
        <Alert>
          Ahoj  
        </Alert>
    </>
  )
}

export default Convertor