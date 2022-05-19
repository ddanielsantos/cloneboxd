/**
 * @generated SignedSource<<18fb73124013434b5644aa7b78f53e6e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SearchMovieByTitleQuery$variables = {
  title: string;
};
export type SearchMovieByTitleQuery$data = {
  readonly searchMovieByTitle: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
        readonly duration: string;
      } | null;
    } | null> | null;
  } | null;
};
export type SearchMovieByTitleQuery = {
  variables: SearchMovieByTitleQuery$variables;
  response: SearchMovieByTitleQuery$data;
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
        "kind": "Literal",
        "name": "first",
        "value": 5
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "concreteType": "MovieConnection",
    "kind": "LinkedField",
    "name": "searchMovieByTitle",
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
                "name": "duration",
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
    "name": "SearchMovieByTitleQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SearchMovieByTitleQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1099caf22425cd706ccbc12cfb3a31b9",
    "id": null,
    "metadata": {},
    "name": "SearchMovieByTitleQuery",
    "operationKind": "query",
    "text": "query SearchMovieByTitleQuery(\n  $title: String!\n) {\n  searchMovieByTitle(title: $title, first: 5) {\n    edges {\n      node {\n        id\n        title\n        duration\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "982a37be2b6e4a82ed2ce87da3a473c6";

export default node;
