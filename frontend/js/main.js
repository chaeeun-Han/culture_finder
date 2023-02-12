function category(number) {
  for (var i = 1; i <= 8; i++) {
    const $categoryIMG = document.querySelector(`#category${i}IMG`);
    $categoryIMG.setAttribute("src", `../image/category${i}.png`); 
  }
  const $categoryIMG = document.querySelector(`#category${number}IMG`);
  $categoryIMG.setAttribute("src", `../image/category${number}_click.png`);

  location.href = "map.html?"+number;
}

function home() {
  location.href = "main.html";
}
