/**
 * @openapi
 * '/users/forgot-password':
 *    get:
 *      tags:
 *        - user
 *      summary: shows a html page to insert user email
 *      description: Insert user Email so that a reset email can be sent to user
 *      operationId: forgot-password
 *      parameters: []
 *      
 *      responses:
 *        default:
 *           description: successful operation
 *           
 * 
 * '/users/update-profile-picture':
 *    post:
 *      tags:
 *        - user
 *      summary: updates profile picture 
 *      description: updates user's profile picture
 *      operationId: update-profile-picture
 *      requestBody:
 *        required: true
 *        description: input User's email and Avatar
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateProfilePicture'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/UpdateProfilePicture'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/UpdateProfilePicture'
 *      responses:
 *        default:
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UpdateProfilePictureResponse'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/UpdateProfilePictureResponse'
 * 
 * 
 * 
 * '/users//update-user-profile':
 *    post:
 *      tags:
 *        - user
 *      summary: updates user's Profile 
 *      description: Updates User's Profile
 *      operationId: update-user-profile
 *      requestBody:
 *        required: true
 *        description: input required User's details to be changed
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateUserProfile'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/UpdateUserProfile'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/UpdateUserProfile'
 *      responses:
 *        default:
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UpdateUserProfileResponse'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/UpdateUserProfileResponse'
 * 
 * 
 * '/users/forgot-password-processor':
 *    post:
 *      tags:
 *        - user
 *      summary: sends password reset form to user's email 
 *      description: validates User's email, sends reset form to user's email
 *      operationId: forgot-password-processor
 *      requestBody:
 *        required: true
 *        description: input User's email
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgotPasswordUserEmail'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/ForgotPasswordUserEmail'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/ForgotPasswordUserEmail'
 *      responses:
 *        default:
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ForgotPasswordUserEmailResponse'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/ForgotPasswordUserEmailResponse'
 * 
 * 
 * '/users/reset-password-processor':
 *    post:
 *      tags:
 *        - user
 *      summary: resets password with information from email 
 *      description: resets passsword
 *      operationId: reset-password-processor
 *      requestBody:
 *        required: true
 *        description: input User's email, newPassword and confirmPassword
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResetPasswordInputs'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/ResetPasswordInputs'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/ResetPasswordInputs'
 *      responses:
 *        default:
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ResetPasswordInputsResponse'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/ResetPasswordInputsResponse'
 * 
 * 
 * '/users':
 *    post:
 *      tags:
 *        - user
 *      summary: create a new User
 *      description: creating a new user in the app
 *      operationId: CreateUser
 *      requestBody:
 *        required: true
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
 *                 $ref: '#/components/schemas/UserResponse'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/UserResponse'
 * 
 * '/users/getuser':
 *    post:
 *      tags:
 *        - user
 *      summary: get a created user stored in the db
 *      description: getting a user stored in the apps db
 *      operationId: GetUser
 *      requestBody:
 *        description: get an existing user object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUser'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/GetUser'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/GetUser'
 *      responses:
 *        default:
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/GetUserResponse'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/GetUserResponse'
 * 
 * '/users/changepassword':
 *    post:
 *      tags:
 *        - user
 *      summary: change your password here
 *      description: changing user password
 *      operationId: changePassword
 *      requestBody:
 *        description: change password for existing user object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ChangePassword'
 *          application/xml:
 *            schema:
 *              $ref: '#/components/schemas/ChangePassword'
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: '#/components/schemas/ChangePassword'
 *      responses:
 *        200:
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ChangePasswordResponse'
 *             application/xml:
 *               schema:
 *                 $ref: '#/components/schemas/ChangePasswordResponse'     
 *        409:
 *           description: Conflict
 *        400:
 *           description: Bad Request
 * 
 * '/users/send-otp':
 *    post:
 *      tags:
 *        - user
 *      summary: create a new User otp
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
 * '/users/login':
 *    post:
 *      tags:
 *        - user
 *      summary: login as an existing User
 *      description: Logging in as an existing user in the app
 *      operationId: LoginUser
 *      requestBody:
 *        description: Login an existing User in the app
 *        required: true
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

 * components:
 *   schemas:
 *     ForgotPasswordUserEmail:
 *      type: object
 *      required: 
 *        - email
 *        - admin
 *        
 *      properties:      
 *        email:
 *          type: string
 *          example: uzo@gmail.com
 *        admin:
 *          type: boolean
 *          example: true
 *        
 *     ForgotPasswordUserEmailResponse:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string         
 *         lastName:
 *           type: string          
 *         email:
 *           type: string        
 *         _id:
 *           type: string        
 *         createdAt:
 *           type: string         
 *         updatedAt:
 *           type: string         
 *       
 * 
 *     UpdateProfilePicture:
 *      type: object
 *      required: 
 *        - email
 *        - avatar
 *        
 *      properties:      
 *        email:
 *          type: string
 *          example: uzo@gmail.com
 *        avatar:
 *          type: string
 *          
 *        
 *     UpdateProfilePictureResponse:
 *       type: object
 *       properties:
 *         avatar:
 *           type: string        
 *         _id:
 *           type: string        
 *         createdAt:
 *           type: string         
 *         updatedAt:
 *           type: string         


 *     UpdateUserProfile:
 *      type: object
 *      required: 
 *        - email
 *        - firstName
 *        - lastName
 *        - dob
 *        - role
 *        - pnoneNumber
 *      properties:
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
 *        role:
 *          type: string
 *          example: admin
 *        phoneNumber:
 *          type: string
 *          example: 12345678910
 *        verified:
 *          type: boolean
 *          example: true or false
 *        isActive:
 *          type: boolean
 *          example: true or false
 
 *     UpdateUserProfileResponse:
 *       type: object
 *       properties:
 *        firstName:
 *          type: string

 *        lastName:
 *          type: string

 *        email:
 *          type: string

 *        dob:
 *          type: string

 *        password:
 *          type: string

 *        role:
 *          type: string

 *        phoneNumber:
 *          type: string
 
 *        avatar: 
 *          type: string
 *        address:
 *          type: string

 *        verified:
 *          type: boolean

 *        isActive:
 *          type: boolean
 *                
 
 *        createdAt:
 *           type: string         
 *        updatedAt:
 *           type: string         
         
       
 * 
 *     User:
 *      type: object
 *      required: 
 *        - email
 *        - password
 *        - role
 *        - pnoneNumber
 *      properties:
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
 *        avatar: 
 *          type: string
 *        address:
 *          type: string
 *          example: Barclays-abuja
 *        verified:
 *          type: boolean
 *          example: true or false
 *        isActive:
 *          type: boolean
 *          example: true or false
 *          
 *     UserResponse:
 *      type: object
 *      properties:
 *         firstName:
 *           type: string         
 *         lastName:
 *           type: string          
 *         email:
 *           type: string        
 *         _id:
 *           type: string        
 *         createdAt:
 *           type: string         
 *         updatedAt:
 *           type: string         
 *         password:
 *           type: string           
 *         role:
 *           type: string           
 *         phoneNumber:
 *           type: string           
 *         avatar: 
 *           type: string
 *         address:
 *           type: string
 *         isActive:
 *           type: boolean   
 *         verified:
 *          type: boolean
 * 
 *     ResetPasswordInputs:
 *      type: object
 *      required: 
 *        - email
 *        - password
 *        - role
 *        - pnoneNumber
 *      properties:

 *        email:
 *          type: string
 *          example: uzo@gmail.com
 *        newPassword:
 *          type: string
 *          example: '123456'
 *        confirmPassword:
 *          type: string
 *          example: '123456'
 
 *     ResetPasswordInputsResponse:
 *       type: object
 *       properties:
         
 *         email:
 *           type: string        
 
 *         createdAt:
 *           type: string         
 *         updatedAt:
 *           type: string         
 *         password:
 *           type: string           
 
 * 
 *     Send-otp:
 *      type: object
 *      properties:
 *       email:
 *          type: string
 *     Send-otp-Response:
 *      type: string 
 * 
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
 *          type: any *
 *       token:
 *          type: string | undefined
 *          
 * 
 *     GetUser:
 *      type: object
 *      properties:
 *       email:
 *          type: string
 *          example: uzo@gmail.com *      
 *     GetUserResponse:
 *      type: object
 *      properties:
 *       exisitingUser:
 *          type: any *
 *       token:
 *          type: string | undefined
 *         
 * 
 *     ChangePassword:
 *      required:
 *       - email
 *       - oldPassword
 *       - newPassword
 *      type: object
 *      properties:
 *       email:
 *          type: string
 *          example: uzo@gmail.com
 *       oldPassword:
 *          type: string
 *          example: '123456'
 *       newPassword:
 *          type: string
 *          example: '12345678'
 *     ChangePasswordResponse:
 *      type: object
 *      properties:
 *       updatedUser:
 *          type: any *
 *        
 * 
 *
 */

// router.post('/', registerUser);
