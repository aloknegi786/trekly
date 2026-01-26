import { redirect } from 'next/navigation';
import { trekName } from '@/constants/redirectTrekName';

export default function trekpage() {
  redirect('/admin/dashboard');
}