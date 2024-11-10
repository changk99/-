const qrcode = 'https://clstools.changlishe.com/uploads/00008_53424361_c9e74a780d.png';
const qqcode = 'https://clstools.changlishe.com/uploads/qq_communication_e2ffa76d02.jpg';
import { Search } from 'lucide-react';

export function More(props: React.ButtonHTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <div className="flex flex-col mt-3 items-center">
        <div className="w-[60%]">
          <img src={qrcode} alt="小程序二维码" />
        </div>
        <div className="mt-5 text-lg font-bold">
          cls的工具箱
          <span className="text-xs italic font-normal">
            (微信小程序
            <Search size={12} className="inline -top-[3px] -right-[2px] relative"></Search>)
          </span>
        </div>
        <div className="w-[60%] mt-3">
          <img src={qqcode} alt="qq 交流群二维码" />
        </div>
        <div className="mt-5 text-lg font-bold">
          cls的工具箱交流群
          <span className="text-sm italic font-normal">(962158903)</span>
        </div>
      </div>
    </div>
  );
}
