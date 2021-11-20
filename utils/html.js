// html`..` will render the same as `..`
// We just want to be able to add html in front of string literals to enable
// highlighting using lit-html vscode plugin.
export default function () {
  arguments[0] = { raw: arguments[0] };
  return String.raw(...arguments);
}
