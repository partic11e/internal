/**
 * Utility functions used by the p11-common package and its dependant
 * implementations.
 *
 * @copyright 2022 integer11. All rights reserved. MIT license.
 */

//#region type-imports
//#endregion

//#region feature-imports
import { P11_DOC_BASE, P11_EXC_BASE } from "./_internals/mod.ts";
//#endregion

//#region feature-exports

/**
 * Returns the base URL for a package's documentation, optionally referencing
 * a specific version.
 *
 * @example
 * ```ts
 * import { getDocsUrl } from "./utils.ts";
 *
 * const commonDocs = getDocsUrl("common");
 * const commonDocsv1 = getDocsUrl("common", "1.0.0");
 *
 * console.log(commonDocs);
 * // "https://docs.integer.org/partic11e/common/latest"
 * console.log(commonDocsv1);
 * // "https://docs.integer.org/partic11e/common/1.0.0"
 * ```
 *
 * @param packageName The name of the package.
 * @param packageVersion The version of the package. Defaults to "latest".
 * @returns The URL for the package's documentation.
 */
export function getDocsUrl(
  packageName: string,
  packageVersion = "latest",
): string {
  return `${P11_DOC_BASE}/${packageName}/${packageVersion}/`;
}

/**
 * Returns the base URL for a exception's explaination.
 *
 * @example
 * ```ts
 * import { getExceptionHelpUrl } from "./utils.ts";
 *
 * const excExcHelp = getExceptionHelpUrl("Exception");
 *
 * console.log(excExcHelp);
 * // "https://docs.integer.org/exc-exp/partic11e/Exception"
 * ```
 * @param exceptionName The name of the exception.
 * @returns The URL for the exception's explanation.
 */
export function getExceptionHelpUrl(exceptionName: string): string {
  return `${P11_EXC_BASE}/${exceptionName}/`;
}

//#endregion
