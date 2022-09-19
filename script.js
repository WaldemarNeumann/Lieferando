let menus = ['Döner Tasche', 'Döner Teller', 'Avanti Rolle', 'Salat Mista', 'Bauernsalat', 'Salat Italia', 'Salat Mozzarela', 'Cola 0.33L', 'Fanta 0.33L', 'Sprite 0.33L'];
let descriptions = ['mit einer Fleischsorte nach Wahl, Salat, Cocktail und Tzatziki', 'mit einer Fleischsorte nach Wahl, Salat und einer Beilage nach Wahl', 'mit Peperoni, Käse und Souce Hollandaise', 'mit Essig-Öl-Dressing', 'mit Peperoni und Feta', 'mit Käse, Schinken und Ei', 'mit Mozzarela, Tomaten, Basilikum und Olivenöl, ohne Eisbergsalat, Gurken und Zwiebeln', '', '', ''];
let prices = ['6.00', '10.50', '9.50', '7.00', '9.00', '9.00', '9.00', '2.00', '2.00', '2.00'];

let basketmenus = [];
let basketdescriptions = [];
let basketprices = [];
let basketamounts = [];

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        const description = descriptions[i];
        const price = prices[i];


        content.innerHTML += /*html*/ `
             <div class="headMenu padding-left-right">
                <div class="menus">
                    <p id="name">${menu}</p>
                    <p id="description">${description}</p>
                    <b id="price"><p class="price">${price}€</p></b>        
                </div>

                <div class="positionPlus">
                    <button onclick="addMenu(${i}); renderShoppingCard();" class="plus">+</button>
                </div>
            </div>
        `;
    }

}

function addMenu(i) {
    let menu = menus[i]
    let price = prices[i]
    let description = descriptions[i]
    let index = basketmenus.indexOf(menu)
    if (index == -1) {
        basketmenus.push(menu)
        basketdescriptions.push(description)
        basketprices.push(price)
        basketamounts.push(1)
    } else {
        basketamounts[index]++
    }
}

function renderShoppingCard() {
    let shoppingBasket = document.getElementById('shoppingCard');
    let totalShoppingCard = document.getElementById('totalShoppingCard');

    shoppingBasket.innerHTML = '';
    totalShoppingCard.innerHTML = '';


    for (let i = 0; i < basketmenus.length; i++) {
        const renderfood = basketmenus[i]
        const renderdescript = basketdescriptions[i]
        const renderprice = basketprices[i]
        const renderamount = basketamounts[i]

        shoppingBasket.innerHTML += /*html*/ `
            <div class="menus">
                <div class="menus1">
                    <p>${renderamount}</p>
                    <p class="shopMenu"><u>${renderfood}</u></p>
                    <b class="shopPrice"><p class="price">${(renderprice * renderamount).toFixed(2).replace(".", ",")} €</p></b> 
                    </div>

                    <div>
                        <p class="shopDescription">${renderdescript}</p>
                    </div>
                    
                    <div class="container_button">
                        <a href="#" class="annotation">Anmerkung hinzufügen</a>
                        <div class="containerButton">
                            <button class="button" onclick="removePortion(${i})">-</button>
                            <button class="button" onclick="addPortion(${i})">+</button>
                        </div>
                       
                    </div>
                    <hr class="grey-line1">
                </div>
            </div>

        `;

    }

    totalShoppingCard.innerHTML = /*html*/ `
        <div id="minimumSum">
            <div class="minimumOrderValue">
                <p id="minsum"></p>
                <p id="minSum" class="amountMinimumOrderValue"></p>
            </div>

            <div>
                <p class="discriptionMinimumOrderValue">Leider kannst du noch nicht bestellen. Avanti Restaurant liefert erst ab einem Mindestbestellwert von 15,00 € (exkl. Lieferkosten).</p>
            </div>
        </div>

        <div class="underShoppingCard">
            <p class="bigFont">Zwieschensumme</p>
            <p class="bigFont" id="subtotal"></p>
        </div>

        <div class="underShoppingCard">
            <p class="bigFont">Lieferkosten</p>
            <p class="bigFont">Kostenlos</p>
        </div>
    
        <div class="underShoppingCard">
            <p class="bigFont">Gesamt</p>
            <p class="bigFont" id="sum"></p>
        </div>

        <div onclick="pay()" id="card" class="totalShoppingCard">
            <h3>Bezahlen</h3> <br>
            <p class="subTotal" id="subTotal"></p>
        </div>

      
    `;
    total();
    minSum();
    closeShoppingCart();
}


function total() {

    let sum = 0
    for (let i = 0; i < basketprices.length; i++) {
        sum += (basketamounts[i] * basketprices[i])
        document.getElementById('subtotal').innerHTML = `${sum.toFixed(2).replace(".", ",")} €`;
        document.getElementById('subTotal').innerHTML = `(${sum.toFixed(2).replace(".", ",", "&nbsp")} €)`;
        document.getElementById('sum').innerHTML = `${sum.toFixed(2).replace(".", ",")} €`;
    }
}

function minSum() {

    let toTal = 0
    for (let i = 0; i < basketprices.length; i++) {

        toTal += (basketamounts[i] * basketprices[i])
        let min = (15 - toTal)

        if (toTal < 15) {
            document.getElementById("minsum").innerHTML = `<p>Benötigter Betrag, um den Mindestbestellwert zu erreichen</p>`;
            document.getElementById('minSum').innerHTML = `${min.toFixed(2).replace(".", ",",)} €`;

        } else {
            document.getElementById("minimumSum").classList.add("d-none");
            document.getElementById('card').classList.add("activatePayment");

        }
    }
}

function closeShoppingCart() {

    let minMin = 0
    for (let i = 0; i < basketprices.length; i++) {

        minMin += (basketamounts[i] * basketprices[i])
    }

    if (minMin > 0) {
        document.getElementById('basket').classList.add("d-none");
        document.getElementById('shoppingCard').classList.remove("d-none");
        document.getElementById('totalShoppingCard').classList.remove("d-none");
    } else {
        document.getElementById('basket').classList.remove("d-none");
        document.getElementById('shoppingCard').classList.add("d-none");
        document.getElementById('totalShoppingCard').classList.add("d-none");
    }
}

function addPortion(i) {
    basketamounts[i]++
        renderShoppingCard()

}

function removePortion(i) {
    if (basketamounts[i] > 1) {
        basketamounts[i]--
    } else {
        deleteItem(i)
    }
    renderShoppingCard()
}

function deleteItem(i) {
    basketmenus.splice(i, 1)
    basketamounts.splice(i, 1)
    basketprices.splice(i, 1)
    basketdescriptions.splice(i, 1)
}

function pay() {
    let pay = document.getElementById('payContent');

    pay.innerHTML = '';

    pay.innerHTML = /*html*/ `
        <div id="close" class="pay">
            <div class="payBackground">
                <img class="checkmark" src="img/check-mark.png">
                <p class="checkmarkDiscription">Vielen Dank, Ihre Bestellung wurde aufgenommen.</p>

            </div>

            <div onclick="closeImage()" class="closes">&times;</div>


        </div>

    `;
}

function closeImage() {
    document.getElementById('close').classList.add("d-none");
}