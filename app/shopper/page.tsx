import Form from "next/form";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <Form action="/search">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col">
          <label>Name</label>
          <input type="text" />
        </div>
        <div className="flex flex-col">
          <label>Weight</label>
          <input type="text" />
        </div>
        <div className="flex flex-col">
          <label>Height</label>
          {/* <RadioGroup orientation="horizontal">
            <Radio value="inch">Inch</Radio>
            <Radio value="cm">Cm</Radio>
          </RadioGroup> */}
          <input type="text" />
        </div>
        <div>
          {/* <RadioGroup orientation="horizontal">
            <Radio value="female" >Female</Radio>
            <Radio value="male">Male</Radio>
          </RadioGroup> */}
        </div>
        <div className="flex justify-center">
        
        <Link
            href="/shopper/ar"
            className="flex items-center gap-5 self-start rounded-lg bg-pink-400 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-500 md:text-base"
          >
            <span>Scan Now</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </Form>
  );
}
