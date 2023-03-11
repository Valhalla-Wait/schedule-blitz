import db from "db"

export type UserInputType = {
  firstName: string
  lastName: string
  password: string
}

export default async function createUser(inputData: UserInputType) {
  await db.user.create({
    data: {
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      password: inputData.password,
    },
  })
}
