/**
 * @generated SignedSource<<88a777f08dcc0a9af57cb4954195042b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TopReviews__review$data = {
  readonly topReviews: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly rating: number | null;
        readonly text: string | null;
        readonly user: {
          readonly fullName: string;
        };
        readonly movie: {
          readonly title: string;
        };
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "TopReviews__review";
};
export type TopReviews__review$key = {
  readonly " $data"?: TopReviews__review$data;
  readonly " $fragmentSpreads": FragmentRefs<"TopReviews__review">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "id"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopReviews__review",
  "selections": [
    {
      "alias": "topReviews",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 3
        },
        {
          "kind": "Variable",
          "name": "movie",
          "variableName": "id"
        },
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
      "selections": [
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "rating",
                  "storageKey": null
                },
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
                    }
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
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "title",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "022b95e21631bdb015ecd1e377d4b903";

export default node;
