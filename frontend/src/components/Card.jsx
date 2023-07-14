export default function Card() {
  return (
    <div className="card card-side bg-gray-100 border border-gray-300">
      <figure className="w-[120px] md:w-52"><img src="http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg" alt="Movie" /></figure>
      <div className="flex flex-col w-36 md:w-64 h-full p-2 md:p-6 gap-4 md:gap-10">
        <h2 className="card-title line-clamp-3">Shoes! title lorem ipsum dolor sit amet prodigy ipsum dolor sit amet prodigy</h2>
        <span className="text-lg font-semibold">IDR 100.000</span>
      </div>
    </div>
  )
}