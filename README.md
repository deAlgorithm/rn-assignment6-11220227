## rn-assignment6-11220227
# Fashionova

## Overview

This is a simple shopping cart application built with React Native. It features a home screen displaying a list of products and a cart screen to view and manage items added to the cart. The application uses `AsyncStorage` for persisting cart data.

## Design Choices

### Home Screen

- **Product Listing**: Products are displayed in a grid layout using a `FlatList`. Each product card includes an image, name, description, price, and an "Add to Cart" button.
- **Responsive Layout**: The product listing adjusts to ensure an even number of products per row.
- **Navigation**: The app uses React Navigation to switch between the home screen and the cart screen.

### Cart Screen

- **Cart Management**: Displays a list of products added to the cart. Each cart item includes an image, name, price, and a "Remove" button.
- **Persistent Storage**: The cart data is saved to and loaded from `AsyncStorage`, ensuring the cart contents are preserved across app restarts.

## Data Storage Implementation

- **AsyncStorage**: 
  - The cart data is stored in `AsyncStorage` using the key `'cart'`.
  - When a product is added to the cart, the cart array is updated and saved back to `AsyncStorage`.
  - When the app loads, the cart data is retrieved from `AsyncStorage` and used to populate the cart state.

### HomeScreen Component

- `useEffect` is used to load the cart data from `AsyncStorage` when the component mounts.
- `addToCart` function adds a product to the cart and updates `AsyncStorage`.

### CartScreen Component

- `useEffect` is used to load the cart data from `AsyncStorage` when the component mounts.
- `removeFromCart` function removes a product from the cart and updates `AsyncStorage`.

## Screenshots

### Home Screen
![Home Screen]![home](https://github.com/deAlgorithm/deAlgorithm-rn-assignment6-11220227/assets/131563995/0674ab4b-5c6d-40c7-8771-ec765abec083)


### Cart Screen
![Cart Screen]!![checkout](https://github.com/deAlgorithm/deAlgorithm-rn-assignment6-11220227/assets/131563995/f6885f38-87f3-4e6d-b1ac-cccb8cfb6df0)



## Running the App

1. **Install Dependencies**:
   ```sh
   npm install
   npm start
```
