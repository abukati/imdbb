# IMDBB

This is an official imdbb web app

## Get up and running

Run the following command:

```sh
cd omdb && npm ci
```

Once all of the dependencies have been installed, get your API key from [omdbapi](https://www.omdbapi.com).
Then, store it under the OMDB_API_KEY environment variable as well as the API url under OMDB_API_URL.

Then you can run:
```sh
npx turbo dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a Next.js app that features an option to search for your favorite movies
- `api`: a Nest.js server that is used to fetch searched movies from an external api
- `types`: a package with common types that are used by both the web and the api
