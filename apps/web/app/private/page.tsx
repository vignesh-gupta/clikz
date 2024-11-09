import React from 'react'
import { auth } from '~/lib/auth';

const PrivatePage = async () => {
  const session = await auth();

  return (
    <div>{JSON.stringify(session)}</div>
  )
}

export default PrivatePage