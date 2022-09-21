// model

let shop=document.getElementById('shop');
let shopItemsData=[{id:"abc", name:'Organic Shito(Chili)', volume:"8 OZ",price:'10', INGREDIENTS:'Vegetable Oil, Salt, Onion, Tomatoes Paste, Ginger, Herrings, Pepper, Shrimps, Local Spices(Nketekete).',
img:"images/IMG_0628-PhotoRoom.png"},
 {id:"efg", name:'Organic Shito(Chili)', volume:"16 OZ",price:'20', INGREDIENTS:'Vegetable Oil, Salt, Onion, Tomatoes Paste, Ginger, Herrings, Pepper, Shrimps, Local Spices(Nketekete).',
 img:"images/IMG_0629-PhotoRoom.png"}]
 
 
 let basket=JSON.parse(localStorage.getItem("data")) || [];


 
//view
let generateShop =()=>{
  return (shop.innerHTML= shopItemsData.map((x)=>{
    let {id, name, volume,price,INGREDIENTS, img}=x;
    let search=basket.find((x)=>x.id===id) || [];
    return `
    <div id=product-id-${x.id} class="item">
        <img width="220"src="${x.img}" alt="">
        <div class="details">
          <h3>${x.name}</h3>
          <h4>${x.volume}</h4>
          <h5>INGREDIENTS:</h5>
          <p>
            ${x.INGREDIENTS}
          </p>
          <div class="price-quantity">
            <h2>$ ${x.price}</h2>
            <div class="button">
              <i  onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
              <div id=${x.id} class="quantity">
              ${search.item===undefined ? 0: search.item}
              </div>
              <i  onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
  
      
            </div>
          </div>
        
        </div>
      </div>`
  }).join(""));


};
//control
// creates and update the shop

generateShop();
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
  localStorage.setItem("data", JSON.stringify(basket));

 


};
let update =(id)=>{
  let search=basket.find((x)=>x.id===id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();

};
let calculation=()=>{
  let cartIcon=document.getElementById("cartAmount");
  cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);

};
calculation();
console.log(basket);

