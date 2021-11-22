main() // Appel de la fonction principale

async function main() { // Fonction principale en asynchrone
    const productId =  getProductId()
    const product = await getProduct(productId)
    fillProduct(product)
}

function getProductId() { // Nouvelle url pour chaque produits
    return new URL(location.href).searchParams.get('id')
}

function getProduct(productId) { // On récolte les données du tableau
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

function fillProduct(product){ // Ajout des éléments constructeurs via le DOM
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
}
