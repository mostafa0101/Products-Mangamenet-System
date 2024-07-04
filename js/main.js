var title = document.getElementById("title");
var price = document.getElementById("price");
var discount = document.getElementById("discount");
var total =document.getElementById("total");
var count =document.getElementById("count");
var category =document.getElementById("category");
var submit =document.getElementById("submit");

var mood='addProduct';
var tmp;

// Function get total
function getTotal(){
    if(price.value != ""){
        var result = +price.value - +discount.value;
        total.innerHTML=result;
        total.style.background='#060';
    }else{
        total.innerHTML="";
        total.style.background='red';
    }
}



// Function ADD Product
var productData;

if(localStorage.localProduct != null){
    productData = JSON.parse(localStorage.localProduct);
}else{
    productData=[];
}

function addProduct(){
    var product={
        title:title.value,
        price:price.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    
    if(mood==='addProduct'){
        if(product.count > 1){
            for(var i=0; i < product.count; i++){
                productData.push(product);
            }
        }else{
            productData.push(product);
        }
    }else{
            productData[tmp] = product;
            mood="addProduct";
            submit.innerHTML='Add Product';
            count.style.display='block'
    }
    
    // SAVE in LOCAL STORAGE
    localStorage.setItem('localProduct', JSON.stringify(productData));
    
    resetInput();
    display();

}


// Function RESET INPUT
function resetInput(){
    title.value ="";
    price.value ="";
    discount.value ="";
    category.value ="";
    count.value ="";

}


// FUNCTION CLEAR ALL DATA
function deleteAll(){
    productData.splice(0);
    localStorage.localProduct = JSON.stringify(productData);
    display();
}


// FUNCTION DELETE PRODUCT
function deleteProduct(i){
    productData.splice(i,1)
    localStorage.clear();
    display();
}


// FUNCTION UPDATE PRODUCT
function updateProduct(i){
    title.value = productData[i].title;
    price.value = productData[i].price;
    discount.value = productData[i].discount;
    getTotal();
    category.value = productData[i].category;

    count.style.display='none';
    submit.innerHTML='Update';  
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

// FUNCTION DISPLAY DATA
function display(){
    var box='';

    for(var i=0; i < productData.length; i++){
        box +=`<tr>
                    <td>${i+1}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].discount}</td>
                    <td>${productData[i].category}</td>
                    <td><button class="btn btn-outline-primary" onclick="updateProduct(${i})" id="update">Update</button></td>
                    <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>`
    }
    document.getElementById('tbody').innerHTML=box;

    var deletebtn = document.getElementById("deleteAll");
    if(productData.length > 0){
        deletebtn.innerHTML = `
        <button class="btn btn-outline-danger" onclick="deleteAll()">Delete All (${productData.length}) </button>
        `
    }else{
        deletebtn.innerHTML =""
    }
    getTotal()
}
display();



// FUNCTION SEARCH MOOD
var searchMood='title';

function search(value){
    var box='';
    for(var i=0; i < productData.length; i++){
        if(productData[i].title.includes(value)){
            box +=`<tr>
            <td>${i+1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].category}</td>
            <td><button class="btn btn-outline-primary" onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>`
        }
    }
    document.getElementById('tbody').innerHTML=box;

}
