/**
 * @generated SignedSource<<e87663bf1ac61cbb543e83c6883157e2>>
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
export type commitSignUpMutation$variables = {
  input: userCreateInput;
};
export type commitSignUpMutation$data = {
  readonly userCreate: {
    readonly insertedId: string | null;
    readonly error: string | null;
  } | null;
};
export type commitSignUpMutation = {
  variables: commitSignUpMutation$variables;
  response: commitSignUpMutation$data;
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
    "name": "commitSignUpMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "commitSignUpMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "740cfc0bb94a9c07c709151380d1f6d0",
    "id": null,
    "metadata": {},
    "name": "commitSignUpMutation",
    "operationKind": "mutation",
    "text": "mutation commitSignUpMutation(\n  $input: userCreateInput!\n) {\n  userCreate(input: $input) {\n    insertedId\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "59208d8f19292185fcdaef3a11c81fbc";

export default node;
