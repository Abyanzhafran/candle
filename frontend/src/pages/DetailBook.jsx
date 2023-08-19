export default function DetailBook() {
  return (
    <div className="flex items-center justify-start w-full mt-8 pl-8 px-6">
      <div className="flex gap-6">
        {/* <span className="text-2xl font-bold">Detail Book</span> */}
        <img src="http://127.0.0.1:8081/the hunger game.jpg" className="h-72" />
        <div className="flex flex-col gap-1">
          <span>title: lorem title</span>
          <span>author: lorem author</span>
          <span>publish date: 19/08/2023</span>
          <span>price: lorem</span>
          <span className="text-justify line-clamp-[7]">
            sysnopsis: WINNING MEANS FAME AND FORTUNE.LOSING MEANS CERTAIN
            DEATH.THE HUNGER GAMES HAVE BEGUN. . . .In the ruins of a place once
            known as North America lies the nation of Panem, a shining Capitol
            surrounded by twelve outlying districts. The Capitol is harsh and
            cruel and keeps the districts in line by forcing them all to send
            one boy and once girl between the ages of twelve and eighteen to
            participate in the annual Hunger Games, a fight to the death on live
            TV.Sixteen-year-old Katniss Everdeen regards it as a death sentence
            when she steps forward to take her sister's place in the Games. But
            Katniss has been close to dead before—and survival, for her, is
            second nature. Without really meaning to, she becomes a contender.
            But if she is to win, she will have to start making choices that
            weight survival against humanity and life against love. lorem ipsum
            dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
            lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
            dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
            lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
            dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
          </span>
        </div>
      </div>
    </div>
  );
}
