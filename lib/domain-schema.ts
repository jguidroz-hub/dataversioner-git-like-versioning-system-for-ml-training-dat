import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default(true),
  weeklyDigest: boolean('weekly_digest').default(true),
  createdAt: timestamp('created_at').notNull().default(now()),
  updatedAt: timestamp('updated_at').notNull().default(now()),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(now()),
});

// Core dataset metadata and version tracking
export const datasets = pgTable('datasets', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  currentVersion: text('current_version'),
  totalVersions: integer('total_versions').default(1),
  storagePath: text('storage_path'),
  tags: jsonb('tags'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// Individual version metadata and tracking
export const datasetVersions = pgTable('dataset_versions', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  datasetId: text('dataset_id').references(() => datasets.id, { onDelete: 'cascade' }),
  versionNumber: integer('version_number'),
  commitMessage: text('commit_message'),
  fileSize: integer('file_size'),
  sampleMetadata: jsonb('sample_metadata'),
  parentVersionId: text('parent_version_id'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

// ML experiment tracking and results
export const experiments = pgTable('experiments', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  datasetVersionId: text('dataset_version_id').references(() => datasetVersions.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  status: text('status'),
  modelConfig: jsonb('model_config'),
  performanceMetrics: jsonb('performance_metrics'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
