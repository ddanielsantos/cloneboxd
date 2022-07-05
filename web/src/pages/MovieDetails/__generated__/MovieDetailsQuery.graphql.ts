/**
 * @generated SignedSource<<25a50d1f34159218f8a4967fc6cee79a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
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
      }
    ]
  },
  "params": {
    "cacheID": "dcc51cec7b71dd4abec541f18547fdc6",
    "id": null,
    "metadata": {},
    "name": "MovieDetailsQuery",
    "operationKind": "query",
    "text": "query MovieDetailsQuery(\n  $id: ID!\n) {\n  singleMovie(id: $id) {\n    title\n    releaseDate\n    rating\n    description\n    posterPath\n    cast {\n      person {\n        name\n        id\n      }\n      role\n    }\n    crew {\n      person {\n        name\n        id\n      }\n      role\n    }\n    genres\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5abc509f23f338e206e001851bb2cc55";

export default node;
