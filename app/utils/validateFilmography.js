function validateFilmography(filmography, res) {
  const invalidFilmographyItem = filmography.find(item => !item.tvShowId || !item.characterName);
  if (invalidFilmographyItem) {
    res.status(400).json({
      success: false,
      message: "Each item in filmography must have both tvShowId and characterName",
    });
    return false;
  }
  return true;
}

export default validateFilmography;
