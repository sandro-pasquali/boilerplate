# The NodeJS Monorepo

A boilerplate for understanding how to set up a `NodeJS` monorepo, with a CLI!

## Getting started

Install `Node.js` 16 or higher.

- **NOTE**: Installing `Node.js` will also install `npm`

Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Use `npm` to install `yarn`:

- `npm i -g yarn`

Enter the `boilerplate` directory, eg `cd boilerplate`

Build the `boilerplate` repo by running `yarn`

## This is a monorepo

It is not unusual for a company to maintain many related applications. Typically each of these repositories(repos) exist in distinct `git` repos, one for each application. When there are many such distinct application repos it can become difficult to manage interdependencies, deployment, and so forth, of these isolated repos.

A `monorepo` is created when these many applications are contained in a single(mono-) `git` repo.

This is a monorepo. The folders in `./packages` are all independent `NodeJS` packages. You keep adding to that folder; this is the folder where all your future work will go.

### Advantages of monorepos we care about

- One place for your code
- One `node_modules` folder for all your dependencies, nicely de-duped and "normalized" by yarn, in the root folder.
- If your packages are `npm` modules you can make changes to these dependencies and the other packages in your monorepo that require that dependency will get the changed version. Without a monorepo, if you need a change in a dependency you'll have to contact that team or developer, ask them to make a change, and wait...for...the...change...to...be...published...to...npm. Having immediate updates is a **huge** win.

## yarn

You should have installed `yarn`. Check its version in a folder that is **not** within `/boilerplate`:

```
> yarn -v
// 1.22.17
```

Now enter `/boilerplate` and do the same thing:

```
> yarn -v
// 3.1.1 wut?
```

Notice the `.yarn` folder in `/boilerplate`. Go into `.yarn/releases`. There it is!

Yarn is primarily focused on creating predictable deploys. The `yarn.lock` file is the primary example, where you will have locked your package versions. Additionally, with the `.yarn` folder you can be sure that you build your dependencies with the same version of `yarn` you use in development when in deployment scenarios (within your deployed images, pods, etc).

`yarn` has the concept of `workspaces` -- the `packages` folder that defines the packages collected within this monorepo.

See `.yarnrc.yml`.

## workspaces

Apart from putting all your development folders in `packages` you won't have to worry too much about how the workspaces "work" under the hood...except for when you are installing new `npm` modules.

When you want to install a new dependency (say, `got`) into the `we` workspace, you should now target that workspace when running `yarn add`:

```
yarn workspace we add got
```

## lerna

`lerna` is a monorepo manager for `NodeJS`. We have "integrated" it with `yarn workspaces` to create a smooth developer experience. You won't have to do anything to enable `lerna` -- it is already integrated into the `package.json` file. The `lerna.json` file shouldn't need any changes. Take a look at it to get a feel for what is happening.

See `lerna.json`.

## package.json and dotfiles

Go through these dotfiles/folders:

- `.eslintrc.json` -- Linting
- `commitlint.config.js` -- Configuration for `commitlint`.
- `.husky` -- Pre-commit hooks, `commitlint` message validation.
- `.prettierrc.yml` -- The `prettier` code formatting tool.

Also see the related confirations in `package.json`:

```
"commitlint": {
    "rules": {},
    "parserPreset": {
        "parserOpts": {}
    },
    "extends": [
        "@commitlint/config-conventional"
    ]
},
"lint-staged": {
    "**/*.js": [
        "eslint --fix"
    ],
    "**/*.{js,css,json,yaml,yml}": [
        "prettier --write"
    ]
},
"workspaces": {
    "packages": [
        "packages/*"
    ]
}
```

## There is a CLI package you should link

The package `packages/we` defines a CLI tool, `we`. This is a tool you can run from the command-line. In order to use it on the command-line we need to link it. Go into the `we` directory and run `npm link`:

```
> cd boilerplate/packages/we
> npm link
```

You can now use `we` directly:

```
> we wiki "nodejs"
```

Note that this is for demo purposes, and `we` is marked as `"private": true` in its `package.json`. We never intend to publish it. Only use the above linking behavior.

Check out `we/bin/index.js` and `we/bin/commands`.




