let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));

for(const mesa in kitchenOrder){
    let number = mesa.split("_")[1];
    $("#kitchenContainer").append(`<div class="card">
                                        <h3>Mesa ${number}</h3>
                                        <p id="state${number}">${kitchenOrder[mesa].State}</p>
                                        <table class="tableKitchen">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                            </tr>
                                            ${tableRows(mesa)}
                                        </table>
                                        <button id="start${number}">Iniciar</button>
                                        <button id="finish${number}">Terminar</button>
                                   </div>`);
    $(`#start${number}`).click(()=>{
        kitchenOrder[mesa].State = "Cocinando";
        $(`#state${number}`).html(`${kitchenOrder[mesa].State}`);
    });
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

