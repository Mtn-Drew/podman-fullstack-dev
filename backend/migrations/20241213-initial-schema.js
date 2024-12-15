// migrations/20241213-initial-schema.js

'use strict';

exports.up = function(db) {
  return db.createTable('users', {
    id: { type: 'uuid', primaryKey: true, defaultValue: new String('uuid_generate_v4()') },
    email: { type: 'string', notNull: true, unique: true },
    username: { type: 'string', notNull: true },
    created_at: { type: 'timestamp', notNull: true, defaultValue: new String('NOW()') },
    updated_at: { type: 'timestamp', notNull: true, defaultValue: new String('NOW()') }
  })
  .then(() => {
    return db.createTable('posts', {
      id: { type: 'uuid', primaryKey: true, defaultValue: new String('uuid_generate_v4()') },
      user_id: { 
        type: 'uuid', 
        notNull: true, 
        foreignKey: {
          name: 'posts_user_id_fk',
          table: 'users',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          }
        }
      },
      title: { type: 'string', notNull: true },
      content: { type: 'text', notNull: true },
      created_at: { type: 'timestamp', notNull: true, defaultValue: new String('NOW()') },
      updated_at: { type: 'timestamp', notNull: true, defaultValue: new String('NOW()') }
    });
  })
  .then(() => {
    return db.createTable('comments', {
      id: { type: 'uuid', primaryKey: true, defaultValue: new String('uuid_generate_v4()') },
      post_id: {
        type: 'uuid',
        notNull: true,
        foreignKey: {
          name: 'comments_post_id_fk',
          table: 'posts',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          }
        }
      },
      user_id: {
        type: 'uuid',
        notNull: true,
        foreignKey: {
          name: 'comments_user_id_fk',
          table: 'users',
          mapping: 'id',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          }
        }
      },
      content: { type: 'text', notNull: true },
      created_at: { type: 'timestamp', notNull: true, defaultValue: new String('NOW()') },
      updated_at: { type: 'timestamp', notNull: true, defaultValue: new String('NOW()') }
    });
  });
};

exports.down = function(db) {
  return db.dropTable('comments')
    .then(() => db.dropTable('posts'))
    .then(() => db.dropTable('users'));
};