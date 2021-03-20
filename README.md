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
