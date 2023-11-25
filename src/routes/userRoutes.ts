import {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
  sendOTP,
  pjbooksWelcomePage,
  googleAuthUser,
  googleHtmlPage,
} from '../controllers/userController';
import express from 'express';
import { callbackHandler } from '../utils/callbackController';

const router = express.Router();
/**
 * @openapi
 * '/users':
 *    post:
 *      tags:
 *        - user
 *      summary: create a new User
 *      description: creating a new user in the app
 *      operationId: CreateUser
 *      requestBody:
 *        description: create user object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        default:
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      properties:
 *
 *        firstName:
 *          type: string
 *          example: uzo
 *        lastName:
 *          type: string
 *          example: Aronu
 *        email:
 *          type: string
 *          example: uzo@gmail.com
 *        dob:
 *          type: string
 *          example: '14th may'
 *        password:
 *          type: string
 *          example: '123456'
 *        role:
 *          type: string
 *          example: admin
 *        phoneNumber:
 *          type: string
 *          example: 12345678910
 *        address:
 *          type: string
 *          example: Barclays-abuja
 *
 */

router.post('/', registerUser);

/**
 * @openapi
 * '/users/send-otp':
 *    post:
 *      tags:
 *        - user
 *      summary: create a new User
 *      description: creating a new otp for user
 *      operationId: CUser-Otp
 *      requestBody:
 *        description: create user otp
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Send-otp'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/Send-otp'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/Send-otp'
 *      responses:
 *        default:
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Send-otp-Response'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/Send-otp-Response'
 *
 * components:
 *   schemas:
 *     Send-otp:
 *      type: object
 *      properties:
 *       email:
 *          type: string
 *     Send-otp-Response:
 *      type: string
 *
 *
 *
 *
 *
 */
router.post('/send-otp', sendOTP);
/**
 * @openapi
 * '/users/login':
 *    post:
 *      tags:
 *        - user
 *      summary: login as an existing User
 *      description: Logging in as an existing user in the app
 *      operationId: LoginUser
 *      requestBody:
 *        description: Login an existing User in the app
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        default:
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/LoginResponse'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/LoginResponse'
 *
 *
 * components:
 *   schemas:
 *     Login:
 *      type: object
 *      properties:
 *       email:
 *          type: string
 *          example: uzo@gmail.com
 *       password:
 *          type: string
 *          example: '123456'
 *     LoginResponse:
 *      type: object
 *      properties:
 *       exisitingUser:
 *          type: any
 *
 *       token:
 *          type: string | undefined
 *          example: '123agsduhgkddadhl6'
 *
 *
 */
router.post('/login', authUser);
/**
 * @openapi
 * /users/googlelogin:
 *   get:
 *      tags:
 *         - user
 *      summary: Logs in with google OAuth2
 *      description: 'sends request to google OAuth server'
 *      operationId: GoogleOauthLoginUser
 *      parameters: []
 *      responses:
 *        default:
 *           description: successful operation
 *

 *
 */

router.get('/googlelogin', googleAuthUser);
router.get('/auth/google/callback', callbackHandler);
/**
 * @openapi
 * /users/googlehtmlpage:
 *   get:
 *      tags:
 *         - user   
 *      summary: googlehtmlpage
 *      description: ''
 *      operationId: HtmlPage
 *      parameters: []
 *      responses:
 *        default:
 *           description: successful operation
 *

 *
 */

router.get('/googlehtmlpage', googleHtmlPage);
/**
 * @openapi
 * /users/logout:
 *   post:
 *      tags:
 *         - user   
 *      summary: Logs out current logged in user session
 *      description: ''
 *      operationId: logoutUser
 *      parameters: []
 *      responses:
 *        default:
 *           description: successful operation
 *

 *
 */
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

router.get('/', pjbooksWelcomePage);

export default router;
