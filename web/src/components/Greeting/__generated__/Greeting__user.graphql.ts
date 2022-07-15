/**
 * @generated SignedSource<<cc950c5b1f7ff2aff9fb95dee7211caf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Greeting__user$data = {
  readonly me: {
    readonly fullName: string;
  } | null;
  readonly " $fragmentType": "Greeting__user";
};
export type Greeting__user$key = {
  readonly " $data"?: Greeting__user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Greeting__user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Greeting__user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fullName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "3d91028c2fb90ce635cbf56a39882e2c";

export default node;
