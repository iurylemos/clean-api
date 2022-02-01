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
