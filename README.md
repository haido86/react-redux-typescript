# First front end project of HaiDo E-commerce site
## Tech Stack:
React, TypeScript, Redux-toolkit and TailwindCSS
## Outcome:
Build a front end for an E-commerce site and deployed as https://ecommerce-haido.netlify.app

The Frontend was talking to a mock data which was stored in a public folder and later (in the fullstack project) would be plugged to the backend.
## In need of improvements:
Re-structure folders, files

Making reusable components

## Database for E-commerce site:
### Products
id

name

description

categories

image

### Orders
id

productId

userId

purchasedAt

### Users (as visitor or admin)
id

firstName

lastName 

email 

## Use cases:
### Visitor can:
Explore list of products

Filter and search

Add to a cart

### Login user can:
Login

Explore list of products

Filter and search

Add to a cart

Checkout product/s (will be implemented later)

### Admin can:
Add new product

Update info of a product

Remove a product

Ban a user (will be implemented later)

