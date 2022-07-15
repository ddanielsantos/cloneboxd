/**
 * @generated SignedSource<<aef3faf4308ed6a1c3bed582b59fca1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ProfileQuery$variables = {
  username?: string | null;
};
export type ProfileQuery$data = {
  readonly userList: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly fullName: string;
        readonly username: string;
      } | null;
    } | null> | null;
  } | null;
  readonly reviewList: {
    readonly pageInfo: {
      readonly hasNextPage: boolean;
    };
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly text: string | null;
        readonly movie: {
          readonly id: string;
          readonly title: string;
          readonly posterPath: string | null;
        };
      } | null;
    } | null> | null;
  } | null;
};
export type ProfileQuery = {
  variables: ProfileQuery$variables;
  response: ProfileQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username"
  }
],
v1 = {
  "kind": "Variable",
  "name": "username",
  "variableName": "username"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      (v1/*: any*/)
    ],
    "concreteType": "UserConnection",
    "kind": "LinkedField",
    "name": "userList",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fullName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
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
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 3
      },
      (v1/*: any*/)
    ],
    "concreteType": "UserReviewConnection",
    "kind": "LinkedField",
    "name": "reviewList",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasNextPage",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserReviewEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserReview",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
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
                    "name": "posterPath",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "af727412188b0abd2c27e1198c31398a",
    "id": null,
    "metadata": {},
    "name": "ProfileQuery",
    "operationKind": "query",
    "text": "query ProfileQuery(\n  $username: String\n) {\n  userList(username: $username) {\n    edges {\n      node {\n        id\n        fullName\n        username\n      }\n    }\n  }\n  reviewList(first: 3, username: $username) {\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        text\n        movie {\n          id\n          title\n          posterPath\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e26f703f8ab3c60252fc625bd40d8954";

export default node;
