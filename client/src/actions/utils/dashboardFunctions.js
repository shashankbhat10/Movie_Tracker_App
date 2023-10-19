// import axios from 'axios';

export const getGraphData = (stats, genres, watched, watchlist, lists, type) => {
  let graphData = [];

  const watchData = getWatchedGraphContent(stats, genres, watched, type);
  console.log(watchData);
  graphData.push(watchData);

  // let wlData = getWatchedGraphContent(stats, genres, watchlist.movie);
  // wlData.label = 'Watchlist';
  // wlData.backgroundColor = 'rgb(255, 0, 132)';
  // graphData.push(wlData);

  const listData = getListGraphData(stats, genres, lists, type);
  Array.prototype.push.apply(graphData, listData);

  graphData = graphData.filter((item) => {
    const zeroCount = item.data.filter((count) => count === 0).length;
    return !(zeroCount === genres[type].total.length);
  });

  return graphData;
};

export const getWatchedGraphContent = (stats, genres, content, type) => {
  const data = getGenreGraphCount(stats, genres, content, type);

  return {
    label: "Watched",
    data: data,
    backgroundColor: "rgb(255, 99, 132)",
  };
};

export const getListGraphData = (stats, genres, customLists, type) => {
  let graphData = [];
  console.log("customLists", customLists);
  customLists.forEach((item, index) => {
    const countArr = getGenreGraphCount(
      stats,
      genres,
      item.content.map((item) => item.id),
      type
    );
    graphData.push({
      label: item.name,
      data: countArr,
      backgroundColor: `rgb(255, ${0 + 20 * (index + 1)}, ${0 + 20 * (index + 2)})`,
    });
  });

  console.log(graphData);
  return graphData;
};

const getGenreGraphCount = (stats, genres, content, type) => {
  const data = stats[type]
    .filter((item) => content.includes(item.contentId))
    .reduce((genreItems, item) => {
      const genres = item.genres;
      genres.forEach((g) => {
        const currentGenre = g.name;
        let genreArr = genreItems[currentGenre] || [];
        const requiredData = {
          contentId: item.contentId,
          type: item.type,
          title: item.title,
        };
        genreArr.push(requiredData);
        genreItems[currentGenre] = genreArr;
      });
      return genreItems;
    }, {});

  const graphData = genres[type].total
    .map((item) => item.name)
    .sort((a, b) => b > a)
    .map((item) => (data[item] !== undefined ? data[item].length : 0));

  return graphData;
};

export const getInteractedPeopleData = (stats, watched, watchlist, customLists) => {
  let castLength = 0;
  let crewLength = 0;
  let statsContent = stats.movie;
  customLists = customLists.filter((item) => item.content.length !== 0);

  Array.prototype.push.apply(statsContent, stats.tv);
  console.log(statsContent);
  statsContent.forEach((item) => {
    castLength = item.credits.cast.length;
    crewLength = item.credits.crew.length;
    const cast = item.credits.cast.slice(0, castLength > 20 ? 20 : castLength);
    const crew = item.credits.crew.slice(0, crewLength > 20 ? 20 : crewLength);
    item.credits.cast = cast;
    item.credits.crew = crew;
  });

  const allContent = [];

  let watchedContent = watched.movie.map((item) => {
    return { type: "movie", id: item.id, category: "watched" };
  });
  Array.prototype.push.apply(
    watchedContent,
    watched.tv.map((item) => {
      return { type: "tv", id: item.id, category: "watched" };
    })
  );
  Array.prototype.push.apply(allContent, watchedContent);

  let watchlistContent = watchlist.movie.map((item) => {
    return { type: "movie", id: item, category: "watchlist" };
  });
  Array.prototype.push.apply(
    watchlistContent,
    watchlist.tv.map((item) => {
      return { type: "tv", id: item, category: "watchlist" };
    })
  );
  Array.prototype.push.apply(allContent, watchlistContent);

  let listData = [];
  customLists.forEach((list) => {
    let content = list.content;
    content = content.map((item) => {
      return { type: item.type, id: item.id, category: list.name };
    });
    Array.prototype.push.apply(listData, content);
  });
  Array.prototype.push.apply(allContent, listData);

  let finalData = statsContent
    .reduce((castCount, item) => {
      const interactedContent = allContent.filter(
        (userContent) => userContent.type === item.type && userContent.id === item.contentId
      );
      interactedContent.forEach((content) => (content.title = item.title));

      const cast = item.credits.cast;
      cast.forEach((actor) => {
        let actorData = castCount[actor.id] || {
          id: actor.id,
          name: actor.name,
          profile_path: actor.profile_path,
          interactions: [],
        };

        let tempInt = actorData.interactions;
        Array.prototype.push.apply(tempInt, interactedContent);
        actorData.interactions = tempInt;

        castCount[actor.id] = actorData;
      });
      return castCount;
    }, [])
    .sort((a, b) => b.interactions.length - a.interactions.length)
    .slice(0, 20);

  return finalData;
};

export const getInteractedDirectorData = (stats, watched, watchlist, customLists) => {
  let castLength = 0;
  let crewLength = 0;
  let statsContent = stats.movie;
  customLists = customLists.filter((item) => item.content.length !== 0);

  Array.prototype.push.apply(statsContent, stats.tv);
  console.log(statsContent);
  statsContent.forEach((item) => {
    castLength = item.credits.cast.length;
    crewLength = item.credits.crew.length;
    const cast = item.credits.cast.slice(0, castLength > 20 ? 20 : castLength);
    const crew = item.credits.crew.slice(0, crewLength > 20 ? 20 : crewLength);
    item.credits.cast = cast;
    item.credits.crew = crew;
  });

  const allContent = [];

  let watchedContent = watched.movie.map((item) => {
    return { type: "movie", id: item.id, category: "watched" };
  });
  Array.prototype.push.apply(
    watchedContent,
    watched.tv.map((item) => {
      return { type: "tv", id: item.id, category: "watched" };
    })
  );
  Array.prototype.push.apply(allContent, watchedContent);

  let watchlistContent = watchlist.movie.map((item) => {
    return { type: "movie", id: item, category: "watchlist" };
  });
  Array.prototype.push.apply(
    watchlistContent,
    watchlist.tv.map((item) => {
      return { type: "tv", id: item, category: "watchlist" };
    })
  );
  Array.prototype.push.apply(allContent, watchlistContent);

  let listData = [];
  customLists.forEach((list) => {
    let content = list.content;
    content = content.map((item) => {
      return { type: item.type, id: item.id, category: list.name };
    });
    Array.prototype.push.apply(listData, content);
  });
  Array.prototype.push.apply(allContent, listData);

  let finalData = statsContent
    .reduce((castCount, item) => {
      const interactedContent = allContent.filter(
        (userContent) => userContent.type === item.type && userContent.id === item.contentId
      );
      interactedContent.forEach((content) => (content.title = item.title));

      const crew = item.credits.crew.filter((item) => item.department === "Directing");
      crew.forEach((person) => {
        let personData = castCount[person.id] || {
          id: person.id,
          name: person.name,
          profile_path: person.profile_path,
          interactions: [],
        };

        let tempInt = personData.interactions;
        Array.prototype.push.apply(tempInt, interactedContent);
        personData.interactions = tempInt;

        castCount[person.id] = personData;
      });
      return castCount;
    }, [])
    .sort((a, b) => b.interactions.length - a.interactions.length)
    .slice(0, 20);

  return finalData;
};
