import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store';

/**
 * Hook personnalisé pour gérer le panier
 * Simplifie l'accès aux données et actions du panier
 * Créé: 10/02/2026
 */
export function useCart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // Nombre total d'articles dans le panier
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Prix total du panier
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    // Ajouter un produit au panier
    const addItem = (product) => {
        dispatch(addToCart(product));
    };

    // Retirer un produit du panier
    const removeItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    // Modifier la quantité d'un produit
    // delta peut être positif (augmenter) ou négatif (diminuer)
    const changeQuantity = (productId, delta) => {
        dispatch(updateQuantity({ id: productId, delta }));
    };

    // Vider complètement le panier
    const emptyCart = () => {
        dispatch(clearCart());
    };

    // Vérifier si un produit est dans le panier
    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    // Obtenir la quantité d'un produit spécifique
    const getItemQuantity = (productId) => {
        const item = cartItems.find(i => i.id === productId);
        return item ? item.quantity : 0;
    };

    return {
        items: cartItems,
        itemCount,
        totalPrice,
        addItem,
        removeItem,
        changeQuantity,
        emptyCart,
        isInCart,
        getItemQuantity
    };
}
