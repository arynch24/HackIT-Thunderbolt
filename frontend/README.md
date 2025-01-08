# Frontend Documentation for HackIt-Thunderbolt ⚡

## Table of Contents

1. [Introduction](#introduction)
3. [Folder Structure](#folder-structure)
4. [Detailed File Explanation](#detailed-file-explanation)
   - [Assets Folder](#assets-folder)
   - [Components Folder](#components-folder)
     - [ChatMain.jsx](#chatmainjsx)
     - [Sidebar.jsx](#sidebarjsx)
   - [Pages Folder](#pages-folder)
     - [Home.jsx](#homejsx)
   - [Redux Folder](#redux-folder)
     - [chatSlice.js](#chatslicejs)
     - [store.js](#storejs)
   - [Utils Folder](#utils-folder)
     - [MarkdownToText.jsx](#markdowntotextjsx)
     - [langflow.js](#langflowjs)
   - [Root-Level Files](#root-level-files)
     - [App.jsx](#appjsx)
     - [index.css](#indexcss)
     - [main.jsx](#mainjsx)
6. [Future Enhancements](#future-enhancements)

---

## Introduction

HackIT-Thunderbolt ⚡ is a modern, AI-powered chatbot application that integrates Langflow for generating intelligent responses. This documentation provides a detailed overview of the frontend implementation of the project.

---

## Folder Structure

```
src
├── assets
│   └── react.svg
├── components
│   ├── ChatMain.jsx
│   └── Sidebar.jsx
├── pages
│   └── Home.jsx
├── redux
│   ├── chatSlice.js
│   └── store.js
├── utils
│   ├── MarkdownToText.jsx
│   └── langflow.js
├── App.jsx
├── index.css
└── main.jsx
```

---

## Detailed File Explanation

### [Assets Folder](./src/assets/)

#### [react.svg](./src/assets/react.svg)
- A simple SVG logo of React used in the application.
- It can be used for branding or other visual purposes.

---

### [Components Folder](./src/components/)

#### [ChatMain.jsx](./src/components/ChatMain.jsx)
- **Purpose**: Implements the main chat interface where users interact with the chatbot.
- **Key Functionalities**:
  - Maintains the current input state using `useState`.
  - Fetches responses from the Langflow backend using the `fetchLangflowResponse` utility function.
  - Converts Markdown responses from Langflow into HTML using the `marked` library.
  - Displays messages in a styled chat window, differentiating between user and chatbot messages.
  - Provides a default fallback interface when `chatMode` is disabled, featuring an introductory message and a Spline 3D animation.
- **Notable Libraries Used**:
  - `@splinetool/react-spline` for rendering 3D models.
  - `marked` for Markdown-to-HTML conversion.
  - `FontAwesome` for icons.

#### [Sidebar.jsx](./src/components/Sidebar.jsx)
- **Purpose**: Provides a sidebar interface to manage multiple chat sessions.
- **Key Functionalities**:
  - Displays the list of existing chat sessions.
  - Allows users to create a new chat session with the `addSession` Redux action.
  - Highlights the active session and enables switching between sessions using the `setActiveSession` action.
  - Toggles `chatMode` when starting a new session.
- **Styling**: Utilizes hover effects and conditional styling for an interactive user experience.

---

### [Pages Folder](./src/pages/)

#### [Home.jsx](./src/pages/home.jsx)
- **Purpose**: Placeholder file for future use if a separate home page is needed.
- **Current Usage**: Not actively used in the current implementation.

---

### [Redux Folder](./src/redux/)

#### [chatSlice.js](./src/redux/chatSlice.js)
- **Purpose**: Manages the global state for chat sessions and chat mode.
- **Key State Variables**:
  - `sessions`: Stores all chat sessions, each with a unique `id` and an array of `messages`.
  - `activeSessionId`: Tracks the currently active session.
  - `chatMode`: Boolean flag to toggle the chat interface.
- **Reducers**:
  - `addSession`: Creates a new chat session and sets it as active.
  - `setActiveSession`: Activates a specific session.
  - `addMessageToSession`: Adds a message to a specific session's message array.
  - `setChatMode`: Toggles the chat interface mode.

#### [store.js](./src/redux/store.js)
- **Purpose**: Configures the Redux store for the application.
- **Implementation**:
  - Combines the `chatSlice` reducer to manage chat-related state.
  - Exports the store to be used with the Redux `Provider`.

---

### [Utils Folder](./src/utils/)

#### [MarkdownToText.jsx](./src/utils/MarkdownToText.jsx)
- **Purpose**: Converts Markdown text to plain text for display or processing.
- **Key Functionalities**:
  - Uses the `marked` library to parse Markdown into HTML.
  - Extracts plain text content from the generated HTML using DOM methods.
- **Use Case**: Helpful for previewing or transforming Markdown content into plain text.

#### [langflow.js](./src/utils/langflow.js)
- **Purpose**: Handles API communication with the Langflow backend.
- **Key Functionalities**:
  - Sends user input to the Langflow API and retrieves a response.
  - Parses and returns the chatbot's response.
  - Includes error handling for failed requests.
- **Endpoint**: `https://hackit.up.railway.app/api/v1/getResponse`

---

### [Root-Level Files](./src)

#### [App.jsx](./src/App.jsx)
- **Purpose**: Root component of the application.
- **Implementation**:
  - Combines the `Sidebar` and `ChatMain` components.
  - Defines a gradient background style for the app.

#### [index.css](./src/index.css)
- **Purpose**: Central stylesheet for the application.
- **Implementation**:
  - Uses Tailwind CSS for utility-first styling.
  - Configures base, components, and utilities layers.

#### main.jsx
- **Purpose**: Entry point for the application.
- **Implementation**:
  - Renders the `App` component inside the root HTML element.
  - Wraps the application in a Redux `Provider` to enable global state management.

---

## Installation and Setup

### Prerequisites
- Node.js (>= 14.x)
- npm or Yarn

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Usage

1. Open the application.
2. Use the sidebar to create a new chat session or switch between sessions.
3. Type messages in the input box and send them.
4. View AI-generated responses in real-time.

---

## Key Dependencies

- **React**: Frontend library for building the user interface.
- **Redux Toolkit**: State management.
- **Tailwind CSS**: Utility-first CSS framework.
- **@splinetool/react-spline**: Integration for 3D scenes.
- **marked**: Markdown-to-HTML converter.
- **FontAwesome**: Icon library for UI components.

---

## API Integration

### Langflow API
- **Endpoint**: `https://hackit.up.railway.app/api/v1/getResponse`
- **Request**:
  - Method: POST
  - Headers:
    ```json
    {
      "Content-Type": "application/json"
    }
    ```
  - Body:
    ```json
    {
      "msg": "<user-input>"
    }
    ```
- **Response**:
  - Success:
    ```json
    {
      "success": true,
      "data": "<AI-response>"
    }
    ```
  - Error:
    ```json
    {
      "success": false,
      "error": "<error-message>"
    }
    ```

---

## Contribution Guidelines

1. Fork the repository and create a new branch:
   ```bash
   git checkout -b feature/<feature-name>
   ```

2. Commit your changes:
   ```bash
   git commit -m "Add feature: <feature-description>"
   ```

3. Push your branch and create a pull request.
   ```bash
   git push origin feature/<feature-name>
   ```

4. Ensure all tests and lint checks pass before submitting your pull request.

---

## Future Enhancements

1. **Error Handling**:
   - Improve error messages and display them more gracefully in the chat interface.
2. **UI Improvements**:
   - Add more dynamic elements and animations to enhance user experience.
3. **Home Page**:
   - Utilize the `Home.jsx` file to create a dedicated landing page for the application.
4. **Advanced Chat Features**:
   - Enable saving chat history to local storage or a database.
   - Add functionality for editing or deleting messages.
5. **Styling**:
   - Enhance mobile responsiveness.
   - Use additional Tailwind utilities for more polished designs.
6. **Performance**:
   - Optimize API calls to reduce latency.
   - Implement pagination or lazy loading for long chat sessions.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

