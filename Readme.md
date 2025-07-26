# User CRUD Portal 🚀

A simple user management system built using **Node.js**, **Express**, **MySQL**, and **EJS** templating. This project allows users to sign up, view all users, edit their details, and delete their account with password verification.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, EJS (Embedded JavaScript Templates)
- **Database:** MySQL
- **Styling:** Basic CSS

---

## 📂 Folder Structure

```
├── views/              # EJS templates (pages)
│   ├── index.ejs
│   ├── users.ejs
│   ├── newUser.ejs
│   ├── editUser.ejs
│   └── deletePage.ejs
│
├── public/             # Static files (CSS)
│   └── style.css
│
├── schema.sql          # SQL schema to create the user table
├── index.js            # Main server file
├── .gitignore
├── package.json
└── .env                # For environment variables like DB credentials
```

---

## 🚦 Features

- 📋 Create a new user
- 👀 View all registered users
- ✏️ Edit user details (with password check for verification)
- ❌ Delete a user (with password confirmation)
- 📈 Homepage shows total user count

---

## 🔐 Security
- Password is required to confirm identity before editing or deleting a user.
- This basic auth mechanism ensures that only the rightful user can modify or remove their data.


---


## 📥 Installation & Setup

1. **Clone the repo**

```bash
git clone https://github.com/sapna010404/user-crud-portal.git
cd user-crud-portal
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a MySQL database**  
Import the `schema.sql` file to create the required table.

4. **Configure environment variables**

Create a `.env` file in the root and add:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

5. **Run the server**

```bash
node index.js
```

6. **Visit the App**

Open your browser and go to:  
`http://localhost:PORT` (default port is probably 8080 or 3000)

---

## 📸 Screenshots

![alt text](/assets/image.png)
![alt text](/assets/image-1.png)
![alt text](/assets/image-2.png)
![alt text](/assets/image-3.jpg)
![alt text](/assets/image-4.png)

---

## 🧠 Learnings

This project helped reinforce:

- Express routing and middleware
- MySQL integration with Node.js
- Dynamic page rendering with EJS
- Form handling and CRUD logic
- Basic password verification and redirects

---

## 💡 Future Improvements

- Add user authentication with hashed passwords
- Use Bootstrap or TailwindCSS for better styling
- Validate forms on the client and server side
- Flash messages for errors/success
- Add pagination for large user lists

---

## ✨ Acknowledgements
 
Made with ❤️ by [Sapna](https://github.com/sapna010404)