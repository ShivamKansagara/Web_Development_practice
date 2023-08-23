let count = document.getElementsByClassName("drum").length;
for (let i = 0; i < count; i++) {
  document
    .getElementsByClassName("drum")
    [i].addEventListener("click", function () {
      buttonAnimation(this.textContent);
      let audio = new Audio(`./sounds/${this.textContent}.mp3`);
      audio.play();
    });
}
document.addEventListener("keypress", function (eventHandle) {
  if (
    eventHandle.key == "a" ||
    eventHandle.key == "d" ||
    eventHandle.key == "j" ||
    eventHandle.key == "k" ||
    eventHandle.key == "l" ||
    eventHandle.key == "s" ||
    eventHandle.key == "w"
  ) {
    let audio = new Audio(`./sounds/${eventHandle.key}.mp3`);
    audio.play();
    buttonAnimation(eventHandle.key);
  }
});

function buttonAnimation(eventHandle) {
  if (
    eventHandle == "a" ||
    eventHandle == "d" ||
    eventHandle == "j" ||
    eventHandle == "k" ||
    eventHandle == "l" ||
    eventHandle == "s" ||
    eventHandle == "w"
  ) {
    document
      .getElementsByClassName(`${eventHandle}`)[0]
      .classList.add("pressed");
    setTimeout(function () {
      document
        .getElementsByClassName(`${eventHandle}`)[0]
        .classList.remove("pressed");
    }, 100);
  }
}
