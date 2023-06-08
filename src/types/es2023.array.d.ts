/**
 * https://github.com/microsoft/TypeScript/blob/main/src/lib/es2023.array.d.ts
 */

declare global {
  interface Array<T> {
    /**
     * Copies an array and removes elements and, if necessary, inserts new elements in their place. Returns the copied array.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the copied array in place of the deleted elements.
     * @returns The copied array.
     */
    toSpliced(start: number, deleteCount: number, ...items: T[]): T[];
  }
}

export {};
