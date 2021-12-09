/**
 * On va afficher la confirmation de commande à l'utilisateur sur la page de comfirmation
 * D'abord on récupère la confirmation de commande
 * Ensuite on vide le panier 
 */
function getOderId() {
    // D'abord on récupère la confirmation de commande
    const dataOrderId = document.getElementById("orderId");
    dataOrderId.innerHTML = localStorage.getItem("orderId");
    
    // Ensuite on vide le panier
    localStorage.clear();
}
getOderId();