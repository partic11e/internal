/**
 * Tests for `getDocsUrl` and `getExceptionHelpUrl`.
 *
 * @copyright 2022 integer11. All rights reserved. MIT license.
 */

//#region type-imports
//#endregion

//#region feature-imports
import { assertEquals, describe, it } from "../dev_deps.ts";
import { getDocsUrl, getExceptionHelpUrl } from "../mod.ts";
//#endregion

//#region fixture-imports
import {
  getDocsUrlCases,
  getExceptionHelpUrlCases,
} from "./_fixtures/get_urls.fixtures.ts";

//#region tests
describe("utils", () => {
  describe("getDocsUrl", () => {
    it("should return the correct URL", () => {
      getDocsUrlCases.forEach((testCase, i) => {
        const [args, expected] = testCase;
        const [packageName, packageVersion] = args;
        const actual = getDocsUrl(packageName, packageVersion);

        assertEquals(actual, expected, `Failed test case ${i}`);
      });
    });
  });

  describe("getExceptionHelpUrl", () => {
    it("should return the correct URL", () => {
      getExceptionHelpUrlCases.forEach((testCase, i) => {
        const [args, expected] = testCase;
        const [exceptionName] = args;
        const actual = getExceptionHelpUrl(exceptionName);

        assertEquals(actual, expected, `Failed test case ${i}`);
      });
    });
  });
});
//#endregion
