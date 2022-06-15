/**
 * @generated SignedSource<<4754b24e45385be9a3f33a79d34daa22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type userCreateInput = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  clientMutationId?: string | null;
};
export type signUpMutation$variables = {
  input: userCreateInput;
};
export type signUpMutation$data = {
  readonly userCreate: {
    readonly user: {
      readonly id: string;
    } | null;
    readonly error: string | null;
  } | null;
};
export type signUpMutation = {
  variables: signUpMutation$variables;
  response: signUpMutation$data;
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
    "concreteType": "userCreatePayload",
    "kind": "LinkedField",
    "name": "userCreate",
    "plural": false,
    "selections": [
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
    "name": "signUpMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "signUpMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "90ab367fff66d4fce06a75ec2226254c",
    "id": null,
    "metadata": {},
    "name": "signUpMutation",
    "operationKind": "mutation",
    "text": "mutation signUpMutation(\n  $input: userCreateInput!\n) {\n  userCreate(input: $input) {\n    user {\n      id\n    }\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "ebb7f5959065e521e814f703035d4292";

export default node;
