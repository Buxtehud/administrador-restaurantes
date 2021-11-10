let kitchenOrder = JSON.parse(localStorage.getItem("kitchenOrder"));

for(const mesa in kitchenOrder){
    let number = mesa.split("-")[1];

    if(kitchenOrder[mesa].State == "Enviado" || kitchenOrder[mesa].State == "Cocinando"){
        $("#kitchenContainer").append(`<div class="card m-5" id="card${number}">
                                            <h3 class="title is-4 m-4">Mesa ${number}</h3>
                                            <p class="subtitle has-text-centered m-3" id="state${number}">${kitchenOrder[mesa].State}</p>
                                            <div class="card-content">
                                                <table class="tableKitchen table">
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                    </tr>
                                                    ${tableRows(mesa)}
                                                </table>
                                            </div>
                                            <div class="card-footer">
                                                <a class="card-footer-item" id="start${number}">Iniciar</a>
                                                <a class="card-footer-item" id="finish${number}">Terminar</a>
                                            </div>
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
        rows = rows + `<tr  class="m-2  ">
                        <td>${order[product].producto}</td>
                        <td class="has-text-centered">${order[product].cantidad}</td>
                       </tr>`;
    }
    return(rows);
};