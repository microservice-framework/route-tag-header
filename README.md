# route-tag-header
Provide tag "header". Easy to use tag that vote to route traffic to tagged microservices based on header


Example config: 
```
{
  tag: "header",
  config: {
    header: {
      accept: "application/vnd.api.test-preview"
    },
    voteSize: 1000,
  },
  handler: "route-tag-header"
}
```
