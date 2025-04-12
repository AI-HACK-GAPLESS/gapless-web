import React from 'react'
import TeamSidebar from './team-sidebar'
import MemberSidebar from './member-sidebar'

const WorkSpaceLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <TeamSidebar />
      <MemberSidebar />
      <main>{children}</main>
    </div>
  )
}

export default WorkSpaceLayout