# graphiql-app
## Exemples for GrafQL query ##
1. Endpoint: https://rickandmortyapi.com/graphql
### Simple query ###
``` query MyQuery {
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
  characters {
    results {
      gender
      image
      id
      location {
        name
      }
      name
    }
  }
  character(id: $id) {
    id
    name
    species
  }
}
```
variable:
```
{
  "id": 2,
  "gender": "Female"
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

```query Query($code:ID!) {
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

```{
  "code": "BR"
}
```
