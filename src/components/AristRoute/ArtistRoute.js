import React from 'react';
import { useSelector } from 'react-redux';

const ArtistRoute = () => {
  const accessToken = useSelector((state) => state.auth.token);

  return accessToken;
}

export default ArtistRoute;