import React from 'react';

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col py-15 px-3 container'>
        {children}
    </div>
  )
}

export default Layout;