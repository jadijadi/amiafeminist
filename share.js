(() => {
  const root = document.querySelector("[data-share]");
  if (!root) return;

  const url = root.dataset.shareUrl;
  const text = root.dataset.shareText;
  const status = root.querySelector(".share-status");
  let timer;

  const say = (msg) => {
    status.textContent = msg;
    clearTimeout(timer);
    timer = setTimeout(() => { status.textContent = ""; }, 2500);
  };

  const native = root.querySelector(".share-native");
  if (native && navigator.share) {
    native.hidden = false;
    native.addEventListener("click", () => {
      navigator.share({ title: document.title, text, url }).catch(() => {});
    });
  }

  const copy = root.querySelector(".share-copy");
  if (copy) {
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        say("پیوند کپی شد");
      } catch {
        say(url);
      }
    });
  }
})();
