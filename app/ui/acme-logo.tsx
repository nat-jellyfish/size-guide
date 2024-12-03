import { GlobeAltIcon, CameraIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';


export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <CameraIcon className="h-8 w-8 lg:h-12 lg:w-12 rotate-[15deg]" />
      <p className="sm:text-[40px] text-[30px] ml-3 ">Size Guide</p>
    </div>
  );
}
