/* store.es6 */
/**
 * Client data model including state
 */

/**
 * Data related to the client that is currently in session
 * @member  {String}  type          The type of client ['viewer'|'controller']
 * @member  {String}  controlLevel  The level of control that the client has in this session ['none'|'control'|'admin']
 */
export const client = {
  type: 'controller',
  controlLevel: 'none',
  teleIO: {
    connected: false,
  },
};
