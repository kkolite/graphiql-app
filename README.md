# GraphiQL

## Links

[**Deploy**](https://rss-graphql.netlify.app/)</br>
[**Video about GraphiQL**](https://youtu.be/XTTEL8_aNhM)

## Local run

**Clone** the project to yourself
```
git clone https://github.com/kkolite/graphiql-app.git
```

After clone do not forget to **switch** to the components branch
```
git checkout develop
```

To start the project you need to download and **install** the necessary libraries with the command
```
npm install
```

The project you can run:
```
npm run dev
```

Runs the app in the development mode. Open **http://localhost:5173** to view it in the browser.


To verify, to start **eslint**, you need to type the command
```
npm run lint
```

And run the **tests** with the command

**WARNING** The version of the node must be **18** or higher

```
npm run test
```


## Exemples for GrafQL query ##
1. Endpoint: https://rickandmortyapi.com/graphql
### Simple query ###
```
query MyQuery {
    characters {
      results {
        image
        id
        gender
        name
      }
    }
  }
```
### Query with variable ###
```
query MyQuery($id: ID!) {
  character(id: $id) {
    id
    name
    gender
    status
    species
   type
   image
   created
  }
characters {
    results {
      id
      name
   }
  }
}
```
variable:
```
{
  "id": "4"
}
```

2. Endpoint: https://countries.trevorblades.com/graphql
### Simple query ###
```
query MyQuery {
  countries {
    capital
    code
    currency
    emoji
  }
}
```
### Query with variable ###

```
query Query($code:ID!) {
  country(code: $code) {
    capital
    emoji
    emojiU
    name
    currencies
    currency
    subdivisions {
      name
    }
    awsRegion
  }
}
```
variable:

```
{
  "code": "BR"
}
```
