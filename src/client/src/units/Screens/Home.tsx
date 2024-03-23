import {useEffect} from "react";
import {AppDispatch} from "../../store/store.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchWords} from "../../store/words/wordsActions.ts";
import WordsSkeleton from "../Skeletons/WordsSkeleton.tsx";
import Words from "../Words/Words.tsx";
import Selectors from "../Selectors/Selectors.tsx";


const Home = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const words = useAppSelector((state) => state.words.words);
  const loading = useAppSelector((state) => state.words.loading);
  const primaryLanguage = useAppSelector((state) => state.base.primaryLanguage);
  const level = useAppSelector((state) => state.base.level);

  useEffect(() => {
    dispatch(fetchWords(primaryLanguage, level))
  }, [dispatch, level, primaryLanguage]);

  return (
    <>
      <Selectors/>
      {loading && <WordsSkeleton/>}
      {words && <Words words={words}/>}
    </>
  );
}

export default Home;
