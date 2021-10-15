let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));

for(const mesa in kitchenOrder){
    let number = mesa.split("_")[1];
    $("#kitchenContainer").append(`<div class="card">
                                        <h3>Mesa ${number}</h3>
                                        <table class="tableKitchen">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                            </tr>
                                            ${tableRows(mesa)}
                                        </table>
                                        <button>Iniciar</button>
                                        <button>Terminar</button>
                                   </div>`);

};

function tableRows(mesa){
    let order = kitchenOrder[mesa].Orders;
    let rows = "";
    for(const product in order){
        rows = rows + `<tr>
                        <td>${order[product].producto}</td>
                        <td>${order[product].cantidad}</td>
                       </tr>`;
    }
    return(rows);
};