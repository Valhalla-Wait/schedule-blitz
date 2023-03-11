import db from "db"

export default async function getUsers() {
  const users = await db.user.findMany()
  console.log(users)
  if (users) return users
  return []
}
