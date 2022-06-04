let shop= document.getElementById('shop')
let shopItemsData=[
    {
        id:'item1',
        name:'casual Shirt',
        price: 45,
        desc: ' Lorem ipsum dolar sit amt consectetur adipisicing',
        img:'images/img-4.jpg'
    },
    {
        id:'item2',
        name:'casual Shirt',
        price: 45,
        desc: ' Lorem ipsum dolar sit amt consectetur adipisicing',
        img:'images/img-3.jpg'
    },
    {
        id:'item3',
        name:'casual Shirt',
        price: 45,
        desc: ' Lorem ipsum dolar sit amt consectetur adipisicing',
        img:'images/img-2.jpg'
    },
    {
        id:'item4',
        name:'casual Shirt',
        price: 45,
        desc: ' Lorem ipsum dolar sit amt consectetur adipisicing',
        img:'images/img-1.jpg'
    },
    {
        id:'item5',
        name:'casual Shirt',
        price: 45,
        desc: ' Lorem ipsum dolar sit amt consectetur adipisicing',
        img:'images/img-6.png'
    },   
     {
        id:'item6',
        name:'casual Shirt',
        price: 45,
        desc: ' Lorem ipsum dolar sit amt consectetur adipisicing',
        img:'images/img-7.png'
    },
    {
        id:'item7',
        name:'casual Shirt',
        price: 45,
        desc: ' Lorem ipsum dolar sit amt consectetur adipisicing',
        img:'images/img-8.png'
    },
    {
        id:'item8',
        name:'casual Shirt',
        price: 45,
        desc: ' Lorem ipsum dolar sit amt consectetur adipisicing',
        img:'images/img-5.png'
    },

]
let basket= JSON.parse(localStorage.getItem("data")) || [];
let generateShop= ( )=>{
    return (
        shop.innerHTML= shopItemsData.map((item )=>{
            let {id, name, price,img, desc}= item;
            let search = basket.find((x)=> x.id) ||[]
            return `
            <div id=product-id-${id} class="item">
            <img width = '220' src=${img} alt="shirt">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                       <i onclick= "decrement(${id})" class="bi-dash"></i>
                       <div id=${id} class="quantity">${search.quantity === undefined? 0: search.quantity}</div>
                       <i onclick= "increment(${id})"class="bi-plus-lg"></i> 
                    </div>
                </div>
            </div>
           </div>  
            `

        })
       
        .join("")
    )
}
generateShop()

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

localStorage.setItem("data", JSON.stringify(basket))
}

let update =(id)=>{
    let search = basket.find((product)=> product.id === id )
    //console.log(search.quantity)
    document.getElementById(id).innerHTML= search.quantity
calculation()
}

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((item) => item.quantity).reduce((x,y)=> x +y, 0) 


}

calculation()