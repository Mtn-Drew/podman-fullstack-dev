// migrations/20241213-add-uuid-and-indexes.js
'use strict';

exports.up = function(db) {
  return db.runSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => {
      // Add indexes for foreign keys
      return db.runSql(`
        CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
        CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
        CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
      `);
    });
};

exports.down = function(db) {
  return db.runSql(`
    DROP INDEX IF EXISTS idx_comments_user_id;
    DROP INDEX IF EXISTS idx_comments_post_id;
    DROP INDEX IF EXISTS idx_posts_user_id;
    DROP EXTENSION IF EXISTS "uuid-ossp";
  `);
};