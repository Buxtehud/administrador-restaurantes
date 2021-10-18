class newOrder {
  constructor(producto, cantidad, precio) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.precio = precio;
  }
};

class orderFinished {
  constructor(order, timeSpent, totalSpent, table, date){
    this.order = order;
    this.timeSpent = timeSpent;
    this.totalSpent = totalSpent;
    this.table = table;
    this.date = date;
  }
}

let totalOrder = [];