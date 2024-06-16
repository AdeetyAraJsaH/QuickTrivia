import express from 'express'
import multer from 'multer'
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, saveQuiz, updateProfilePicture } from '../controllers/userControllers.js';
import { auth } from '../middlewares/authMiddleware.js';
const router = express.Router();
const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){return cb(null,"./backend/uploads")},
//     filename:function(req,file,cb){return cb(null,`${Date.now()}-${file.originalname}`)}
// });
const upload = multer({ storage: storage });

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/quiz', auth, saveQuiz);
router.route('/profile')
    .get(auth, getUserProfile)
    .put(auth, updateUserProfile)
    .post(auth, upload.single('profileImage'), updateProfilePicture);
// router.get('/profile', getUserProfile);
// router.put('/profile', updateUserProfile);

export default router