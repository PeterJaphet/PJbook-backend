/**
 * @openapi
 * /users/login:
 *      post:
 *        tags:
 *          - user
 *        summary: log in as an existing user
 *        description: Logging in as an existing user in the app
 *        operationalId: userLogin
 *        requestBody:
 *          description: Log in as an existing user in the app
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Login'
 *        responses:
 *          '200':
 *            description: Ok......Login was successful
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/LoginResponse'
 *          '400':
 *            description: The specified Login details are invalid.
 *          default:
 *            description: successful operation
 *
 *
 * /users/sign-up:
 *      post:
 *        tags:
 *          - user
 *        summary: Create a new User
 *        description: Creating a new User in the app
 *        operationalId: CreateUser-SignUp
 *        requestBody:
 *          description: Create a new User object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SignUp'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/SignUp'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/SignUp'
 *        responses:
 *          '200':
 *            description: Ok......User succefully created
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/SignUpResponse'
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/SignUpResponse'
 *          '400':
 *            description: The specified User details are not wrong.
 *          default:
 *            description: successful operation
 *
 *
 * /users/change-password:
 *      post:
 *        tags:
 *          - user
 *        summary: Change your password here
 *        description: Changing your password
 *        operationalId: changePassword
 *        requestBody:
 *          description: change password for existing user object
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ChangePassword'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/ChangePassword'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/ChangePassword'
 *        responses:
 *          '200':
 *            description: Ok......User succefully changed Password
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ChangePasswordResponse'
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/ChangePasswordResponse'
 *          '409':
 *            description: Conflict
 *          '400':
 *            description: Bad Request
 *          default:
 *            description: successful operation
 *
 *
 * /users/update-profile-picture:
 *      patch:
 *        tags:
 *          - user
 *        summary: updates profile picture
 *        description: updates user's profile picture
 *        operationId: update-profile-picture
 *        requestBody:
 *          description: input User's email and Avatar
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UpdateProfilePicture'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/UpdateProfilePicture'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/UpdateProfilePicture'
 *        responses:
 *          '200':
 *            description: successful operation
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/UpdateProfilePictureResponse'
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/UpdateProfilePictureResponse'
 *          default:
 *            description: successful operation
 *
 *
 *
 * /users/update-user-profile:
 *      patch:
 *        tags:
 *          - user
 *        summary: updates user's Profile
 *        description: Updates User's Profile
 *        operationId: update-user-profile
 *        requestBody:
 *          description: input required User's details to be changed
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UpdateUserProfile'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/UpdateUserProfile'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/UpdateUserProfile'
 *        responses:
 *          '200':
 *             description: successful operation from swagger

 *
 *
 * /users/get-user:
 *      post:
 *        tags:
 *          - user
 *        summary: get a created user stored in the db
 *        description: getting a user stored in the apps db
 *        operationId: GetUser
 *        requestBody:
 *          description: get an existing user object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GetUserInputs'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/GetUserInputs'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/GetUserInputs'
 *        responses:
 *          '200':
 *             description: successful operation
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/GetUserResponse'
 *               application/xml:
 *                 schema:
 *                   $ref: '#/components/schemas/GetUserResponse'
 *          default:
 *             description: successful operation 
 *
 *
 * /users/send-otp:
 *      post:
 *        tags:
 *          - user
 *        summary: create a new User otp
 *        description: creating a new otp for user
 *        operationId: CUser-Otp
 *        requestBody:
 *          description: create user otp
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Send-otp'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/Send-otp'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/Send-otp'
 *        responses:
 *          default:
 *            description: successful operation
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Send-otp-Response'
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/Send-otp-Response'
 *
 * /users/confirm-otp:
 *      post:
 *        tags:
 *          - user
 *        summary: confirm User otp
 *        description: confirm user otp
 *        operationId: Confirm-User-Otp
 *        requestBody:
 *          description: confirm user otp
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Confirm-otp'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/Confirm-otp'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/Confirm-otp'
 *        responses:
 *          default:
 *            description: successful operation
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Confirm-otp-Response'
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/Confirm-otp-Response'
 *
 * /users/resend-otp:
 *      post:
 *        tags:
 *          - user
 *        summary: resend User otp
 *        description: resend user otp
 *        operationId: Resend-User-Otp
 *        requestBody:
 *          description: resend user otp
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Resend-otp'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/Resend-otp'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/Resend-otp'
 *        responses:
 *          default:
 *            description: successful operation
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Resend-otp-Response'
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/Resend-otp-Response'
 *
 *
 * /users/:
 *      get:
 *        tags:
 *           - user
 *        summary: Landing Home Page
 *        description: 'Landing page'
 *        operationId: userHomePage
 *        parameters: []
 *        responses:
 *          default:
 *             description: successful operation
 * 
 * 
 * /users/googlelogin:
 *      get:
 *        tags:
 *           - user
 *        summary: Logs in with google OAuth2
 *        description: 'sends request to google OAuth server'
 *        operationId: GoogleOauthLoginUser
 *        parameters: []
 *        responses:
 *          default:
 *             description: successful operation
 *
 * /users/googlehtmlpage:
 *      get:
 *        tags:
 *           - user
 *        summary: googlehtmlpage
 *        description: ''
 *        operationId: HtmlPage
 *        parameters: []
 *        responses:
 *          default:
 *             description: successful operation
 *
 * /users/logout:
 *      post:
 *        tags:
 *           - user
 *        summary: Logs out current logged in user session
 *        description: ''
 *        operationId: logoutUser
 *        parameters: []
 *        responses:
 *          default:
 *             description: successful operation
 *
 *
 * /users/forgot-password:
 *      get:
 *        tags:
 *          - user
 *        summary: shows a html page to insert user email
 *        description: Insert user Email so that a reset email can be sent to user
 *        operationId: forgot-password
 *        parameters: []
 *        responses:
 *          default:
 *             description: successful operation
 *
 *
 * /users/forgot-password-processor:
 *      post:
 *        tags:
 *          - user
 *        summary: sends password reset form to user's email
 *        description: validates User's email, sends reset form to user's email
 *        operationId: forgot-password-processor
 *        requestBody:
 *          required: true
 *          description: input User's email
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ForgotPasswordUserEmail'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/ForgotPasswordUserEmail'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/ForgotPasswordUserEmail'
 *        responses:
 *          default:
 *            description: successful operation
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/ForgotPasswordUserEmailResponse'
 *              application/xml:
 *                schema:
 *                  $ref: '#/components/schemas/ForgotPasswordUserEmailResponse'
 *
 * /users/reset-password-processor:
 *      post:
 *        tags:
 *          - user
 *        summary: resets password with information from email
 *        description: resets passsword
 *        operationId: reset-password-processor
 *        requestBody:
 *          required: true
 *          description: input User's email, newPassword and confirmPassword
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ResetPasswordInputs'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/ResetPasswordInputs'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/ResetPasswordInputs'
 *        responses:
 *          default:
 *             description: successful operation
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/ResetPasswordInputsResponse'
 *               application/xml:
 *                 schema:
 *                   $ref: '#/components/schemas/ResetPasswordInputsResponse'
 *
 *
 *
 *
 *
 *
 *
 * /book/get-books:
 *      get:
 *        tags:
 *          - books
 *        summary: gets the list of available books
 *        description: get list of books
 *        operationId: getBooks
 *        parameters: []
 *        responses:
 *          default:
 *             description: successful operation
 *
 * /book/get-book/{id}:
 *      get:
 *        tags:
 *          - books
 *        summary: gets a particular book
 *        description: getting a book
 *        operationId: get-book
 *        parameters:
 *            - name: "id"
 *              in: "path"
 *              description: ID of the book to get
 *              required: true
 *              schema:
 *                type: string
 *        responses:
 *          '200':
 *            description: Ok......a User Object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/UserResponse'
 *          '400':
 *            description: The specified user ID is invalid (not a number).
 *          default:
 *             description: successful operation
 *
 *
 * /book/update-book/{id}:
 *      patch:
 *        tags:
 *          - books
 *        summary: update a book
 *        description: update the details of a book
 *        operationId: update-book
 *        parameters:
 *            - name: "id"
 *              in: "path"
 *              description: "ID of the book to update"
 *              required: true
 *              schema:
 *                type: string
 *        requestBody:
 *          required: true
 *          description: "input book's parameters for update"
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UpdateBook'
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/UpdateBook'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/UpdateBook'
 *        responses:
 *          default:
 *             description: successful operation
 *             content:
 *               application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/UpdateBookResponse'
 *               application/xml:
 *                 schema:
 *                   $ref: '#/components/schemas/UpdateBookResponse'
 *
 *
 *
 *
 * /book/recommended-books:
 *      get:
 *        tags:
 *          - books
 *        summary: gets the list of 10 recommended books
 *        description: get list of books
 *        operationId: getBooks
 *        parameters: []
 *        responses:
 *          default:
 *             description: successful operation
 *
 *
 * /book/trending-books:
 *      get:
 *        tags:
 *          - books
 *        summary: gets the top 10 trending books
 *        description: get list of books
 *        operationId: getBooks
 *        parameters: []
 *        responses:
 *          default:
 *             description: successful operation
 *
 *
 *
 * /book/latest-books:
 *      get:
 *        tags:
 *          - books
 *        summary: gets the latest 10 books
 *        description: get list of books
 *        operationId: getBooks
 *        parameters: []
 *        responses:
 *          default:
 *             description: successful operation
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * components:
 *  schemas:
 *
 *       Login:
 *         type: object
 *         properties:
 *          email:
 *             type: string
 *             example: uzo@gmail.com
 *          password:
 *             type: string
 *             example: '123456'
 *       LoginResponse:
 *         type: object
 *         properties:
 *          exisitingUser:
 *             type: object
 *          token:
 *             type: string
 *
 *
 *       SignUp:
 *         type: object
 *         required:
 *           - email
 *           - password
 *           - role
 *           - phoneNumber
 *         properties:
 *           firstName:
 *             type: string
 *             example: uzo
 *           lastName:
 *             type: string
 *             example: Aronu
 *           email:
 *             type: string
 *             example: uzo@gmail.com
 *           dob:
 *             type: string
 *             example: '14th may'
 *           password:
 *             type: string
 *             example: '123456'
 *           role:
 *             type: string
 *             example: admin
 *           phoneNumber:
 *             type: string
 *             example: 12345678910
 *           avatar:
 *             type: string
 *           address:
 *             type: string
 *             example: Barclays-abuja
 *       SignUpResponse:
 *         type: object
 *         properties:
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           email:
 *             type: string
 *           _id:
 *             type: string
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *           password:
 *             type: string
 *           role:
 *             type: string
 *           phoneNumber:
 *             type: string
 *           avatar:
 *             type: string
 *           address:
 *             type: string
 *           isActive:
 *             type: boolean
 *           verified:
 *             type: boolean
 *
 *
 *       ChangePassword:
 *         type: object
 *         required:
 *          - email
 *          - oldPassword
 *          - newPassword
 *         properties:
 *           email:
 *             type: string
 *             example: uzo@gmail.com
 *           oldPassword:
 *             type: string
 *             example: '123456'
 *           newPassword:
 *             type: string
 *             example: '12345678'
 *       ChangePasswordResponse:
 *         type: object
 *         properties:
 *           updatedUser:
 *             type: object
 *
 *
 *       UpdateProfilePicture:
 *         type: object
 *         required:
 *           - image
 *           - folder
 *         properties:
 *           image:
 *             type: string
 *           folder:
 *             type: string
 *       UpdateProfilePictureResponse:
 *         type: object
 *         properties:
 *           image:
 *             type: string
 *
 *       UpdateUserProfile:
 *         type: object
 *         required:
 *           - firstName
 *           - lastName
 *           - dob
 *           - phoneNumber
 *         properties:
 *           firstName:
 *             type: string
 *             example: uzo
 *           lastName:
 *             type: string
 *             example: Aronu
 *           dob:
 *             type: string
 *             example: '14th may'
 *           phoneNumber:
 *             type: string
 *             example: 12345678910
 *           address:
 *             type: string
 *             example: barclays luxury estate
 *       UpdateUserProfileResponse:
 *         type: object
 *         properties:
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           email:
 *             type: string
 *           dob:
 *             type: string
 *           password:
 *             type: string
 *           role:
 *             type: string
 *           phoneNumber:
 *             type: string
 *           avatar:
 *             type: string
 *           address:
 *             type: string
 *           verified:
 *             type: boolean
 *           isActive:
 *             type: boolean
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *
 *       GetUserInputs:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *             example: uzo@gmail.com
 *       GetUserResponse:
 *         type: object
 *         properties:
 *           exisitingUser:
 *             type: object
 *
 *
 *       Send-otp:
 *         type: object
 *         properties:
 *          email:
 *             type: string
 *       Send-otp-Response:
 *         type: string
 *
 *       Confirm-otp:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *           otp:
 *             type: number
 *       Confirm-otp-Response:
 *         type: object
 *         properties:
 *           user:
 *             type: object
 *           token:
 *             type: string
 *
 *       Resend-otp:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *       Resend-otp-Response:
 *         type: string
 *
 *
 *       ForgotPasswordUserEmail:
 *         type: object
 *         required:
 *           - email
 *           - admin
 *         properties:
 *           email:
 *             type: string
 *             example: uzo@gmail.com
 *           admin:
 *             type: boolean
 *             example: true
 *       ForgotPasswordUserEmailResponse:
 *         type: object
 *         properties:
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           email:
 *             type: string
 *           _id:
 *             type: string
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *
 *       ResetPasswordInputs:
 *         type: object
 *         required:
 *           - email
 *           - newPassword
 *           - confirmPassword
 *         properties:
 *           email:
 *             type: string
 *             example: uzo@gmail.com
 *           newPassword:
 *             type: string
 *             example: '123456'
 *           confirmPassword:
 *             type: string
 *             example: '123456'
 *       ResetPasswordInputsResponse:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *           password:
 *             type: string
 *
 *
 *
 *
 *       User:
 *         type: object
 *         required:
 *           - email
 *           - password
 *           - role
 *           - phoneNumber
 *         properties:
 *           firstName:
 *             type: string
 *             example: uzo
 *           lastName:
 *             type: string
 *             example: Aronu
 *           email:
 *             type: string
 *             example: uzo@gmail.com
 *           dob:
 *             type: string
 *             example: '14th may'
 *           password:
 *             type: string
 *             example: '123456'
 *           role:
 *             type: string
 *             example: admin
 *           phoneNumber:
 *             type: string
 *             example: 12345678910
 *           avatar:
 *             type: string
 *           address:
 *             type: string
 *             example: Barclays-abuja
 *       UserResponse:
 *         type: object
 *         properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            _id:
 *              type: string
 *            createdAt:
 *              type: string
 *            updatedAt:
 *              type: string
 *            password:
 *              type: string
 *            role:
 *              type: string
 *            phoneNumber:
 *              type: string
 *            avatar:
 *              type: string
 *            address:
 *              type: string
 *            isActive:
 *              type: boolean
 *            verified:
 *             type: boolean
 *       UpdateBook:
 *         type: object
 *         required:
 *          - title
 *          - description
 *          - imageUrl
 *          - fileUploadUrl
 *          - genre
 *          - type
 *         properties:
 *           title:
 *             type: string
 *           description:
 *             type: string
 *           imageUrl:
 *             type: string
 *           fileUploadUrl:
 *             type: string
 *           genre:
 *             type: array
 *             items:
 *               type: string
 *           type:
 *             type: string
 *             enum:
 *                - "private"
 *                - "public"
 *
 *       UpdateBookResponse:
 *         type: object
 *         properties:
 *          '200':
 *            description: "Book updated successfully"
 *          '400':
 *            description: "Bad Request - Invalid parameters"
 *          '404':
 *            description: "Not Found - Book not found"
 *          '500':
 *            description: "Internal Server Error - Something went wrong"
 *
 *
 *
 */
