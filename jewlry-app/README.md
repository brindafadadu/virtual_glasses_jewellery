# Project Setup and Start Guide  

This guide explains how to set up and run the project, including backend and frontend.  
Firstly clone this repository on your local editor (VSCode) through the given GitHub link.
## **1. Setup local MongoDB database**

1. Sign up for MongoDB Atlas (if you don’t have an account) at https://www.mongodb.com/cloud/atlas.

2. Create a Cluster (Free Tier - M0).

3. Create a Database User with read and write permissions. Keep track of the username and password.

4. Whitelist your IP in the Network Access tab.

5. Copy the connection string provided in Atlas, which will look like this:

```bash
    mongodb+srv://<username>:<password>@cluster0.mongodb.net/earringTryOnDB?retryWrites=true&w=majority
```    
6. Create a .env file in the root of the project(jewlry-app) and add your connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/earringTryOnDB?retryWrites=true
```

## **2. Setup to run the project**  

1. Navigate to the backend folder:  
   ```bash
   cd jewlry-app/backend
   ```  
2. Create and activate a virtual environment:  
   ```bash
   python3 -m venv venv  
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate  
   ```  
3. Install dependencies:  
   ```bash
  npm i  
   ```  
4. Run the server to start the website:  
   ```bash
   node server.js
   ```  

## **3. Notes**  
- Ensure MongoDB is setup.
- Ensure Node.js are installed before running the setup.  
- Stop the servers using `CTRL + C`.  