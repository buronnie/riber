var fakeWindow = {};
export function getWindow() {
  try {
    return window;
  } catch (e) {
    try {
      return global; //eslint-disable-line
    } catch (e) {
      return fakeWindow;
    }
  }
}
