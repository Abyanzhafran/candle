export default function SignIn() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="card w-96 bg-gray-100 border-2 border-gray-300">
        <div className="card-body flex flex-col items-center">
          <span className="text-6xl font-berlin font-semibold text-sky-600">Candle</span>
          <span className="text-3xl font-semibold mb-10">Welcome to Candle</span>
          <div className="w-full flex flex-col gap-3 px-4">
            <input type="email" placeholder="Email" className="input input-bordered border-gray-300 w-full max-w-xs bg-gray-100" />
            <input type="text" placeholder="Password" className="input input-bordered border-gray-300 w-full max-w-xs bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  )
}