# 🦷 Dental Checkup System (MERN Stack) [Live Link](https://dentalcheck.onrender.com/)

A simple full-stack web application simulating a basic dental checkup system using the MERN stack (MongoDB, Express.js, React.js, Node.js). This app allows patients to apply for checkups and dentists to upload checkup results. It includes PDF export functionality and user roles.

## 🛠️ Features

### 👩‍⚕️ Patient (User )
- **Register/Login**
- **View list of available dentists**
- **Apply for a checkup**
- **View uploaded results** (images + notes)
- **Export checkup results as a single PDF**

### 🧑‍⚕️ Dentist
- **Register/Login**
- **View incoming checkup requests**
- **Upload checkup images**
- **Add descriptions/notes to each image**
- **Save checkup details for patient viewing**

## ⚙️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based login/register (User & Dentist)

- **Other Libraries:**
   Multer for image uploads, html2pdf for PDF generation, Cloudinary for cloud storage of images.

## ⚙️ Project Setup

### 1. Clone the Repository
```bash
    git clone https://github.com/Manideepchopperla/DentalCheck.git
    cd DentalCheck
```
2. **Install dependencies**:

    ```bash
    cd Client
      npm install
    ```
    ```bash
    cd ../Server
      npm install
    ```

3. **Start the development server**:
    1. Build the frontend : 
    ```bash
    cd Client 
    npm run build
    ```
    Move this generated dist folder in Client to Server folder
    
    2. Serve the frontend : 
    ```bash
    cd ../Server
    npn run dev


4. Open your browser and navigate to `http://localhost:5000` to view the app.

## 🗄️ MongoDB Setup

### 1. Create a MongoDB Database
- Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Create a new project and then a new cluster.
- Choose a free tier if you're just testing.

### 2. Configure Database Access
- Go to the "Database Access" section.
- Create a new database user with read and write access.
- Note down the username and password.

### 3. Whitelist Your IP Address
- In the "Network Access" section, add your current IP address to allow connections.

### 4. Get Your Connection String
- In the "Clusters" section, click on "Connect" and then "Connect your application".
- Copy the connection string provided.

### 5. Update Your Environment Variables
- Create a `.env` file in the root of the `Server` directory:
    ```bash
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret_key
    ```
- Replace `your_mongo_connection_string` with the connection string you copied earlier, ensuring to replace `<username>` and `<password>` with your actual MongoDB username and password.

**Note:** Do not commit this .env file to the repository..

## Contact

For any inquiries, please reach out to:

- **Name:** Manideep Chopperla
- **Email:** [manideepchopperla1808@gmail.com](mailto:manideepchopperla1808@gmail.com)
- **GitHub:** [Manideepchopperla](https://github.com/Manideepchopperla)
