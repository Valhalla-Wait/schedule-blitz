import { useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import createUser, { UserInputType } from "src/user/mutations/createUser"
import getUsers from "src/user/queries/getUsers"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

// const currentUser = useCurrentUser()
// const [logoutMutation] = useMutation(logout)

const Home: BlitzPage = () => {
  const [createUserMutation, { isLoading }] = useMutation(createUser, {
    onSuccess: async () => {
      await invalidateQuery(getUsers)
    },
  })
  const [users] = useQuery(getUsers, undefined)

  const [inputValue, setInputValue] = useState<UserInputType>({
    firstName: "",
    lastName: "",
    password: "",
  })

  const createUserHandler = () => {
    createUserMutation(inputValue)
    setInputValue({
      firstName: "",
      lastName: "",
      password: "",
    })
  }
  return (
    <div className="main">
      <div className="create-user-form">
        <input
          type="text"
          value={inputValue.firstName}
          onChange={(e) => {
            setInputValue((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }}
        />
        <br />
        <input
          type="text"
          value={inputValue.lastName}
          onChange={(e) => {
            setInputValue((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }}
        />
        <br />
        <input
          type="text"
          value={inputValue.password}
          onChange={(e) => {
            setInputValue((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }}
        />
        <br />
        <button onClick={createUserHandler}>Create User</button>
        {isLoading && "CREATING..."}
      </div>
      <br />
      <div className="users-list">
        {users.map((u) => (
          <div key={u.id}>
            {u.firstName} {u.lastName}
          </div>
        ))}
      </div>
    </div>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
