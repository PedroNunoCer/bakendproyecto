/**
 * Shopping Cart Management System
 * This script handles all cart functionality for an e-commerce site including
 * adding/removing products, updating quantities, calculating totals, and
 * persisting the cart between sessions.
 */

// Cart class that handles all shopping cart operations
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.itemCount = 0;
        this.taxRate = 0.13; // 13% tax rate
        this.shippingCost = 0;
        this.freeShippingThreshold = 50; // Free shipping for orders over $50
        this.defaultShippingCost = 5.99;
        
        // Initialize the cart
        this.init();
    }
    
    /**
     * Initialize the cart by loading any saved cart data
     */
    init() {
        // Load cart from localStorage if available
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            const cartData = JSON.parse(savedCart);
            this.items = cartData.items || [];
            this.recalculate();
        }
        
        // Update the cart UI
        this.updateCartUI();
        
        // Set up event listeners for cart actions
        this.setupEventListeners();
    }
    
    /**
     * Set up the event listeners for various cart actions
     */
    setupEventListeners() {
        // Listen for add to cart buttons
        document.addEventListener('click', (event) => {
            // Check if clicked element is an add-to-cart button or has it as a parent
            const addButton = event.target.closest('.btn-add-to-cart');
            if (addButton) {
                event.preventDefault();
                
                // Get product data from button attributes or parent elements
                const productId = addButton.dataset.productId || addButton.getAttribute('data-product-id');
                const productName = addButton.dataset.productName || '';
                const productPrice = parseFloat(addButton.dataset.productPrice || 0);
                const productImage = addButton.dataset.productImage || '';
                
                // Check if we have the required product data
                if (productId && productName && productPrice) {
                    this.addItem({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    });
                } else {
                    console.error('Incomplete product data for adding to cart');
                }
            }
        });
        
        // Listen for cart icon clicks to show the cart
        const cartButtons = document.querySelectorAll('.cart-btn, .show-cart-btn');
        cartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCartModal();
            });
        });
        
        // Close cart modal when clicking outside of it
        document.addEventListener('click', (e) => {
            const cartModal = document.getElementById('cartModal');
            if (cartModal && cartModal.classList.contains('show')) {
                if (!e.target.closest('.modal-content') && !e.target.closest('.cart-btn') && !e.target.closest('.show-cart-btn')) {
                    this.hideCartModal();
                }
            }
        });
    }
    
    /**
     * Add an item to the cart
     * @param {Object} product - The product to add
     */
    addItem(product) {
        // Check if the product already exists in the cart
        const existingItemIndex = this.items.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
            // Increment quantity if product already exists
            this.items[existingItemIndex].quantity += product.quantity || 1;
        } else {
            // Add new product to cart
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image || '',
                quantity: product.quantity || 1
            });
        }
        
        // Recalculate totals and update UI
        this.recalculate();
        this.updateCartUI();
        this.showAddedToCartNotification(product.name);
        this.saveCart();
    }
    
    /**
     * Remove an item from the cart
     * @param {string} productId - The ID of the product to remove
     */
    removeItem(productId) {
        // Find the product in the cart
        const itemIndex = this.items.findIndex(item => item.id === productId);
        
        if (itemIndex >= 0) {
            // Remove the item from the array
            this.items.splice(itemIndex, 1);
            
            // Recalculate totals and update UI
            this.recalculate();
            this.updateCartUI();
            this.saveCart();
        }
    }
    
    /**
     * Update the quantity of an item in the cart
     * @param {string} productId - The ID of the product to update
     * @param {number} quantity - The new quantity
     */
    updateQuantity(productId, quantity) {
        // Make sure quantity is a number and at least 1
        quantity = Math.max(1, parseInt(quantity) || 1);
        
        // Find the product in the cart
        const itemIndex = this.items.findIndex(item => item.id === productId);
        
        if (itemIndex >= 0) {
            // Update the quantity
            this.items[itemIndex].quantity = quantity;
            
            // Recalculate totals and update UI
            this.recalculate();
            this.updateCartUI();
            this.saveCart();
        }
    }
    
    /**
     * Clear all items from the cart
     */
    clearCart() {
        this.items = [];
        this.recalculate();
        this.updateCartUI();
        this.saveCart();
    }
    
    /**
     * Recalculate the cart totals
     */
    recalculate() {
        // Calculate item count and subtotal
        this.itemCount = this.items.reduce((total, item) => total + item.quantity, 0);
        this.subtotal = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Calculate shipping (free if above threshold)
        this.shippingCost = this.subtotal >= this.freeShippingThreshold ? 0 : this.defaultShippingCost;
        
        // Calculate tax amount
        this.taxAmount = this.subtotal * this.taxRate;
        
        // Calculate total
        this.total = this.subtotal + this.taxAmount + this.shippingCost;
    }
    
    /**
     * Save the cart to localStorage
     */
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify({
            items: this.items,
            timestamp: new Date().getTime()
        }));
    }
    
    /**
     * Update all UI elements related to the cart
     */
    updateCartUI() {
        // Update cart count badges
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = this.itemCount;
            
            // Make the badge visible only if there are items
            if (this.itemCount > 0) {
                element.classList.remove('d-none');
            } else {
                element.classList.add('d-none');
            }
        });
        
        // Update cart dropdown/modal if it exists
        this.updateCartModal();
    }
    
    /**
     * Create or update the cart modal with current items
     */
    updateCartModal() {
        let cartModal = document.getElementById('cartModal');
        
        // Create the modal if it doesn't exist
        if (!cartModal) {
            const modalHTML = `
                <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-right">
                        <div class="modal-content">
                            <div class="modal-header bg-primary text-white">
                                <h5 class="modal-title" id="cartModalLabel">
                                    <i class="fas fa-shopping-cart me-2"></i>Su Carrito
                                </h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div id="cartContents"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to the document body
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = modalHTML;
            document.body.appendChild(modalContainer);
            
            // Get the newly created modal
            cartModal = document.getElementById('cartModal');
        }
        
        // Get the cart contents div
        const cartContents = document.getElementById('cartContents');
        if (cartContents) {
            // Clear existing content
            cartContents.innerHTML = '';
            
            if (this.items.length === 0) {
                // Display empty cart message
                cartContents.innerHTML = `
                    <div class="text-center py-5">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <h5>Su carrito está vacío</h5>
                        <p class="text-muted">Agregue productos para continuar con su compra.</p>
                        <button class="btn btn-outline-primary rounded-pill mt-3" data-bs-dismiss="modal">
                            Continuar Comprando
                        </button>
                    </div>
                `;
            } else {
                // Create cart content with items
                let cartHTML = `
                    <div class="cart-items">
                `;
                
                // Add each item to the cart
                this.items.forEach(item => {
                    cartHTML += `
                        <div class="cart-item d-flex align-items-center py-3 border-bottom">
                            <div class="cart-item-image me-3">
                                ${item.image ? 
                                    `<img src="${item.image}" alt="${item.name}" class="img-fluid rounded" style="width: 60px; height: 60px; object-fit: cover;">` : 
                                    `<div class="placeholder-image bg-light rounded d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                                        <i class="fas fa-cheese text-muted"></i>
                                    </div>`
                                }
                            </div>
                            <div class="cart-item-details flex-grow-1">
                                <h6 class="mb-0">${item.name}</h6>
                                <div class="text-muted small">$${item.price.toFixed(2)} x ${item.quantity}</div>
                            </div>
                            <div class="cart-item-quantity px-2">
                                <div class="input-group input-group-sm quantity-control">
                                    <button class="btn btn-outline-secondary btn-decrease-quantity" data-product-id="${item.id}" type="button">-</button>
                                    <input type="number" class="form-control text-center" value="${item.quantity}" min="1" data-product-id="${item.id}">
                                    <button class="btn btn-outline-secondary btn-increase-quantity" data-product-id="${item.id}" type="button">+</button>
                                </div>
                            </div>
                            <div class="cart-item-price px-3">
                                <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                            </div>
                            <div class="cart-item-remove">
                                <button class="btn btn-sm btn-link text-danger btn-remove-item" data-product-id="${item.id}">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    `;
                });
                
                // Close the cart items div
                cartHTML += `</div>`;
                
                // Add cart summary
                cartHTML += `
                    <div class="cart-summary mt-4">
                        <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>$${this.subtotal.toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Impuestos (${(this.taxRate * 100).toFixed(0)}%):</span>
                            <span>$${this.taxAmount.toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Envío:</span>
                            <span>${this.shippingCost === 0 ? 'Gratis' : '$' + this.shippingCost.toFixed(2)}</span>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between mb-4">
                            <span class="fw-bold">Total:</span>
                            <span class="fw-bold fs-5">$${this.total.toFixed(2)}</span>
                        </div>
                        <div class="d-grid gap-2">
                            <a href="checkout.html" class="btn btn-primary">Proceder al Pago</a>
                            <button class="btn btn-outline-secondary btn-clear-cart">Vaciar Carrito</button>
                        </div>
                    </div>
                `;
                
                // Add HTML to cart contents
                cartContents.innerHTML = cartHTML;
                
                // Add event listeners for cart item interactions
                this.setupCartItemEventListeners();
            }
        }
    }
    
    /**
     * Add event listeners to cart item elements
     */
    setupCartItemEventListeners() {
        // Increase quantity buttons
        const increaseButtons = document.querySelectorAll('.btn-increase-quantity');
        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                const item = this.items.find(item => item.id === productId);
                if (item) {
                    this.updateQuantity(productId, item.quantity + 1);
                }
            });
        });
        
        // Decrease quantity buttons
        const decreaseButtons = document.querySelectorAll('.btn-decrease-quantity');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                const item = this.items.find(item => item.id === productId);
                if (item && item.quantity > 1) {
                    this.updateQuantity(productId, item.quantity - 1);
                }
            });
        });
        
        // Quantity input fields
        const quantityInputs = document.querySelectorAll('.quantity-control input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', () => {
                const productId = input.getAttribute('data-product-id');
                const quantity = parseInt(input.value) || 1;
                this.updateQuantity(productId, quantity);
            });
        });
        
        // Remove item buttons
        const removeButtons = document.querySelectorAll('.btn-remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                this.removeItem(productId);
            });
        });
        
        // Clear cart button
        const clearCartButton = document.querySelector('.btn-clear-cart');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', () => {
                if (confirm('¿Está seguro que desea vaciar su carrito de compras?')) {
                    this.clearCart();
                }
            });
        }
    }
    
    /**
     * Show the cart modal
     */
    showCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            const bootstrapModal = new bootstrap.Modal(cartModal);
            bootstrapModal.show();
        }
    }
    
    /**
     * Hide the cart modal
     */
    hideCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            const bootstrapModal = bootstrap.Modal.getInstance(cartModal);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }
        }
    }
    
    /**
     * Show a toast notification when an item is added to the cart
     * @param {string} productName - The name of the product that was added
     */
    showAddedToCartNotification(productName) {
        // Create toast container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            const toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '1060';
            document.body.appendChild(toastContainer);
        }
        
        // Create a unique ID for this toast
        const toastId = 'toast-' + Date.now();
        
        // Create toast HTML
        const toastHTML = `
            <div id="${toastId}" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <i class="fas fa-check-circle me-2"></i>
                        ${productName} se ha añadido a su carrito.
                    </div>
                    <div class="d-flex align-items-center me-2">
                        <button class="btn btn-sm btn-outline-light" onclick="cart.showCartModal()">
                            Ver Carrito
                        </button>
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
        
        // Add toast to container
        document.querySelector('.toast-container').innerHTML += toastHTML;
        
        // Initialize and show toast
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
        toast.show();
        
        // Remove toast from DOM after it's hidden
        toastElement.addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    }
    
    /**
     * Prepare cart data for checkout
     * @returns {Object} Cart data ready for checkout
     */
    prepareCheckoutData() {
        return {
            items: this.items,
            itemCount: this.itemCount,
            subtotal: this.subtotal,
            taxAmount: this.taxAmount,
            shippingCost: this.shippingCost,
            total: this.total,
            timestamp: new Date().getTime()
        };
    }
}

// Initialize the shopping cart when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global cart instance
    window.cart = new ShoppingCart();
    
    // Initialize product catalog functionality if needed
    initializeProductCatalog();
});

