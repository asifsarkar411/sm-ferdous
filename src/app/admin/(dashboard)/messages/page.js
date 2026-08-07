import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export default async function ManageMessages() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } });

  async function toggleReadStatus(formData) {
    'use server';
    const id = formData.get('id');
    const currentStatus = formData.get('isRead') === 'true';
    
    await prisma.message.update({
      where: { id },
      data: { isRead: !currentStatus }
    });
    
    revalidatePath('/');
    revalidatePath('/admin/messages');
  }

  async function deleteMessage(formData) {
    'use server';
    const id = formData.get('id');
    await prisma.message.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/messages');
  }

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Inbox</h2>
        <span style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem' }}>
          {unreadCount} Unread
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ 
            backgroundColor: 'var(--color-surface)', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            boxShadow: 'var(--shadow-sm)',
            borderLeft: msg.isRead ? '4px solid transparent' : '4px solid var(--color-primary)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ marginBottom: '0.25rem' }}>{msg.name}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{msg.email}</p>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#888' }}>
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
              {msg.message}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <form action={toggleReadStatus}>
                <input type="hidden" name="id" value={msg.id} />
                <input type="hidden" name="isRead" value={msg.isRead.toString()} />
                <button type="submit" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  Mark as {msg.isRead ? 'Unread' : 'Read'}
                </button>
              </form>
              <form action={deleteMessage}>
                <input type="hidden" name="id" value={msg.id} />
                <button type="submit" style={{ color: 'red', textDecoration: 'underline', fontSize: '0.875rem', padding: '0.5rem 0' }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <p style={{ color: '#888' }}>No messages yet.</p>
        )}
      </div>
    </div>
  );
}
