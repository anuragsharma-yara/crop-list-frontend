import EmployeePage from '@/components/EmployeePage';
import { options } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

export default async function Home() {
  // const session = await getServerSession(options);
  const session = true;

  return (
    session ? <EmployeePage /> : <h1 className="text-5xl"> You shall not pass</h1>
  );
}