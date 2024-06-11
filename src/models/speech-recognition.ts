import { getSpeechRecognition } from "~/lib/speech/recognition";
import { Model } from "./model";
import { action, makeObservable, observable } from "mobx";

export type OnTranscript =  (transcript: string) => void;

export class SpeechRecognitionModel extends Model {

  constructor() {
    super()
    makeObservable(this, {
      talking: observable,
      isSpeechInput: observable,
      transcript: observable,
      setTalking: action,
      setIsSpeechInput: action,
      setTranscript: action,
    })
  }

  recognition = getSpeechRecognition()

  talking = false

  isSpeechInput = false

  transcript = ''

  setTalking(talking: boolean) {
    this.talking = talking
  }

  setIsSpeechInput(isSpeechInput: boolean) {
    this.isSpeechInput = isSpeechInput
  }

  setTranscript(transcript: string) {
    this.transcript = transcript
  }

  startSpeechRecognition = (onTranscript: OnTranscript) => {
    if (this.recognition) {
      const recognition = this.recognition
  
      // recognition.continuous = true // @todo
  
      recognition.addEventListener('speechstart', () => {
        console.log('Speech started...:');
        this.setTalking(true)
      });
    
      recognition.addEventListener('speechend', () => {
        console.log('Speech end.');
        this.setTalking(false)
        this.setIsSpeechInput(false)
      });
  
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[event.results.length - 1]
        const transcript: string = result[0].transcript;
        console.log('Speech Recognition Result:', transcript);
        onTranscript(transcript)
        this.setTranscript(transcript)
        this.setIsSpeechInput(false)
        setTimeout(() => {
          this.startSpeechRecognition(onTranscript)
        }, 500)
      };
  
      recognition.onerror = (error) => {
        console.error('speech error', error)
        this.setIsSpeechInput(false)
      }
  
      this.setIsSpeechInput(true)
      recognition.start()
      console.log('listening...')
    }
  }

  stopSpeechRecognition() {
    this.setTalking(false)
    this.setIsSpeechInput(false)
    this.recognition && this.recognition.stop()
  }

}