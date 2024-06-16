# QuickTrivia

Welcome to QuickTrivia, the fast-paced quiz game where you can test your knowledge across various genres!

## Features

- **Play Quick Quizzes**: Jump right into playing quick quizzes without any hassle.
- **Guest Mode**: Try out demo quizzes without any need to log in.
- **User Registration**: Sign up to track your progress and compete with others.
- **Genre Selection**: Choose from a wide range of quiz genres to play.
- **Customizable Quiz Length**: Set the number of questions you want in your quizzes.
- **Profile Customization**: Update your profile and set your avatar or profile picture.
- **Track Your Scores**: All your quiz scores are stored and displayed in your profile section.

## Repository Structure

- `backend/`: Contains all the server-side code.
- `frontend/`: Contains all the client-side code.
- `node_modules/`: Includes all the dependencies for the project.
- `.env`: A file to store environment variables (not included in the repository for security reasons).
- `.gitignore`: Specifies intentionally untracked files to ignore.
- `package-lock.json`: Automatically generated file for any operations where npm modifies either the `node_modules` tree or `package.json`.
- `package.json`: Lists the packages that your project depends on and provides information about the project.
```
QuickTrivia/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── userControllers.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── quizModel.js
│   │   └── userModels.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   └── server.js
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── node_modules
├── .env
├── package-lock.json
├── package.json
└── README.md
```
# Getting Started
## Installation

To get started with QuickTrivia, clone this repository and navigate into both the `frontend` and `backend` directories to install dependencies:

### STEP 1 : clone the repositories
```bash
git clone https://github.com/yourusername/QuickTrivia.git
```

### STEP 2 : Install NPM packages
```
cd QuickTrivia/
npm install 
```

```
cd ../frontend
npm install
```
### STEP 3 : Start the development server
```
cd QuickTrivia/
npm run dev
```
