# Full-Stack Web Application for Primary Schools

This application is designed for primary schools and allows students, teachers, parents, and administrators to access various features such as teaching materials, notifications, meetings, AI chat for class support, an image analysis API, a lost and found system, and much more.

## Features

### For Students

- **Teaching Materials**: Access to various learning materials and assignments.
- **AI Chat**: Chat with an AI assistant that answers questions related to the curriculum (limited to educational topics).
- **Interactive Quiz**: A quiz on internet safety with questions and answers.

### For Teachers

- **Teaching Materials**: Ability to add new teaching materials.
- **Notifications**: Sending notifications to students and parents about important events.
- **Meetings**: Organizing meetings with students and parents.

### For Parents

- **Notifications**: Access to notifications related to their children and the school.
- **Meetings**: Ability to participate in meetings with teachers and class leaders.

### For Administrators

- **User Management**: Adding new users (students, teachers, parents).

### Additional Features

- **AI Image Analysis API**: Send an image and get a description of what is in the image (used for educational purposes).
- **Lost and Found**: A system for reporting and viewing lost and found items within the school.
- **Edit User Profile**: Users can change their personal details and settings.

## Technologies

- **Frontend**: React.js
- **Backend**: Node.js +
  - JWT (JSON Web Token) for user authentication
- **AI API**: Uses external APIs for image analysis and generating responses in the AI chat

## Running the Application

1. **Frontend Installation**

   - Clone or download the repository:
     ```bash
     git clone https://github.com/DzemilManic/SmartClassroom.git
     ```
   - Navigate to the frontend directory:
     ```bash
     cd SmartClassroom/frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the application:
     ```bash
     npm run dev
     ```

2. **Backend Installation**
   - Navigate to the backend directory:
     ```bash
     cd SmartClassroom/server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```

## Contributing

If you want to contribute to the development of this application, you can open a pull request or report bugs through [issues](https://github.com/DzemilManic/SmartRazred/issues).

## License

This application is licensed under the [MIT License](LICENSE).
"""
