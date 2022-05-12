/**
 * @generated SignedSource<<b8dd01adf15d230b7264243f6d5c0320>>
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
    readonly insertedId: string | null;
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
    "cacheID": "f3ede64c45e1a32300cb7a66b714ec87",
    "id": null,
    "metadata": {},
    "name": "signUpMutation",
    "operationKind": "mutation",
    "text": "mutation signUpMutation(\n  $input: userCreateInput!\n) {\n  userCreate(input: $input) {\n    insertedId\n    error\n  }\n}\n"
  }
};
})();

(node as any).hash = "2d4bf0c9de82e1ce3da2ad2b7dabb358";

export default node;
