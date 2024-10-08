import {Button, Card, Chip, Input} from "@nextui-org/react";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Language, languageChoices, levelChoices} from "../../store/base/baseSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {CreatePreview, createPreview} from "../../store/previews/previewsActions.ts";
import {AppDispatch} from "../../store/store.ts";
import Selector from "../Selectors/Selector.tsx";
import {PREVIEWS_URL} from "../urls.ts";
import {getSelectorChoices} from "../utils/utils.ts";
import WordInput from "./WordInput.tsx";

export interface Preview {
  id?: number;
  title?: string;
  level?: string;
  language?: Language;
  plural?: string;
  part_of_speech?: { title: string };
  article?: { title: string };
}

const AddPreview = () => {
  const navigate = useNavigate();
  const { index } = useParams();
  const dispatch: AppDispatch = useAppDispatch();
  const primaryLanguage = useAppSelector((state) => state.base.primaryLanguage);
  const globalLevel = useAppSelector((state) => state.base.level);

  const parts_of_speech = useAppSelector((state) => state.base.properties.parts_of_speech);
  const languages = useAppSelector((state) => state.base.properties.languages);
  const partsOfSpeech = getSelectorChoices(parts_of_speech);

  const previews = useAppSelector((state) => state.previews.previews);
  const preview: Preview = index ? previews[parseInt(index, 10)] : {};

  const initialTitle = preview.title ? preview.title : '';
  const initialLanguageCode = preview.language ? preview.language.code : '';
  const initialPartOfSpeech = preview.part_of_speech ? preview.part_of_speech.title.toLowerCase() : '';
  const initialLevel = preview.level ? preview.level : '';

  const [title, setTitle] = useState(initialTitle);
  const [languageCode, setLanguageCode] = useState(initialLanguageCode);
  const [partOfSpeech, setPartOfSpeech] = useState(initialPartOfSpeech);
  const [level, setLevel] = useState(initialLevel);
  const isNoun = partOfSpeech.toLowerCase() === 'noun';

  const handlePartOfSpeechChange = (e: ChangeEvent<HTMLSelectElement>) => setPartOfSpeech(e.target.value);
  const partsOfSpeechComponent = partsOfSpeech && partsOfSpeech.length > 0 ? (
    <Selector isRequired isDisabled={!!initialPartOfSpeech} name="partOfSpeech" label="Part of Speech" value={partOfSpeech} defaultKey={partOfSpeech} choices={partsOfSpeech} onChange={handlePartOfSpeechChange} />
  ) : null;

  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => setLevel(e.target.value);
  const preview_article = preview.article ? preview.article.title : '';
  const preview_plural = preview.plural ? preview.plural : '';

  const initialFormData = () => {
    const data: Record<string, string>[] = []
    languages.map(language => {
      let title = ''
      let article = ''
      let plural = ''

      if (preview.language && language.code === preview.language.code) {
        title = preview.title || '';
        article = preview_article;
        plural = preview_plural;
      }

      data.push({
        languageCode: language.code,
        title: title,
        article: article,
        plural: plural,
        sentence: '',
      });
    });
    return data;
  }
  const [formData, setFormData] = useState(initialFormData())

  const handleInputChange = (index: number, event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    if (name === 'partOfSpeech') {setPartOfSpeech(value);}

    const updatedForms = [...formData];
    updatedForms[index][name] = value;
    setFormData(updatedForms);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const words = formData.map(form => ({
      ...form,
      partOfSpeech: partOfSpeech,
      level: level,
    }));

    const data: CreatePreview = {
      id: preview.id,
      title: title,
      languageCode: languageCode,
      partOfSpeech: partOfSpeech,
      level: level,
      article: preview_article,
      plural: preview_plural,
      words: words,
      fetchPreviewsParams: {
        language: primaryLanguage,
        level: globalLevel,
      }
    };
    const success = await dispatch(createPreview(data));
    if (success) index ? navigate(PREVIEWS_URL) : setFormData(initialFormData());
  }

  return (
    <>
      {index &&
        <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
          <Card className="w-full p-4">
            <div className="flex justify-center">
              <Chip color="warning" variant="shadow" className="animate-appearance-in">
                {preview.title}
              </Chip>
            </div>
          </Card>
        </div>
      }
      <form onSubmit={handleSubmit}>
        {!index &&
          <div className="flex justify-center max-w-screen-xl mx-auto gap-2 p-2 pb-0">
            <Card className="w-full">
              <div className="flex justify-center gap-2 p-2">
                <Input isRequired name="title" type="text" label="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <Selector isRequired label="Language" placeholder="Select Language" showAvatar={true} choices={languageChoices}
                  onChange={(e) => setLanguageCode(e.target.value)}/>
              </div>
            </Card>
          </div>
        }

        <div className="flex justify-center max-w-screen-xl mx-auto gap-2 p-2 pb-0">
          <Card className="w-full">
            <div className="flex justify-center gap-2 p-2">
              {partsOfSpeechComponent}
              <Selector isRequired isDisabled={!!initialLevel} name="level" label="Level" value={level}
                        defaultKey={level} choices={levelChoices} onChange={handleLevelChange}/>
            </div>
          </Card>
        </div>

        <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
          <div className="w-full">
            <div className="grid md:grid-cols-3 gap-2">
              {formData.map((formData, index) => (
                <WordInput key={formData.languageCode} formData={formData} index={index} language={languages[index]}
                           isNoun={isNoun} onChange={handleInputChange} preview={preview}/>
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

export default AddPreview;
