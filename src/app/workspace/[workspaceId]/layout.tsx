import WorkSpaceLayout from '@/shared/components/layouts/workspace'
import React from 'react'

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <WorkSpaceLayout>{children}</WorkSpaceLayout>
    )
}

export default Layout