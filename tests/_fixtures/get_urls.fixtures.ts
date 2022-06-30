/**
 * Test fixtures for `getDocsUrl` and `getExceptionHelpUrl`.
 *
 * @copyright 2022 integer11. All rights reserved. MIT license.
 */

//#region type-imports
//#endregion

//#region feature-imports
import { P11_DOC_BASE, P11_EXC_BASE } from "../../src/_internals/_constants.ts";
//#endregion

//#region type-exports
//#region internal
//#endregion

//#region internal
type GetDocsUrlCase = [string] | [string, string];
type TestResult<T> = [T, string];
type GetExceptionUrlCase = [string];
const packageNames = ["common", "example", "test"];
const packageVersions = [
  undefined,
  "1.0.0",
  "1.0.0-alpha.0",
  "1.0.2",
  "latest",
  "1.2.5-beta.1",
];
const exceptionNames = [
  "Exception",
  "ValueException",
  "AssertionException",
  "ArgumentException",
];
//#endregion
//#endregion

//#region feature-exports
export const getDocsUrlCases: TestResult<GetDocsUrlCase>[] = packageNames
  .reduce((acc, packageName) => {
    packageVersions.forEach((packageVersion) => {
      const args = [packageName, packageVersion] as GetDocsUrlCase;
      const expected = `${P11_DOC_BASE}/${packageName}/${
        packageVersion || "latest"
      }/`;
      acc = [...acc, [args, expected]];
    });

    return acc;
  }, [] as TestResult<GetDocsUrlCase>[]);

export const getExceptionHelpUrlCases: TestResult<GetExceptionUrlCase>[] =
  exceptionNames.reduce((acc, exceptionName) => {
    return [...acc, [[exceptionName], `${P11_EXC_BASE}/${exceptionName}/`]];
  }, [] as TestResult<GetExceptionUrlCase>[]);
//#endregion
