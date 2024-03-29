import {Button, Card, Chip} from "@nextui-org/react";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {levelChoices} from "../../store/base/baseSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchPreviews} from "../../store/previews/previewsActions.ts";
import {AppDispatch} from "../../store/store.ts";
import Selector from "../Selectors/Selector.tsx";
import {getSelectorChoices} from "../utils/utils.ts";
import WordInput from "./WordInput.tsx";

const AddWord = () => {
  const word = 'Ansehen'
  const parts_of_speech = useAppSelector((state) => state.base.properties.parts_of_speech);
  const languages = useAppSelector((state) => state.base.properties.languages);
  const partsOfSpeech = getSelectorChoices(parts_of_speech);
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const isNoun = partOfSpeech.toLowerCase() === 'noun';
  const handlePartOfSpeechChange = (e: ChangeEvent<HTMLSelectElement>) => setPartOfSpeech(e.target.value);
  const partsOfSpeechComponent = partsOfSpeech && partsOfSpeech.length > 0 ? (
    <Selector isRequired name="partOfSpeech" label="Part of Speech" value={partOfSpeech} defaultKey={partOfSpeech} choices={partsOfSpeech} onChange={handlePartOfSpeechChange} />
  ) : null;

  const [level, setLevel] = useState('');
  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => setLevel(e.target.value);

  const WordsForm = () => {
    const initialFormData: Record<string, string>[] = []
    languages.map(language => (
      initialFormData.push({
        languageCode: language.code,
        word: '',
        article: '',
        plural: '',
        sentence: '',
        note: '',
      })
    ));
    return initialFormData;
  }
  const [formData, setFormData] = useState(WordsForm())

  const handleInputChange = (index: number, event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    if (name === 'partOfSpeech') {setPartOfSpeech(value);}

    const updatedForms = [...formData];
    updatedForms[index][name] = value;
    setFormData(updatedForms);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formData)
  }

  const dispatch: AppDispatch = useAppDispatch();
  const primaryLanguage = useAppSelector((state) => state.base.primaryLanguage);
  const globalLevel = useAppSelector((state) => state.base.level);
  useEffect(() => {
    dispatch(fetchPreviews({
      language: primaryLanguage,
      level: globalLevel,
      loader: true
    }))
  }, [dispatch, globalLevel, level, primaryLanguage]);

  return (
    <>
      <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
        <Card className="w-full p-4">
          <div className="flex justify-center">
            <Chip color="warning" variant="shadow" className="animate-appearance-in">
              {word}
            </Chip>
          </div>
        </Card>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center max-w-screen-xl mx-auto gap-2 p-2 pb-0">
          <Card className="w-full">
            <div className="flex justify-center gap-2 p-2">
              {partsOfSpeechComponent}
              <Selector isRequired name="level" label="Level" value={level} defaultKey={level} choices={levelChoices} onChange={handleLevelChange}/>
            </div>
          </Card>
        </div>

        <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
          <div className="w-full">
            <div className="grid md:grid-cols-3 gap-2">
              {formData.map((formData, index) => (
                <WordInput key={formData.languageCode} formData={formData} index={index} language={languages[index]}
                           isNoun={isNoun} onChange={handleInputChange}/>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center max-w-screen-xl mx-auto p-2 pb-0">
          <Button className="w-full shadow-sm shadow-purple-500 dark:bg-zinc-800" type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
}

export default AddWord;
