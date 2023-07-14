export default function Card() {
  return (
    <div className="card w-[190px] bg-gray-100 shadow-sm">
      <figure className="w-[190px]">
        <img
          src="http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg"
          alt="Movie"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Classical Muthology
        </h2>
        <p className="line-clamp-2 text-gray-700">
          If a dog chews shoes whose shoes does he choose?
        </p>
        <div className="card-actions justify-start">
          <div className="text-md font-bold text-gray-700">Rp. 100.000</div>
        </div>
      </div>
    </div>
  );
}
