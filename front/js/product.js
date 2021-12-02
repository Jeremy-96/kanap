/**
 * Fonction principale
 */
main() 

async function main() { 
    const productId =  getProductId()
    const product = await getProduct(productId)
    fillProduct(product)
}

/**
 * La foncion ci-dessous crée une nouvelle url pour chaque produits
 */
function getProductId() { 
    return new URL(location.href).searchParams.get('id')
}

/**
 * On récolte les données du tableau
 */
function getProduct(productId) { 
    return fetch(`http://localhost:3000/api/products/${productId}`)
        .then(function(response) {
            return response.json()
        })
        .then(function(products) {
            return products
        })
        .catch (function(err) {
            alert(err)
        })
}

/**
 * La fonction ci-dessous va permettre l'ajout des éléments html de manière dynamique
 */
function fillProduct(product){ 
    const imageItm = document.querySelector('.item__img');
    const addImg = document.createElement('img');
    addImg.src = product.imageUrl;
    addImg.alt = product.altTxt;
    imageItm.appendChild(addImg);
    document.getElementById('title').textContent = product.name
    document.getElementById('price').textContent = product.price
    document.getElementById('description').textContent = product.description
    const selectElt = document.querySelector('select');
    let optionElt;
    for (color of product.colors) {
        optionElt = document.createElement('option');
        optionElt.setAttribute('value', color);
        optionElt.textContent = color;
        selectElt.appendChild(optionElt);
    }
    
    /**
     * La fonction ci-dessous va envoyer les données du produit selectionné dans le localStorage :
     * On écoute le click du bouton 'Ajouter au panier'
     * Création de la fiche produit avec ses informations
     * Stockage de la fiche produit dans un tableau
     * Le tableau est stocker dans le localStorage
     */
    const sendToCart = document.getElementById('addToCart');

    // On écoute le click du bouton 'Ajouter au panier'
    sendToCart.addEventListener('click',(event) => {
        event.preventDefault();
        
        //Création de la fiche produit avec ses informations
        const itemCart = {
            id: product._id,
            name: product.name,
            quantity: quantity.value,
            color: document.getElementById('colors').value,
            price: product.price, 
            img: product.imageUrl,
            alt: product.altTxt,
        };

        // Stockage de la fiche produit dans un tableau
        let localItems = JSON.parse(localStorage.getItem('itemToCart'));
        if(localItems) {
            let newQuantity = parseInt(itemCart.quantity);
            for(i = 0; i < localItems.length; i++) {
                if(localItems[i].id == itemCart.id && localItems[i].color == itemCart.color) {
                    newQuantity += parseInt(localItems[i].quantity);
                    localItems.splice(i,1);
                }
            }
            itemCart.quantity = newQuantity;
            if (newQuantity > 0) {
                // Le tableau est stocker dans le localStorage
                localItems.push(itemCart);
            }
            localStorage.setItem('itemToCart', JSON.stringify(localItems));
        }else {
            localItems = [];
            // Le tableau est stocker dans le localStorage
            localItems.push(itemCart);
            localStorage.setItem('itemToCart', JSON.stringify(localItems))
        }  
    });
}




