/**
 * @generated SignedSource<<f1cc121585806ea99a1af51552f0fff7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type loginUserInput = {
  email: string;
  password: string;
  clientMutationId?: string | null;
};
export type commitLoginMutation$variables = {
  input: loginUserInput;
};
export type commitLoginMutation$data = {
  readonly loginUser: {
    readonly token: string | null;
    readonly error: string | null;
  } | null;
};
export type commitLoginMutation = {
  variables: commitLoginMutation$variables;
  response: commitLoginMutation$data;
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
    "concreteType": "loginUserPayload",
    "kind": "LinkedField",
    "name": "loginUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
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
    "name": "commitLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "commitLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "aa99aa9d61df19ed54fbb53c1539ba92",
    "id": null,
    "metadata": {},
    "name": "commitLoginMutation",
    "operationKind": "mutation",
    "text": "mutation commitLoginMutation(\n  $input: loginUserInput!\n) {\n  loginUser(input: $input) {\n    token\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "bae1a423f53f841c2916a9ba38cdbac6";

export default node;
