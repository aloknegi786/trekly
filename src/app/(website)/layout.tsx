import React from 'react';

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col container w-full'>
        {children}
    </div>
  )
}

export default Layout;