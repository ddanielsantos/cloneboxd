## :globe_with_meridians: Web

Currently hosted on Vercel, this is the frontend of the application

### :house: Running locally:

Considering you already cloned the repository:

```bash
cd web
yarn
yarn dev
```
### :bulb: Relay:

This GraphQL client comes with a compiler to extract the best of our calls to the GraphQL server, after writing a query/mutation/whatever, run ``yarn relay`` to it do his job and help you with types and etc, alternatively, you can pass the ``--watch`` flag, so the compiler keeps watching any change in your GQL tagged nodes