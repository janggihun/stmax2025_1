import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./Store/PageSlice";
import KeyTypeReducer from "./Store/KeyTypeSlice";
import dataReducer from "./Store/DataSlice";
import muiscMapReducer from "./Store/MusicMapSlice";
import levelReducer from "./Store/LevelSlice";
import rankReducer from "./Store/RankSlice";
import categoryReducer from "./Store/CategorySlice";
import playerReducer from "./Store/PlayerSlice";
import modalReducer from "./Store/ModalSlice";
import gameSetReducer from "./Store/GameSetSlice";
import loadingReducer from "./Store/LoadingSlice";
import seasonReducer from "./Store/SeasonSlice";
import youtubeReducer from "./Store/YoutubePlay";

export default configureStore({
  reducer: {
    musicMap: muiscMapReducer,
    data: dataReducer,
    rank: rankReducer,
    category: categoryReducer,
    page: pageReducer,
    keyType: KeyTypeReducer,
    level: levelReducer,
    player: playerReducer,
    modal: modalReducer,
    gameSet: gameSetReducer,
    loadingFlag: loadingReducer,
    season: seasonReducer,
    youtubeFlag: youtubeReducer,
    // gameFlag: gameFlagReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
