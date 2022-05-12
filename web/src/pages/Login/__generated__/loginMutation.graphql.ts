/**
 * @generated SignedSource<<9d6306f4285a9cf763cedb36d8fbb0c2>>
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
export type loginMutation$variables = {
  input: loginUserInput;
};
export type loginMutation$data = {
  readonly loginUser: {
    readonly token: string | null;
    readonly error: string | null;
  } | null;
};
export type loginMutation = {
  variables: loginMutation$variables;
  response: loginMutation$data;
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
    "name": "loginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "loginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a6bb12c2a218b037d6a1e3e143c543a4",
    "id": null,
    "metadata": {},
    "name": "loginMutation",
    "operationKind": "mutation",
    "text": "mutation loginMutation(\n  $input: loginUserInput!\n) {\n  loginUser(input: $input) {\n    token\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "e8f5ef0a3bbb289fab3b9b6dde12c9fe";

export default node;
