let botMesa = document.getElementsByClassName("botonMesa");

function load() {
  for (boton in botMesa) {
    let number = botMesa[boton].innerHTML;
    botMesa[boton].addEventListener("click",()=>{orderMenu(number)});
  }
}

$(document).ready(load);

function orderMenu(number) {
  localStorage.setItem("mesa", number);
  window.location = "./order.html";
};