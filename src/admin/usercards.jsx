import React from 'react'

export default function UserCard({user}) {
  return (
     <div className="teacher-card">
                  <img
                    src={user.profile}
                    alt={user.name}
                    className="teacher-profile"
                  />
                  <h3>{user.name}</h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                </div>
  )
}
