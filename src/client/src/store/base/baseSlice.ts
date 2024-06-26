import {createSlice} from "@reduxjs/toolkit";
import {slices} from "../constants.ts";
import {ErrorInterface} from "../previews/previewsSlice.ts";
import {fetchWords} from "../words/wordsActions.ts";

export interface SelectorChoice {
  key: string;
  label: string;
}

export const languageChoices: SelectorChoice[] = [
  {key: "de", label: "German"},
  {key: "en", label: "English"},
  {key: "bn", label: "Bengali"}
]

export const levelChoices: SelectorChoice[] = [
  {key: "a1", label: "A1"},
  {key: "a2", label: "A2"},
]

interface Article {
  id: number;
  title: string;
}

export interface Language {
  id: number;
  code: string;
  title: string;
  articles: Article[];
}

interface PartsOfSpeech {
  id: number;
  title: string;
}

interface Properties {
  languages: Language[];
  parts_of_speech: PartsOfSpeech[];
  levels: string[];
}

export interface Message {
 content: string;
 type: 'success' | 'info' | 'warning'| 'danger';
 isShown?: boolean;
}

interface BaseState {
  darkMode: boolean;
  primaryLanguage: string;
  secondaryLanguage: string;
  level: string;
  isPlaying: boolean;
  properties: Properties;
  error: ErrorInterface | null;
  messages: Message[];
}

const initialProperties: Properties = {
  languages: [],
  parts_of_speech: [],
  levels: [],
}

// Define the initial state using that type
const initialState: BaseState = {
  darkMode: true,
  primaryLanguage: "de",
  secondaryLanguage: "en",
  level: "a1",
  isPlaying: false,
  properties: initialProperties,
  error: null,
  messages: [],
}

const baseSlice = createSlice({
  name: slices.base,
  initialState,
  reducers: {
    toggleDarkMode(state): void {
      state.darkMode = !state.darkMode;
    },
    setIsPlaying(state, action: {payload: boolean}): void {
      state.isPlaying = action.payload;
    },
    setPrimaryLanguage(state, action: {payload: string}): void {
      const value = action.payload;
      if (value) {state.primaryLanguage = value; fetchWords(state);}
    },
    setSecondaryLanguage(state, action: {payload: string}): void {
      const value = action.payload;
      if (value) {state.secondaryLanguage = value; fetchWords(state);}
    },
    setLevel(state, action: {payload: string}): void {
      const value = action.payload;
      if (value) {state.level = value; fetchWords(state);}
    },
    setError(state, action: {payload: ErrorInterface | null}): void {
      state.error = action.payload;
    },
    setProperties(state, action: {payload: Properties}): void {
      state.properties = action.payload;
    },
    setMessage(state, action: {payload: Message}): void {
      state.messages = state.messages ? [...state.messages, action.payload] : [action.payload];
    },
    removeMessage(state, action: {payload: number}): void {
      const index = action.payload;
      if (index >= 0 && index < state.messages.length) {
        state.messages.splice(index, 1);
      }
    },
    clearMessages(state): void {
      state.messages = [];
    }
  }
});

export const baseActions = baseSlice.actions;
export const baseReducer = baseSlice.reducer;
