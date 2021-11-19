import { useState } from "react"
import { useSelector } from "react-redux"
import { useAddFriendMutation, useFindUserMutation } from "../features/api/apiSlice"
import { selectUserId } from "../features/user/userSlice"


const Dashboard = () => {
  const [ searchUser, setSearchUser ] = useState('')
  const userId = useSelector(selectUserId)

  const [ findUser, { data, error, isLoading, isSuccess, isError } ] = useFindUserMutation()

  const [ addFriend ] = useAddFriendMutation()

  const findUserHandler = () => {
    console.log('find...', {
      userId,
      input: searchUser
    })
    findUser({
      userId,
      input: searchUser
    })
    setSearchUser('')
  }

  const addFriendHandler = (id) => {
    console.log('friend id', id)
    console.log('object sent', { userId, friendId: id })
    addFriend({ userId, friendId: id })
  }

  return (
    <div>
      <h1>DASHBOARD</h1>

      <input type="text" value={searchUser} onChange={(e)=>setSearchUser(e.target.value)} />
      <button onClick={findUserHandler}>SEARCH USER</button>
      <ul>
        {
          isLoading && <div>searching...</div>
        }
        {
          isSuccess && data.map(user =>
            <div key={user.username}>
              <li>{user.username}</li>
              <button onClick={() => addFriendHandler(user._id)}>ADD FRIEND</button>
            </div>
          )
        }
        {
          isError && data || error
        }
      </ul>
    </div>
  )
}

export default Dashboard
