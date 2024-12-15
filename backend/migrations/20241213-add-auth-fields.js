// migrations/20241213-add-auth-fields.js
'use strict';

exports.up = function(db) {
  return Promise.all([
    // Add password_hash field
    db.addColumn('users', 'password_hash', {
      type: 'string',
      notNull: true,
      defaultValue: new String('CHANGE_ME_TEMP_HASH')
    }),
    
    // Add email verification fields
    db.addColumn('users', 'email_verified', {
      type: 'boolean',
      notNull: true,
      defaultValue: false
    }),
    db.addColumn('users', 'email_verification_token', {
      type: 'string',
      notNull: false
    }),
    db.addColumn('users', 'email_verification_expires', {
      type: 'timestamp',
      notNull: false
    }),

    // Add password reset fields
    db.addColumn('users', 'reset_password_token', {
      type: 'string',
      notNull: false
    }),
    db.addColumn('users', 'reset_password_expires', {
      type: 'timestamp',
      notNull: false
    }),

    // Add last login tracking
    db.addColumn('users', 'last_login', {
      type: 'timestamp',
      notNull: false
    })
  ]);
};

exports.down = function(db) {
  return Promise.all([
    db.removeColumn('users', 'password_hash'),
    db.removeColumn('users', 'email_verified'),
    db.removeColumn('users', 'email_verification_token'),
    db.removeColumn('users', 'email_verification_expires'),
    db.removeColumn('users', 'reset_password_token'),
    db.removeColumn('users', 'reset_password_expires'),
    db.removeColumn('users', 'last_login')
  ]);
};