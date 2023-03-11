import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <div className="header">
        <h1>HIIIII</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  )
}

export default Layout
