let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((item) => item.quantity)
    .reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((item) => {
        let { id, quantity } = item;

        let search = shopItemsData.find((product) => product.id === id) || [];
        let { img, price, name } = search;
        return `
           <div class='cart-item'>
           <img width= '100' src=${img} alt='item'/>
           <div class="details">
           <div class= 'title-price-product'>
           <h4 class= "title-price">
           <p>${name}</p>
           <p class='cart-item-price'> $ ${price}</p>
           </h4>
           <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
           </div>
           <div class="buttons">
               <i onclick= "decrement(${id})" class="bi-dash"></i>
                 <div id=${id} class="quantity">${quantity}</div>
                  <i onclick= "increment(${id})"class="bi-plus-lg"></i> 
            </div>  
           <h3>$ ${quantity * price}</h3>
           </div>
           </div>
           `;
      })
      .join(" "));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back home</button>
        </a>
        `;
  }
};
generateCartItems();

let increment = (item)=>{
  let selectedItem=item;
  
 let search= basket.find((product)=>product.id === selectedItem.id)
 if (search === undefined){
  basket.push({
      id:selectedItem.id,
      quantity:1
  })
}else{
  search.quantity +=1
}


//console.log(basket)
update(selectedItem.id)
generateCartItems()
localStorage.setItem("data", JSON.stringify(basket))
}
let decrement =(item)=>{
  
  let selectedItem=item;
  
 let search= basket.find((product)=>product.id === selectedItem.id)
 if (search == undefined) return;
 else if (search.quantity === 0) return;
 else{
  search.quantity -=1
}
//console.log(basket)
update(selectedItem.id)
basket = basket.filter((item)=> item.quantity !== 0)
generateCartItems()
localStorage.setItem("data", JSON.stringify(basket))
}

let update =(id)=>{
  let search = basket.find((product)=> product.id === id )
  //console.log(search.quantity)
  document.getElementById(id).innerHTML= search.quantity
calculation()
TotalAmount()
}

let removeItem = (id)=>{
  let selectedItem = id;
  //console.log(selectedItem)
  basket = basket.filter((product)=>product.id !== selectedItem.id)
  generateCartItems();
  TotalAmount()
  calculation()
  localStorage.setItem("data", JSON.stringify(basket))

};
let clearCart = ()=>{
  basket=[]
  generateCartItems();
  calculation()
  localStorage.setItem("data", JSON.stringify(basket))

}

let TotalAmount = ()=>{
  if(basket.length !== 0){
    let amount = basket.map((selectedProduct)=>{
      let {quantity, id} = selectedProduct;
      let search = shopItemsData.find((product) => product.id === id) || [];
      return quantity * search.price

    }). reduce ((x,y)=> x + y, 0)
    //console.log(amount)
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
  <button class="checkout">Checkout</button>
  <button onclick= 'clearCart()'class="removeAll">Clear Cart</button>
    `
  }

}
TotalAmount()