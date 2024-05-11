import mongoose from "mongoose";


// Define the schema for the quiz questions
const QuizQuestionSchema = new mongoose.Schema({
    isAnswered: {
        type: Boolean,
        required: true,
        default: false
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    selectedOption: {
        type: String,
    },
});

// Define the schema for the user's quiz data
const UserQuizDataSchema = new mongoose.Schema({
    createdAt: {
        type: String,
        required: true
    },
    details: {
        amount: {
            type: String,
            required: true
        },
        categoryName: {
            type: String,
            required:true
        },
        difficulty: {
            type: String,
            required:true
        }
    },
    email: {
        type: String,
        required: true
    },
    questions: [QuizQuestionSchema],
    Result: {
        totalscore: {
            type: Number,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        attempted: {
            type: Number,
            required: true
        },
        accuracy: {
            type: Number,
            required: true
        },
        right: {
            type: Number,
            required: true
        },
        wrong: {
            type: Number,
            required: true
        }
    }
});

// Create the model from the schema
const QuizData = mongoose.model('QuizData', UserQuizDataSchema);

export default QuizData;
