// components/withAdmin.js
import { redirect } from 'next/navigation';

export default function withAdmin(Component) {
  return async function AdminWrapper(props) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/isadmin`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
            });
    
      if (!res.ok) {
        throw new Error('Failed to fetch admin status');
      }
      
      const data = await res.json();
      
      if (!data?.isAdmin) {
        redirect('/');
      }
      
      return <Component {...props} />;
    } catch (error) {
      console.error('Admin check failed:', error);
      redirect('/');
    }
  }
}