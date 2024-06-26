import Selector from "./Selector.tsx";
import {AppDispatch} from "../../store/store.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {ChangeEvent} from "react";
import {setLevel, setPrimaryLanguage, setSecondaryLanguage} from "../../store/base/baseActions.ts";
import {languageChoices, levelChoices} from "../../store/base/baseSlice.ts";

export type SelectorChange = (e: ChangeEvent<HTMLSelectElement>) => void;

function Selectors() {
  const dispatch: AppDispatch = useAppDispatch();
  const primaryLanguage = useAppSelector((state) => state.base.primaryLanguage);
  const secondaryLanguage = useAppSelector((state) => state.base.secondaryLanguage);
  const level = useAppSelector((state) => state.base.level);

  const changePrimaryLanguage = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setPrimaryLanguage(e.target.value));
  const changeSecondaryLanguage = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setSecondaryLanguage(e.target.value));
  const changeLevel = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setLevel(e.target.value));

  return (
    <div className="flex justify-center max-w-screen-xl mx-auto pt-2 ps-2 pe-2">
      <div className="flex w-full gap-2">
        <Selector label="Learning" placeholder="Select Language" showAvatar={true} defaultKey={primaryLanguage} choices={languageChoices}
                  onChange={changePrimaryLanguage}/>
        <Selector label="With" placeholder="Select Language" showAvatar={true} defaultKey={secondaryLanguage} choices={languageChoices}
                  onChange={changeSecondaryLanguage}/>
        <Selector label="Level" placeholder="Select Level" defaultKey={level} choices={levelChoices} className="w-3/5 sm:w-full"
                  onChange={changeLevel}/>
      </div>
    </div>
  );
}

export default Selectors;
