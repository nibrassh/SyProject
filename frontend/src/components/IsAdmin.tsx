// app/admin/layout.tsx (or page.tsx)
import { redirect } from 'next/navigation';
import axios from 'axios';

export default async function IsAdmin({
  children,
}: {
  children: React.ReactNode;
}) {

  try {
    const {data} = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/v1/check-admin`,{
        withCredentials:true
      }
   
    );

    if (!data.success) redirect('/');
    
    if (!data?.success || !data?.user?.isAdmin) redirect('/');
    
    return
     <>
    {children}
    </>;
  } catch (error) {
    redirect('/');
  }
}