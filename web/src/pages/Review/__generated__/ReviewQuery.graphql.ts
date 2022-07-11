/**
 * @generated SignedSource<<03c36eff41ad13f616945293a01e3bf8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ReviewQuery$variables = {
  id: string;
};
export type ReviewQuery$data = {
  readonly singleReview: {
    readonly id: string;
    readonly movie: {
      readonly id: string;
      readonly title: string;
      readonly releaseDate: string;
    };
    readonly watchedAt: string | null;
    readonly rating: number | null;
    readonly user: {
      readonly fullName: string;
    };
    readonly text: string | null;
  } | null;
};
export type ReviewQuery = {
  variables: ReviewQuery$variables;
  response: ReviewQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Movie",
  "kind": "LinkedField",
  "name": "movie",
  "plural": false,
  "selections": [
    (v2/*: any*/),
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "watchedAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rating",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ReviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserReview",
        "kind": "LinkedField",
        "name": "singleReview",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ReviewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserReview",
        "kind": "LinkedField",
        "name": "singleReview",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e3b70b722ebacf934a99117c46376f76",
    "id": null,
    "metadata": {},
    "name": "ReviewQuery",
    "operationKind": "query",
    "text": "query ReviewQuery(\n  $id: ID!\n) {\n  singleReview(id: $id) {\n    id\n    movie {\n      id\n      title\n      releaseDate\n    }\n    watchedAt\n    rating\n    user {\n      fullName\n      id\n    }\n    text\n  }\n}\n"
  }
};
})();

(node as any).hash = "39d6e0689c68587a25294ff3aeac8812";

export default node;
