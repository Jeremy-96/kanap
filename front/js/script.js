main() // Appel de la fonction principale

async function main() { // Fonction principale en asynchrone
    const products =  await getProducts()

    for(product of products) { 
        displayProducts(product)
    }
}

function getProducts() { // On récolte les données du tableau
    return fetch('http://localhost:3000/api/products')
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

function displayProducts(product) { // Ajout des éléments constructeurs via le DOM (balises, classes, liens ...)
    const items = document.getElementById('items');
    const aElt = document.createElement('a');
    const articleElt = document.createElement('article');
    const imgElt = document.createElement('img');
    const hElt = document.createElement('h3');
    const pElt = document.createElement('p');

    items.appendChild(aElt) + aElt.appendChild(articleElt);

    hElt.classList.add('productName');
    pElt.classList.add('productDescription');
    
    articleElt.appendChild(imgElt) + articleElt.appendChild(hElt) + articleElt.appendChild(pElt);
    articleElt.querySelector('h3').textContent = product.name
    articleElt.querySelector('p').textContent = product.description
    articleElt.querySelector('img').src = product.imageUrl 
    articleElt.querySelector('img').alt = product.altTxt
    aElt.href += `product.html?id=${product._id}`   
}








