/**
 * Fonction principale
 */
main() 

async function main() { 
    const products =  await getProducts()
    for(product of products) { 
        displayProducts(product)
    }
}

/**
 * On récolte les données du tableau
 */
function getProducts() { 
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

/**
 * La fonction ci-dessous va permettre l'ajout des éléments html de manière dynamique
 */
function displayProducts(product) { 
    // On récupère la balise <section> qui contient les produits
    const items = document.getElementById('items');

    // Création des différentes balises nécessaires à l'affichage des produits
    const aElt = document.createElement('a');
    const articleElt = document.createElement('article');
    const imgElt = document.createElement('img');
    const hElt = document.createElement('h3');
    const pElt = document.createElement('p');

    // Ajout des classes aux balises
    hElt.classList.add('productName');
    pElt.classList.add('productDescription');

    // Integration des éléments  visibles dans chaque balises (images, textes, etc...)
    items.appendChild(aElt) + aElt.appendChild(articleElt);
    articleElt.appendChild(imgElt) + articleElt.appendChild(hElt) + articleElt.appendChild(pElt);
    
    // On insert les valeurs des produits contenues dans le tableau
    articleElt.querySelector('h3').textContent = product.name
    articleElt.querySelector('p').textContent = product.description
    articleElt.querySelector('img').src = product.imageUrl 
    articleElt.querySelector('img').alt = product.altTxt
    aElt.href += `product.html?id=${product._id}`   
}








