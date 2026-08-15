import { prisma } from '@/lib/prisma';
import { safeQuery } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function toggleReadStatus(formData) {
  'use server';
  const id = formData.get('id');
  const currentStatus = formData.get('isRead') === 'true';
  
  if (id) {
    await prisma.message.update({
      where: { id },
      data: { isRead: !currentStatus }
    });
  }
  
  revalidatePath('/');
  revalidatePath('/admin/messages');
}

export async function deleteMessage(formData) {
  'use server';
  const id = formData.get('id');
  if (id) {
    await prisma.message.delete({ where: { id } });
  }
  revalidatePath('/');
  revalidatePath('/admin/messages');
}

export default async function ManageMessages() {
  const messages = await safeQuery(p => p.message.findMany({ orderBy: { createdAt: 'desc' } }), []);

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Inbox Messages</h2>
        <span style={{ backgroundColor: 'var(--color-primary)', color: '#050811', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600' }}>
          {unreadCount} Unread
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ 
            backgroundColor: 'var(--color-surface)', 
            padding: '1.5rem', 
            borderRadius: '14px', 
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border)',
            borderLeft: msg.isRead ? '4px solid var(--color-border)' : '4px solid var(--color-primary)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.2rem', fontSize: '1.05rem', fontWeight: '600' }}>{msg.name}</h4>
                <a href={`mailto:${msg.email}`} style={{ fontSize: '0.875rem', color: 'var(--color-primary)' }}>{msg.email}</a>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.92rem', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {msg.message}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <form action={toggleReadStatus}>
                <input type="hidden" name="id" value={msg.id} />
                <input type="hidden" name="isRead" value={msg.isRead.toString()} />
                <button type="submit" className="btn btn-outline" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                  Mark as {msg.isRead ? 'Unread' : 'Read'}
                </button>
              </form>
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={msg.id} />
                <button type="submit" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '3rem', backgroundColor: 'var(--color-surface)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
            No messages in your inbox yet.
          </div>
        )}
      </div>
    </div>
  );
}
