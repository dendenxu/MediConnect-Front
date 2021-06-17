# MediConnect

This is the front-end repository for our 2021 Software Engineering course project.

## Production Build Quick Start

### Frontend Setup

1. `git checkout master` to make a production build on this branch
2. `git pull` to fetch changes from this repository
3. `npm install` to install added dependencies
4. `npm run build` to make a production ready build
5. Optionally, `npm install -g serve` to use the `serve` package for serving the frontend
   - Some permission issues might occur since you're installing globally, use `sudo npm install -g serve` if you see `npm ERR!`
6. `serve -s build` to serve the build folder, or your other favorite server

### Backend Setup

Assuming you've already got the [backend repository](https://github.com/AsterNighT/software-engineering-backend)

If not, run `git clone https://github.com/AsterNighT/software-engineering-backend` to get it and `cd software-engineering-backend`

1. Optionally, install `go` following the [official installation guide](https://golang.org/doc/install)
2. `git pull` to get the newest backend
3. `make build` to build the backend
4. `make run` to run the backend, default port `12448`

Now you should at least be able to login (or be able not to login with bad credentials or wrong emails)

## Development Build Quick Start

1. `git pull` to make sure you're up to date
2. Optionally, `git checkout <your-branch-name>` (the **master** branch should always be working fine)
3. `npm install` in case some dependencies are added
4. `npm start` to compile and run the project, your browser should open up automatically

## Administrative

We use the [project board](https://github.com/dendenxu/MediConnect-Front/projects/1) to track the progress of development. We create [issues](https://github.com/dendenxu/MediConnect-Front/issues) on the board and assign them to assignees to email them, so be sure to `check your relevant mailbox` and feel free to add miscellaneous issues.

These should be the main workflow issues to be created on the board by the [administrators](https://github.com/dendenxu/MediConnect-Front/wiki/%E5%89%8D%E7%AB%AF%E5%90%84%E6%A8%A1%E5%9D%97%E5%88%86%E5%B7%A5) of a certain module:

1. Module UI Design requirements (including **Specific Requirements(详细需求文档)**), [example](https://github.com/dendenxu/MediConnect-Front/issues/4)
   - This issue should provide a link to the **Specific Development Requirements**, like [this](https://github.com/dendenxu/MediConnect-Front/wiki/%E8%B4%A6%E5%8F%B7%E7%AE%A1%E7%90%86%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90)
   - Assign this issue to the [UI/Prototype Designers](https://github.com/dendenxu/MediConnect-Front/wiki/%E5%89%8D%E7%AB%AF%E5%90%84%E6%A8%A1%E5%9D%97%E5%88%86%E5%B7%A5)
   - And post any additional information if needed.
2. Module development requirements (including **Prototypes(原型图)**, **UI Design(设计稿)**, **Specific Requirements(详细需求文档)**, **API Requirements(详细接口文档)**), [example](https://github.com/dendenxu/MediConnect-Front/issues/6)
   - This issue should provide a link to the **Specific Development Requirements**, like [this](https://github.com/dendenxu/MediConnect-Front/wiki/%E8%B4%A6%E5%8F%B7%E7%AE%A1%E7%90%86%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90)
   - And if this module involves communicating with the backend, you should also include a **API Requirements**, like [this](https://github.com/dendenxu/MediConnect-Front/wiki/%E8%B4%A6%E5%8F%B7%E7%AE%A1%E7%90%86%E6%8E%A5%E5%8F%A3%E5%88%86%E6%9E%90)
   - And to the **Prototype Design**
   - And to the **UI Design**, like [this](https://lanhuapp.com/web/#/item/project/stage?pid=3c75f213-cbd7-4615-ba52-6c5a8b2a27c8)
   - Note if **UI Design** is provided, we can discard the **Prototype Design**
   - Assign this issue to the [Developers](https://github.com/dendenxu/MediConnect-Front/wiki/%E5%89%8D%E7%AB%AF%E5%90%84%E6%A8%A1%E5%9D%97%E5%88%86%E5%B7%A5)
   - And post any additional information if needed.

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

**These are assumed to be applied AUTOMATICALLY by commitlint. You won't be able to commit if anything is wrong.**

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
2. You should follow the spefications provided to you by the designer and _Requirement Specification_, but feel free to contact the corresponding person for more information (If, as a requirement specifier, you're contacted, your specification isn't thorough enough and you should improve upon that by providing a better one on the next specification.)
3. Again, feel free to contact anyone for unexplained stuff. We just want to have fun writing this stuff right?
4. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), click the link to see more.
