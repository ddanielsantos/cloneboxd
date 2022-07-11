/**
 * @generated SignedSource<<a890a74afd4ecb6f5a4c61c435f2153f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type reviewCreateInput = {
  movie: string;
  text?: string | null;
  rating?: number | null;
  watchedAt?: string | null;
  clientMutationId?: string | null;
};
export type createReviewMutation$variables = {
  input: reviewCreateInput;
};
export type createReviewMutation$data = {
  readonly reviewCreate: {
    readonly review: {
      readonly id: string;
    } | null;
    readonly error: string | null;
  } | null;
};
export type createReviewMutation = {
  variables: createReviewMutation$variables;
  response: createReviewMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "reviewCreatePayload",
    "kind": "LinkedField",
    "name": "reviewCreate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserReview",
        "kind": "LinkedField",
        "name": "review",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "error",
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
    "name": "createReviewMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createReviewMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f90f89158127f19e29819b1e6f3b2c02",
    "id": null,
    "metadata": {},
    "name": "createReviewMutation",
    "operationKind": "mutation",
    "text": "mutation createReviewMutation(\n  $input: reviewCreateInput!\n) {\n  reviewCreate(input: $input) {\n    review {\n      id\n    }\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "40659bdad0b1afea36e82c9c47fd62c7";

export default node;
