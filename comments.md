## Folder domain

That folder is used to place the business roles

This example using the namespace is very nice to learn because can be used again

Example code:

```shell
    namespace Query {
        export type Params {
            testOne: string;
            testTwo: string;
        }

        export type Result {
            result: string;
        }
    }

    // example function

    function setQuery(params: Query.Params): Query.Result {
        return ""
    }
```

## Protocols folder

Protocols folder is used to keep every the dependencies about this data layer
Inside this have a folder call cache to save the interfaces

### Interface Segregation Principle

`Should have small interfaces to can do the composition easier`

### SpyOn used with prototype class

This is a interesting refactor because it can be used as a mock

### Class name about Purchases

`Could be a name with the use case stronger but I solve to place some name generic as Manager in end line`
`Has been added a model to the domain folder because the use cases inside this have been using the same interface`

##

`in principle CQS this is separate in layers example: exists a layer to mutation the values and exists a layer to get the data`
`this layer mutation is called as query, and other layer is called as command`
`if this query failed who should be the responsible to execute the query to delete (this is a mutation) is a command`
`in this example is called as validate`
