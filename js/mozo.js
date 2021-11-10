let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));

numberOfTables = 15;

function load() {
  for (let i = 0; i < numberOfTables; i++) {
    $("#table").append(`<button class="botonMesa is-size-5" id="botonMesa-${i}">${i + 1}</button>`)
    $(`#botonMesa-${i}`).click(() => orderMenu(i + 1));
    mesa = `Mesa-${i + 1}`;
    if (kitchenOrder != null) {
      if (mesa in kitchenOrder) {
        switch (kitchenOrder[mesa].State) {
          case "Enviado":
            $(`#botonMesa-${i}`).css({ "background-color": "hsl(48, 100%, 67%)" });
            break;
          case "Cocinando":
            $(`#botonMesa-${i}`).css({ "background-color": "hsl(217, 71%, 53%)" });
            break;
          case "Terminado":
            $(`#botonMesa-${i}`).css({ "background-color": "hsl(141, 71%, 48%)" });
            break;
        };
      };
    };
  };
};

$(document).ready(load);

function orderMenu(number) {
  localStorage.setItem("mesa", number);
  window.location = "./order.html";
};