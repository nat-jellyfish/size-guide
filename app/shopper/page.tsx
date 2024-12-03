import Form from "next/form";
// import { RadioGroup, Radio } from "@nextui-org/react";
import { Button } from "../ui/button";

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
        <Button>Scan Now</Button>
        </div>
      </div>
    </Form>
  );
}
