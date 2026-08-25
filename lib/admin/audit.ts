import { callRpc } from './db';

interface RecordAuditParams {
  actorId?: string | null;
  actorEmail: string;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  details?: Record<string, any> | null;
  ipAddress?: string | null;
}

/**
 * Record an administrative activity log entry into Supabase
 */
export async function recordAuditLog(params: RecordAuditParams): Promise<void> {
  try {
    await callRpc('rpc_admin_log_audit', {
      p_actor_id: params.actorId || null,
      p_actor_email: params.actorEmail,
      p_action: params.action,
      p_resource_type: params.resourceType,
      p_resource_id: params.resourceId || null,
      p_details: params.details || null,
      p_ip: params.ipAddress || '0.0.0.0',
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}
