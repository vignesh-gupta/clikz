# CONTRIBUTING

When contributing to this repository, please first discuss the change you wish to make via [issues](https://github.com/vignesh-gupta/clikz/issues).

Please note if you are working on a certain issue then make sure to stay active with development.

## Git Commit, Branch, and PR Naming Conventions

When you are working with git, please be sure to follow the conventions below on your pull requests, branches, and commits:

```text
PR: #[ISSUE ID] Title of the PR
Branch: [ISSUE ID]-title-of-the-pr (shorter)
Commit: [[ISSUE ID]] [ACTION]: what was done
```

Examples:

```text
PR: #2 Add a new feature / layer
Branch: 2-add-new-layer
Commit: [2] feat: add new layer
```

## Installation

To get started with **Clikz** locally, follow these steps

1. Clone the repo:

   ```sh
   git clone https://github.com/vignesh-gupta/clikz.git
   ```

2. Run the following command to install the dependencies:

   ```sh
   pnpm i
   ```

3. Copy and paste variables from `.env.example` into `.env`

4. Setup tinybird for analytics

   - In your [Tinybird](https://www.tinybird.co/) account, create a new Workspace.
   - Follow the instruction [here](https://www.tinybird.co/docs/cli/install) to install in `packages/tinybind`
   - Run the following command to deploy the tinybird pipeline
     ```sh
     tb auth --token <YOUR_ADMIN_TOKEN> && tb push
     ```

5. Setup [Neon Database](https://neon.tech/) (Serverless Postgres) and update in `.env`

   - Create a new database in Neon
   - Update the `DATABASE_URL` in `.env` with the database URL
   - Run the following command to deploy the database schema
     ```sh
     pnpm run db:push
     ```

6. Start the app dev server

   ```sh
   pnpm dev
   ``

   ```

7. Open your browser and visit <http://localhost:3000> to see the application running.

## Working on New Features

If you're new to Github and working with open source repositories, Cody made a video a while back which walks you through the process:
[![How to make a pull request on an open source project](https://img.youtube.com/vi/8A4TsoXJOs8/0.jpg)](https://youtu.be/8A4TsoXJOs8)

If you want to work on a new feature, follow these steps.

1. Fork the repo
2. Clone your fork
3. Checkout a new branch
4. Do your work
5. Commit
6. Push your branch to your fork
7. Go into github UI and create a PR from your fork & branch, and merge it into upstream MAIN

## Pulling in changes from upstream

You should pull in the changes that we add in daily, preferably before you checkout a new branch to do new work.

```sh
git checkout main
```

```sh
git pull upstream main
```
