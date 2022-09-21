//Model
let shopItemsData=[{id:"abc", name:'Organic Shito(Chili)', volume:"8 OZ",price:'10', INGREDIENTS:'Vegetable Oil, Salt, Onion, Tomatoes Paste, Ginger, Herrings, Pepper, Shrimps, Local Spices(Nketekete).',
img:"images/IMG_0628-PhotoRoom.png"},
 {id:"efg", name:'Organic Shito(Chili)', volume:"16 OZ",price:'20', INGREDIENTS:'Vegetable Oil, Salt, Onion, Tomatoes Paste, Ginger, Herrings, Pepper, Shrimps, Local Spices(Nketekete).',
 img:"images/IMG_0629-PhotoRoom.png"}]

//view
 let generatCartItems=()=>{
  if (basket.length !==0){
    return (shoppingcart.innerHTML=basket.map((x)=>{
      console.log(x);
      let {id,item}=x;
      let search=shopItemsData.find((y)=>y.id===id) || [];
      return `
      <div class="cart-item">
        <img  width="100" src=${search.img} alt=""/>
        <div class="details">


        <div class="title-price-x">
        <h4 class="title-price"> 
        <p>${search.name}</p>
        <p class="cart-item-price"> $${search.price} </p>
        </h4>
        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
        
        </div>


        <div class="button">
              <i  onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
              <div id=${x.id} class="quantity">${item}</div>
              <i  onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
  
      
            </div>
            <h3>
            $ ${item * search.price}
            </h3>

        </div>
        
        
        </div>`;
    }).join(''));
  }
  else{
    shoppingcart.innerHTML=``;
    label.innerHTML=` <h2> Cart is empty.</h2>
    <a href=" index.html">
        <button class="HomeBtn"> Back to home</button></a>`;

  }
}
let basket=JSON.parse(localStorage.getItem("data")) || [];



//view

let label=document.getElementById('label');
let shoppingcart=document.getElementById('shopping-cart');




//control


let calculation=()=>{
  let cartIcon=document.getElementById("cartAmount");
  cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);

};
calculation();

generatCartItems();
let increment =(id)=>{
  let selectedItem=id;
  let search=basket.find((x)=>x.id===selectedItem.id);
  if (search===undefined){
    basket.push({
      id: selectedItem.id,
      item:1,
    })

  }
  else{
    search.item +=1;
  }

  

 
  generatCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));

};
let decrement =(id)=>{
  let selectedItem=id;
  let search=basket.find((x)=>x.id===selectedItem.id);
  if (search===undefined) return;
  else if (search.item===0) return;
  else{
    search.item -=1;
  }

  update(selectedItem.id);

  basket=basket.filter((x)=>x.item !==0);
  generatCartItems();
  localStorage.setItem("data", JSON.stringify(basket));

 


};
let update =(id)=>{
  let search=basket.find((x)=>x.id===id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();

};
let removeItem =(id)=>{

  let selectItem=id;
  basket=basket.filter((x)=>x.id !==selectItem.id);
  generatCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));



}
let TotalAmount=()=>{
  if (basket.length != 0){
    let amount = basket.map((x)=>{
      let {item, id}=x;
      let search=shopItemsData.find((y)=>y.id===id) || [];
      return item* search.price;



    }).reduce((x,y)=>x+y,0);
    
  label.innerHTML=`
  <h2> Total Bill: $ ${amount}</h2>
  <button onclick="checkoutbtn()"  class="checkout">checkout</button>
  <button onclick="clearCart()"class="removeAll">clear cart</button>`

  }else return;
};
TotalAmount();

let clearCart =()=>{
  basket=[]
  generatCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
  
}

let checkoutbtn=()=>{
  const finalItems= basket;



}


  
  
