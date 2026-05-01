//your JS code here. If required.
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Failed to download image: ${url}`));
  });
}

async function downloadImages() {
  loading.textContent = "Loading...";
  error.textContent = "";
  output.innerHTML = "";

  try {
    const downloadedImages = await Promise.all(
      images.map((image) => downloadImage(image.url))
    );

    loading.textContent = "";

    downloadedImages.forEach((img) => {
      output.appendChild(img);
    });
  } catch (err) {
    loading.textContent = "";
    error.textContent = err.message;
  }
}

downloadImages();