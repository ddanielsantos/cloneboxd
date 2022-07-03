/**
 * @generated SignedSource<<b7c9e4d57b1cc8dc2ab3c5e41e036bb0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SearchMovieFromTMDB_Query$variables = {
  title: string;
};
export type SearchMovieFromTMDB_Query$data = {
  readonly searchMovieFromTMDB: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
        readonly posterPath: string | null;
        readonly releaseDate: string;
      } | null;
    } | null> | null;
  } | null;
};
export type SearchMovieFromTMDB_Query = {
  variables: SearchMovieFromTMDB_Query$variables;
  response: SearchMovieFromTMDB_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "title"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "concreteType": "MovieConnection",
    "kind": "LinkedField",
    "name": "searchMovieFromTMDB",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MovieEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Movie",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "posterPath",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "releaseDate",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchMovieFromTMDB_Query",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchMovieFromTMDB_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b630a066e9d534f744359f039dfe4af4",
    "id": null,
    "metadata": {},
    "name": "SearchMovieFromTMDB_Query",
    "operationKind": "query",
    "text": "query SearchMovieFromTMDB_Query(\n  $title: String!\n) {\n  searchMovieFromTMDB(title: $title) {\n    edges {\n      node {\n        id\n        title\n        posterPath\n        releaseDate\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1ba9c5fe311ad44dc24d58f2cdabca05";

export default node;
