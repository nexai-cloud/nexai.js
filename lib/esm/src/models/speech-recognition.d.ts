/// <reference types="@types/dom-speech-recognition" />
import { Model } from "./model";
export type OnTranscript = (transcript: string) => void;
export declare class SpeechRecognitionModel extends Model {
    constructor();
    recognition: SpeechRecognition;
    talking: boolean;
    isSpeechInput: boolean;
    transcript: string;
    setTalking(talking: boolean): void;
    setIsSpeechInput(isSpeechInput: boolean): void;
    setTranscript(transcript: string): void;
    startSpeechRecognition: (onTranscript: OnTranscript) => void;
    stopSpeechRecognition(): void;
}
