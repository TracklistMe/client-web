import {
  CLIENT_ID
}
from '../constants/Config';
import {
  GENRES_MAP, IMAGE_SIZES
}
from '../constants/SongConstants';

export function constructUrl(category) {
  const catArr = category.split(' - ');
  let currentCategory = category;
  currentCategory = catArr[0];
  let result = `//api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&limit=50&offset=0`;
  if (currentCategory in GENRES_MAP) {
    if (currentCategory !== 'house' && currentCategory !== 'trance' && currentCategory !== 'dubstep') {
      currentCategory = `${currentCategory} house`;
    }

    result += `&tags=${currentCategory}`;
  } else {
    result += `&q=${currentCategory}`;
  }

  if (catArr.length > 1) {
    const formattedTime = '';
    result += `&created_at[from]=${formattedTime}`;
  }

  return result;
}

export function constructSongCommentsUrl(songId) {
  return `//api.soundcloud.com/tracks/${songId}/comments?client_id=${CLIENT_ID}`;
}

export function constructSongUrl(songId) {
  return `//api.soundcloud.com/tracks/${songId}?client_id=${CLIENT_ID}`;
}

export function constructUserSongsUrl(userId) {
  return `//api.soundcloud.com/users/${userId}/tracks?client_id=${CLIENT_ID}`;
}

export function fetchWaveformData(waveformUrl) {
  return fetch(waveformUrl)
    .then(response => response.json())
    .then(json => json.samples)
    .catch(err => {
      throw err;
    });
}

export function getImageUrl(str, size = null) {
  if (!str) {
    return '';
  }
  const srcString = str.replace('http:', '');

  switch (size) {
    case IMAGE_SIZES.LARGE:
      return srcString.replace('large', IMAGE_SIZES.LARGE);
    case IMAGE_SIZES.XLARGE:
      return srcString.replace('large', IMAGE_SIZES.XLARGE);
    default:
      return srcString;
  }
}
