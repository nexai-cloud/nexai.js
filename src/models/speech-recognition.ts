import { getSpeechRecognition, hasSpeechRecognition } from "~/lib/speech/recognition";
import { Model } from "./model";

export type OnTranscript =  (transcript: string) => void;

export class SpeechRecognitionModel extends Model {

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
    if (hasSpeechRecognition()) {
      const recognition = getSpeechRecognition()
  
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

}