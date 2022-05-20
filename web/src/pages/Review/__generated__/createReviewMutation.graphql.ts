/**
 * @generated SignedSource<<5266b78780ae9293f4cfe6809a712cca>>
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
    readonly insertedId: string | null;
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
        "kind": "ScalarField",
        "name": "insertedId",
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
    "cacheID": "cecf72d55bf498bdda585791de5c7589",
    "id": null,
    "metadata": {},
    "name": "createReviewMutation",
    "operationKind": "mutation",
    "text": "mutation createReviewMutation(\n  $input: reviewCreateInput!\n) {\n  reviewCreate(input: $input) {\n    insertedId\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "b058d111d9915f5e3b45f69e696efeae";

export default node;
