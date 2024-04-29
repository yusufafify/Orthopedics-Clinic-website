const historyOpenBtn = document.querySelector("#historyOpenBtn");
const historyNav = document.querySelector("#historyNav");
let historNavState = false;
historyOpenBtn.addEventListener("click", () => {
  if (historNavState) {
    historyNav.classList.remove("opacity-100");

    historyNav.classList.add("opacity-0");

    historyNav.classList.add("pointer-events-none");

    historNavState = false;
  } else {
    historyNav.classList.remove("hidden");
    historyNav.classList.remove("opacity-0");
    historyNav.classList.remove("pointer-events-none");

    setTimeout(() => {
      historyNav.classList.add("opacity-100");
    }, 100);
    historNavState = true;
  }
});
