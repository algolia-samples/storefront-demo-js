export function handleMobileMenu(target) {
  const mobileMenu = document.querySelector(target);

  function toggleMobileMenu(value) {
    mobileMenu.classList[value ? "add" : "remove"](
      `${target.slice(1)}--visible`
    );
  }

  document
    .querySelector(`${target}-open-trigger`)
    .addEventListener("click", () => toggleMobileMenu(true));

  document
    .querySelector(`${target}-close-trigger`)
    .addEventListener("click", () => toggleMobileMenu(false));
}
