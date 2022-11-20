import Link from 'next/link'

export default function ProfileInfo({photoURL, displayName, email}) {
  return (
    <div className="container my-5">
        <h3 className="text-center">User Profile</h3>
        <img src={photoURL} alt="profile-picture" />
        <p className="m-0">{displayName}</p>
        <p className="m-0">{email}</p>
        <Link href="/edit-profile">Edit Profile</Link>
    </div>
  )
}
