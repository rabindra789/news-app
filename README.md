# NewsHub - a personalised news app

## WHAT is this?

-   A functionality where a user can personalised their news feed, save article and get notification.

## Functionality

1.  User signup/signin
2.  User can change their password or interested topics.
3.  User can login through email and password.
4.  Choose topic or sources they are interested in.
5.  Receive news feeds based on user interest.
6.  Save article they want to read later.

## Routes

### 1. Usersignup/Login:

-   **/signup: POST** - Route for creating a new user account. (email, password, fullName, interest)
-   **/login: POST** - Authenticates the user. (email, password)
-   **/logout: POST** - End the user session the token to logout.

### 2. Interest selection:

-   **/interests: GET** - retrive list of avaliable topics or source for user to choose.
-   **/user/interests: POST** - Allow user to save their selected topics to their profile.
-   **/user/interests: PUT** - Lets users to save their list of topics they are interested in.

### 3. Receive news feed based on user interests:

-   **/news-feed: GET** - fetch news articles based on the topics or saved in he user's profile.
    -   may include query parameters. (/news-feed?catagory=sports)

### 4. Save articles:

-   **/user/articles: POST** - saved selected article to the user's profile.
-   **/user/articles: GET** - Retrive a list of article the user has saved to read later.
-   **/user/articles/:articleId: DELETE** - Allow user to ramove an article from their saved articles list.

### 5. Change password:

-   **/user/change-password: PUT** - Allow user to update their password. (require current password)

### 6. Additional utility routes:

-   **/user/profile: GET** - Retrive user profile data including interests and saved articles.
-   **/user/profile: PUT** - Allow user to update general profile information. (bio, etc)

## Dependencies

**1. axios** - Promise-based HTTP client\
**2. bcrypt** - Password hashing library\
**3. body-parser** - Middleware for parsing request bodies\
**4. dotenv** - Loads environment variables from a .env file\
**5. express** - Web framework for Node.js\
**6. jsonwebtoken** - JSON Web Token implementation\
**7. mongoose** - MongoDB object modeling tool

## Dev Dependencies

**1.  nodemon** - Monitors your project directory and automatically restarts your node application

## Contributing

Feel free to open issues or submit pull requests to contribute to the project. Please ensure your contributions adhere to the project's coding style and standards.

## Licence
This project is licenced under the ISC Licence - see the [LICENSE](LICENCE) file for details.

## Author 
**Rabindra Kumar Meher**

## Social
&nbsp; &nbsp;
[<img width="24" height="24" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico">](mailto:rabindrameher116@gmail.com) &nbsp; &nbsp; &nbsp;
[<img width="24" height="24" src="https://static.cdninstagram.com/rsrc.php/y4/r/QaBlI0OZiks.ico">](https://instagram.com/rabindra__18/) &nbsp; &nbsp; &nbsp;
[<img width="30" height="24" src="https://rabindrakumarmeher.up.railway.app/img/favicon.ico">](https://rabindrakumarmeher.up.railway.app/)