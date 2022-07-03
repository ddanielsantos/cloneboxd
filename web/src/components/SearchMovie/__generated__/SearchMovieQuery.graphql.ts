/**
 * @generated SignedSource<<62a0aa0b801691b613c81b97ee4a9d89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SearchMovieQuery$variables = {
  title: string;
};
export type SearchMovieQuery$data = {
  readonly searchMovieFromTMDB: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
        readonly releaseDate: string;
      } | null;
    } | null> | null;
  } | null;
};
export type SearchMovieQuery = {
  variables: SearchMovieQuery$variables;
  response: SearchMovieQuery$data;
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
    "name": "SearchMovieQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchMovieQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7659ce7111f4531c2672ac40520a1847",
    "id": null,
    "metadata": {},
    "name": "SearchMovieQuery",
    "operationKind": "query",
    "text": "query SearchMovieQuery(\n  $title: String!\n) {\n  searchMovieFromTMDB(title: $title) {\n    edges {\n      node {\n        id\n        title\n        releaseDate\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d186ad978cf12812a27fb340d9946e30";

export default node;
