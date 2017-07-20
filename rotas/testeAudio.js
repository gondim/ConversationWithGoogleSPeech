
module.exports = function (base64){
  // [START speech_async_recognize]
    // Imports the Google Cloud client library
    const Speech = require('@google-cloud/speech');
    const fs = require('fs');

    // Instantiates a client
    const speech = Speech();

    // The encoding of the audio file, e.g. 'LINEAR16'
    const encoding = 'LINEAR16';

    // The sample rate of the audio file in hertz, e.g. 16000
    const sampleRateHertz = 44100;

    // The BCP-47 language code to use, e.g. 'en-US'
    const languageCode = 'pt-BR';

    const config = {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode
    };
    const audio = {
      content: base64
    };

    const request = {
      config: config,
      audio: audio
    };

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    speech.longRunningRecognize(request)
      .then((results) => {
        const operation = results[0];
        console.log(operation);
        // Get a Promise representation of the final result of the job
        return operation.promise();
      })
      .then((results) => {
        const transcription = results[0].results[0];
        console.log(`Transcription: ${transcription}`);
      })
      .catch((err) => {
        console.error('ERROR triste:', err);
      });
    // [END speech_async_recognize]
}
