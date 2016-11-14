/* toast-behavior.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

let temporaryToast;
let persistentToast;

export function exposeTemporaryToast(toastObj) {
  temporaryToast = toastObj;
}

export function exposePersistentToast(toastObj) {
  persistentToast = toastObj;
}

export function displayTemporaryMessage(text, duration) {
  temporaryToast.show({
    text,
    duration,
  });
}

export function displayPersistentMessage(message) {
  persistentToast.show(message);
}
