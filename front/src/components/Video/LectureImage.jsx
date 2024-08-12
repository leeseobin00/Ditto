import { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";

const Image = styled.img`
    width: 120px;
    height: 120px;
    border: 1px solid var(--BORDER_COLOR);
    border-radius: 100%;
    background-color: var(--BACKGROUND_COLOR);
`;

function LectureImage({fileId}){
    const baseURL = import.meta.env.VITE_BASE_URL;
    const [image, setImage] = useState(null);
  
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    
    const getImage = async() => {
      const response = await axios.get(
        `${baseURL}/files/download/${fileId}`,
        {
          responseType: "blob",
        }
      );
      const fileBlob = response.data;
      const base64 = await toBase64(fileBlob);
      setImage(base64);
    }

    useEffect(()=>{
        if(fileId){
            getImage();
        }
    },[fileId]);

    return <Image src={image} alt="강의 이미지"/>
}

export default LectureImage;