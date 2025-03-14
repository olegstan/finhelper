export default class Keyboard {
  static func = () => {};
  static mount(callback) {
    Keyboard.func = event => {
      // if (eventPrevented)
      // {
      //   return; // Do nothing if the event was already processed
      // }

      callback(event.key);

      // switch (event.key)
      // {
      //   case "Down": // IE/Edge specific value
      //   case "ArrowDown":
      //     // Do something for "down arrow" key press.
      //     break;
      //   case "Up": // IE/Edge specific value
      //   case "ArrowUp":
      //     // Do something for "up arrow" key press.
      //     break;
      //   case "Left": // IE/Edge specific value
      //   case "ArrowLeft":
      //     // Do something for "left arrow" key press.
      //     break;
      //   case "Right": // IE/Edge specific value
      //   case "ArrowRight":
      //     // Do something for "right arrow" key press.
      //     break;
      //   case "Enter":
      //     // Do something for "enter" or "return" key press.
      //     break;
      //   case "Esc": // IE/Edge specific value
      //   case "Escape":
      //     // Do something for "esc" key press.
      //     break;
      //   default:
      //     return; // Quit when this doesn't handle the key event.
      // }

      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    };
    window.addEventListener("keydown", Keyboard.func, true);
  }
  static unmount() {
    window.removeEventListener("keydown", Keyboard.func);
  }
}
//# sourceMappingURL=Keyboard.js.map