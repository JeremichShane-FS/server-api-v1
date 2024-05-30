const transformActors = actors => {
  return actors.map(actor => {
    return {
      name: `${actor.firstName} ${actor.lastName}`,
      characterName: actor.filmography[0].characterName,
    };
  });
};

export default transformActors;
