/**
 * @generated SignedSource<<917b1423492b917f3ee6f57033054751>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MovieDetailsQuery$variables = {
  id: string;
};
export type MovieDetailsQuery$data = {
  readonly singleMovie: {
    readonly title: string;
    readonly releaseDate: string;
    readonly rating: number;
    readonly description: string;
    readonly posterPath: string | null;
    readonly cast: ReadonlyArray<{
      readonly person: {
        readonly name: string;
      };
      readonly role: string;
    } | null> | null;
    readonly crew: ReadonlyArray<{
      readonly person: {
        readonly name: string;
      };
      readonly role: string;
    } | null> | null;
    readonly genres: ReadonlyArray<string | null>;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"LatestReviews__review" | "TopReviews__review">;
};
export type MovieDetailsQuery = {
  variables: MovieDetailsQuery$variables;
  response: MovieDetailsQuery$data;
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
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "releaseDate",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rating",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "posterPath",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Person",
    "kind": "LinkedField",
    "name": "person",
    "plural": false,
    "selections": [
      (v7/*: any*/)
    ],
    "storageKey": null
  },
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "genres",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Person",
    "kind": "LinkedField",
    "name": "person",
    "plural": false,
    "selections": [
      (v7/*: any*/),
      (v11/*: any*/)
    ],
    "storageKey": null
  },
  (v8/*: any*/)
],
v13 = {
  "kind": "Literal",
  "name": "first",
  "value": 3
},
v14 = {
  "kind": "Variable",
  "name": "movie",
  "variableName": "id"
},
v15 = [
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
          (v11/*: any*/),
          (v4/*: any*/),
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fullName",
                "storageKey": null
              },
              (v11/*: any*/)
            ],
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
              (v11/*: any*/)
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
    "name": "MovieDetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Movie",
        "kind": "LinkedField",
        "name": "singleMovie",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Credit",
            "kind": "LinkedField",
            "name": "cast",
            "plural": true,
            "selections": (v9/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Credit",
            "kind": "LinkedField",
            "name": "crew",
            "plural": true,
            "selections": (v9/*: any*/),
            "storageKey": null
          },
          (v10/*: any*/)
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "LatestReviews__review"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "TopReviews__review"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MovieDetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Movie",
        "kind": "LinkedField",
        "name": "singleMovie",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Credit",
            "kind": "LinkedField",
            "name": "cast",
            "plural": true,
            "selections": (v12/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Credit",
            "kind": "LinkedField",
            "name": "crew",
            "plural": true,
            "selections": (v12/*: any*/),
            "storageKey": null
          },
          (v10/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "latest",
        "args": [
          (v13/*: any*/),
          (v14/*: any*/)
        ],
        "concreteType": "UserReviewConnection",
        "kind": "LinkedField",
        "name": "reviewList",
        "plural": false,
        "selections": (v15/*: any*/),
        "storageKey": null
      },
      {
        "alias": "topReviews",
        "args": [
          (v13/*: any*/),
          (v14/*: any*/),
          {
            "kind": "Literal",
            "name": "sort",
            "value": "rating"
          }
        ],
        "concreteType": "UserReviewConnection",
        "kind": "LinkedField",
        "name": "reviewList",
        "plural": false,
        "selections": (v15/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "93e6ea586feb941efa7461cf935eaf30",
    "id": null,
    "metadata": {},
    "name": "MovieDetailsQuery",
    "operationKind": "query",
    "text": "query MovieDetailsQuery(\n  $id: ID!\n) {\n  singleMovie(id: $id) {\n    title\n    releaseDate\n    rating\n    description\n    posterPath\n    cast {\n      person {\n        name\n        id\n      }\n      role\n    }\n    crew {\n      person {\n        name\n        id\n      }\n      role\n    }\n    genres\n    id\n  }\n  ...LatestReviews__review\n  ...TopReviews__review\n}\n\nfragment LatestReviews__review on Query {\n  latest: reviewList(movie: $id, first: 3) {\n    edges {\n      node {\n        id\n        rating\n        text\n        user {\n          fullName\n          id\n        }\n        movie {\n          title\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment TopReviews__review on Query {\n  topReviews: reviewList(movie: $id, first: 3, sort: \"rating\") {\n    edges {\n      node {\n        id\n        rating\n        text\n        user {\n          fullName\n          id\n        }\n        movie {\n          title\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4d1386305d9c2c276e7843e3157f4c97";

export default node;
