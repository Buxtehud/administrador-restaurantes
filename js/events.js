function orderMenu(number) {
  localStorage.setItem("mesa", number);
  window.location = "./order.html";
};

function categorySelector(category) {
  listProd.innerHTML = "";
  let list = menuList[category];
  for (const element in list) {
    let productButton = document.createElement("button");
    let listedProducts = document.createElement("p");
    let listedPrices = document.createElement("p");
    listedProducts.innerHTML = `${list[element].producto}`;
    listedPrices.innerHTML = `USD ${list[element].precio}`;
    productButton.appendChild(listedProducts);
    productButton.appendChild(listedPrices);
    listProd.appendChild(productButton);
    listedProducts.setAttribute("class", "producto");
    listedPrices.setAttribute("class", "precio");
    productButton.setAttribute("id", `boton-${element}`);
    productButton.setAttribute("value", `boton-${element}`);
    productButton.setAttribute("onclick", "addOrder(this.value)");
    sessionStorage.setItem(`boton-${element}`, JSON.stringify(list[element]));
  }
};

function addOrder(value) {
  let food = sessionStorage.getItem(value);
  let orderedFood = JSON.parse(food);
  let cantidad = parseInt(document.getElementById("cantidadValor").value);
  const orderAdded = new newOrder(
    orderedFood.producto,
    cantidad,
    orderedFood.precio
  );
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
    let modifiedCantidad = document.getElementById(`cantidad-${i}`);
    let newCantidad = document.createElement("td");
    let rowModified = document.getElementById(`order-${i}`);
    newCantidad.innerHTML = totalOrder[i].cantidad;
    newCantidad.setAttribute("class", `cantidad`);
    newCantidad.setAttribute("id", `cantidad-${i}`);
    rowModified.replaceChild(newCantidad, modifiedCantidad);
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
    let plus = document.createElement("button");
    let minus = document.createElement("button");
    plus.setAttribute("onclick", `addOne(${i})`);
    minus.setAttribute("onclick", `deleteOne(${i})`);
    plus.innerHTML = "+";
    minus.innerHTML = "-";
    row.appendChild(plus);
    row.appendChild(minus);
  };
  table.appendChild(row);

  let total = document.getElementById("total");
  sum = 0;

  for (let i = 0; i < totalOrder.length; i++) {
    let prod = 0;
    prod = totalOrder[i].cantidad * totalOrder[i].precio;
    sum = sum + prod;
  };

  total.innerHTML = sum;
};

function addOne(i) {
  modifyValue(i,"add");
};

function deleteOne(i) {
  modifyValue(i,"delete");
};

function modifyValue(i,operation){
  if (totalOrder[i].cantidad >= 0) {
    if(operation == "add"){
      totalOrder[i].cantidad += 1;
    } else if(operation == "delete" && totalOrder[i].cantidad != 0) {
      totalOrder[i].cantidad -= 1;
    };
    let modifiedCantidad = document.getElementById(`cantidad-${i}`);
    let newCantidad = document.createElement("td");
    let rowModified = document.getElementById(`order-${i}`);
    newCantidad.innerHTML = totalOrder[i].cantidad;
    newCantidad.setAttribute("class", `cantidad`);
    newCantidad.setAttribute("id", `cantidad-${i}`);
    rowModified.replaceChild(newCantidad, modifiedCantidad);
    let total = document.getElementById("total");
    sum = 0;

    for (let i = 0; i < totalOrder.length; i++) {
      let prod = 0;
      prod = totalOrder[i].cantidad * totalOrder[i].precio;
      sum = sum + prod;
    }

    total.innerHTML = sum;
  };
};

sendKitchen.onclick = () => {
  let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));
  if( kitchenOrder == null){
    kitchenOrder = {};
  };
  let mesaNumero = localStorage.getItem("mesa");
  let order = {};
  order.Orders = totalOrder;
  order.State = "enviado";
  kitchenOrder[`Mesa_${mesaNumero}`] = order;
  localStorage.setItem("kitchenOrder",JSON.stringify(kitchenOrder))
};