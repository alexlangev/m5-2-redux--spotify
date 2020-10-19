import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchArtistProfile } from '../../helpers/api-helpers';
import {requestArtistData, receiveArtistData, receiveArtistDataError} from '../../actions';

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.token);
  const artistId = useParams().id;

  const formatNumberFollowers = (num) => {
    if(num.length >= 7) {
      return num.slice(0, num.length - 6) + 'M';
    } else if(num.length >= 4) {
      return num.slice(0, num.length - 3) + 'K';
    }
  }
  
  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
  //Should flip the artist-reducer status to loading
    dispatch(requestArtistData());

    fetchArtistProfile(accessToken, artistId)
    .then(data => {
      dispatch(receiveArtistData(data));
    })
    .catch((err) => {
      console.error(err);
      dispatch(receiveArtistDataError());
    });
  }, [accessToken, artistId]);

  const currentArtist = useSelector(state => state.artists.currentArtist);
  const currentArtistStatus = useSelector(state => state.artists.status);
  
  if (currentArtistStatus === 'loading' || !currentArtist) {
    return (
      <p>Loading...</p>
    )
  }

  return(
    <PageWrapper>
      <ArtistImage src={currentArtist.images[1].url}/>
      <ArtistName>{currentArtist.name}</ArtistName>
      <Followers>
        <NumFollowers>{formatNumberFollowers(String(currentArtist.followers.total))}</NumFollowers>
        {` followers`}
      </Followers>
      <Tags>tags</Tags>
      <TagsWrapper>
        <Tag>{currentArtist.genres[0]}</Tag>
        <Tag>{currentArtist.genres[1]}</Tag>
      </TagsWrapper>
    </PageWrapper>
  ) 
}

const PageWrapper = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`

const ArtistImage = styled.img`
  margin-top: 80px;
  border-radius: 50%;
`

const ArtistName = styled.h1`
  margin: 0;
  padding: 0;
  position: relative;
  bottom: 100px;
`

const Followers = styled.div`
`

const NumFollowers = styled.strong`
  color: fuchsia;
`

const Tags = styled.h2`
`

const Tag = styled.div`
  background-color: grey;
  color: white;
  border-radius: 10px;
  padding: 10px;
`

const TagsWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 20px;
`

export default ArtistRoute;