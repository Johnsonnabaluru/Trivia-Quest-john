![Screenshot (29)](https://github.com/user-attachments/assets/7ba8d1ed-2487-4c4b-9148-72803578d67f)

 Trivia Quest: Technical Overview

Project Name: Trivia Quest

Technical Decisions:-

1. Technology Stack
   - Front-End: React.js
   - Back-End: Node.js with Express.js
   - API Integration: Open Trivia DB
   - Build Tool: Vite
   - HTTP Client:  Axios
   - Environment Management: dotenv for environment variables
   - Routing (SPA): React Router DOM
   - Styling: Bootstrap

2. Module System
   - CommonJS Syntax: Chose CommonJS syntax (`require/module.exports`) instead of ES Modules due to familiarity and preference, ensuring consistency across the project.

3. API Request Handling
   - Axios: Used for simplicity and ease of integration within both the React front-end and the Node.js back-end.
   - React Query: Integrated `useQuery` hook from React Query to fetch questions from the Open Trivia DB API. The `queryFn` property was set to an anonymous arrow function responsible for data fetching.

4. Context Management
   - QuizContext: Created using the `createContext` hook. The `QuizContext.Provider` is used to share context values with child components, with the `value` prop containing an array of elements, including the score.

5. Server-Side Routing and Middleware
   - Express.js Routing: Implemented server-side routing in Express.js, including a dedicated route (`/api/quiz`) to handle quiz-related requests, ensuring a clear separation of concerns.
   - CORS and JSON Middleware: Enabled CORS to allow cross-origin requests between the React front-end and the Node.js back-end, and used JSON middleware to parse incoming request bodies as JSON.

6. API Testing
   - Postman: Utilized Postman for API testing to ensure that the routes and endpoints are functioning as expected before integrating them into the front-end.

Challenges Encountered

1. API Response Handling:
   - Initially encountered challenges with handling various responses from the Open Trivia DB, particularly when certain categories or difficulty levels yielded no results.

2. Environment Configuration:
   - Managing sensitive environment variables securely across different environments (development, production) posed a challenge, particularly when deploying the application.

3. Module System Compatibility:
   - Ensured that the chosen CommonJS syntax was compatible with all dependencies and build processes, especially with Vite, which is typically optimized for ES Modules.

Solutions Implemented

1. Enhanced API Error Handling:
   - Implemented robust error handling in the Axios requests to gracefully manage cases where the Open Trivia DB returns empty or erroneous responses, including retry logic and user-friendly error messages.

2. dotenv Integration:
   - Integrated `dotenv` to securely manage environment variables, ensuring that sensitive information like API keys is not exposed in the codebase. The `.env` file is ignored in version control to prevent accidental leaks.

3. Vite Configuration:
   - Adjusted Vite’s configuration to ensure compatibility with CommonJS modules, ensuring that the build process remained smooth and error-free.

4. Thorough API Testing:
   - Conducted thorough API testing with Postman to validate the correctness of API responses and the integrity of the request handling process before integration with the front-end.

5. Effective Context Management
   - Utilized the `QuizContext` to manage and share global state across components efficiently, ensuring consistency in data such as the quiz score.

