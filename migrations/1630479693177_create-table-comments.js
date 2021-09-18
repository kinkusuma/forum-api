/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('comments', {
        post_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        username: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        date: {
            type: 'TEXT',
            notNull: true,
        },
        content: {
            type: 'TEXT',
            notNull: true,
        },
        is_delete: {
            type: 'BOOL',
            notNull: true
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('comments')
};