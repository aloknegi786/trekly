import React from 'react';
import UserTabs from '@/components/global/UserTab';
import { profileTabs } from "@/constants/links";

type Props = {
  children: React.ReactNode
}

const UserLayout = ({children}: Props) => {
  return (
    <div className='flex flex-col py-15 px-3 container mx-auto'>
      <UserTabs tabs={profileTabs} />
      {children}
    </div>
  )
}

export default UserLayout;