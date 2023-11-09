
  document.addEventListener("DOMContentLoaded", function () {
    var muteButton = document.getElementById("muteButton");
    var localVideo = document.getElementById("localVideo");

    let localStream;

    // Get user media
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(function (stream) {
        localStream = stream;
        localVideo.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Error accessing media devices: ", error);
      });

    muteButton.addEventListener("click", function () {
      // Toggle mute/unmute for the local video
      localVideo.muted = !localVideo.muted;

      // Toggle mute/unmute for the microphone
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });

      // Change button text accordingly
      muteButton.innerText = localVideo.muted ? "Unmute" : "Mute";
    });
  });
