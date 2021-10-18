let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));

for(const mesa in kitchenOrder){
    let number = mesa.split("-")[1];

    if(kitchenOrder[mesa].State == "Enviado" || kitchenOrder[mesa].State == "Cocinando"){
        $("#kitchenContainer").append(`<div class="card" id="card${number}">
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
        $(`#start${number}`).click(() => {
            kitchenOrder[mesa].State = "Cocinando";
            $(`#state${number}`).html(`${kitchenOrder[mesa].State}`);
            localStorage.setItem("kitchenOrder",JSON.stringify(kitchenOrder));
        });

        $(`#finish${number}`).click(() => {
            kitchenOrder[mesa].State = "Terminado";
            $(`#card${number}`).slideUp();
            localStorage.setItem("kitchenOrder",JSON.stringify(kitchenOrder));
            }
        );

    };
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

