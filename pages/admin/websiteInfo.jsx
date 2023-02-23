import { Textarea, Tabs } from "@mantine/core";

export default function WebsiteInfo() {
  return (
    <div className="flex flex-col items-center justify-start pt-14 w-full h-full  ">
      <div className=" overflow-y-scroll w-textArea h-carousel  pb-8 px-14 bg-white flex flex-col items-center justify-start">
        <h1 className="border-b-4 pb-4 border-mainBlue my-3">
          تغییر اطلاعات وبسایت
        </h1>
        <Tabs
          className="mt-5 w-full"
          color="yellow"
          variant="pills"
          defaultValue="gallery"
        >
          <Tabs.List grow position="center">
            <Tabs.Tab value="settings">فوتر</Tabs.Tab>
            <Tabs.Tab value="messages">تماس با ما</Tabs.Tab>
            <Tabs.Tab value="gallery">درباره ما</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery">
            <div className="w-full   flex flex-col items-center p-10 h-60 space-y-3">
              <div className="flex w-full items-start justify-end">
                <h3 className="text-3xl">درباره ما</h3>
              </div>
              <p className="text-lg self-end">درباره بوتک</p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder="درباره بوتک"
                radius="xs"
                autosize
                minRows={7}
                withAsterisk
              />
              <p className="text-lg self-end">تاریخچه و پیشینه</p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder="تاریخچه و پیشینه"
                radius="xs"
                autosize
                minRows={15}
                withAsterisk
              />
              <button className="px-14 mb-96 rounded-lg   transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
                ثبت تغییرات
              </button>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            {" "}
            <div className="w-full   flex flex-col items-center p-10 h-60 space-y-9">
              <div className="flex w-full items-start justify-end">
                <h3 className="text-3xl">تماس با ما</h3>
              </div>
              <p className="text-lg self-end">آدرس</p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder="آدرس"
                radius="xs"
                autosize
                minRows={2}
                withAsterisk
              />
              <p className="text-lg self-end">شماره تلفن</p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder="تاریخچه و پیشینه"
                radius="xs"
                autosize
                minRows={1}
                withAsterisk
              />
              <div className="flex items-center justify-center space-x-9">
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="تاریخچه و پیشینه"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                />{" "}
                <p className="text-lg text-center w-full">ایمیل</p>
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="تاریخچه و پیشینه"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                />
                <p className="text-lg text-center w-full">کد پستی</p>
              </div>{" "}
              <button className="px-14 mb-10 rounded-lg self-start transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
                تایید تغییرات
              </button>
            </div>{" "}
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xs">
            <div className="w-full   flex flex-col items-center p-10 h-60 space-y-9">
              <div className="flex w-full items-start justify-end">
                <h3 className="text-3xl">فوتر</h3>
              </div>
              <p className="text-lg self-end">آدرس</p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder="آدرس"
                radius="xs"
                autosize
                minRows={2}
                withAsterisk
              />
              <p className="text-lg self-end">شماره تلفن</p>
              <Textarea
                className="text-2xl  text-right w-full"
                placeholder="تاریخچه و پیشینه"
                radius="xs"
                autosize
                minRows={1}
                withAsterisk
              />
              <div className="flex items-center justify-center space-x-9">
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="تاریخچه و پیشینه"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                />{" "}
                <p className="text-lg text-center w-full">لینک تلگرام</p>
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="تاریخچه و پیشینه"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                />
                <p className="text-lg text-center w-full">لینک اینستاگرام</p>
              </div>{" "}
              <div className="flex items-center justify-center space-x-9">
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="لینک فیسبوک"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                />{" "}
                <p className="text-lg text-center w-full">لینک فیسبوک</p>
                <Textarea
                  className="text-2xl  text-right w-full"
                  placeholder="لینک واتسپ"
                  radius="xs"
                  autosize
                  minRows={1}
                  withAsterisk
                />
                <p className="text-lg text-center w-full">لینک واتسپ</p>
              </div>
              <button className="px-14 mb-10 rounded-lg self-start transition ease-in duration-300 hover:bg-darkPurple border-r-8 border-mainBlue py-2 bg-mainPurple text-white text-xl font-mainFont">
                تایید تغییرات
              </button>
            </div>{" "}
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
