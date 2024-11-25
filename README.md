# StydyNotion - An Edtech Platform

## **Project Overview**

StudyNotion is an e-learning platform designed for skill development, allowing users to access courses, track progress, and interact with educational content. The platform incorporates **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** to manage user access securely.

### **Features**

- **Authentication**: Secure user registration, login, and logout using JWT tokens.
- **Authorization**: Fine-grained access control based on user roles such as **Admin**, **Instructor**, and **Student**.
- **RBAC**: Ensures that only authorized users can access specific resources or perform certain actions.

---

## **RBAC Implementation Details**

### **Authentication**

- Securely manages user sessions using **JWT**.
- Passwords are hashed using **bcrypt** before being stored in the database.
- Tokens are stored in cookies with secure attributes.

### **Authorization**

- Access is controlled based on roles:
  - **Admin**: Full access to manage users, courses, and platform settings.
  - **Instructor**: Can create, update, and manage their courses.
  - **Student**: Can enroll in courses and access course content.
- Middleware ensures appropriate role-based access.

### **RBAC Design**

- User roles and permissions are stored in the database and validated via middleware.

## **Security Best Practices**

- **Password Hashing**: All passwords are hashed using **bcrypt**.
- **JWT Tokens**: Stateless authentication with short expiration times.
- **CORS Policy**: Restricted to frontend domain (`https://learning-studynotion.vercel.app`).
- **Environment Variables**: Sensitive data managed securely with `dotenv`.

## **Deployment**

- **Frontend**: Deployed on https://learning-studynotion.vercel.app.
