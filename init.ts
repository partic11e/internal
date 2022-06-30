/**
 * Repo initialization script.
 *
 * * Replaces the {{packageName}} placeholder in all files with the name of the repository.
 * * "Self-destructs" itself by adding itself to the `.gitignore` file.
 *
 * @copyright 2022 integer11. All rights reserved. MIT license.
 */

//#region feature-exports
import { dirname, relative, resolve } from "https://deno.land/std@0.145.0/path/mod.ts";
//#endregion

//#region type-imports
//#endregion

//#region internals
/**
 * The files to ignore during processing.
 */
const IGNORE_FILES = [".git", ".vscode", "deno.jsonc", "init.ts"];

/**
 * The exit code for denied permissions.
 */
const PERM_REQ_EXIT = 11;

/**
 * The required permissions for the init script.
 */
const PERMISSIONS: Deno.PermissionDescriptor[] = [
  { name: "run", "command": "git" },
  { name: "write", "path": "./" },
  { name: "read", "path": "./" },
];

/**
 * The text decoder to use.
 */
const DEC = new TextDecoder();

/**
 * The text encoder to use.
 */
const ENC = new TextEncoder();

/**
 * Entry point for the init script.
 */
const _execute = async (): Promise<void> => {
  await _checkPermissions(PERMISSIONS);

  const packageName = await _getPackageName();
  const files = await _getFiles(".");
  const outDir = "./out-dir";// @TODO Switch back to "./";

  await Deno.mkdir(outDir, { recursive: true });
  await _processFiles(files, packageName, outDir);
  await Deno.writeFile(".gitignore", ENC.encode(`init.ts\n`), { append: true });
};

/**
 * Processes a file and replaces the {{packageName}} placeholder.
 *
 * @param file The file to process.
 * @param packageName The name of the package.
 * @param outDir The directory to write the file to.
 */
const _processFile = async (file: string, packageName: string, outDir: string): Promise<void> => {
  const data = await Deno.readFile(file);
  const str = DEC.decode(data);
  const out = str.replace(/\{\{packageName\}\}/g, packageName);
  const outData = ENC.encode(out);
  const outFile = relative("./", resolve(outDir, file));

  await Deno.mkdir(dirname(outFile), { recursive: true });
  await Deno.writeFile(outFile, outData);
};

/**
 * Processes files and replaces the {{packageName}} placeholder.
 *
 * @param files The files to process.
 * @param packageName The name of the package.
 * @param outDir The directory to write the files to.
 */
const _processFiles = async (files: string[], packageName: string, outDir: string): Promise<void> => {
  for await (const file of files) {
    await _processFile(file, packageName, outDir);
  }
};

/**
 * Checks that a required permission is granted, and if not, requests it.
 *
 * @param permission The permission to check.
 */
const _checkPermission = async (permission: Deno.PermissionDescriptor): Promise<void> => {
  const query = await Deno.permissions.query(permission);

  if (query.state !== "granted") {
    const request = await Deno.permissions.request(permission);

    if (request.state !== "granted") {
      console.error(`Permission ${permission.name} not granted. Aborting.`);
      Deno.exit(PERM_REQ_EXIT);
    }
  }
};

/**
 * Checks that the required permissions are granted, and if not, requests them.
 *
 * @param permissions The permissions to check and request.
 */
const _checkPermissions = async (permissions: Deno.PermissionDescriptor[]): Promise<void> => {
  for (const permission of permissions) {
    await _checkPermission(permission);
  }
};

/**
 * Gets the name of the repository from the git repo.
 *
 * @returns The name of the repository.
 */
const _getPackageName = async (): Promise<string> => {
  const regex = /([\w\-]+)\/([\w\-]+)\.git/;
  const cmd = Deno.run({
    cmd: ["git", "remote", "-v"],
    stdout: "piped",
    stdin: "piped",
  });

  const output = await cmd.output();
  const outStr = DEC.decode(output);
  const [line] = outStr.split("\n");
  const matches = regex.exec(line || "");

  if (!line || !matches) {
    throw new Error(
      `Unable to get git repo info for path ${import.meta.url}`,
    );
  }

  const [_match, _org, repo] = matches;

  return repo;
};

/**
 * Gets all files in the current directory.
 *
 * @param dir The directory to search for files.
 * @returns A list of files in the given directory.
 */
const _getFiles = async (dir: string) => {
  const entries = await Deno.readDir(dir);
  let files: string[] = [];

  for await (const entry of entries) {
    if (IGNORE_FILES.includes(entry.name)) {
      continue;
    }

    if (entry.isFile) {
      files = [...files, `${dir}/${entry.name}`];
    } else if (entry.isDirectory) {
      files = [...files, ...await _getFiles(`${dir}/${entry.name}`)];
    }
  }
  return files;
};
//#endregion

//#region main
if (import.meta.main) {
  await _execute();
}
//#endregion
