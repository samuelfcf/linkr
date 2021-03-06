import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getTrendings } from "../../services/api";
import Hashtag from "./Hashtag";
import SearchHashtag from "./SearchHashtag";
import UserContext from "../../contexts/UserContext";

export default function TrendingHashtags() {
  const { user } = useContext(UserContext);
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    let active = true;
    getTrendings(user.token)
      .then((res) => {
        return active ? sortHashtags(res.data.hashtags) : null;
      })
      .catch((err) => console.log(err.response));
    return () => (active = false);
  }, [user]);

  function sortHashtags(data) {
    data.sort((h1, h2) => h2.numberOfMentions - h1.numberOfMentions);
    setHashtags(data);
  }

  return (
    <FixedContainer>
      <TitleSection>
        <h2>trending</h2>
      </TitleSection>
      <Hashtags>
        {hashtags.map((hashtag, key) => (
          <Hashtag key={key} hashtag={hashtag} />
        ))}
      </Hashtags>
      <SearchHashtag />
    </FixedContainer>
  );
}

const FixedContainer = styled.div`
  position: fixed;
  top: 213px;
  left: calc((100% + 345px) / 2);

  width: 300px;
  border-radius: 16px;
  background-color: #171717;

  @media (max-width: 935px) {
    display: none;
  }
`;

const TitleSection = styled.div`
  padding: 15px;
  border-bottom: solid 1px #484848;

  h2 {
    font-size: 27px;
    line-height: 31px;
    font-weight: 700;
    font-family: "Oswald";
    color: #fff;
  }
`;

const Hashtags = styled.ul`
  padding: 15px;
`;
