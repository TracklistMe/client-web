export const CHANGE_TYPES = {
  NEXT: 'next',
  PLAY: 'play',
  SHUFFLE: 'shuffle'
};

export const GENRES = [
  'chill',
  'deep',
  'dubstep',
  'house',
  'progressive',
  'tech',
  'trance',
  'tropical'
];

export const GENRES_MAP = (function generateMaps() {
  const result = {};
  GENRES.forEach(function generateGenres(genre) {
    result[genre] = 1;
  });
  return result;
})();


export const IMAGE_SIZES = {
  LARGE: 't300x300',
  XLARGE: 't500x500'
};
