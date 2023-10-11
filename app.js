function main() {
  processBackgroundImg();
  getRandomImg();

  async function getImgFromUserInput(userInput) {
      const query = userInput.split(' ').join('_');
      const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=1&client_id=gE2oOMHjCJR-B52gAp5cMEwZXpGFkCknpoTdZOxpkZ8`);
      const img = await response.json();
      console.log(img)
      if (img.total == 0) return;
      return img.results[0].urls.regular;
    }
  
  async function getRandomImg() {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=gE2oOMHjCJR-B52gAp5cMEwZXpGFkCknpoTdZOxpkZ8`);
    const img = await response.json();
    return img.urls.regular;
  }
  
  window.changeBackground = async function(e) {
    e.preventDefault();
    const userInput = document.getElementById("userInput");
    const img = await getImgFromUserInput(userInput.value);
    const root = document.getElementById("root");
    if (img) {
      root.style.backgroundImage = `url(${img})`;
    } else {
      alert("There is no matching image.")
    }
    userInput.value = "";
  }

  async function processBackgroundImg() {
    const root = document.getElementById("root");
    const userForm = document.getElementById("userForm");
    const img = await getRandomImg();
    root.style.backgroundImage = `url(${img})`;
    userForm.onsubmit = (e) => changeBackground(e);
  }
}

main()


