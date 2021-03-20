# MediConnect

This is the front-end repository for our 2021 Software Engineering course project.

## Creating Branches

Use `git checkout -b <branch name>` to create a new branch for your specific module or a chunk of functionality development.

Feel free to create as many branches as you want, since this encourages cooperation.

There're a few guidelines you should follow when creating a new branch:

1. Every branch corresponds to a new functionality block, and should be created from its parent functionality (which should usually be the `master` branch). We maintain a functionaly master branch for you to create branches upon.
2. Every branch should have its name in a certain format as long as it's a functionality block.
   1. `feature/<feature name>` is for developing new stuff
   2. `fix/<problem name>` is for fixing existing problems
   3. `hotfix/<hotfix name>` is for fixing problems that needs immediate attention
3. Once you're done with your work from your own branch, that is, you've tested it on your own machine that the functionality and ui layout/coloring corresponds to the specification provided to you, you can create a **Pull Request** at [GitHub](https://github.com/dendenxu/MediConnect-Front/pulls) from your branch to `master`, we'll deal with it by merging it or telling your to merge `master` into your branch first.

## Creating Commits

You should divide your work into specific, recognizable blocks of coding to make your commit clean and organized.

1. Every commit should at least **compile**.
2. Every commit message should follow some specific guidelines:
   1. `feat: <small feature name>` is for regular development
   2. `fix: <small problem name>` is for fixing some stuff that wasn't in consistency with your requirement specification
   3. `chore: <chore name>` is for doing some chore work that doesn't neccessarily affects the code, for example, adding comment
   4. `refactor: <what you've refactored>` is for refactoring the code to make it look like a poem that doesn't affect the final outcome of your code
   5. `merge: <from which to which>` is for administrators to merge branches
3. Generally, your commit message should sum up what you've done in this commit. And if you have anything interesting to let others know, write it in the `body` section of your commit message. We recommend a **SHORT and SELF-EXPLANATORY commit message header and DETAILTED commit message body.**
4. **Unless you're ME(xz) or YOU'VE CONTACTED ME(xz), you should never commit directly onto master branch**

## Other Stuff

1. We use `React` and `Material UI` for our project, be sure to understand every line of code you commit into the project. If you don't, look it up, and comment on what their functionality works or how to look it up.
2. You should follow the spefications provided to you by the designer and *Requirement Specification*, but feel free to contact the corresponding person for more information (If, as a requirement specifier, you're contacted, your specification isn't thorough enough and you should improve upon that by providing a better one on the next specification.)
3. Again, feel free to contact anyone for unexplained stuff. We just want to have fun writing this stuff right?
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
