const dropzone = document.getElementById("dropzone");
const statuspatch = document.getElementById("statuspatch");

dropzone.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
});

dropzone.addEventListener("drop", async (e) => {
  e.stopPropagation();
  e.preventDefault();

  const files = e.dataTransfer.files;

  for (const file of files) {
    const isFile = await window.api.isFile(file.path);
    console.log(file.path, isFile);
    if (isFile) {
      const patched = await window.api.patchMiz(file.path);
      if (patched) {
        statuspatch.textContent = file.path + " PATCHED";
        dropzone.style.borderColor = "green";
      } else {
        statuspatch.textContent = "No problem found";
      }
    }
  }
});
