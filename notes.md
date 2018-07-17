#NPM Modules Used
- dotenv
- express
- bcryptjs 
- massive 
- express-session
- cloudinary
- nodemailer
- axios 
- body-parser
- react-redux
- redux-persist
- redux
- react-router-dom
- react-facebook-login
- @material-ui/core
- react-popup

#Coding Patterns-Notes 
- Importing Controller Files
    - Indicate functionality
    - Example: const cloudinary = require('cloudinary_controller');
- All javascript code in frontend is in camelCase
    - Example: let helloAli = 'hello Ali';
- All SQL statements are uppercase
    - All SQL COde must be uppercase.
    - Example: SELECT * FROM groups;
- Create Comments
    - Create Comments indicating functionality.
- Each Component has a folder, and subcomponent has a folder.
    -  Each component a css file corresponding to that component.
- Managing input fields within a component.

#Technologies being used
- Weather API
    - Show weather for current location.
- Nodemailer
    - Send Contact email 
    - Send user email after registration
- Socket IO
    - Chat for groups.
- Cloudinary
- Google GeoLocation
    - Getting weather from users location.

#Container Components-Notes
- Home
    - Login Component
- Register
    - UserForm Component
- Dashboard 
    - GroupForm Component
    - EventForm Component
    - CalendarDisplay Component
    - WeatherDisplay Component
- About 
    - Just text......
- Groups 
    - GroupCard Component
- Events 
    - EventCard Component

#Controller Files-Notes 
- cloudinary_controller
    - Methods 
        - upload
- nodemailer_controller
    - Methods 
        - sendMail 
        - contact 
- chat_controller 
    - Methods 
        - createChat