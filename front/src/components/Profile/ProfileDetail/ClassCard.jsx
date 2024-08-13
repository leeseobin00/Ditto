import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import Tag from "../Tag";

const CardWrapper = styled.div`
  background-color: white;
  width: 240px;
  overflow: hidden;
  margin-bottom: 16px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background-color: lightgray;
  border-radius: 10px;
`;

const ContentWrapper = styled.div`
  margin-top: 8px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: var(--TEXT_PRIMARY);
`;

const Date = styled.p`
  font-size: 14px;
  color: var(--TEXT_SECONDARY);
`;

const Instructor = styled.div`
  font-size: 14px;
  color: var(--TEXT_TERTIARY);
`;

function ClassCard({ classId, fileId, title, date, name, tag }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [image, setImage] = useState(undefined);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const getImage = async (fileId) => {
    const response = await axios.get(`${baseURL}/files/download/${fileId}`, {
      responseType: "blob",
    });
    const fileBlob = response.data;
    const base64 = await toBase64(fileBlob);
    setImage(base64);
  };

  useEffect(() => {
    if (fileId) {
      getImage(fileId);
    }
  }, [fileId]);

  return (
    <Link to={`/classes/detail/${classId}`}>
      <CardWrapper>
        <Image src={image} />
        <ContentWrapper>
          <Title>{title}</Title>
          <Info>
            <Date>{date}</Date>
            <Instructor>{name}</Instructor>
            <Tag tagName={tag} />
          </Info>
        </ContentWrapper>
      </CardWrapper>
    </Link>
  );
}

export default ClassCard;
