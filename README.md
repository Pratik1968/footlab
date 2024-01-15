**Under Development**

# Footlab :  Online Shoe Store

Welcome to the Online Shoe Store project! This web application allows users to browse and purchase a variety of shoes online.

## Table of Contents

- [Features](#features)
- [Installation](#installation)



## Features

1. **Product Catalog:**
   - Browse through a wide range of shoes with detailed product information.

2. **User Authentication:**
   - Register and log in to your account for a personalized shopping experience.

3. **Shopping Cart:**
   - Add products to your cart and proceed to checkout.

4. **Responsive Design:**
   - Enjoy a seamless experience on various devices, including desktops, tablets, and mobile phones.
     
5. **Admin Page:**
   - View all the orders by the user.
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pratik1968/footlab.git
2. Navigate to the project directory:
   ```bash
    cd footlab
  
    ```

3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up the postgresql
    - Run the following SQL script to create the `users` table:
      ```sql
       CREATE TABLE users (
       name TEXT NOT NULL,
       email TEXT NOT NULL,
       password TEXT NOT NULL,
       PRIMARY KEY (email),
       CHECK (email <> ''),
       CHECK (name <> ''),
       CHECK (password <> ''));
      ```
    -  Run the following SQL script to create the `shoeproduct` table:
       ```sql
         CREATE TABLE shoeproduct (
         productid SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         brand VARCHAR(100),
         category VARCHAR(50) NOT NULL,
         size TEXT[] NOT NULL DEFAULT '{}',
         color VARCHAR(50),
         material VARCHAR(100),
         price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
         stockquantity INTEGER NOT NULL CHECK (stockquantity >= 0),
         releasedate DATE,
         imageid INTEGER,
         productrating INTEGER
       );
       ```

   - Run the following SQL script to create the `carts` table:
      ```sql
         CREATE TABLE carts (
         email TEXT,
         productids JSONB
       );
       ```
   - Run the following SQL script to create the `shoeorder` table:

      ```sql
      CREATE TABLE shoeorder (
      email TEXT,
     productids JSONB,
     address TEXT,
     status TEXT);
      ```
6. Set up the environment variables:

    Create a .env file in the root of the project.
    Add the necessary environment variables such as database connection details, API keys, etc. Example:

    ```env

    DB_HOST=localhost
    DB_USER=myuser
    DB_PASSWORD=mypassword
    ADMIN_EMAIL=admin_email
    ADMIN_PASSWORD=admin_password
    ```
7. Run the application:
    ```bash
    npm start
    ```
Open your browser and visit http://localhost:3000 to access the application.

