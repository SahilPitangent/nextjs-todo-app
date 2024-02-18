# ToDo List App 
A simple app to create, store and manage ToDo lists.


## Installation and Setup

Please make sure you `Node` version is at least `18.0.0` adn `npm` version is at least `9.5.0`

1. First clone the repository
2. Run the following commands to setup the project and start development server
```bash
npm install
npm run dev
```
3. To turn on redux logger set following variables in .env.local file
```
NEXT_PUBLIC_REDUX_LOGGER_ON=ON
```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Technology Stack

1. Nextjs (App router)
2. Prisma - database management and ORM, used SQLite as database
3. Redux toolkit & Redux toolkit query
4. Material UI


## Assumptions

1. The `Completion Date` of a todo item is assumed as `Due Date` in the application.
2. To simplify running the project database files also included in git. It is not necessary to run migration commands.


## Note

If this assignment is selected, please email to `miltan@pitangent.com` to proceed.
