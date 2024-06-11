import { getSpeechRecognition } from "../lib/speech/recognition";
import { Model } from "./model";
import { action, makeObservable, observable } from "mobx";
export class SpeechRecognitionModel extends Model {
    constructor() {
        super();
        Object.defineProperty(this, "recognition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: getSpeechRecognition()
        });
        Object.defineProperty(this, "talking", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "isSpeechInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "transcript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "startSpeechRecognition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (onTranscript) => {
                if (this.recognition) {
                    const recognition = this.recognition;
                    // recognition.continuous = true // @todo
                    recognition.addEventListener('speechstart', () => {
                        console.log('Speech started...:');
                        this.setTalking(true);
                    });
                    recognition.addEventListener('speechend', () => {
                        console.log('Speech end.');
                        this.setTalking(false);
                        this.setIsSpeechInput(false);
                    });
                    recognition.onresult = (event) => {
                        const result = event.results[event.results.length - 1];
                        const transcript = result[0].transcript;
                        console.log('Speech Recognition Result:', transcript);
                        onTranscript(transcript);
                        this.setTranscript(transcript);
                        this.setIsSpeechInput(false);
                        setTimeout(() => {
                            this.startSpeechRecognition(onTranscript);
                        }, 500);
                    };
                    recognition.onerror = (error) => {
                        console.error('speech error', error);
                        this.setIsSpeechInput(false);
                    };
                    this.setIsSpeechInput(true);
                    recognition.start();
                    console.log('listening...');
                }
            }
        });
        makeObservable(this, {
            talking: observable,
            isSpeechInput: observable,
            transcript: observable,
            setTalking: action,
            setIsSpeechInput: action,
            setTranscript: action,
        });
    }
    setTalking(talking) {
        this.talking = talking;
    }
    setIsSpeechInput(isSpeechInput) {
        this.isSpeechInput = isSpeechInput;
    }
    setTranscript(transcript) {
        this.transcript = transcript;
    }
    stopSpeechRecognition() {
        this.setTalking(false);
        this.setIsSpeechInput(false);
        this.recognition && this.recognition.stop();
    }
}
