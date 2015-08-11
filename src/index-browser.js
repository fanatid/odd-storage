// version
export { version } from '../package.json'

// errors
export errors from './errors'

// abstract
export Abstract from './abstract'
export AbstractSQL from './sql/abstract'
export AbstractSync from './sync/abstract'

// sql
export WebSQL from './sql/websql'

// sync
export Memory from './sync/memory'
export IndexedDB from './sync/indexeddb'
export LocalStorage from './sync/localstorage'
