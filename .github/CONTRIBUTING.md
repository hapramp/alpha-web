# Contributing to HapRamp Alpha Web App

### Submitting a bug report

To submit a bug report, please open an issue on the Github issue tracker ([here](https://github.com/hapramp/alpha-web/issues)). Please make sure that you are not filing a duplicate issue.

### Creating a pull request

To contribute to the codebase, you need to create pull requests with the changes you want to make. Here is a general flow of how to submit a pull request -

1. Fork this repository from Github.
2. Clone your version of the repository into your local development environment.
3. Set up the project.
4. Checkout a new branch with proper name.
    ```
    $ git checkout -b <new-branch-name>
    ```
5. Make the changes you want.
6. Add and commit the changed files with a proper commit message.
    ```
    $ git add <files-to-commit>
    $ git commit -m <your-commit-message>
    ```
7. Push your local branch
    ```
    $ git push origin <new-branch-name>
    ```
8. Go to the repo on Github and [create a pull request](https://github.com/hapramp/alpha-web/compare) by selecting proper branches.
9. Done :tada:.

### Development

The project uses yarn for dependency management.

##### Installing Dependencies

```
$ yarn
```

##### Starting Local Development Server

```
$ yarn start
```

##### Creating Optimized Production Build

```
$ yarn build
```
