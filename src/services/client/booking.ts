import PaymentRequired from "@/errors/PaymentRequired";
import PreconditionFailed from "@/errors/PreconditionFailed";

export async function getBooking() {
  const res = 200;

  if (res === 200) return mockInfo;
  else if (res === 402) throw new PaymentRequired();
  else if (res === 412) throw new PreconditionFailed();
}

const mockInfo = [
  {
    id: 1,
    name: "Resort",
    img: "https://bit.ly/3GMugrw",
  },
  {
    id: 2,
    name: "Resort",
    img: "https://bit.ly/3KtefJk",
  },
  {
    id: 3,
    name: "Resort",
    img: "https://bit.ly/356AGUn",
  },
];
