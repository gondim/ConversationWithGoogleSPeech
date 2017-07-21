var onFail = function(e) {
  console.log('Rejected!', e);
};

var onSuccess = function(s) {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  // var context = new webkitAudioContext();
  var mediaStreamSource = context.createMediaStreamSource(s);
  recorder = new Recorder(mediaStreamSource, {
    numChannels: 1
  });
  recorder.record();

  // audio loopback
  // mediaStreamSource.connect(context.destination);
}

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var recorder;
var audio = document.querySelector('audio');

function startRecording() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({
      audio: true
    }, onSuccess, onFail);
  } else {
    console.log('navigator.getUserMedia not present');
  }
}


function stopRecording() {
  recorder.stop();
  recorder.exportWAV(function(blob) {
    audio.src = window.URL.createObjectURL(blob);

    sendAudio(blob);

  });
}


function sendAudio(blob) {

  var reader = new window.FileReader();
  reader.readAsDataURL(blob);
  reader.onloadend = function() {
    base64 = reader.result
    base64 = base64.split(',')[1];
    postAudio(base64);
  }
}

function postAudio(audio) {

  json = {
    'audio': audio
  }

  $.ajax({

    url: "/api/audio",
    type: "POST",
    data: json,
    dataType: "json",
    success: function(value) {
      console.log(value);
    }
  });

}
