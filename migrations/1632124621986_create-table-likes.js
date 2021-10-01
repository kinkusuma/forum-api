/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('likes', {
        post_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        username: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('likes');
};