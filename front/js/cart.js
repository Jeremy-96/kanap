// On récupère les items stockés dans le localStorage
let localItems = JSON.parse(localStorage.getItem('itemToCart')); 

/**
 * La condition ci-dessous va analyser si un article se trouve dans le localStorage ou non
 * SI ce n'est pas le cas, alors rien ne s'affiche
 * SINON on va itérer sur tous les éléments du tableau, un élément correspond à un produit.
 * Ensuite on affichera les produits contenus dans le tableau de manière dynamique avec le DOM
 */
if(localItems === null) {
        console.log('Aucun article dans le panier');
}else {
    for(k = 0; k < localItems.length; k++) {
        // On récupère la balise <section> qui contient les produits du panier
        const cartItemsElt = document.getElementById('cart__items'); 

        // Création des différentes balises nécessaires à l'affichage des produits
        const articleElt = document.createElement('article'); 
        const divImgElt = document.createElement('div');
        const divContentElt = document.createElement('div');
        const imgElt = document.createElement('img');
        const titlePrice = document.createElement('div');
        const settings = document.createElement('div');
        const settingsQuantity = document.createElement('div');
        const settingsDelete = document.createElement('div');
        const hElt = document.createElement('h2');
        const pElt = document.createElement('p');
        const pDeleteElt = document.createElement('p');
        const inputElt = document.createElement('input');

        // Ajout des classes aux balises
        articleElt.classList.add('cart__item');
        divImgElt.classList.add('cart__item__img');
        divContentElt.classList.add('cart__item__content');
        titlePrice.classList.add('cart__item__content__titlePrice');
        settings.classList.add('cart__item__content__settings');
        settingsQuantity.classList.add('cart__item__content__settings__quantity');
        settingsDelete.classList.add('cart__item__content__settings__delete');
        inputElt.classList.add('itemQuantity');
        pDeleteElt.classList.add('deleteItem');

        // Integration des éléments  visibles dans chaque balises (images, textes, etc...)
        divImgElt.appendChild(imgElt);
        settingsQuantity.appendChild(inputElt);
        settingsDelete.appendChild(pDeleteElt);
        settings.appendChild(settingsQuantity) + settings.appendChild(settingsDelete);
        divContentElt.appendChild(titlePrice) + divContentElt.appendChild(settings);
        titlePrice.appendChild(hElt) + titlePrice.appendChild(pElt);
        settingsQuantity.appendChild(pElt);
        articleElt.appendChild(divImgElt) + articleElt.appendChild(divContentElt);

        // On insert les valeurs des produits contenues dans le tableau
        divImgElt.querySelector('img').alt = localItems[k].alt;
        divImgElt.querySelector('img').src = localItems[k].img;
        titlePrice.querySelector('h2').textContent = localItems[k].name;
        //titlePrice.querySelector('p').textContent = localItems[k].price;
        settingsQuantity.querySelector('p').textContent =`Qté : ${localItems[k].quantity}`;
        pDeleteElt.textContent = 'Supprimer';
        '====='
        console.log(cartItemsElt);
        '====='
        // On intègre le produit sélectionné dans la balise section du panier
        cartItemsElt.appendChild(articleElt);        
    }
}





