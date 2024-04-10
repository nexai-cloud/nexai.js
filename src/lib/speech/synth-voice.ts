export const synthVoice = (text: string) => {
  console.log('syncVoice', text)
  const voices = speechSynthesis.getVoices()
    .filter(voice => voice.lang === 'en-US')

  console.log('voices', voices)
  const voice = voices.find(voice => {
      return voice.voiceURI.match('Google')
  }) || voices[0]

  const utter = new SpeechSynthesisUtterance(text)
  if (voice) {
    utter.voice = voice
    console.log('voice', voice.voiceURI)
  }
  speechSynthesis.speak(utter)
  console.log('utter', text)
}