/**
 * Initialize product catalog functionality
 * This function sets up the product catalog interactions
 */
function initializeProductCatalog() {
    // Update "Add to Cart" buttons to include product data
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    addToCartButtons.forEach(button => {
        // If the button doesn't have product data attributes, try to get them from parent elements
        if (!button.dataset.productId) {
            const productCard = button.closest('.product-card');
            if (productCard) {
                const productTitle = productCard.querySelector('.card-title');
                const productPrice = productCard.querySelector('.price');
                const productImage = productCard.querySelector('.card-img-top');
                
                if (productTitle && productPrice) {
                    // Extract the numeric price value
                    const priceText = productPrice.textContent;
                    const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                    
                    // Set data attributes for the button
                    button.setAttribute('data-product-id', productCard.getAttribute('data-product-id') || generateProductId());
                    button.setAttribute('data-product-name', productTitle.textContent);
                    button.setAttribute('data-product-price', priceValue);
                    
                    if (productImage && productImage.src) {
                        button.setAttribute('data-product-image', productImage.src);
                    }
                }
            }
        }
    });
    
    // If we have a product detail page with quantity controls
    const quantityControls = document.querySelectorAll('.product-detail .quantity-control');
    quantityControls.forEach(control => {
        const decreaseBtn = control.querySelector('.btn-decrease');
        const increaseBtn = control.querySelector('.btn-increase');
        const quantityInput = control.querySelector('input');
        
        if (decreaseBtn && increaseBtn && quantityInput) {
            decreaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value) || 1;
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                const currentValue = parseInt(quantityInput.value) || 1;
                quantityInput.value = currentValue + 1;
            });
        }
    });
    
    // Add to cart from product detail page
    const addToCartDetailBtn = document.querySelector('.product-detail .btn-add-to-cart');
    if (addToCartDetailBtn) {
        addToCartDetailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const quantityInput = document.querySelector('.product-detail .quantity-control input');
            const quantity = parseInt(quantityInput?.value || 1);
            
            // Get product data
            const productId = addToCartDetailBtn.getAttribute('data-product-id');
            const productName = addToCartDetailBtn.getAttribute('data-product-name');
            const productPrice = parseFloat(addToCartDetailBtn.getAttribute('data-product-price'));
            const productImage = addToCartDetailBtn.getAttribute('data-product-image');
            
            if (productId && productName && productPrice) {
                // Add item to cart with specified quantity
                window.cart.addItem({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: quantity
                });
            }
        });
    }
}

/**
 * Generate a unique product ID if one is not available
 * @returns {string} A unique product ID
 */
function generateProductId() {
    return 'product_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
        minimumFractionDigits: 2
    }).format(amount);
}