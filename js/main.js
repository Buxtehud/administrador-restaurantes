const menuList = JSON.parse(menu);

let mesaNumero = localStorage.getItem("mesa");

let mesaNombre = document.getElementById("mesa");
mesaNombre.innerHTML = `Mesa ${mesaNumero}`;

for (const category in menuList) {
  let categoryContainer = document.getElementById("categories");
  let categorySelector = document.createElement("button");
  categorySelector.innerHTML = category;
  categoryContainer.appendChild(categorySelector);
  categorySelector.setAttribute("class", "categorySelectorClass");
  categorySelector.setAttribute("onclick", `categorySelector(this.innerHTML)`);
}

let listProd = document.getElementById("product");

let table = document.getElementById("tableList");

let sendKitchen = document.getElementById("sendKitchen");
