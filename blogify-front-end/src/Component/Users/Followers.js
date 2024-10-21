import { useSelector } from "react-redux";

export default function Followers({ followers }) {

  return (
    <div className="py-2 bg-white">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your followers [{followers?.length}]
          </h2>
        </div>
        <ul
          role="list"
          className="grid max-w-2xl grid-cols-2 mx-auto mt-20 text-center gap-y-16 gap-x-8 sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {followers?.map((user) => (
            <li key={user._id}>
              <img
                className="w-24 h-24 mx-auto rounded-full"
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt="user profile"
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {user.username}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
