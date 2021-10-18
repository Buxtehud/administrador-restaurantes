const menuList = JSON.parse(menu);

let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));
let mesa = JSON.parse(localStorage.getItem("mesa"));

let mesaNumero = localStorage.getItem("mesa");

let mesaNombre = document.getElementById("mesa");
mesaNombre.innerHTML = `Mesa ${mesaNumero}`;

let mesaName = `Mesa_${mesa}`;

let sendKitchen = document.getElementById("sendKitchen");

//Esta función revisa si existen ordenes creadas para esta mesa y rellena los espacios correspondientes con las órdenes cuando la página carga.
function checkIfTable() {
  let total = 0;
  if (mesaName in kitchenOrder) {
    for (const order in kitchenOrder[mesaName].Orders) {
      producto = kitchenOrder[mesaName].Orders[order].producto;
      cantidad = kitchenOrder[mesaName].Orders[order].cantidad;
      precio = kitchenOrder[mesaName].Orders[order].precio;

      $("#tableList").append(`<tr id="order-${order}">
                                <td class="producto" id="producto-${order}">${producto}</td>
                                <td class="cantidad" id="cantidad-${order}">${cantidad}</td>
                                <td class="precio" id="precio-${order}">${precio}</td>
                                <td><button id="plus-${order}">+</button></td>
                                <td><button id="minus-${order}">-</button></td>
                              </tr>`);

      $(`#plus-${order}`).click(() => addOne(order));
      $(`#minus-${order}`).click(() => deleteOne(order));

      total = cantidad * precio + total;

      const orderAdded = new newOrder(
        producto,
        cantidad,
        precio
      );

      totalOrder.push(orderAdded);
    };

    $("#total").html(`${total}`);
  } else {
    $("#total").html(`0`);
  };
};

$("document").ready(checkIfTable());

for (const category in menuList) {
  let categoryContainer = document.getElementById("categories");
  let categorySelector = document.createElement("button");
  categorySelector.innerHTML = category;
  categoryContainer.appendChild(categorySelector);
  categorySelector.setAttribute("class", "categorySelectorClass");
  categorySelector.setAttribute("onclick", `categorySelector(this.innerHTML)`);
}


function categorySelector(category) {
  
  $("#product").html(""); //Vacío el div de botones.

  let list = menuList[category];

  for (const element in list) {
    $("#product").append(`<button id="boton-${element}" value="boton-${element}">
                            <p class="productoBoton">${list[element].producto}</p>
                            <p class="precioBoton">USD $${list[element].precio}</p>
                            </button>`);
    $(`#boton-${element}`).click(() => addOrder(`boton-${element}`));
    sessionStorage.setItem(`boton-${element}`, JSON.stringify(list[element]));
  };
};


function addOrder(value) {
  //Saco la orden guardada en sessionStorage y creo un objeto orderAdded con esos valores.
  let food = sessionStorage.getItem(value);
  let orderedFood = JSON.parse(food);
  let cantidad = parseInt(document.getElementById("cantidadValor").value); // Valor del input.
  const orderAdded = new newOrder(
    orderedFood.producto,
    cantidad,
    orderedFood.precio
  );
  //
  let row = document.createElement("tr");
  let exist = false;
  let i = 0;

  for (; i < totalOrder.length; i++) {
    if (totalOrder[i].producto == orderedFood.producto) {
      totalOrder[i].cantidad += cantidad;
      exist = true;
      break;
    };
  };

  if (exist) {
    $(`#cantidad-${i}`).html(totalOrder[i].cantidad);
  } else {
    totalOrder.push(orderAdded);
    for (const element in orderAdded) {
      let order = document.createElement("td");
      row.setAttribute("class", `orderSelected`);
      row.setAttribute("id", `order-${i}`);
      order.innerHTML = `${orderAdded[element]}`;
      order.setAttribute("class", `${element}`);
      order.setAttribute("id", `${element}-${i}`);
      row.appendChild(order);
    };
    let plustd = document.createElement("td");
    let minustd = document.createElement("td");
    let plusButton = document.createElement("button");
    let minusButton = document.createElement("button");
    plusButton.setAttribute("onclick", `addOne(${i})`);
    plusButton.setAttribute("id", `plus-${i}`);
    minusButton.setAttribute("onclick", `deleteOne(${i})`);
    minusButton.setAttribute("id", `minus-${i}`);
    plusButton.innerHTML = "+";
    minusButton.innerHTML = "-";
    plustd.appendChild(plusButton);
    minustd.appendChild(minusButton);
    row.appendChild(plustd);
    row.appendChild(minustd);
  };
  table.appendChild(row);

  let totalElement = document.getElementById("total");

  suma(totalElement,totalOrder[i].precio,cantidad);
  

  document.getElementById("cantidadValor").value = "1";
};

function suma(element,precio,cantidad){
  let total = parseFloat(element.innerHTML);
  sum = total;
  prod = cantidad * precio;
  sum = sum + prod;
  element.innerHTML = `${sum}`;
};


function addOne(i) {
  modifyValue(i, "add");
};


function deleteOne(i) {
  modifyValue(i, "delete");
};


function modifyValue(i, operation) {
  if (totalOrder[i].cantidad >= 0) {
    let modifiedCantidad = document.getElementById(`cantidad-${i}`);
    let newCantidad = document.createElement("td");
    let rowModified = document.getElementById(`order-${i}`);

    let totalElement = document.getElementById("total");

    if (operation == "add") {
      totalOrder[i].cantidad += 1;
      suma(totalElement,totalOrder[i].precio,1);
    } else if (operation == "delete" && totalOrder[i].cantidad != 0) {
      totalOrder[i].cantidad -= 1;
      suma(totalElement,totalOrder[i].precio,-1);
    };

    newCantidad.innerHTML = totalOrder[i].cantidad;
    newCantidad.setAttribute("class", `cantidad`);
    newCantidad.setAttribute("id", `cantidad-${i}`);
    rowModified.replaceChild(newCantidad, modifiedCantidad);

  };
};

sendKitchen.onclick = () => {
  let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));
  if (kitchenOrder == null) {
    kitchenOrder = {};
  };
  let mesaNumero = localStorage.getItem("mesa");
  let order = {};
  order.Orders = totalOrder;
  order.State = "Enviado";
  kitchenOrder[`Mesa_${mesaNumero}`] = order;
  localStorage.setItem("kitchenOrder", JSON.stringify(kitchenOrder));
  alert("Enviado a la cocina");
};