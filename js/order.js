const menuList = JSON.parse(menu);

let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));
let mesa = JSON.parse(localStorage.getItem("mesa"));

let mesaNumero = localStorage.getItem("mesa");

let mesaNombre = document.getElementById("mesa");
mesaNombre.innerHTML = `Mesa ${mesaNumero}`;

let mesaName = `Mesa-${mesa}`;

let sendKitchen = document.getElementById("sendKitchen");
let closeTable = document.getElementById("closeTable");

//Esta función revisa si existen ordenes creadas para esta mesa y rellena los espacios correspondientes con las órdenes cuando la página carga.
function checkIfTable() {
  initTable();
  let total = 0;
  if (kitchenOrder != null) {
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
    };
  };
};

// Esta función crea el encabezado de la tabla de productos ordenados por el cliente
function initTable() {
  $("#tableList").html("")
  $("#tableList").append(`<tr>
                            <th class="has-background-success-light has-text-grey">Producto</th>
                            <th class="has-background-success-light has-text-grey">Cantidad</th>
                            <th class="has-background-success-light has-text-grey">Precio</th>
                            <th></th>
                            <th></th>
                          </tr>`);
};

$("document").ready(checkIfTable());

// Acá creo los botones de categorías del menú. Lo hago así por si en el menú se agregan nuevas categorías de ordenes, como Postre, se eliminan o modifican existentes.
for (const category in menuList) {
  let categoryContainer = document.getElementById("categories");
  let categorySelector = document.createElement("button");
  categorySelector.innerHTML = category;
  categoryContainer.appendChild(categorySelector);
  categorySelector.setAttribute("class", "categorySelectorClass button is-small is-rounded has-background-link-light has-text-link mx-1");
  categorySelector.setAttribute("onclick", `categorySelector(this.innerHTML)`);
}

// Acá voy mostrando los productos y sus respectivos precios, dependiendo de la categoría seleccionada
function categorySelector(category) {

  $("#product").html(""); //Vacío el div de botones.

  let list = menuList[category];

  for (const element in list) {
    $("#product").append(`<button class="button my-1 mx-2 p-1 is-justify-content-space-between has-background-info-light has-text-info" id="boton-${element}" value="boton-${element}">
                            <p class="productoBoton">${list[element].producto}</p>
                            <p class="precioBoton">USD $${list[element].precio}</p>
                            </button>`);
    $(`#boton-${element}`).click(() => addOrder(`boton-${element}`));
    sessionStorage.setItem(`boton-${element}`, JSON.stringify(list[element]));
  };
};

//Esta función sirve para añadir los productos a la orden
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
  
  let table = document.getElementById("tableList");
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
    console.log("yes");
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

    //Esto sirve para crear los botones de añadir o disminuir la cantidad de producto seleccionada.
    let plustd = document.createElement("td");
    let minustd = document.createElement("td");
    let plusButton = document.createElement("button");
    let minusButton = document.createElement("button");
    plusButton.setAttribute("onclick", `addOne(${i})`);
    plusButton.setAttribute("id", `plus-${i}`);
    plusButton.setAttribute("class","button is-rounded is-small")
    minusButton.setAttribute("onclick", `deleteOne(${i})`);
    minusButton.setAttribute("id", `minus-${i}`);
    minusButton.setAttribute("class","button is-rounded is-small")
    plusButton.innerHTML = "+";
    minusButton.innerHTML = "-";
    plustd.appendChild(plusButton);
    minustd.appendChild(minusButton);
    row.appendChild(minustd);
    row.appendChild(plustd);
  };
  table.appendChild(row);

  let totalElement = document.getElementById("total");

  suma(totalElement, totalOrder[i].precio, cantidad);


  document.getElementById("cantidadValor").value = "1";
};

//Con esta función hago tracking del total de la orden.
function suma(element, precio, cantidad) {
  let total = parseFloat(element.innerHTML);
  sum = total;
  prod = cantidad * precio;
  sum = sum + prod;
  element.innerHTML = `${sum}`;
};

//Le da la funcionalidad al botón de añadir cantidad.
function addOne(i) {
  modifyValue(i, "add");
};

//Le da la funcionalidad al botón de disminuir cantidad.
function deleteOne(i) {
  modifyValue(i, "delete");
};

//Añade o elimina la cantidad del producto, dependiendo del botón que se use.
function modifyValue(i, operation) {
  if (totalOrder[i].cantidad >= 0) {
    let modifiedCantidad = document.getElementById(`cantidad-${i}`);
    let newCantidad = document.createElement("td");
    let rowModified = document.getElementById(`order-${i}`);

    let totalElement = document.getElementById("total");

    if (operation == "add") {
      totalOrder[i].cantidad += 1;
      suma(totalElement, totalOrder[i].precio, 1);
    } else if (operation == "delete" && totalOrder[i].cantidad != 0) {
      totalOrder[i].cantidad -= 1;
      suma(totalElement, totalOrder[i].precio, -1);
    };

    newCantidad.innerHTML = totalOrder[i].cantidad;
    newCantidad.setAttribute("class", `cantidad`);
    newCantidad.setAttribute("id", `cantidad-${i}`);
    rowModified.replaceChild(newCantidad, modifiedCantidad);

  };
};

// Para desafío de AJAX

const URLPOST = 'https://jsonplaceholder.typicode.com/posts';


sendKitchen.onclick = () => {
  let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));
  if (kitchenOrder == null) {
    kitchenOrder = {};
  };
  let mesaNumero = localStorage.getItem("mesa");
  let date = new Date;
  let order = {};
  order.Orders = totalOrder;
  order.State = "Enviado";
  order.DateStart = date;
  console.log()
  kitchenOrder[`Mesa-${mesaNumero}`] = order;
  
  //Cambio el alert() por una función callback de post, que al tener un envío exitoso, haga aparecer el mensaje en la parte inferior.

  $.post(URLPOST,kitchenOrder,(state)=>{
    if(state = "success"){
      $("#alert").addClass("show");
      setTimeout(()=>{
        $("#alert").removeClass("show");
      },2000);
    };
  });
  localStorage.setItem("kitchenOrder", JSON.stringify(kitchenOrder));
};

closeTable.onclick = () => {

  let orderHistory = [];

  if(localStorage.orderHistory != null){
    orderHistory = JSON.parse(localStorage.getItem("orderHistory"));
  };
  
  let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));
  let mesaNumero = localStorage.getItem("mesa");
  let totalSpent = parseFloat(document.getElementById("total").innerHTML);
  let date = new Date;
  kitchenOrder[`Mesa-${mesaNumero}`].DateFinish = date;
  let timeSpent = Date.parse(kitchenOrder[`Mesa-${mesaNumero}`].DateFinish) - Date.parse(kitchenOrder[`Mesa-${mesaNumero}`].DateStart);
  dateText = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
  orderEnd = new orderFinished(kitchenOrder[`Mesa-${mesaNumero}`].Orders, timeSpent, totalSpent, mesaNumero, dateText);
  orderHistory.push(orderEnd);
  delete kitchenOrder[`Mesa-${mesaNumero}`];
  localStorage.setItem("kitchenOrder", JSON.stringify(kitchenOrder));
  document.getElementById("total").innerHTML = 0;
  totalOrder=[];
  alert("Mesa cerrada");
  initTable();
  localStorage.setItem("orderHistory",JSON.stringify(orderHistory));
};