import { useUser } from '../../../context/UserContext'

const Profile = () => {
  const { user, isLoading, error } = useUser()

  if (isLoading) {
    return <p>Loading profile...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user is currently signed in.</p>
      )}
    </div>
  )
}

export default Profile
