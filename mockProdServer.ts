import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import menuTreeModule from './mock/menuTree'
import roleMoudle from './mock/role'
import userModule from './mock/user'
import workModule from './mock/work'

export function setupProdMockServer() {
  createProdMockServer([
    ...menuTreeModule,
    ...roleMoudle,
    ...userModule,
    ...workModule,
  ]);
}
