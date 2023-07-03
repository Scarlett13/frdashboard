export default function UserName() {
  return (
    <div>
      <label htmlFor="" className="text-sm font-bold text-gray-600 block">
        Username/Email
      </label>
      <input
        type="username"
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
    </div>
  );
}
