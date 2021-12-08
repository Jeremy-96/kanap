// On récupère les items stockés dans le localStorage
let localItems = JSON.parse(localStorage.getItem('itemToCart')); 

/**
 * La condition ci-dessous va analyser si un article se trouve dans le localStorage ou non
 * SI ce n'est pas le cas, alors rien ne s'affiche
 * SINON on va itérer sur tous les éléments du tableau, un élément correspond à un produit.
 * Ensuite on affichera les produits contenus dans le tableau de manière dynamique avec le DOM
 */
if(localItems === null) {
    console.log('Le panier est vide');
}else {
    for(j = 0; j < localItems.length; j++) {
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
        const pEltPrice = document.createElement('p');
        const pDeleteElt = document.createElement('p');
        const inputElt = document.createElement('input');

        // Ajout des classes aux balises
        articleElt.classList.add('cart__item');
        articleElt.setAttribute('data-id', `${localItems[j].id}`);
        divImgElt.classList.add('cart__item__img');
        divContentElt.classList.add('cart__item__content');
        titlePrice.classList.add('cart__item__content__titlePrice');
        settings.classList.add('cart__item__content__settings');
        settingsQuantity.classList.add('cart__item__content__settings__quantity');
        settingsDelete.classList.add('cart__item__content__settings__delete');
        inputElt.setAttribute('type', 'number');
        inputElt.classList.add('itemQuantity');
        inputElt.setAttribute('name', 'itemQuantity');
        inputElt.setAttribute('min', '1');
        inputElt.setAttribute('max', '100');
        inputElt.setAttribute('value', localItems[j].quantity);
        pDeleteElt.classList.add('deleteItem');

        // Integration des éléments  visibles dans chaque balises (images, textes, etc...)
        divImgElt.appendChild(imgElt);
        settingsQuantity.appendChild(inputElt);
        settingsDelete.appendChild(pDeleteElt);
        settings.appendChild(settingsQuantity) + settings.appendChild(settingsDelete);
        divContentElt.appendChild(titlePrice) + divContentElt.appendChild(settings);
        titlePrice.appendChild(hElt) + titlePrice.appendChild(pEltPrice);
        settingsQuantity.appendChild(pElt) + settingsQuantity.appendChild(inputElt);
        articleElt.appendChild(divImgElt) + articleElt.appendChild(divContentElt);
        let totalPriceByElt = localItems[j].quantity*localItems[j].price;
        
        // On insert les valeurs des produits contenues dans le tableau
        divImgElt.querySelector('img').src = localItems[j].img;
        divImgElt.querySelector('img').alt = localItems[j].alt;
        titlePrice.querySelector('h2').textContent = localItems[j].name + " - " + localItems[j].color;
        titlePrice.querySelector('p').textContent = totalPriceByElt + ' € ';
        settingsQuantity.querySelector('p').textContent ='Qté :';
        pDeleteElt.textContent = 'Supprimer';  

        // On intègre le produit sélectionné dans la balise section du panier
        cartItemsElt.appendChild(articleElt);  
    }

    /**
     * On crée les variables nécessaires à l'affichage de la quantité et du prix total du panier
     * Ensuite on va parcourir le panier avec une boucle for
     * Celle-ci va itérer sur chaque produit dans le panier et nous retourner le prix ainsi que la quantité de ceux-ci
     * Enfin on affiche le résultat sur la page web
     */
     function totals() {
        const totalQuantityElt = document.getElementById('totalQuantity');
        const totalPriceElt = document.getElementById('totalPrice');
        let totalQty = 0;
        let totalPrice = 0;

        for(l = 0;l < localItems.length; l++) {
            //Quantité totale
            totalQty += parseInt(localItems[l].quantity);
        
            totalPrice += localItems[l].price*localItems[l].quantity;
        }
        totalQuantityElt.textContent = totalQty;
        totalPriceElt.textContent = totalPrice;
    }
    totals()

    /**
     * On supprime l'article directement dans le panier
     * On crée la variable contenant l'élément <p>Supprimer<p> qui va permettre la suppression de l'article
     * Ensuite on parcoure le nombre d'élément <p>Supprimer<p> contenu dans le panier
     * On écoute l'évènement 'click' de l'élément supprimer 
     * On rafraichit la page pour afficher le nouveau contenu
     */
     function deleteItems() {
        const clickToDelete = document.querySelectorAll('.deleteItem');

        for(let l = 0; l < clickToDelete.length; l++) {
            clickToDelete[l].addEventListener('click', (event) => {
                event.preventDefault();
                let idToDelete = localItems[l].id;
                let colorToDelete = localItems[l].color;
                localItems = localItems.filter( el => el.id !== idToDelete || el.color !== colorToDelete );
                localStorage.setItem("itemToCart", JSON.stringify(localItems));
                window.location.reload();
            });
        }
    }
    deleteItems();

    /**
     * On modifie le nombre d'article directement dans le panier
     * On crée la variable qui va permettre la modification de la quantité
     * Ensuite on parcoure le nombre d'élément <input> contenu dans le panier
     * On écoute l'évènement 'change' de l'élément <input> qui va renvoyer la quantité sélectionnée dans le localStorage
     * On rafraichit la page pour afficher le nouveau contenu 
     */
    function modifyItems() {
        const quantityToModify = document.querySelectorAll('.itemQuantity');
        
        for(let k = 0; k < quantityToModify.length; k++) {
            quantityToModify[k].addEventListener('change', (event) => {
                event.preventDefault();

                let itemToChange = parseInt(localItems[k].quantity);
                let changeValue =parseInt(quantityToModify[k].value);
                let modification = localItems.find(el => el.changeValue !== itemToChange)
                localItems[k].quantity = changeValue;

                localStorage.setItem("itemToCart", JSON.stringify(localItems));
                window.location.reload();
            });
        }
    }
    modifyItems();

    /**
     * On valide le formulaire de commande de la page panier
     * Grace à l'utilisation des RegEx, on va va vérifié les champs du formulaires
     */
    function checkForm() {
        // On récupère le formulaire
        let form = document.querySelector('.cart__order__form');

        // On vérifie le prénom 
        form.firstName.addEventListener('change', function() {
            validFirstName(this);
        });
        // On vérifie le nom
        form.lastName.addEventListener('change', function() {
            validLastName(this);
        });
        // On vérifie l'adresse
        form.address.addEventListener('change', function() {
            validAddress(this);
        });
        // On vérifie la ville
        form.city.addEventListener('change', function() {
            validCity(this);
        });
        // On vérifie l'email
        form.email.addEventListener('change', function() {
            validEmail(this);
        });

        // Prénom
        const validFirstName = function(inputFirstName) {
            // Création du regex adapté
            let firstNameRegExp = new RegExp('^[A-Z][A-Za-z\é\è\ê\ç\-]+$', 'g');
            // On teste la valeur de l'input
            let testFirstName = firstNameRegExp.test(inputFirstName.value);
            const errorFirstName = inputFirstName.nextElementSibling;
            if(testFirstName) {
                errorFirstName.innerHTML = '';
            }else {
                errorFirstName.innerHTML = 'Prénom invalide, complétez le champ. Exemple : Bruce, Léonardo, Hugue, ...';
            }
        }

        // Nom
        const validLastName = function(inputLastName) {
            // Création du regex adapté
            let lastNameRegExp = new RegExp('^[A-Z][A-Za-z\é\è\ê\ç\-]+$', 'g');
            // On teste la valeur de l'input
            let testLastName = lastNameRegExp.test(inputLastName.value);
            const errorLastName = inputLastName.nextElementSibling;
            if(testLastName) {
                errorLastName.innerHTML = '';
            }else {
                errorLastName.innerHTML = 'Nom invalide, complétez le champ. Exemple : Willis, Dicaprio, Jackman, ...';
            }
        }

        // Adresse
        const validAddress = function(inputAddress) {
            // Création du regex adapté
            let addressRegExp = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+', 'g');
            // On teste la valeur de l'input
            let testAddress = addressRegExp.test(inputAddress.value);
            const errorAddress = inputAddress.nextElementSibling;
            if(testAddress) {
                errorAddress.innerHTML = '';
            }else {
                errorAddress.innerHTML = 'Adresse invalide, complétez le champ. Exemple : 53,Rue des aubépinnes';
            }
        }

        // Ville
        const validCity = function(inputCity) {
            // Création du regex adapté
            let cityRegExp = new RegExp('^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$', 'g');
            // On teste la valeur de l'input
            let testCity = cityRegExp.test(inputCity.value);
            const errorCity = inputCity.nextElementSibling;
            if(testCity) {
                errorCity.innerHTML = ' ';
            }else {
                errorCity.innerHTML = 'Ville invalide, complétez le champ. Exemple : Paris,Bruxelles,Los-Angeles, ...';
            }
        }

        // Email
        const validEmail = function(inputEmail) {
            // Création du regex adapté
            let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
            // On teste la valeur de l'input
            let testEmail = emailRegExp.test(inputEmail.value);
            const errorEmail = inputEmail.nextElementSibling;
            if(testEmail) {
                errorEmail.innerHTML = ' ';
            }else {
                errorEmail.innerHTML = 'Email invalide, complétez le champ. Exemple : exemple123@test.com';
            }
        }
    }
    checkForm();
}










