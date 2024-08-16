import { styled } from "styled-components";
import { Link } from "react-router-dom";

import Star from "../../../assets/icon/class/star.png";
import Dollar from "../../../assets/icon/class/dollar.png";
import Heart from "../../../assets/icon/common/heart/heart-activated.png";

const ClassListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 290px;
  min-width: 290px;
  height: 340px;
  padding: 20px 35px;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
`;

const LinkBox = styled(Link)``;

const ClassThumbnail = styled(Link)`
  width: 100%;
  height: 180px;
  position: relative;
`;

const ClassThumbnailDetail = styled.img`
  border-radius: 15px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikeNum = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 5%;
  left: 5%;
  justify-content: center;
  align-items: center;
  color: var(--LIGHT);
  filter: drop-shadow(3px 3px 2px rgb(84, 84, 84));
`;

const ClassItemText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bold = styled.div`
  font-weight: 600;
`;

const ClassTitle = styled(Bold)`
  max-width: 100%;
  margin: 5px 0;
  font-size: 16px;
  height: 2.4em;
  max-height: 2.4em;
  overflow: hidden;
`;

const ClassDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const MediumFont = styled.div`
  font-size: 14px;
`;

const SmallFont = styled.div`
  font-size: 12px;
  text-align: center;
`;

const ClassDetailLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 5px;
`;

const Cost = styled(ClassDetailLine)`
  color: var(--PRIMARY);
`;

const Tag = styled(ClassDetailLine)`
  width: 55px;
  height: 20px;
  border-style: solid;
  border-radius: 20px;
  border-color: var(--SECONDARY);
  border-width: 1px;
  color: var(--SECONDARY);
  justify-content: center;
`;

const formatNumber = (number) => {
  return number.toLocaleString();
};

const ClassListItem = ({
  classInfo,
  fileId,
  instructor,
  tag,
  isMyPage = false,
}) => {
  const {
    classId,
    className,
    classPrice,
    classHour,
    classMinute,
    likeCount,
    reviewCount,
    averageRating,
  } = classInfo;

  return (
    <ClassListItemContainer>
      <ClassThumbnail to={`/classes/detail/${classId}`}>
        <ClassThumbnailDetail
          src={`http://i11a106.p.ssafy.io:8080/files/download/${fileId}`}
          alt="class-thumbnail"
        />
        <LikeNum>
          <Icon src={Heart} alt="Heart" />
          <MediumFont>{formatNumber(likeCount)}</MediumFont>
        </LikeNum>
      </ClassThumbnail>
      <ClassItemText>
        <LinkBox to={`/classes/detail/${classId}`}>
          <ClassTitle>{className}</ClassTitle>
        </LinkBox>
        <ClassDetail>
          <ClassDetailLine>
            <Bold>
              <SmallFont>
                {classHour}시간&nbsp;{classMinute != 0 && `${classMinute}분`}
              </SmallFont>
            </Bold>
            <SmallFont>&nbsp;|&nbsp;</SmallFont>
            <SmallFont>{instructor}</SmallFont>
          </ClassDetailLine>
          <Tag>
            <Bold>
              <SmallFont>{tag}</SmallFont>
            </Bold>
          </Tag>
        </ClassDetail>
        <ClassDetail>
          <ClassDetailLine>
            <Icon src={Star} alt="Star" />
            <Bold>
              <SmallFont>
                {averageRating?.toFixed(1)}
                &nbsp;
              </SmallFont>
            </Bold>
            <SmallFont>({reviewCount})</SmallFont>
          </ClassDetailLine>
          <Cost>
            <Icon src={Dollar} alt="Dollar" />
            <Bold>
              <MediumFont>{formatNumber(classPrice)}</MediumFont>
            </Bold>
          </Cost>
        </ClassDetail>
      </ClassItemText>
    </ClassListItemContainer>
  );
};

export default ClassListItem;
